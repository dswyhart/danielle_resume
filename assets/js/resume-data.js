/*
 * Single source of truth for the resume.
 *
 * Every bullet carries a `w` (weight) map keyed by job type. The tailoring
 * engine in app.js sorts bullets by the selected job type's weight and keeps
 * the strongest ones, so adding a new job type means adding a key here and an
 * entry in JOB_TYPES below. Nothing else needs to change.
 *
 * Weights run 0-10. A 0 means "omit from this variant".
 */
window.RESUME = {
  name: "Danielle Swyhart",
  email: "swyhartresume@hotmail.com",
  phone: "8172390307",
  location: "Remote",
  github: "dswyhart",
  site: "danielleswyhart.com",

  jobTypes: [
    {
      id: "sre",
      label: "Site Reliability Engineer",
      blurb: "Availability, observability, and incident response",
      title: "Senior Site Reliability Engineer",
      summary:
        "Senior Site Reliability Engineer with over a decade keeping enterprise cloud platforms available, observable, and recoverable. I set technical direction for a federal platform team and lead zero-downtime database upgrades, chaos engineering and Game Day exercises, disaster recovery planning, and observability rollouts, backed by incident management and 24x7 on-call experience."
    },
    {
      id: "devops",
      label: "DevOps / CI-CD Engineer",
      blurb: "Pipelines, release automation, and delivery safety",
      title: "Senior DevOps Engineer",
      summary:
        "Senior engineer specializing in CI/CD architecture and release automation, now leading the DevOps workload for a federal platform team. I build shared Jenkins and Groovy pipeline libraries, semantic-version release automation, blue-green deployments, and quality gates that make releases safe and repeatable."
    },
    {
      id: "cloud",
      label: "Cloud Infrastructure Engineer",
      blurb: "Terraform, AWS, and Azure infrastructure as code",
      title: "Senior Cloud Infrastructure Engineer",
      summary:
        "Cloud infrastructure engineer specializing in Terraform-based AWS and Azure platforms. I build reusable infrastructure-as-code foundations across DEV, TEST, IMPL, and PROD, and lead migrations that move legacy and on-premises estates onto modern managed cloud services."
    },
    {
      id: "platform",
      label: "Platform Engineer",
      blurb: "Shared services, standardization, and developer experience",
      title: "Senior Platform Engineer",
      summary:
        "Platform engineer focused on shared services and developer experience across large multi-repository programs. I standardize delivery workflows, runtime versions, and security guardrails, set team priorities and mentor engineers, and lead migrations that cut technical debt while teams keep shipping."
    }
  ],

  experiences: [
    {
      position: "Site Reliability Engineer",
      company: "Nava Public Benefit Company",
      location: "Remote",
      startdate: "April 2021",
      enddate: "Present",
      /*
       * Nava is one employer with a sequence of client contracts, each under
       * its own title, dates, and bullets, listed newest first. The contracts
       * do not overlap; what runs concurrently is the employer-level
       * `position` above -- the title held with Nava itself, still current --
       * alongside whichever contract title applied at the time.
       *
       * They nest under one employer block because they are one employer.
       * Splitting them into top-level entries would imply three jobs.
       *
       * `budget` is per-entry rather than a positional array in tailor.js, so
       * adding an engagement cannot silently shift another one's cap.
       */
      engagements: [
        {
          position: "DevOps Engineer",
          client: "medicare.gov/care-compare (CMS) \u2014 FedHealth portfolio",
          startdate: "August 2022",
          enddate: "Present",
          // 5, not 6: a third engagement header tipped the SRE concise variant
          // onto a second page.
          budget: { concise: 5, full: Infinity },
          points: [
            {
              text: "Led cross-repository migration of the CMS CCXP program from legacy MOSS to Greenfield v4 infrastructure, spanning frontend, backend, ETL, data, and shared platform services.",
              t: "migration",
              w: { sre: 10, devops: 9, cloud: 10, platform: 10 }
            },
            {
              text: "Led post-cutover decommissioning across Jenkins, Lambda, infrastructure code, and environment inventories, retiring the legacy estate rather than leaving it running alongside v4.",
              t: "migration",
              w: { sre: 6, devops: 7, cloud: 9, platform: 7 }
            },
            {
              text: "Architected a shared Jenkins and Groovy CI library spanning 8+ repositories, standardizing delivery workflows, reusable deployment functions, and pipeline onboarding.",
              t: "cicd",
              w: { sre: 6, devops: 10, cloud: 4, platform: 9 }
            },
            {
              text: "Implemented semantic-version release automation, pre-build PR merge validation, blue-green deployments, and Akamai cache-purge automation, improving release safety and reducing deployment downtime.",
              t: "cicd",
              w: { sre: 8, devops: 10, cloud: 4, platform: 6 }
            },
            {
              text: "Engineered atomic deployment sequencing for the microfrontend root config, publishing the shell bundle, then import maps, then index.html so users never loaded a mismatched asset set during cutover.",
              t: "cicd",
              w: { sre: 8, devops: 9, cloud: 3, platform: 9 }
            },
            {
              text: "Implemented dynamic Akamai cache purging in Jenkins for full, per-file, and path-targeted invalidation, resolving a production incident caused by stale cached content.",
              t: "cicd",
              w: { sre: 9, devops: 9, cloud: 4, platform: 6 }
            },
            {
              text: "Owned the continuous deployment initiative from concept through technical specification, securing engineering and product buy-in to move off bi-weekly releases toward daily deployment.",
              t: "release",
              w: { sre: 5, devops: 10, cloud: 3, platform: 9 }
            },
            {
              text: "Translated continuous deployment into a sequenced roadmap of milestones, tooling changes, and cross-team dependencies, broken down into an implementation-ready ticket backlog.",
              t: "roadmap",
              w: { sre: 4, devops: 7, cloud: 3, platform: 10 }
            },
            {
              text: "Standardized Node.js runtime upgrades from 18 through 24 across frontend, backend, and pipeline ecosystems, reducing technical debt and improving build stability.",
              t: "modernization",
              w: { sre: 4, devops: 7, cloud: 3, platform: 9 }
            },
            {
              text: "Built CCXP Greenfield AWS foundations in Terraform across DEV, TEST, IMPL, and PROD, with reusable modules for KMS, CloudWatch, ACM, SQS, SNS, Lambda, ECS, RDS, S3, and EventBridge.",
              t: "iac",
              w: { sre: 7, devops: 7, cloud: 10, platform: 8 }
            },
            {
              text: "Refactored Terraform child modules to eliminate hardcoded account numbers, ARNs, CIDR blocks, and regions, making the full infrastructure deployable into a new AWS account without code changes.",
              t: "iac",
              w: { sre: 5, devops: 7, cloud: 10, platform: 9 }
            },
            {
              text: "Redesigned production autoscaling and right-sized capacity, cutting the steady-state footprint from 32 containers to 6 with no loss of availability or response time.",
              t: "efficiency",
              w: { sre: 9, devops: 6, cloud: 10, platform: 8 }
            },
            {
              text: "Drove cost reduction across compute, storage, and CI/CD, including automated Artifactory image purging that reclaimed storage and stopped obsolete artifacts accumulating.",
              t: "cost",
              w: { sre: 6, devops: 8, cloud: 9, platform: 8 }
            },
            {
              text: "Led zero-downtime PostgreSQL upgrades from Amazon RDS 11 to 14.16, adding read-only endpoint support and production right-sizing to improve resiliency and performance.",
              t: "database",
              w: { sre: 10, devops: 5, cloud: 9, platform: 5 }
            },
            {
              text: "Developed the platform's PostgreSQL major-version upgrade methodology, covering snapshot-based dry runs, Aurora query plan baselines via apg_plan_mgmt, cross-version performance comparison, and a documented rollback plan.",
              t: "database",
              w: { sre: 8, devops: 4, cloud: 8, platform: 4 }
            },
            {
              text: "Enabled CloudWatch Container Insights through Terraform with per-environment toggles, surfacing container CPU, memory, and network metrics for the ECS clusters.",
              t: "observability",
              w: { sre: 9, devops: 4, cloud: 8, platform: 5 }
            },
            {
              text: "Analyzed, reconfigured, and rebuilt the v4 environment's CloudWatch alarm set, replacing inherited alert noise with alarms the on-call rotation acts on.",
              t: "observability",
              w: { sre: 10, devops: 5, cloud: 6, platform: 6 }
            },
            {
              text: "Repaired the JMaaS-Grafana integration alongside the partner teams that owned it, restoring accurate dashboards and timely alerting.",
              t: "observability",
              w: { sre: 8, devops: 5, cloud: 5, platform: 6 }
            },
            {
              text: "Modernized the platform's load testing, giving the team current performance baselines to size capacity and autoscaling changes against.",
              t: "performance",
              w: { sre: 9, devops: 5, cloud: 7, platform: 6 }
            },
            {
              text: "Designed a parallelized Speedy ETL architecture and automated the Greenfield migration of 15+ ETL pipelines across DEV, TEST, IMPL, and PROD.",
              t: "etl",
              w: { sre: 7, devops: 6, cloud: 8, platform: 8 }
            },
            {
              text: "Replaced log-based Lambda health checks with database-driven status monitoring, timeout restart handling, and fatal-log detection, improving ETL reliability.",
              t: "etl",
              w: { sre: 10, devops: 4, cloud: 6, platform: 5 }
            },
            {
              text: "Engineered end-to-end data swap scheduling automation for the ETL process, taking hands-on coordination out of every swap and adding automated status notifications.",
              t: "etl",
              w: { sre: 7, devops: 8, cloud: 5, platform: 7 }
            },
            {
              text: "Established production-ready CI/CD for the React client, Single-SPA root-config, and import-map workflows, with SonarQube quality gates and New Relic browser and server observability.",
              t: "modernization",
              w: { sre: 8, devops: 9, cloud: 4, platform: 9 }
            },
            {
              text: "Strengthened platform security with TruffleHog secret scanning, cross-account Assume Role adoption, IAM hardening, KMS rotation, and deployment guardrails across 8+ repositories.",
              t: "security",
              w: { sre: 6, devops: 7, cloud: 9, platform: 8 }
            },
            {
              text: "Triaged a critical CVSS 9.4 dependency CVE, established that the vulnerable component was bundled but never invoked, and closed the finding with a formal attestation to CMS.",
              t: "security",
              w: { sre: 7, devops: 7, cloud: 6, platform: 6 }
            },
            {
              text: "Migrated inter-service communication onto AWS PrivateLink and converted application database roles to read-only, removing public network paths and narrowing credential blast radius.",
              t: "security",
              w: { sre: 7, devops: 5, cloud: 10, platform: 7 }
            },
            {
              text: "Owned the security and compliance posture behind a 100% security rating in the program's CSRAP assessment, a scored CMS review of platform security controls.",
              t: "compliance",
              w: { sre: 7, devops: 5, cloud: 7, platform: 8 }
            },
            {
              text: "Led the 2026 Risk Assessment epic, owning the pre-assessment compliance deliverables including the Configuration Management Plan, Privacy Impact Assessment, and System Design Documents.",
              t: "compliance",
              w: { sre: 6, devops: 5, cloud: 5, platform: 8 }
            },
            {
              text: "Authored Terraform for AWS Fault Injection Service experiments, giving the team controlled chaos engineering scenarios to run against production-like environments.",
              t: "resilience",
              w: { sre: 10, devops: 5, cloud: 9, platform: 6 }
            },
            {
              text: "Onboarded the platform into AWS Resilience Hub, building a proof of concept and evaluating Fault Injection Service integration to establish a resilience scoring baseline.",
              t: "resilience",
              w: { sre: 9, devops: 4, cloud: 9, platform: 5 }
            },
            {
              text: "Served as Chaos Master for the 2026 Medicare Game Day, designing and running a full-scale resilience exercise and streamlining the incident response runbook.",
              t: "resilience",
              w: { sre: 10, devops: 5, cloud: 5, platform: 5 }
            },
            {
              text: "Established a Game Day improvements tracker and a recurring incident response practice program so every on-call-eligible engineer gets hands-on paging experience.",
              t: "resilience",
              w: { sre: 10, devops: 4, cloud: 3, platform: 7 }
            },
            {
              text: "Built, tested, and documented disaster recovery plans for the three remaining v4 environments, cutting estimated recovery time and raising the program's security rating 30%.",
              t: "dr",
              w: { sre: 10, devops: 5, cloud: 8, platform: 6 }
            },
            {
              text: "Owned the on-call, deployment, and ETL rotation schedules, taking rotations outside the role's scope to keep full coverage across the team.",
              t: "incident",
              w: { sre: 9, devops: 6, cloud: 3, platform: 6 }
            },
            {
              text: "Authored the platform's runbooks for on-call, gold images, database upgrades and recovery, ETL swaps, new environment setup, ECS troubleshooting, and alarm testing, establishing repeatable incident response and maintenance procedures.",
              t: "docs",
              w: { sre: 9, devops: 5, cloud: 4, platform: 8 }
            },
            {
              text: "Took over technical direction of the DevOps workload, setting priorities, delegating scoped work to junior engineers, and acting as the primary point of contact for delivery.",
              t: "leadership",
              w: { sre: 8, devops: 9, cloud: 6, platform: 9 }
            },
            {
              text: "Conducted 25 technical interviews at a 15% hire rate, trained other engineers to run them, and served as onboarding buddy for new engineers joining the platform.",
              t: "hiring",
              w: { sre: 6, devops: 6, cloud: 5, platform: 8 }
            },
            {
              text: "Served as play caller for production releases across the TEST, IMPL, and PROD lifecycle, coordinating multi-provider data refreshes for Medicare beneficiaries.",
              t: "release",
              w: { sre: 9, devops: 8, cloud: 3, platform: 5 }
            },
            {
              text: "Led the team's migration from GitHub Enterprise Server to GitHub.com, serving as the CMS point of contact and onboarding 13+ engineers with documented access procedures.",
              t: "devex",
              w: { sre: 4, devops: 8, cloud: 3, platform: 10 }
            }
          ]
        },
        {
          position: "Technical Advisor",
          client: "California Department of Technology \u2014 State portfolio",
          startdate: "February 2022",
          enddate: "August 2022",
          budget: { concise: 2, full: Infinity },
          points: [
          {
            text: "Created a prioritized roadmap identifying dependencies and the coordination needed to deliver the artifacts, processes, and services in the Critical Service Program vision.",
            t: "advisory",
            w: { sre: 5, devops: 5, cloud: 4, platform: 7 }
          },
          {
            text: "Assessed state systems as technical advisor, conducting interviews with state programs to establish scope, dependencies, and readiness.",
            t: "assessment",
            w: { sre: 6, devops: 4, cloud: 4, platform: 6 }
          },
          {
            text: "Wrote playbooks and checklists for assessing systems across the state, standardizing how assessments are run.",
            t: "docs",
            w: { sre: 7, devops: 5, cloud: 3, platform: 7 }
          },
          {
            text: "Authored assessment documents and delivered reusable assessment frameworks the department continues to use to evaluate state systems.",
            t: "assessment",
            w: { sre: 6, devops: 4, cloud: 4, platform: 7 }
          }
          ]
        },
        {
          position: "Site Reliability Engineer",
          client: "healthcare.gov (CMS), ITOPS contract \u2014 FedHealth portfolio",
          startdate: "April 2021",
          enddate: "February 2022",
          budget: { concise: 2, full: Infinity },
          points: [
          {
            text: "Built and operated the service status page covering every Application Development Organization on the healthcare.gov program, giving CMS and partner teams one view of service health.",
            t: "observability",
            w: { sre: 10, devops: 6, cloud: 5, platform: 8 }
          },
          {
            text: "Represented the SRE team as technical owner for a new product onboarding, scoping the work and coordinating with the development and automation teams to hit their deliverable dates.",
            t: "onboarding",
            w: { sre: 8, devops: 8, cloud: 4, platform: 8 }
          },
          {
            text: "Identified code-base problem areas that risked incomplete or damaged deployments and gave the development team concrete recommendations to prevent them.",
            t: "cicd",
            w: { sre: 9, devops: 8, cloud: 3, platform: 6 }
          },
          {
            text: "Reviewed the partner team's code changes throughout the onboarding, raising deployment and reliability concerns ahead of release.",
            t: "quality",
            w: { sre: 7, devops: 7, cloud: 3, platform: 7 }
          }
          ]
        }
      ]
    },
    {
      position: "Site Reliability Engineer",
      company: "NCR, Site Reliability Engineering Team",
      location: "Fort Worth, TX",
      startdate: "August 2015",
      enddate: "October 2020",
      // 3 in concise: this role ended in 2020, and the recent engagements earn
      // the space. The SRE variant selects longer bullets than the others and
      // is the one that decides whether concise fits a page.
      budget: { concise: 3, full: Infinity },
      points: [
        {
          text: "Provided 24x7 support, incident management, and subject-matter-expert consultation during system and service interruptions.",
          t: "incident",
          w: { sre: 10, devops: 5, cloud: 3, platform: 4 }
        },
        {
          text: "Instrumented products with Application Insights and delivered the resulting analysis and enhancement recommendations to product teams.",
          t: "observability",
          w: { sre: 9, devops: 4, cloud: 5, platform: 5 }
        },
        {
          text: "Built and delivered operational analysis using the ELK stack (Elasticsearch, Logstash, Kibana).",
          t: "observability",
          w: { sre: 9, devops: 4, cloud: 5, platform: 4 }
        },
        {
          text: "Built, deployed, and maintained the ARM templates used to migrate on-premises infrastructure to Azure.",
          t: "iac",
          w: { sre: 5, devops: 7, cloud: 10, platform: 6 }
        },
        {
          text: "Designed, built, and maintained QA, preproduction, and production environments across every Azure region to meet differing product needs.",
          t: "environments",
          w: { sre: 8, devops: 6, cloud: 9, platform: 7 }
        },
        {
          text: "Authored the Chef cookbooks used to provision servers and deploy software artifacts across the fleet.",
          t: "config",
          w: { sre: 6, devops: 8, cloud: 7, platform: 7 }
        },
        {
          text: "Scheduled, gained approval for, and deployed SaaS product versions into preproduction and production environments.",
          t: "release",
          w: { sre: 7, devops: 8, cloud: 4, platform: 4 }
        },
        {
          text: "Managed petabytes of aggregated data using SQL tasks and stored procedures.",
          t: "data",
          w: { sre: 6, devops: 3, cloud: 6, platform: 5 }
        },
        {
          text: "Built, maintained, and troubleshot NoSQL solutions including Couchbase and Redis cache.",
          t: "data",
          w: { sre: 6, devops: 3, cloud: 7, platform: 5 }
        },
        {
          text: "Wrote product specs, flow charts, training documents, and process runbooks.",
          t: "docs",
          w: { sre: 6, devops: 4, cloud: 3, platform: 6 }
        },
        {
          text: "Began Terraform, Kubernetes, and containerization adoption for the product portfolio.",
          t: "modernization",
          w: { sre: 3, devops: 5, cloud: 6, platform: 6 }
        }
      ]
    },
    {
      position: "Software Quality Engineer",
      company: "NCR, Mobile Applications Team",
      location: "Fort Worth, TX",
      startdate: "February 2011",
      enddate: "August 2015",
      condense: true,
      budget: { concise: 0, full: 0 },
      condensed:
        "Managed quality analysis teams through development phases: designed test environments and scenarios, owned application test plans and cases, coordinated deployment strategies across teams, and drove defect triage and regression testing.",
      points: [
        {
          text: "Managed the quality analysis teams through development phases.",
          w: { sre: 6, devops: 6, cloud: 4, platform: 6 }
        },
        {
          text: "Built and designed testing environments and scenarios.",
          w: { sre: 6, devops: 6, cloud: 5, platform: 5 }
        },
        {
          text: "Created, implemented, and maintained application test plans and test cases.",
          w: { sre: 5, devops: 6, cloud: 3, platform: 5 }
        },
        {
          text: "Coordinated with multiple teams to develop deployment strategies and methods.",
          w: { sre: 6, devops: 7, cloud: 4, platform: 6 }
        },
        {
          text: "Identified, documented, and tracked defects through resolution.",
          w: { sre: 5, devops: 5, cloud: 3, platform: 4 }
        },
        {
          text: "Ran regression testing after defect resolutions.",
          w: { sre: 5, devops: 5, cloud: 3, platform: 4 }
        },
        {
          text: "Wrote requirements and specs based on application development needs.",
          w: { sre: 4, devops: 4, cloud: 3, platform: 5 }
        }
      ]
    }
  ],

  skills: [
    { text: "Site Reliability Engineering", w: { sre: 10, devops: 7, cloud: 6, platform: 7 } },
    { text: "Incident Management and 24x7 On-Call", w: { sre: 10, devops: 5, cloud: 3, platform: 4 } },
    { text: "Observability: New Relic, Splunk, ELK, Grafana", w: { sre: 10, devops: 6, cloud: 6, platform: 6 } },
    { text: "CI/CD Architecture and Release Automation", w: { sre: 7, devops: 10, cloud: 5, platform: 9 } },
    { text: "Jenkins, Groovy, GitHub Actions, SonarQube", w: { sre: 5, devops: 10, cloud: 4, platform: 8 } },
    { text: "Blue-Green Deployments and Akamai Cache Purge", w: { sre: 7, devops: 9, cloud: 4, platform: 6 } },
    { text: "Terraform and AWS Infrastructure as Code", w: { sre: 7, devops: 8, cloud: 10, platform: 8 } },
    { text: "AWS ECS, Lambda, RDS, S3, CloudWatch, EventBridge, SNS, SQS, ACM, KMS", w: { sre: 8, devops: 6, cloud: 10, platform: 7 } },
    { text: "Azure, ARM Templates, and Azure CLI", w: { sre: 5, devops: 6, cloud: 9, platform: 5 } },
    { text: "PostgreSQL Administration and Upgrade Planning", w: { sre: 9, devops: 4, cloud: 8, platform: 5 } },
    { text: "ETL Pipeline Engineering and Performance Optimization", w: { sre: 8, devops: 6, cloud: 8, platform: 8 } },
    { text: "Node.js Runtime Upgrades and Modernization", w: { sre: 4, devops: 7, cloud: 3, platform: 9 } },
    { text: "Cross-Repository Standardization and Migration", w: { sre: 5, devops: 8, cloud: 6, platform: 10 } },
    { text: "Security Hardening, Secret Scanning, IAM, and Compliance Controls", w: { sre: 7, devops: 7, cloud: 9, platform: 8 } },
    { text: "Chef, Habitat, PowerShell DSC, and Configuration Management", w: { sre: 5, devops: 8, cloud: 6, platform: 7 } },
    { text: "Windows, Linux, and Full Software Stack Administration", w: { sre: 8, devops: 6, cloud: 6, platform: 6 } },
    { text: "Chaos Engineering and Resilience Testing (AWS FIS, Resilience Hub)", w: { sre: 10, devops: 5, cloud: 8, platform: 5 } },
    { text: "Incident Response, On-Call Programs, and Game Day Exercises", w: { sre: 10, devops: 5, cloud: 3, platform: 6 } },
    { text: "CMS Compliance Deliverables and Risk Assessments", w: { sre: 6, devops: 5, cloud: 5, platform: 8 } },
    { text: "Release Management and Production Play Calling", w: { sre: 8, devops: 9, cloud: 3, platform: 5 } },
    { text: "Technical Advisory and Systems Assessment", w: { sre: 6, devops: 5, cloud: 5, platform: 8 } },
    { text: "Roadmapping and Dependency Planning", w: { sre: 5, devops: 5, cloud: 4, platform: 8 } },
    { text: "Autoscaling Design and Capacity Right-Sizing", w: { sre: 9, devops: 5, cloud: 10, platform: 7 } },
    { text: "Cloud Cost Optimization", w: { sre: 6, devops: 7, cloud: 10, platform: 8 } },
    { text: "Disaster Recovery Planning and Testing", w: { sre: 10, devops: 4, cloud: 8, platform: 6 } },
    { text: "AWS PrivateLink and Network Isolation", w: { sre: 6, devops: 4, cloud: 9, platform: 6 } },
    { text: "Load and Performance Testing", w: { sre: 9, devops: 6, cloud: 6, platform: 6 } },
    { text: "Technical Leadership, Mentoring, and Delegation", w: { sre: 8, devops: 8, cloud: 6, platform: 9 } },
    { text: "Technical Interviewing and Hiring", w: { sre: 5, devops: 5, cloud: 4, platform: 7 } }
  ],

  courses: [
    "Terraform (AWS and Azure)", "AWS CloudFormation", "AWS ECS", "AWS EKS",
    "AWS CloudWatch", "AWS Synthetic Canaries", "AWS Lambda", "Azure Infrastructure",
    "ARM / Azure CLI", "Chef Automation", "Habitat by Chef", "HashiCorp Vault",
    "Artifactory", "Splunk", "ELK Stack", "Zerto", "VMware", "Software Security",
    "SQL Scripting", "SQL Server Administration", "RESTful API", "Ruby", "Perl",
    "PowerShell", "PowerShell DSC", "Markdown", "Agile Methodology", "A+", "Network+"
  ]
};
