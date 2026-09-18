# Resume Entries — CCXP Project (CMS)

> Derived from contributions across: `oc-ccxp-angular-client`, `oc-ccxp-ci`, `oc-ccxp-data`, `oc-ccxp-etl`, `oc-ccxp-infrastructure`, `oc-ccxp-react-client`, `oc-ccxp-root-config`, `oc-ccxp-server`

---

## CI/CD & DevOps Engineering

- **Architected** a shared Jenkins/Groovy CI library spanning 8+ CCXP repositories, standardizing delivery workflows, reusable deployment functions, and faster pipeline onboarding.
- **Implemented** automated SemVer-based release pipelines with dry-run controls and pre-build PR merge validation, reducing manual versioning and improving promotion safety across environments.
- **Standardized** Node.js runtime upgrades from 18 through 24 across frontend, backend, and pipeline ecosystems, reducing technical debt and improving build stability platform-wide.
- **Enabled** blue/green deployment and Akamai cache-purge automation across application and root-config pipelines, achieving zero-downtime releases and faster production cutovers.
- **Hardened** CI/CD operations with pipeline timeout controls, Slack notifications, branch/ruleset workarounds, and gold-image build migration for more resilient enterprise delivery.

---

## AWS Infrastructure & Terraform

- **Built** CCXP's Greenfield (v4) AWS foundation from scratch in Terraform across DEV, TEST, IMPL, and PROD, enabling repeatable multi-environment infrastructure provisioning at enterprise scale.
- **Developed** reusable Terraform modules for KMS, CloudWatch, ACM, SQS, SNS, Lambda, ECS, RDS, S3, EventBridge, and log groups, reducing drift and accelerating platform expansion.
- **Led** zero-downtime PostgreSQL upgrades from RDS v11 to v14.16, including read-only endpoint support and production right-sizing, improving performance and resiliency.
- **Implemented** ECS autoscaling, PrivateLink connectivity, Resilience Hub integration, and CloudWatch dashboards-as-code to strengthen operational resilience and observability.
- **Rolled out** cross-account Assume Role, KMS rotation, deletion protection, IAM hardening, and FIS/appointment-scheduling Lambda infrastructure for secure, compliant cloud operations.

---

## ETL & Data Pipeline Engineering

- **Designed** a parallelized "Speedy ETL" architecture for provider data ingestion, achieving faster end-to-end processing and improved throughput for large ETL workloads.
- **Automated** Greenfield migration for 15+ ETL job pipelines across DEV, TEST, IMPL, and PROD, enabling a coordinated platform cutover with minimal operational disruption.
- **Replaced** log-based Lambda health detection with database-driven status monitoring, timeout-restart handling, and fatal-log checks, improving reliability of long-running ETL execution.
- **Optimized** ETL compute footprints with 2 CPU/6 GiB resource tuning and Lambda memory adjustments, improving job stability, performance, and cost efficiency.
- **Engineered** schedule-swap automation, down-migration workflows, swap cancellation/check jobs, and ETL completion reporting, reducing manual operational overhead.

---

## Application Migration & Modernization

- **Led** the cross-repository migration from legacy MOSS to Greenfield (v4) infrastructure spanning frontend, backend, ETL, data, and shared platform services simultaneously.
- **Established** full CI/CD for the new React client including PR, deploy, Greenfield, import-map, SonarQube, Husky, and SemVer pipelines, building the production-ready foundation for the Angular-to-React migration.
- **Built** Single-SPA root-config deployment and import-map pipelines with Akamai integration for scalable microfrontend orchestration.
- **Modernized** Node.js services through coordinated runtime upgrades, Alpine/gold-image container migrations, and Docker image optimization, improving security posture and build efficiency.
- **Integrated** New Relic browser/server agents and source-map publishing across frontend and server applications to strengthen observability during modernization.

---

## Security & Compliance

- **Deployed** TruffleHog secret scanning across all CCXP repositories and CI pipelines, enabling earlier credential leak detection across the SDLC.
- **Remediated** critical dependency vulnerabilities including axios CVE-2025-27152 across multiple services, reducing exposure and maintaining compliance posture.
- **Strengthened** AWS/CI security posture through Assume Role adoption, SSH hardening, ECS execution policy fixes, and Jenkins permission controls to enforce least-privilege access at scale.
- **Enabled** platform safeguards including KMS key rotation, Nessus agent integration, database deletion protection, and SNS permission repairs to support audit readiness.
- **Standardized** secure release and deployment patterns across 8+ repositories, enforcing consistent governance and reducing configuration drift.
