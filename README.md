# danielle_resume

The source for [danielleswyhart.com](https://danielleswyhart.com) — a static resume site that
tailors itself to a job type and generates a matching PDF in the browser.

## What it does

Pick one of four job types and the page re-renders the resume for it: a different professional
title, a different summary, and a re-ranked set of experience bullets and skills. **Generate PDF**
then builds a formatted, ATS-readable PDF of exactly what is on screen.

| Job type | Leads with |
|----------|-----------|
| Site Reliability Engineer | Availability, observability, incident response |
| DevOps / CI-CD Engineer | Pipelines, release automation, delivery safety |
| Cloud Infrastructure Engineer | Terraform, AWS, and Azure infrastructure as code |
| Platform Engineer | Shared services, standardization, developer experience |

A **Concise / Full** toggle controls how many bullets survive. *Concise* is the resume you
actually send: hard per-role caps that keep every job type to a single page. *Full* is the
complete record and is uncapped, so newly added source material always shows up somewhere.

## Stack

No framework, no build step, no server. Plain HTML, CSS, and JavaScript, deployed straight to
GitHub Pages by `.github/workflows/pages.yml`. This replaced the previous Hugo setup — the
repository root *is* the published site.

PDFs are produced by [pdfmake](https://pdfmake.github.io/docs/) (MIT licensed, vendored at
`vendor/pdfmake.min.js`), running entirely client-side. pdfmake writes a real text layer instead
of rasterizing the page, so the output stays selectable, searchable, and parseable by applicant
tracking systems. It uses the PDF standard Helvetica family, which needs no embedded font blob.

## Layout

```
index.html                 page shell
assets/css/style.css       all styling
assets/js/resume-data.js   the resume itself — the only file you edit for content
assets/js/tailor.js        picks and orders content for the selected job type
assets/js/pdf.js           builds the pdfmake document definition
assets/js/app.js           UI wiring and on-screen rendering
vendor/pdfmake.min.js      pdfmake 0.2.12 (MIT)
vendor/pdfmake-standard-fonts.js  Helvetica metrics for the PDF standard 14
src/                       raw source material the resume is written from
```

`src/` holds the original CCXP contribution notes (Markdown and Word). It is not published —
the Pages workflow copies only `index.html`, `CNAME`, `assets/`, and `vendor/`. Keep it as the
record of where bullets came from, and as the pool to draw from when adding more.

## Editing content

Everything lives in `assets/js/resume-data.js`. Each bullet and skill carries a weight per job
type:

```js
{
  text: "Led zero-downtime PostgreSQL upgrades from Amazon RDS 11 to 14.16 ...",
  t: "database",
  w: { sre: 10, devops: 5, cloud: 9, platform: 5 }
}
```

Weights run 0–10; `0` drops the item from that variant entirely. Higher-weighted items win the
limited bullet slots in *Concise* mode.

`t` is the bullet's theme, and it matters more than it looks. Relevance ranking on its own lets
one strong theme swamp a short list — the SRE variant once filled three of seven slots with
resilience work and two with database work, pushing out the flagship migration bullet entirely.
`THEME_CAP` in `assets/js/tailor.js` allows at most two bullets per theme in *Concise* mode, so
a concise resume reads across the breadth of the role. Give a new bullet an existing theme when
it belongs to one; invent a new theme only when it genuinely stands apart.

To add a job type, add an entry to `jobTypes` (with an `id`, `label`, `blurb`, `title`, and
`summary`) and add that `id` to the `w` map of any bullet or skill that should appear in it.
Nothing else needs to change — the UI and the PDF builder both read from the data.

### Concurrent titles under one employer

A role may carry an optional `engagement`, for a second concurrent title held under the same
employer — a contract or client assignment:

```js
position: "Site Reliability Engineer",      // the title held at the employer
company: "Nava Public Benefit Company",
startdate: "April 2021",
engagement: {
  position: "DevOps Engineer",              // the title held on the contract
  client: "CMS Care Compare Experience Platform (medicare.gov)",
  startdate: "December 2022",
  enddate: "Present"
}
```

It renders as a second line under the employer, with its own date range, in both the page and
the PDF. Keeping it as one employer block rather than two overlapping entries is both accurate
and how consulting work is conventionally shown. Roles without an `engagement` are unaffected.

### Budgets

Per-role bullet budgets live in `BULLET_BUDGET` at the top of `assets/js/tailor.js`. A role with
`condense: true` collapses to its `condensed` prose line whenever its budget is `0` — which is
why the 2011–2015 QA role reads as one line in every variant. `full` uses `Infinity` rather than
a number on purpose: a fixed cap would silently hide the newest work as the source material
grows.

After changing content or weights, check every variant still paginates the way you expect —
*Concise* should be one page and *Full* two for all four job types. One variant quietly spilling
onto an extra page is the usual failure, and it only shows up when you compare them together.

## Running locally

Open `index.html` directly in a browser — it works from `file://`, no server needed.

## Deploying

Push to `main`. The Pages workflow copies `index.html`, `CNAME`, `assets/`, and `vendor/` into the
Pages artifact and deploys. If you add a new top-level directory, add it to the `Stage site` step.
