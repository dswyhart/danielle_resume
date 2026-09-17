/*
 * UI controller. Owns the selected job type and density, re-renders the
 * on-screen resume when either changes, and hands the tailored object to the
 * PDF builder on request.
 */
(function () {
  "use strict";

  var STORE_KEY = "resume.prefs.v1";
  var state = { jobId: window.RESUME.jobTypes[0].id, density: "concise" };

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /* ---------- preferences ---------- */

  function readPrefs() {
    var fromHash = (location.hash || "").replace(/^#/, "");
    var valid = window.RESUME.jobTypes.some(function (j) { return j.id === fromHash; });
    if (valid) {
      state.jobId = fromHash;
      return;
    }
    try {
      var saved = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
      if (window.RESUME.jobTypes.some(function (j) { return j.id === saved.jobId; })) {
        state.jobId = saved.jobId;
      }
      if (saved.density === "full" || saved.density === "concise") {
        state.density = saved.density;
      }
    } catch (e) {
      /* private mode or blocked storage: defaults are fine */
    }
  }

  function writePrefs() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch (e) {
      /* non-fatal */
    }
  }

  /* ---------- controls ---------- */

  function buildControls() {
    var bar = document.getElementById("controls");
    bar.innerHTML = "";

    var pickerGroup = el("div", "control-group");
    pickerGroup.appendChild(el("span", "control-label", "Tailor for"));

    var picker = el("div", "picker");
    picker.setAttribute("role", "radiogroup");
    picker.setAttribute("aria-label", "Job type");

    window.RESUME.jobTypes.forEach(function (job) {
      var btn = el("button", "job-btn");
      btn.type = "button";
      btn.setAttribute("role", "radio");
      btn.dataset.jobId = job.id;
      btn.appendChild(el("span", "job-btn-label", job.label));
      btn.appendChild(el("span", "job-btn-blurb", job.blurb));
      btn.addEventListener("click", function () {
        state.jobId = job.id;
        history.replaceState(null, "", "#" + job.id);
        writePrefs();
        render();
      });
      picker.appendChild(btn);
    });
    pickerGroup.appendChild(picker);

    var actions = el("div", "control-group actions");

    var densityGroup = el("div", "density");
    densityGroup.setAttribute("role", "radiogroup");
    densityGroup.setAttribute("aria-label", "Detail level");
    [
      { id: "concise", label: "Concise", hint: "Sharpest bullets only" },
      { id: "full", label: "Full", hint: "Complete history" }
    ].forEach(function (opt) {
      var btn = el("button", "density-btn", opt.label);
      btn.type = "button";
      btn.setAttribute("role", "radio");
      btn.title = opt.hint;
      btn.dataset.density = opt.id;
      btn.addEventListener("click", function () {
        state.density = opt.id;
        writePrefs();
        render();
      });
      densityGroup.appendChild(btn);
    });
    actions.appendChild(densityGroup);

    var pdfBtn = el("button", "btn btn-primary", "Generate PDF");
    pdfBtn.type = "button";
    pdfBtn.id = "generate-pdf";
    pdfBtn.addEventListener("click", function () {
      withPdf(pdfBtn, window.ResumePdf.download);
    });
    actions.appendChild(pdfBtn);

    var previewBtn = el("button", "btn btn-ghost", "Preview PDF");
    previewBtn.type = "button";
    previewBtn.addEventListener("click", function () {
      withPdf(previewBtn, window.ResumePdf.open);
    });
    actions.appendChild(previewBtn);

    bar.appendChild(pickerGroup);
    bar.appendChild(actions);
  }

  function withPdf(button, action) {
    var original = button.textContent;
    var restored = false;

    function restore() {
      if (restored) return;
      restored = true;
      button.disabled = false;
      button.textContent = original;
    }

    button.disabled = true;
    button.textContent = "Building…";
    setStatus("");

    // Yield a frame so the label paints before pdfmake blocks the thread.
    requestAnimationFrame(function () {
      try {
        action(window.Tailor.tailor(state.jobId, state.density), restore);
      } catch (err) {
        setStatus("PDF generation failed: " + err.message);
        restore();
      }
    });
  }

  function setStatus(message) {
    var node = document.getElementById("status");
    node.textContent = message;
    node.hidden = !message;
  }

  function syncControlState() {
    Array.prototype.forEach.call(document.querySelectorAll(".job-btn"), function (btn) {
      var on = btn.dataset.jobId === state.jobId;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-checked", String(on));
    });
    Array.prototype.forEach.call(document.querySelectorAll(".density-btn"), function (btn) {
      var on = btn.dataset.density === state.density;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-checked", String(on));
    });
  }

  /* ---------- resume rendering ---------- */

  function renderHeader(r) {
    var header = document.getElementById("resume-header");
    header.innerHTML = "";
    header.appendChild(el("h1", null, r.name));
    header.appendChild(el("p", "role-title", r.title));

    var contact = el("div", "contact");
    var mail = el("a", null, r.email);
    mail.href = "mailto:" + r.email;
    var tel = el("a", null, window.Tailor.formatPhone(r.phone));
    tel.href = "tel:+1" + r.phone;
    var gh = el("a", null, "github.com/" + r.github);
    gh.href = "https://github.com/" + r.github;
    gh.rel = "noopener";
    [mail, tel, gh].forEach(function (a) { contact.appendChild(a); });
    contact.appendChild(el("span", null, r.location));
    header.appendChild(contact);

    header.appendChild(el("p", "summary", r.summary));
  }

  function renderExperience(r) {
    var section = document.getElementById("experience");
    section.innerHTML = "";
    section.appendChild(el("h2", null, "Experience"));

    r.experiences.forEach(function (exp) {
      var article = el("article", "experience");

      var row = el("div", "role-row");
      var left = el("div");
      left.appendChild(el("h3", null, exp.position));
      left.appendChild(el("p", "company", exp.company + ", " + exp.location));
      row.appendChild(left);
      row.appendChild(el("p", "meta", exp.dates));
      article.appendChild(row);

      // A concurrent contract title under the same employer, when there is one.
      if (exp.engagement) {
        var eng = el("div", "engagement-row");
        var label = el("p", "engagement");
        label.appendChild(el("strong", null, exp.engagement.position));
        label.appendChild(document.createTextNode(" \u00b7 " + exp.engagement.client));
        eng.appendChild(label);
        eng.appendChild(el("p", "meta", exp.engagement.dates));
        article.appendChild(eng);
      }

      if (exp.summaryLine) {
        article.appendChild(el("p", "condensed", exp.summaryLine));
      } else {
        var ul = el("ul");
        exp.bullets.forEach(function (b) { ul.appendChild(el("li", null, b)); });
        article.appendChild(ul);
      }
      section.appendChild(article);
    });
  }

  function renderChips(sectionId, heading, items) {
    var section = document.getElementById(sectionId);
    section.innerHTML = "";
    section.appendChild(el("h2", null, heading));
    var wrap = el("div", "chips");
    items.forEach(function (item) { wrap.appendChild(el("span", "chip", item)); });
    section.appendChild(wrap);
  }

  function render() {
    var tailored = window.Tailor.tailor(state.jobId, state.density);
    document.title = tailored.name + " — " + tailored.jobLabel;
    syncControlState();
    renderHeader(tailored);
    renderExperience(tailored);
    renderChips("skills", "Core Skills", tailored.skills);
    renderChips("courses", "Certifications and Training", tailored.courses);
  }

  /* ---------- boot ---------- */

  readPrefs();
  buildControls();
  render();
  setStatus("");

  window.addEventListener("hashchange", function () {
    readPrefs();
    render();
  });

  window.addEventListener("unhandledrejection", function (event) {
    var reason = event.reason;
    setStatus("PDF generation failed: " + (reason && reason.message ? reason.message : reason));
    Array.prototype.forEach.call(document.querySelectorAll(".btn"), function (btn) {
      btn.disabled = false;
    });
  });
})();
