/*
 * PDF generation, powered by pdfmake (MIT, vendored in /vendor).
 *
 * pdfmake emits a real text layer rather than a rasterized screenshot, so the
 * output stays selectable, searchable, and parseable by applicant tracking
 * systems. Fonts are the PDF standard 14 (Helvetica), which pdfkit embeds by
 * metric reference -- that keeps the vendored bundle to one file with no
 * separate font blob.
 */
(function () {
  "use strict";

  var INK = "#1f2933";
  var MUTED = "#52606d";
  var ACCENT = "#8d5b2a";
  var RULE = "#dcc8b2";

  function configureFonts() {
    window.pdfMake.fonts = {
      Helvetica: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique"
      }
    };
  }

  function rule(marginTop, marginBottom) {
    return {
      canvas: [{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.75, lineColor: RULE }],
      margin: [0, marginTop, 0, marginBottom]
    };
  }

  function sectionHeading(text) {
    return {
      text: text.toUpperCase(),
      style: "sectionHeading",
      margin: [0, 12, 0, 4]
    };
  }

  function contactLine(r) {
    var parts = [
      r.email,
      window.Tailor.formatPhone(r.phone),
      "github.com/" + r.github,
      r.site,
      r.location
    ].filter(Boolean);

    var spans = [];
    parts.forEach(function (part, i) {
      if (i > 0) spans.push({ text: "  •  ", color: RULE });
      spans.push({ text: part });
    });
    return { text: spans, style: "contact", margin: [0, 5, 0, 0] };
  }

  function experienceBlock(exp, isLast) {
    var stack = [
      {
        columns: [
          {
            width: "*",
            text: [
              { text: exp.position, bold: true, fontSize: 10.5, color: INK },
              { text: "  —  " + exp.company, fontSize: 10, color: MUTED }
            ]
          },
          {
            width: "auto",
            text: exp.dates + "  ·  " + exp.location,
            fontSize: 8.5,
            color: MUTED,
            alignment: "right",
            margin: [8, 1, 0, 0]
          }
        ]
      }
    ];

    function engagementHeader(eng) {
      return {
        columns: [
          {
            width: "*",
            text: [
              { text: eng.position, bold: true, fontSize: 9.5, color: MUTED },
              { text: "  \u00b7  " + eng.client, fontSize: 9, color: MUTED }
            ]
          },
          {
            width: "auto",
            text: eng.dates,
            fontSize: 8.5,
            color: MUTED,
            alignment: "right",
            margin: [8, 0, 0, 0]
          }
        ],
        margin: [0, 5, 0, 0]
      };
    }

    function bulletList(bullets) {
      return { ul: bullets, style: "body", margin: [0, 4, 0, 0], markerColor: ACCENT };
    }

    if (exp.engagements && exp.engagements.length) {
      exp.engagements.forEach(function (eng) {
        stack.push(engagementHeader(eng));
        // pdfmake rejects an empty `ul`, and an engagement may legitimately
        // have no bullets yet.
        if (eng.bullets.length) stack.push(bulletList(eng.bullets));
      });
    } else if (exp.summaryLine) {
      stack.push({ text: exp.summaryLine, style: "body", margin: [0, 4, 0, 0] });
    } else if (exp.bullets.length) {
      stack.push(bulletList(exp.bullets));
    }

    // Keep a role header from being orphaned at the foot of a page.
    return { stack: stack, unbreakable: false, margin: [0, 0, 0, isLast ? 0 : 9] };
  }

  function skillColumns(skills) {
    var half = Math.ceil(skills.length / 2);
    return {
      columns: [
        { width: "50%", ul: skills.slice(0, half), style: "body", markerColor: ACCENT },
        { width: "50%", ul: skills.slice(half), style: "body", markerColor: ACCENT, margin: [10, 0, 0, 0] }
      ],
      columnGap: 8,
      margin: [0, 2, 0, 0]
    };
  }

  function buildDocDefinition(r) {
    var content = [
      { text: r.name, style: "name" },
      { text: r.title, style: "title" },
      contactLine(r),
      rule(9, 0),

      sectionHeading("Professional Summary"),
      { text: r.summary, style: "body" },

      sectionHeading("Experience")
    ];

    r.experiences.forEach(function (exp, i) {
      content.push(experienceBlock(exp, i === r.experiences.length - 1));
    });

    content.push(sectionHeading("Core Skills"));
    content.push(skillColumns(r.skills));

    content.push(sectionHeading("Certifications and Training"));
    content.push({ text: r.courses.join("  •  "), style: "body", color: MUTED });

    return {
      pageSize: "LETTER",
      pageMargins: [40, 38, 40, 40],
      info: {
        title: r.name + " — " + r.jobLabel + " Resume",
        author: r.name,
        subject: r.jobLabel,
        keywords: r.skills.join(", ")
      },
      defaultStyle: { font: "Helvetica", fontSize: 9.5, color: INK, lineHeight: 1.18 },
      styles: {
        name: { fontSize: 21, bold: true, color: INK, characterSpacing: -0.3 },
        title: { fontSize: 11, color: ACCENT, bold: true, margin: [0, 3, 0, 0] },
        contact: { fontSize: 8.5, color: MUTED },
        sectionHeading: { fontSize: 8.5, bold: true, color: ACCENT, characterSpacing: 1.1 },
        body: { fontSize: 9.5, color: INK }
      },
      footer: function (currentPage, pageCount) {
        if (pageCount < 2) return null;
        return {
          text: r.name + "  ·  page " + currentPage + " of " + pageCount,
          alignment: "center",
          fontSize: 7.5,
          color: MUTED,
          margin: [0, 12, 0, 0]
        };
      },
      content: content
    };
  }

  function create(tailored) {
    if (!window.pdfMake) throw new Error("pdfmake failed to load from /vendor.");
    return window.pdfMake.createPdf(buildDocDefinition(tailored));
  }

  if (window.pdfMake) configureFonts();

  window.ResumePdf = {
    // `done` fires once the PDF is actually built -- pdfmake does the work off
    // the call stack, so callers cannot tell from a return value alone.
    download: function (tailored, done) {
      create(tailored).download(window.Tailor.fileName(tailored), done);
    },
    open: function (tailored, done) {
      create(tailored).open();
      if (done) done();
    },
    buildDocDefinition: buildDocDefinition
  };
})();
