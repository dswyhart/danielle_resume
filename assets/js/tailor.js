/*
 * Tailoring engine.
 *
 * Takes the full resume in window.RESUME plus a job type id and a density, and
 * returns a plain, already-ordered object that both the on-screen preview and
 * the PDF builder render. Neither renderer knows anything about weights.
 */
(function () {
  "use strict";

  /*
   * How many bullets survive per role, by density. Index matches
   * RESUME.experiences.
   *
   * `concise` is the resume you actually send: hard caps that keep it to a
   * single page. `full` is the complete record, so it uses Infinity rather
   * than a number -- the source material grows over time and a fixed cap would
   * silently hide the newest work.
   *
   * A 0 means the role collapses to its `condensed` prose line, which is why
   * the 2011-2015 QA role reads as one line in every variant.
   */
  var BULLET_BUDGET = {
    concise: [7, 5, 0],
    full: [Infinity, Infinity, 0]
  };
  var SKILL_BUDGET = { concise: 12, full: Infinity };

  /*
   * Most bullets a single theme may occupy in one role.
   *
   * Without this, relevance ranking alone lets one strong theme swamp a short
   * list: the SRE variant filled three of seven slots with resilience work and
   * two with database work, pushing out the flagship migration entirely. The
   * cap keeps a concise resume reading across the breadth of the role, and it
   * holds as more source material is added over time.
   */
  var THEME_CAP = { concise: 2, full: Infinity };

  function weightFor(item, jobId) {
    return (item.w && typeof item.w[jobId] === "number") ? item.w[jobId] : 0;
  }

  // Sort by weight descending, but keep the authored order as the tiebreak so
  // the result is stable and reads in the order Danielle wrote it.
  function byWeight(jobId) {
    return function (a, b) {
      var diff = weightFor(b.item, jobId) - weightFor(a.item, jobId);
      return diff !== 0 ? diff : a.index - b.index;
    };
  }

  /*
   * Keep the `limit` highest-weighted items for this job type.
   *
   * `order` decides how the survivors are presented:
   *   "authored"  - restore the original order. Right for experience bullets,
   *                 which are written to build on each other and read oddly
   *                 when shuffled into a relevance ranking.
   *   "relevance" - leave them ranked. Right for the skills list, where a
   *                 recruiter scanning the first line should hit the skills
   *                 that matter most for the role they are hiring for.
   */
  function rank(items, jobId, limit, order, themeCap) {
    var ranked = items
      .map(function (item, index) { return { item: item, index: index }; })
      .filter(function (d) { return weightFor(d.item, jobId) > 0; })
      .sort(byWeight(jobId));

    // Walk the ranking rather than slicing it, so a theme that has used up its
    // allowance is skipped and its slot goes to the next-best other theme.
    var cap = themeCap || Infinity;
    var perTheme = {};
    var kept = [];
    for (var i = 0; i < ranked.length && kept.length < limit; i++) {
      var theme = ranked[i].item.t;
      if (theme) {
        var used = perTheme[theme] || 0;
        if (used >= cap) continue;
        perTheme[theme] = used + 1;
      }
      kept.push(ranked[i]);
    }

    if (order !== "relevance") {
      kept.sort(function (a, b) { return a.index - b.index; });
    }
    return kept.map(function (d) { return d.item.text; });
  }

  function tailor(jobId, density) {
    var resume = window.RESUME;
    var job = resume.jobTypes.filter(function (j) { return j.id === jobId; })[0];
    if (!job) throw new Error("Unknown job type: " + jobId);

    var budget = BULLET_BUDGET[density] || BULLET_BUDGET.concise;

    var experiences = resume.experiences.map(function (exp, i) {
      var limit = budget[i];
      var out = {
        position: exp.position,
        company: exp.company,
        location: exp.location,
        dates: exp.startdate + " – " + exp.enddate,
        bullets: [],
        summaryLine: null
      };

      // A role marked `condense` collapses to a single prose line unless the
      // density explicitly buys it a bullet budget.
      if (exp.condense && !limit) {
        out.summaryLine = exp.condensed;
      } else {
        out.bullets = rank(exp.points, jobId, limit || exp.points.length, "authored",
                          THEME_CAP[density] || THEME_CAP.concise);
      }
      return out;
    });

    return {
      name: resume.name,
      email: resume.email,
      phone: resume.phone,
      location: resume.location,
      github: resume.github,
      site: resume.site,
      jobId: job.id,
      jobLabel: job.label,
      title: job.title,
      summary: job.summary,
      experiences: experiences,
      skills: rank(resume.skills, jobId, SKILL_BUDGET[density] || SKILL_BUDGET.concise, "relevance"),
      courses: resume.courses.slice()
    };
  }

  function formatPhone(digits) {
    var d = String(digits).replace(/\D/g, "");
    if (d.length !== 10) return digits;
    return "(" + d.slice(0, 3) + ") " + d.slice(3, 6) + "-" + d.slice(6);
  }

  function fileName(tailored) {
    var slug = tailored.jobLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return tailored.name.replace(/\s+/g, "-") + "-" + slug + "-resume.pdf";
  }

  window.Tailor = { tailor: tailor, formatPhone: formatPhone, fileName: fileName };
})();
