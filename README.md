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

Everything lives in `assets/js/resume-data.js`. Each bullet and each skill carries a weight per
job type. Bullets also carry a theme; skills do not.

```js
// an experience bullet
{
  text: "Led zero-downtime PostgreSQL upgrades from Amazon RDS 11 to 14.16 ...",
  t: "database",                                        // theme (bullets only)
  w: { sre: 10, devops: 5, cloud: 9, platform: 5 }      // weight per job type
}

// a skill
{ text: "PostgreSQL Administration and Upgrade Planning",
  w: { sre: 9, devops: 4, cloud: 8, platform: 5 } }
```

Weights run 0–10; `0` drops the item from that variant entirely. Higher-weighted items win the
limited bullet slots in *Concise* mode.

Bullets and skills are also **ordered differently** once selected. Bullets are restored to their
authored order, because they are written to build on each other and read oddly when shuffled.
Skills stay in relevance order, so a recruiter scanning the first line of the Cloud variant hits
Terraform rather than whatever happened to be first in the file.

`t` is the bullet's theme, and it matters more than it looks. Relevance ranking on its own lets
one strong theme swamp a short list — the SRE variant once filled three of seven slots with
resilience work and two with database work, pushing out the flagship migration bullet entirely.
`THEME_CAP` in `assets/js/tailor.js` allows at most two bullets per theme in *Concise* mode, so
a concise resume reads across the breadth of the role. Give a new bullet an existing theme when
it belongs to one; invent a new theme only when it genuinely stands apart.

To add a job type, add an entry to `jobTypes` (with an `id`, `label`, `blurb`, `title`, and
`summary`) and add that `id` to the `w` map of any bullet or skill that should appear in it.
Nothing else needs to change — the UI and the PDF builder both read from the data.

### Client engagements under one employer

A role may carry `engagements`: concurrent client assignments held under the same employer,
each with its own title, client, dates, bullets, and budget. Listed newest first.

```js
position: "Site Reliability Engineer",   // the title held with the employer, still current
company: "Nava Public Benefit Company",
startdate: "April 2021",
enddate: "Present",
engagements: [
  {
    position: "DevOps Engineer",         // the title held on this contract
    client: "medicare.gov/care-compare — FedHealth portfolio",
    startdate: "August 2022",
    enddate: "Present",
    budget: { concise: 5, full: Infinity },
    points: [ /* weighted bullets, same shape as a role's */ ]
  }
]
```

Each engagement renders as its own sub-block beneath the employer. One employer block with
several titles is accurate and is how consulting work is conventionally shown; separate
top-level entries with overlapping dates would read as job-hopping.

An engagement with an empty `points` array still renders its header, so the chronology stays
complete while accomplishments for it are still being gathered. Roles without `engagements`
keep their own top-level `points`.

Keep the `client` string short. It shares one line with the right-aligned date range, and a
long one wraps the dates onto a second line — which looks ragged and costs vertical space that
the concise page budget cannot spare.

### Budgets

Budgets live on each entry as `budget: { concise, full }` — on a role, or on an individual
engagement — rather than in a positional array, so adding a role or engagement cannot silently
shift another one's cap. A role with `condense: true` and a concise budget of `0` collapses to
its `condensed` prose line, which is why the 2011–2015 QA role reads as one line in every
variant. `full` uses `Infinity` on purpose: a fixed cap would silently hide the newest work as
the source material grows.

## Checking your changes

One variant quietly spilling onto an extra page is the usual failure here, and it only shows up
when all eight combinations are compared together. Adding a single engagement header has been
enough to do it. After changing content, weights, or budgets, open the page and paste this into
the browser console:

```js
['sre','devops','cloud','platform'].forEach(id => ['concise','full'].forEach(d => {
  pdfMake.createPdf(ResumePdf.buildDocDefinition(Tailor.tailor(id, d)))
    .getBuffer(b => console.log(id, d,
      (new TextDecoder('latin1').decode(b).match(/\/Type\s*\/Page[^s]/g) || []).length, 'page(s)'));
}));
```

Expect **1 page for every `concise`** and **2 for every `full`**. Anything else means a budget
needs tuning.

> **Reload properly first.** The scripts are served without cache headers, so a browser will
> happily keep running a stale `tailor.js` or `pdf.js` after you edit them — the numbers then
> describe the *old* layout and look fine. Hard-reload, or serve on a fresh port
> (`python3 -m http.server 8801`), and confirm the new code is live before trusting the output.

There is no test suite. `node --check assets/js/*.js` catches syntax errors, though note it does
*not* catch undefined variables — a stale reference to a removed constant passes `--check` and
throws only at runtime. Node is needed for that check alone, never to run the site.

## Running locally

Open `index.html` directly in a browser. Nothing fetches over the network — the resume data is a
plain script that assigns a global, the font metrics are inlined as strings, and there are no ES
modules — so `file://` needs no server or flags. A local server is still handy when iterating,
because it lets you dodge the stale-script trap above by changing ports:

```
python3 -m http.server 8801
```

## Deploying

Push to `main`. The Pages workflow copies `index.html`, `CNAME`, `assets/`, and `vendor/` into the
Pages artifact and deploys. If you add a new top-level directory, add it to the `Stage site` step.
