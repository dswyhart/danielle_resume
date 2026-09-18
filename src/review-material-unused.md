# Unused source material — 2023–2025 review cycles

Work history drawn from the 2023, 2024, and 2025 annual review cycles that did **not** make it
into `assets/js/resume-data.js`. This is the pool to draw from when a job posting calls for
something the current bullets do not cover.

The review documents themselves are **not** in this repository and must not be added to it. They
carry manager and peer commentary about named colleagues, internal ratings, and internal
competency framework detail — exactly the category `src/` excludes (see the README). Ratings,
growth-area feedback, career-development goals, and anything attributable to a named reviewer were
deliberately left out of this file too; those live in a private file outside the repo.

Everything below is Danielle's own work, stated as fact, safe for a public repository.

## Already covered — do not add again

These landed in `resume-data.js` during this pass. Listed so a future edit does not duplicate them.

| Item | Where it went |
|------|---------------|
| Production compute cut from 32 containers to 6, autoscaling redesign | `efficiency` bullet |
| Cost reduction across compute, storage, CI/CD; Artifactory image purge automation | `cost` bullet |
| AWS PrivateLink migration; application DB roles converted to read-only | `security` bullet |
| 100% security rating, CSRAP assessment | `compliance` bullet |
| DR plans for 3 remaining v4 environments; +30% security rating | `dr` bullet |
| Continuous deployment ownership (spec, buy-in, bi-weekly → daily) | `release` bullet |
| CD roadmap → milestones, tooling, dependencies, ticket backlog | `roadmap` bullet |
| Took over technical direction of the DevOps workload | `leadership` bullet |
| 25 technical interviews, 15% hire rate, trained other interviewers | `hiring` bullet |
| v4 CloudWatch alarm set rebuilt | `observability` bullet |
| JMaaS–Grafana integration repaired | `observability` bullet |
| Load testing modernized | `performance` bullet |
| ETL data swap scheduling automation | `etl` bullet |
| Post-cutover decommissioning (Jenkins, Lambda, IaC, inventories) | `migration` bullet |
| Runbook inventory: ETL swaps, DB recovery, env setup, ECS troubleshooting, alarm testing | folded into the existing `docs` runbook bullet |

## Unused — available if a posting calls for it

### Greenfield / CCXP infrastructure (2023)

- Became the team's subject-matter expert on all CCXP infrastructure and infrastructure as code —
  the go-to resource for the whole program.
- Wrote several new Terraform modules for Greenfield, including taking responsibility for and
  assembling the **project root for the development environment**. More specific than the current
  IaC bullets; useful for a posting that wants module authorship rather than platform breadth.
- Grew Terraform and Groovy depth on the job, moving from an SRE background into direct
  application-support engineering on a program with very different demands.
- Writes pipelines from scratch, not only changes to existing ones.

### v3 → v4 AWS migration (2024)

- Resolved compatibility issues and deprecated functionality during the legacy-to-v4 transition,
  and verified components met platform standards before cutover.
- Built systems and features that opened new capabilities available only on the v4 platform.
- Migration enhanced both security and scalability and hit its deadlines.

### ETL and data (2023–2024)

- Built automated ETL notification messaging so the team learned about updates and issues without
  someone relaying them — cut delays in responding to ETL problems.
- Optimized the container image purge process (the mechanism behind the storage savings).

### Testing and quality collaboration (2024)

- Supported end-to-end testing initiatives and TEST-environment work: took QA's requirements,
  broke the work into investigation and planning tasks, and assessed feasibility jointly.
- Unblocked QA by carrying their issues to other teams directly.
- Authored detailed technical specifications in Confluence — cited by reviewers as clear and
  step-by-step enough to follow without help. Worth a bullet if a posting emphasizes design docs
  or RFCs.

### Rotations and on-call (2023)

- Three separate rotations run on CCXP — on-call, deployments, and ETLs — none of which were in the
  SRE job description. Volunteered into all three and learned the underlying systems to run them.
- Owned building the rotation schedules and coordinating coverage across the team.

### Hiring and enablement (2023–2024)

- Hires from her interviews all cleared their first 90 days and had collectively tenured more than
  a year of service at the time of the 2024 review.
- Had other engineers shadow her interviews as part of training them to run their own.
- Served as onboarding buddy for a new engineer on CCXP (2023) and helped onboard several more
  (2024).

### Stakeholder-facing (2024)

- Presentations to CMS stakeholders drew repeated positive feedback for making complex technical
  material land with a non-engineering audience. Better suited to a cover letter than a bullet.
- Socialized the continuous deployment roadmap with stakeholders early to build awareness ahead of
  formal prioritization.

## Notes for future edits

- **Everything here is the medicare.gov/care-compare engagement** (August 2022 – present), except
  the rotation and Greenfield items, which are also that engagement — the 2023 cycle already sits
  inside it. Nothing in these reviews touches the healthcare.gov ITOPS or California DoT
  engagements, or either NCR role.
- **Internal team names were stripped.** The reviews refer to the DevOps team by an internal
  codename; bullets say "the DevOps team" or "the platform team" instead. Keep it that way.
- **`concise` has no slack.** Adding to `resume-data.js` now requires re-running both checks in the
  README. The skills list wraps at roughly 54 characters per column, and one extra wrapped line
  spills the SRE variant onto a second page.
