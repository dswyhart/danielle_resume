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
        "Senior Site Reliability Engineer with over a decade keeping enterprise cloud platforms available, observable, and recoverable. I lead zero-downtime database upgrades, database-driven health monitoring, and observability rollouts across New Relic, Splunk, ELK, and CloudWatch, backed by production incident management and 24x7 on-call experience."
    },
    {
      id: "devops",
      label: "DevOps / CI-CD Engineer",
      blurb: "Pipelines, release automation, and delivery safety",
      title: "Senior DevOps Engineer",
      summary:
        "Senior engineer specializing in CI/CD architecture and release automation. I build shared Jenkins and Groovy pipeline libraries, semantic-version release automation, blue-green deployments, and automated quality gates that make releases safe and repeatable across large multi-repository programs."
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
        "Platform engineer focused on shared services and developer experience across large multi-repository programs. I standardize delivery workflows, runtime versions, and security guardrails, and lead cross-repository migrations that cut technical debt while keeping product teams shipping."
    }
  ],

  experiences: [
    {
      position: "Site Reliability Engineer",
      company: "Nava Public Benefit Company",
      location: "Remote",
      startdate: "April 2021",
      enddate: "Present",
      points: [
        {
          text: "Led cross-repository migration of the CMS CCXP program from legacy MOSS to Greenfield v4 infrastructure, spanning frontend, backend, ETL, data, and shared platform services.",
          w: { sre: 8, devops: 8, cloud: 9, platform: 10 }
        },
        {
          text: "Architected a shared Jenkins and Groovy CI library spanning 8+ repositories, standardizing delivery workflows, reusable deployment functions, and pipeline onboarding.",
          w: { sre: 6, devops: 10, cloud: 4, platform: 9 }
        },
        {
          text: "Implemented semantic-version release automation, pre-build PR merge validation, blue-green deployments, and Akamai cache-purge automation, improving release safety and reducing deployment downtime.",
          w: { sre: 8, devops: 10, cloud: 4, platform: 6 }
        },
        {
          text: "Standardized Node.js runtime upgrades from 18 through 24 across frontend, backend, and pipeline ecosystems, reducing technical debt and improving build stability.",
          w: { sre: 4, devops: 7, cloud: 3, platform: 9 }
        },
        {
          text: "Built CCXP Greenfield AWS foundations in Terraform across DEV, TEST, IMPL, and PROD, with reusable modules for KMS, CloudWatch, ACM, SQS, SNS, Lambda, ECS, RDS, S3, and EventBridge.",
          w: { sre: 7, devops: 7, cloud: 10, platform: 8 }
        },
        {
          text: "Led zero-downtime PostgreSQL upgrades from Amazon RDS 11 to 14.16, adding read-only endpoint support and production right-sizing to improve resiliency and performance.",
          w: { sre: 10, devops: 5, cloud: 9, platform: 5 }
        },
        {
          text: "Designed a parallelized Speedy ETL architecture and automated the Greenfield migration of 15+ ETL pipelines across DEV, TEST, IMPL, and PROD.",
          w: { sre: 7, devops: 6, cloud: 8, platform: 8 }
        },
        {
          text: "Replaced log-based Lambda health checks with database-driven status monitoring, timeout restart handling, and fatal-log detection, improving ETL reliability.",
          w: { sre: 10, devops: 4, cloud: 6, platform: 5 }
        },
        {
          text: "Established production-ready CI/CD for the React client, Single-SPA root-config, and import-map workflows, with SonarQube quality gates and New Relic browser and server observability.",
          w: { sre: 8, devops: 9, cloud: 4, platform: 9 }
        },
        {
          text: "Strengthened platform security with TruffleHog secret scanning, cross-account Assume Role adoption, IAM hardening, KMS rotation, and deployment guardrails across 8+ repositories.",
          w: { sre: 6, devops: 7, cloud: 9, platform: 8 }
        }
      ]
    },
    {
      position: "Site Reliability Engineer",
      company: "NCR, Site Reliability Engineering Team",
      location: "Fort Worth, TX",
      startdate: "August 2015",
      enddate: "October 2020",
      points: [
        {
          text: "Provided 24x7 support, incident management, and subject-matter-expert consultation during system and service interruptions.",
          w: { sre: 10, devops: 5, cloud: 3, platform: 4 }
        },
        {
          text: "Instrumented products with Application Insights and delivered the resulting analysis and enhancement recommendations to product teams.",
          w: { sre: 9, devops: 4, cloud: 5, platform: 5 }
        },
        {
          text: "Built and delivered operational analysis using the ELK stack (Elasticsearch, Logstash, Kibana).",
          w: { sre: 9, devops: 4, cloud: 5, platform: 4 }
        },
        {
          text: "Built, deployed, and maintained the ARM templates used to migrate on-premises infrastructure to Azure.",
          w: { sre: 5, devops: 7, cloud: 10, platform: 6 }
        },
        {
          text: "Designed, built, and maintained QA, preproduction, and production environments across every Azure region to meet differing product needs.",
          w: { sre: 8, devops: 6, cloud: 9, platform: 7 }
        },
        {
          text: "Authored the Chef cookbooks used to provision servers and deploy software artifacts across the fleet.",
          w: { sre: 6, devops: 8, cloud: 7, platform: 7 }
        },
        {
          text: "Scheduled, gained approval for, and deployed SaaS product versions into preproduction and production environments.",
          w: { sre: 7, devops: 8, cloud: 4, platform: 4 }
        },
        {
          text: "Managed petabytes of aggregated data using SQL tasks and stored procedures.",
          w: { sre: 6, devops: 3, cloud: 6, platform: 5 }
        },
        {
          text: "Built, maintained, and troubleshot NoSQL solutions including Couchbase and Redis cache.",
          w: { sre: 6, devops: 3, cloud: 7, platform: 5 }
        },
        {
          text: "Wrote product specs, flow charts, training documents, and process runbooks.",
          w: { sre: 6, devops: 4, cloud: 3, platform: 6 }
        },
        {
          text: "Began Terraform, Kubernetes, and containerization adoption for the product portfolio.",
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
    { text: "Observability: New Relic, Splunk, ELK, CloudWatch", w: { sre: 10, devops: 6, cloud: 6, platform: 6 } },
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
    { text: "Windows, Linux, and Full Software Stack Administration", w: { sre: 8, devops: 6, cloud: 6, platform: 6 } }
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
