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

A **Concise / Full** toggle controls how many bullets survive: *Concise* keeps the strongest few
per role and aims at a single page, *Full* prints the complete history.

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
```

## Editing content

Everything lives in `assets/js/resume-data.js`. Each bullet and skill carries a weight per job
type:

```js
{
  text: "Led zero-downtime PostgreSQL upgrades from Amazon RDS 11 to 14.16 ...",
  w: { sre: 10, devops: 5, cloud: 9, platform: 5 }
}
```

Weights run 0–10; `0` drops the item from that variant entirely. Higher-weighted items win the
limited bullet slots in *Concise* mode.

To add a job type, add an entry to `jobTypes` (with an `id`, `label`, `blurb`, `title`, and
`summary`) and add that `id` to the `w` map of any bullet or skill that should appear in it.
Nothing else needs to change — the UI and the PDF builder both read from the data.

Per-role bullet budgets live in `BULLET_BUDGET` at the top of `assets/js/tailor.js`. A role with
`condense: true` collapses to its `condensed` prose line whenever its budget is `0`.

## Running locally

Open `index.html` directly in a browser — it works from `file://`, no server needed.

## Deploying

Push to `main`. The Pages workflow copies `index.html`, `CNAME`, `assets/`, and `vendor/` into the
Pages artifact and deploys. If you add a new top-level directory, add it to the `Stage site` step.
