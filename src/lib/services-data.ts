import { editorialImages } from "@/lib/editorial-images";

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceNamedItem = {
  title: string;
  description: string;
};

export type ServicePageData = {
  slug: string;
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  heroCopy: string[];
  proofItems?: string[];
  serviceType: string;
  schemaDescription: string;
  editorialImage?: (typeof editorialImages)[keyof typeof editorialImages];
  overviewEyebrow?: string;
  proposition: string[];
  problemsEyebrow?: string;
  problemsHeading?: string;
  problems: string[];
  deliverablesEyebrow?: string;
  deliverablesHeading?: string;
  deliverables: string[];
  detailEyebrow?: string;
  detailHeading?: string;
  detailItems?: ServiceNamedItem[];
  processEyebrow?: string;
  processHeading?: string;
  processIntro?: string;
  process: { step: string; title: string; description: string }[];
  capabilitiesEyebrow?: string;
  capabilities: string[];
  outcomesEyebrow?: string;
  outcomesHeading?: string;
  outcomes?: string[];
  suitableForHeading?: string;
  suitableFor: string[];
  relatedCaseStudy?: {
    client: string;
    href: string;
    summary: string;
  };
  relatedServices: { label: string; href: string }[];
  faqs: ServiceFaq[];
  ctaTitle: string;
  ctaDescription: string;
  ctaLabel: string;
};

function related(
  items: { label: string; href: `/services/${string}` }[],
): { label: string; href: string }[] {
  return items;
}

export const servicesIndex = {
  path: "/services",
  metaTitle: "IT Support, AI, AWS Cloud & Software Engineering | Comlabs",
  metaDescription:
    "Comlabs provides L1–L4 application support, AI agent development, AWS cloud and DevOps, custom software, web engineering and mobile development.",
  eyebrow: "Services",
  headline: "Technology that stays responsible after launch.",
  heroCopy: [
    "Comlabs builds, operates and supports the systems businesses depend on—from production applications and AI agents to AWS infrastructure and custom software.",
    "We work across engineering, infrastructure and operations so technical problems do not disappear between vendors.",
  ],
  heroCtaLabel: "Talk to our engineering team",
  sectionEyebrow: "Services",
  sectionHeading: "Engineering across the production stack.",
  sectionCopy: [
    "Technology rarely fails inside a single boundary. Applications depend on APIs. APIs depend on infrastructure. AI depends on context, tools and controls.",
    "Comlabs works across those layers.",
  ],
  pillarsHeading: "One technical partner. Fewer gaps.",
  pillars: [
    {
      title: "Build",
      copy: "New applications, platforms, AI systems and digital products.",
    },
    {
      title: "Operate",
      copy: "Cloud, deployments, monitoring and production environments.",
    },
    {
      title: "Support",
      copy: "User issues through engineering-level escalation.",
    },
    {
      title: "Improve",
      copy: "Performance, automation, reliability and continuous engineering.",
    },
  ],
  ctaTitle: "Bring us the system. Or bring us the problem.",
  ctaDescription:
    "New product, inherited application, unreliable infrastructure or an AI workflow that needs to reach production—we will identify the engineering path forward.",
  ctaLabel: "Discuss your requirements",
} as const;

export { canonicalServicePaths } from "@/lib/canonical-services";

export const servicePages: ServicePageData[] = [
  {
    slug: "application-support",
    path: "/services/application-support",
    title: "L1–L4 Application Support",
    metaTitle: "L1–L4 Application Support Services | Comlabs Technologies",
    metaDescription:
      "L1, L2, L3 and L4 application support for production software, APIs, databases and cloud systems. Technical support backed by software engineers.",
    eyebrow: "Application support",
    headline: "Support that escalates all the way to engineering.",
    heroCopy: [
      "Production problems do not care which team owns which layer.",
      "Comlabs provides L1–L4 application support across users, applications, APIs, databases and infrastructure—with a clear escalation path from first report to engineering resolution.",
    ],
    proofItems: ["Issue → Diagnose → Escalate → Resolve"],
    serviceType: "Application support",
    schemaDescription:
      "L1, L2, L3 and L4 application support for production software, APIs, databases and cloud systems, with a defined escalation path from first-line handling to engineering resolution.",
    overviewEyebrow: "Ownership",
    proposition: [
      "One path from reported issue to technical resolution.",
      "We support production software after launch.",
      "Simple issues can be resolved quickly at the service layer. Deeper failures move into technical investigation. Code defects reach engineers. Platform-specific problems reach specialist escalation.",
      "You do not need multiple vendors deciding whose problem it is.",
    ],
    problemsEyebrow: "Failure modes",
    problemsHeading: "Where support breaks down.",
    problems: [
      "Your developers lose roadmap time handling recurring production tickets.",
      "Support can identify a symptom but cannot investigate APIs, logs or infrastructure.",
      "Technical incidents bounce between vendors because ownership is fragmented.",
      "The original development team has moved on and nobody fully owns the application.",
    ],
    deliverablesEyebrow: "Scope",
    deliverablesHeading: "What Comlabs can take responsibility for.",
    deliverables: [
      "Application incidents",
      "Bug resolution",
      "Production troubleshooting",
      "API failures",
      "Database issues",
      "Release support",
      "Application monitoring",
      "Minor engineering changes",
      "Technical documentation",
      "Root-cause analysis",
    ],
    detailEyebrow: "Escalation model",
    detailHeading: "L1–L4",
    detailItems: [
      {
        title: "L1 — Service Support",
        description:
          "Ticket intake, issue classification, known-error resolution, user and access issues, initial diagnostics and escalation.",
      },
      {
        title: "L2 — Technical Support",
        description:
          "Log investigation, API failures, application configuration, database investigation, environment issues and deployment troubleshooting.",
      },
      {
        title: "L3 — Engineering Support",
        description:
          "Code-level debugging, hotfixes, complex defects, performance remediation, integration failures and root-cause analysis.",
      },
      {
        title: "L4 — Specialist Engineering",
        description:
          "Architecture-level issues, platform and vendor escalation, major upgrades, deep infrastructure defects, complex third-party integrations and specialist remediation.",
      },
    ],
    processEyebrow: "Engagement",
    processHeading: "How we take over support.",
    process: [
      {
        step: "01",
        title: "Assess",
        description:
          "We understand the application, environments, dependencies, known issues and current escalation model.",
      },
      {
        step: "02",
        title: "Transition",
        description:
          "Access, repositories, documentation, runbooks and ownership are organised before support begins.",
      },
      {
        step: "03",
        title: "Operate",
        description:
          "Issues enter a structured queue and escalate according to technical depth and impact.",
      },
      {
        step: "04",
        title: "Improve",
        description:
          "Recurring failures become engineering work: automation, fixes, documentation and stronger operational controls.",
      },
    ],
    capabilities: [],
    suitableForHeading: "Built for teams that need ownership after launch.",
    suitableFor: [
      "SaaS products",
      "Internal business applications",
      "Customer portals",
      "ERP and operational software",
      "Applications inherited from another vendor",
      "Engineering teams that need support capacity",
    ],
    relatedServices: related([
      { label: "AWS Cloud & DevOps", href: "/services/cloud-infrastructure-scaling" },
      { label: "Custom Software Engineering", href: "/services/custom-software-development" },
      { label: "Agentic Infrastructure & AI Agents", href: "/services/ai-agent-development" },
    ]),
    faqs: [
      {
        question: "Can Comlabs take over an application built by another company?",
        answer:
          "Yes. We can begin with an application takeover assessment covering the codebase, architecture, environments, dependencies and operational risks before establishing ongoing support.",
      },
      {
        question: "Is L4 the same for every application?",
        answer:
          "No. L4 depends on the system. It may involve deeper architecture engineering, a platform specialist or escalation to a third-party product vendor.",
      },
      {
        question: "Can support include code changes?",
        answer:
          "Yes. L3/L4 engagements can include engineering remediation, hotfixes and agreed application changes.",
      },
      {
        question: "Do you provide 24/7 support?",
        answer:
          "Coverage is defined around the application and engagement requirements. We do not present a coverage commitment until the operating model and escalation requirements are agreed.",
      },
    ],
    ctaTitle: "Stop routing production problems between vendors.",
    ctaDescription: "Put one engineering path behind the application.",
    ctaLabel: "Discuss Application Support",
  },
  {
    slug: "ai-agent-development",
    path: "/services/ai-agent-development",
    title: "Agentic Infrastructure & AI Agents",
    metaTitle: "AI Agent Development & Agentic AI Engineering | Comlabs",
    metaDescription:
      "Build production AI agents with RAG, tool calling, agent workflows, model orchestration, evaluations, guardrails and human approval systems.",
    eyebrow: "AI engineering",
    headline: "AI agents built to work inside real systems.",
    heroCopy: [
      "A useful agent needs more than a model.",
      "It needs context, tools, permissions, evaluations, observability and clear boundaries around what it can do.",
      "Comlabs engineers the infrastructure that turns AI from an interface into an operational system.",
    ],
    serviceType: "AI agent development",
    schemaDescription:
      "Production AI agent development including RAG, tool orchestration, agent workflows, model routing, evaluations, guardrails, observability and human approval systems.",
    editorialImage: editorialImages.appliedAi,
    overviewEyebrow: "System design",
    proposition: [
      "From model response to controlled execution.",
      "We connect AI to the applications, APIs, knowledge and workflows where real work happens.",
      "The model is one component.",
      "The system around it determines whether the agent is reliable enough to use.",
    ],
    problemsEyebrow: "Failure modes",
    problemsHeading: "Where AI projects fail.",
    problems: [
      "The prototype works with perfect prompts but falls apart on real company data.",
      "The model can answer questions but cannot safely interact with business systems.",
      "Agents execute workflows without enough visibility, evaluation or human control.",
      "Context is fragmented across documents, databases, CRMs and APIs.",
    ],
    deliverablesEyebrow: "Build",
    deliverablesHeading: "Systems we can build.",
    deliverables: [
      "Internal knowledge agents",
      "Customer support automation",
      "Operations agents",
      "Research workflows",
      "Document processing",
      "Engineering copilots",
      "Sales operations automation",
      "Approval workflows",
      "AI search",
      "Internal copilots",
    ],
    detailEyebrow: "Platform",
    detailHeading: "Agentic infrastructure",
    detailItems: [
      {
        title: "AI Agents",
        description: "Purpose-built agents for defined operational jobs.",
      },
      {
        title: "Tool Orchestration",
        description: "Controlled access to APIs, databases, CRMs, email and internal systems.",
      },
      {
        title: "RAG & Context Systems",
        description: "Retrieval pipelines that give models relevant company context at execution time.",
      },
      {
        title: "Workflow Architecture",
        description:
          "Multi-step workflows combining model reasoning with deterministic application logic.",
      },
      {
        title: "Human Approval",
        description: "High-impact actions stop at explicit review points when required.",
      },
      {
        title: "Evaluations & Observability",
        description: "Trace what agents retrieved, decided, called and returned.",
      },
      {
        title: "Model Routing",
        description:
          "Use the right model for the job rather than coupling the entire system to one provider.",
      },
      {
        title: "Guardrails & Permissions",
        description: "Define what an agent can access, call, change and expose.",
      },
    ],
    processEyebrow: "Delivery",
    processHeading: "How we build production AI.",
    process: [
      {
        step: "01",
        title: "Define the job",
        description:
          "We identify where AI creates leverage and where deterministic software should remain in control.",
      },
      {
        step: "02",
        title: "Build context and tools",
        description:
          "Data, APIs, permissions and integrations become a controlled execution layer.",
      },
      {
        step: "03",
        title: "Evaluate",
        description:
          "We test retrieval, outputs, tool use and failure modes against representative workflows.",
      },
      {
        step: "04",
        title: "Deploy & improve",
        description:
          "The system enters production with tracing, monitoring and an explicit path for iteration.",
      },
    ],
    capabilities: [],
    suitableFor: [],
    relatedServices: related([
      { label: "Custom Software Engineering", href: "/services/custom-software-development" },
      { label: "AWS Cloud & DevOps", href: "/services/cloud-infrastructure-scaling" },
      { label: "L1–L4 Application Support", href: "/services/application-support" },
    ]),
    faqs: [
      {
        question: "Do you build chatbots?",
        answer:
          "We can, but chat is only an interface. Most valuable engagements involve agents, search or workflow automation connected to existing systems.",
      },
      {
        question: "Can an AI agent access our internal tools?",
        answer:
          "Yes, through explicitly designed integrations and permissions. Access should be scoped to the task rather than exposing entire systems unnecessarily.",
      },
      {
        question: "Do you use one AI model provider?",
        answer:
          "No. Architecture should allow the model layer to evolve as requirements, cost and model capability change.",
      },
      {
        question: "Can humans approve actions before execution?",
        answer:
          "Yes. Human-in-the-loop approval is a core design pattern for actions where reversibility, financial impact or business risk matters.",
      },
    ],
    ctaTitle: "If the agent cannot use your systems, it cannot transform the workflow.",
    ctaDescription: "Build the infrastructure around the model.",
    ctaLabel: "Discuss an AI system",
  },
  {
    slug: "cloud-infrastructure-scaling",
    path: "/services/cloud-infrastructure-scaling",
    title: "AWS Cloud & DevOps",
    metaTitle: "AWS Cloud & DevOps Services | Comlabs Technologies",
    metaDescription:
      "AWS cloud and DevOps engineering for production systems: CI/CD, Terraform, Docker, ECS, RDS, monitoring, backups, reliability and cost optimisation.",
    eyebrow: "AWS Cloud & DevOps",
    headline: "AWS infrastructure built for production.",
    heroCopy: [
      "Reliable software needs predictable infrastructure.",
      "Comlabs designs and improves AWS environments, deployment systems and operational tooling so engineering teams can ship with visibility, repeatability and control.",
    ],
    serviceType: "AWS cloud and DevOps",
    schemaDescription:
      "AWS cloud and DevOps engineering including architecture, CI/CD, Terraform, Docker, ECS, RDS, observability, backup and recovery, reliability and cost optimisation.",
    editorialImage: editorialImages.cloudInfrastructure,
    overviewEyebrow: "Operations",
    proposition: [
      "Make production less fragile.",
      "Infrastructure should not require heroics every time something ships.",
      "We work across AWS architecture, deployments, environments, databases, observability, recovery and cost to create systems teams can understand and operate.",
    ],
    problemsEyebrow: "Failure modes",
    problemsHeading: "Problems we solve",
    problems: [
      "Deployments depend on manual steps and tribal knowledge.",
      "Nobody knows something is failing until users report it.",
      "AWS environments have grown without clear ownership or architecture.",
      "Cloud spend rises faster than traffic.",
      "Backups exist, but recovery has never been tested.",
    ],
    deliverables: [],
    processEyebrow: "Engagement",
    processHeading: "How we work",
    process: [
      {
        step: "01",
        title: "Assess",
        description:
          "Architecture, deployments, reliability risks and operational bottlenecks are mapped.",
      },
      {
        step: "02",
        title: "Architect",
        description: "We define the target environment and the changes required to get there.",
      },
      {
        step: "03",
        title: "Automate",
        description:
          "Infrastructure, deployment and environment configuration move toward repeatable workflows.",
      },
      {
        step: "04",
        title: "Operate & Improve",
        description:
          "Monitoring, cost, reliability and release patterns improve as the system evolves.",
      },
    ],
    capabilitiesEyebrow: "Capabilities",
    capabilities: [
      "AWS architecture",
      "EC2 / ECS / Lambda",
      "RDS",
      "S3",
      "CloudFront",
      "Route 53",
      "IAM",
      "VPC & networking",
      "Load balancing",
      "Docker",
      "Terraform",
      "GitHub Actions / CI/CD",
      "Environment management",
      "Secrets",
      "Logging",
      "Monitoring",
      "Alerting",
      "Backup & recovery",
      "Performance optimisation",
      "Cost optimisation",
    ],
    outcomesEyebrow: "Result",
    outcomesHeading: "What changes after the engagement.",
    outcomes: [
      "Deployments become repeatable.",
      "Production becomes observable.",
      "Infrastructure changes become reviewable.",
      "Recovery becomes planned.",
      "Costs become easier to explain.",
    ],
    suitableFor: [],
    relatedServices: related([
      { label: "L1–L4 Application Support", href: "/services/application-support" },
      { label: "Custom Software Engineering", href: "/services/custom-software-development" },
      { label: "Agentic Infrastructure & AI Agents", href: "/services/ai-agent-development" },
    ]),
    faqs: [
      {
        question: "Do you only work with AWS?",
        answer:
          "AWS is our primary cloud focus for this service. Adjacent infrastructure may still involve Vercel, Cloudflare and other systems when they are part of the production stack.",
      },
      {
        question: "Can you improve our current AWS setup without rebuilding it?",
        answer:
          "Yes. Most environments should be improved incrementally rather than replaced for the sake of architecture purity.",
      },
      {
        question: "Do you implement CI/CD?",
        answer:
          "Yes. Deployment pipelines, environment controls, testing gates and rollback strategy can form part of the engagement.",
      },
      {
        question: "Can you help reduce AWS spend?",
        answer:
          "Yes. Cost optimisation can include resource utilisation, architecture choices, storage, transfer, databases and longer-term AWS purchasing decisions where appropriate.",
      },
    ],
    ctaTitle: "Production should be boring for the right reasons.",
    ctaDescription: "Build infrastructure your team can trust.",
    ctaLabel: "Discuss AWS & DevOps",
  },
  {
    slug: "custom-software-development",
    path: "/services/custom-software-development",
    title: "Custom Software Engineering",
    metaTitle: "Custom Software Development Company | Comlabs Technologies",
    metaDescription:
      "Custom software development for SaaS, internal platforms, ERP workflows, web applications and business systems built around real operations.",
    eyebrow: "Custom software engineering",
    headline: "Software that fits the business. Not the other way around.",
    heroCopy: [
      "When off-the-shelf software starts defining how your team has to work, build the system around the operation instead.",
      "Comlabs engineers SaaS products, internal platforms, workflow systems and integrations around the processes that actually make the business run.",
    ],
    serviceType: "Custom software development",
    schemaDescription:
      "Custom software development for SaaS products, internal platforms, ERP workflows, web applications, APIs and business systems built around real operations.",
    editorialImage: editorialImages.customSoftware,
    overviewEyebrow: "Build",
    proposition: [
      "Software shaped around how the operation actually runs.",
      "We engineer the product, architecture and integrations together so the system fits the work rather than forcing the work to fit the software.",
    ],
    problemsEyebrow: "Signals",
    problemsHeading: "Where custom software earns its place.",
    problems: [
      "Critical operations still depend on spreadsheets and manual handoffs.",
      "Your existing platform forces teams into workflows that do not match the business.",
      "Disconnected systems require repeated data entry and reconciliation.",
      "A growing internal tool has become too important to remain a collection of patches.",
    ],
    deliverablesEyebrow: "Scope",
    deliverablesHeading: "What we build",
    deliverables: [
      "Web applications",
      "SaaS platforms",
      "Internal tools",
      "Customer portals",
      "Operations software",
      "ERP modules",
      "Admin systems",
      "API platforms",
      "Workflow automation",
      "System integrations",
    ],
    detailEyebrow: "System",
    detailHeading: "Engineering across the system",
    detailItems: [
      {
        title: "Product Interfaces",
        description: "Operator screens, dashboards, settings and customer workflows.",
      },
      {
        title: "Application Architecture",
        description: "Business logic, permissions, services and data models.",
      },
      {
        title: "Integrations",
        description: "CRM, finance, payments, communication and third-party platforms.",
      },
      {
        title: "Infrastructure",
        description: "Deployment and production architecture when the application requires it.",
      },
      {
        title: "Operations",
        description: "Documentation, monitoring and ongoing engineering where required.",
      },
    ],
    processEyebrow: "Process",
    processHeading: "Map → Architect → Build → Operate",
    processIntro:
      "We understand how work happens before deciding what software should exist. Then we build in focused releases rather than betting everything on one massive launch.",
    process: [
      {
        step: "01",
        title: "Map",
        description:
          "We document how work happens today before deciding what software should exist.",
      },
      {
        step: "02",
        title: "Architect",
        description:
          "Data models, permissions, services and interfaces are shaped around the operation.",
      },
      {
        step: "03",
        title: "Build",
        description:
          "We ship in focused releases rather than betting everything on one massive launch.",
      },
      {
        step: "04",
        title: "Operate",
        description:
          "Documentation, monitoring and ongoing engineering where the system requires it.",
      },
    ],
    capabilities: [],
    suitableFor: [],
    relatedCaseStudy: {
      client: "Formial Labs",
      href: "/work/formial-labs",
      summary:
        "A structured product onboarding flow and dashboard UI built to move users from signup to first value with less friction.",
    },
    relatedServices: related([
      { label: "L1–L4 Application Support", href: "/services/application-support" },
      { label: "Agentic Infrastructure & AI Agents", href: "/services/ai-agent-development" },
      { label: "Mobile Engineering", href: "/services/mobile-app-development" },
    ]),
    faqs: [],
    ctaTitle: "Stop forcing the operation into software that does not fit.",
    ctaDescription: "Build the system around the work.",
    ctaLabel: "Discuss Custom Software",
  },
  {
    slug: "website-design-development",
    path: "/services/website-design-development",
    title: "Web & Digital Experience",
    metaTitle: "Website Design & Frontend Development Company | Comlabs",
    metaDescription:
      "High-performance website design and frontend engineering for technology, enterprise and growing companies. UX, Next.js, performance, SEO and AEO.",
    eyebrow: "Web & digital experience",
    headline: "Digital experiences built to carry the weight of the business.",
    heroCopy: [
      "Your website is often the first system a customer uses to judge the company.",
      "We combine positioning, interface design and frontend engineering to create digital experiences that are fast, clear and difficult to dismiss.",
    ],
    serviceType: "Website design and frontend development",
    schemaDescription:
      "Website design and frontend engineering including corporate and technology websites, product interfaces, Next.js implementation, performance, CMS architecture, technical SEO and AEO.",
    editorialImage: editorialImages.websiteDesign,
    overviewEyebrow: "Practice",
    proposition: [
      "Positioning, interface design and frontend engineering as one system.",
      "We build digital experiences that hold up in production, not just in a design file.",
    ],
    problemsEyebrow: "Standard",
    problemsHeading: "The standard is higher than “looks modern.”",
    problems: [
      "The company has grown but the website still communicates an earlier version of the business.",
      "The interface looks polished in a design file but performs poorly in production.",
      "Important information is buried behind generic copy and weak information architecture.",
      "SEO, performance and content architecture are treated as launch-week tasks.",
    ],
    deliverablesEyebrow: "Scope",
    deliverablesHeading: "What we do",
    deliverables: [
      "Corporate websites",
      "Technology websites",
      "Marketing platforms",
      "Product interfaces",
      "Landing experiences",
      "Design systems",
      "Frontend engineering",
      "CMS architecture",
      "Performance optimisation",
      "Technical SEO",
      "AEO",
    ],
    processEyebrow: "Process",
    processHeading: "How we work",
    process: [
      {
        step: "01",
        title: "Position",
        description: "Define what visitors must understand and believe.",
      },
      {
        step: "02",
        title: "Structure",
        description: "Build the information hierarchy and conversion paths.",
      },
      {
        step: "03",
        title: "Design & Engineer",
        description: "Interface and implementation evolve as one system.",
      },
      {
        step: "04",
        title: "Launch & Improve",
        description:
          "Validate production behaviour, performance, analytics and search fundamentals.",
      },
    ],
    capabilitiesEyebrow: "Together",
    capabilities: [
      "Positioning",
      "Information architecture",
      "Interaction design",
      "Product-grade UI",
      "Next.js / React engineering",
      "Responsive implementation",
      "Core Web Vitals",
      "CMS",
      "Analytics",
      "Technical SEO & AEO",
    ],
    suitableFor: [],
    relatedCaseStudy: {
      client: "Global Services",
      href: "/work/global-services",
      summary:
        "A full website rebuild that improved conversion and helped position Global Services for enterprise telecom clients.",
    },
    relatedServices: related([
      { label: "Custom Software Engineering", href: "/services/custom-software-development" },
      { label: "SEO, AEO & Search Engineering", href: "/services/seo-aeo-copywriting" },
      { label: "Mobile Engineering", href: "/services/mobile-app-development" },
    ]),
    faqs: [],
    ctaTitle: "A serious company should look serious before the first meeting.",
    ctaDescription: "Build the digital experience around the business, not a template.",
    ctaLabel: "Build the digital experience",
  },
  {
    slug: "mobile-app-development",
    path: "/services/mobile-app-development",
    title: "Mobile Engineering",
    metaTitle: "Mobile App Development & Engineering | Comlabs Technologies",
    metaDescription:
      "Mobile app engineering for iOS, Android and cross-platform products with backend APIs, authentication, payments and production infrastructure.",
    eyebrow: "Mobile engineering",
    headline: "Mobile products built beyond the screen.",
    heroCopy: [
      "A production mobile application is not a collection of polished screens.",
      "It is authentication, APIs, state, notifications, payments, infrastructure and product decisions working together in the hands of a real user.",
      "Comlabs engineers the full system.",
    ],
    serviceType: "Mobile app engineering",
    schemaDescription:
      "Mobile app engineering for iOS, Android and cross-platform products, including backend APIs, authentication, payments, notifications and production infrastructure.",
    editorialImage: editorialImages.mobileApp,
    overviewEyebrow: "Product",
    proposition: [
      "The application and the systems behind it are the same engagement.",
      "We build mobile products with the APIs, authentication, payments and operational systems required to run them in production.",
    ],
    problemsEyebrow: "Failure modes",
    problemsHeading: "Problems we solve",
    problems: [
      "Your product works on desktop but critical workflows break down on mobile.",
      "The interface is polished but the APIs underneath it cannot support real product behaviour.",
      "An existing mobile application has accumulated performance and maintainability problems.",
      "Your team can build backend systems but lacks dedicated mobile product capacity.",
    ],
    deliverablesEyebrow: "Scope",
    deliverablesHeading: "What we build",
    deliverables: [
      "Customer applications",
      "Operational applications",
      "Cross-platform products",
      "Companion applications",
      "Internal mobile tools",
      "Mobile-first workflows",
    ],
    processEyebrow: "Process",
    processHeading: "Define → Engineer → Integrate → Release",
    processIntro:
      "We scope the jobs the mobile product must perform, build the interface and application architecture around them, connect the backend systems, then validate the production release.",
    process: [
      {
        step: "01",
        title: "Define",
        description: "We scope the jobs the mobile product must perform before screens are designed.",
      },
      {
        step: "02",
        title: "Engineer",
        description:
          "Interface and application architecture are built around those jobs, not a gallery of screens.",
      },
      {
        step: "03",
        title: "Integrate",
        description:
          "Backend APIs, authentication, payments and notifications are connected as part of the product.",
      },
      {
        step: "04",
        title: "Release",
        description: "We validate the production release, store submission and first operational checks.",
      },
    ],
    capabilitiesEyebrow: "Engineering",
    capabilities: [
      "Product UX",
      "React Native / cross-platform engineering where appropriate",
      "Backend APIs",
      "Authentication",
      "Payments",
      "Push notifications",
      "Deep links",
      "Data synchronisation",
      "Analytics",
      "Application release",
      "Production monitoring",
    ],
    suitableFor: [],
    relatedServices: related([
      { label: "Custom Software Engineering", href: "/services/custom-software-development" },
      { label: "AWS Cloud & DevOps", href: "/services/cloud-infrastructure-scaling" },
      { label: "L1–L4 Application Support", href: "/services/application-support" },
    ]),
    faqs: [],
    ctaTitle: "Build the application people actually carry with them.",
    ctaDescription: "Engineer the product and the systems behind it.",
    ctaLabel: "Discuss Mobile Engineering",
  },
  {
    slug: "seo-aeo-copywriting",
    path: "/services/seo-aeo-copywriting",
    title: "SEO, AEO & Search Engineering",
    metaTitle: "SEO & AEO Services for Search and AI Visibility | Comlabs",
    metaDescription:
      "Technical SEO, AEO and search architecture for stronger Google visibility, AI search discovery, structured content and high-performance websites.",
    eyebrow: "SEO, AEO & search engineering",
    headline: "Be discoverable wherever people ask questions.",
    heroCopy: [
      "Technical SEO, content architecture and AI-search optimisation built into the systems that publish your content—not added after launch.",
    ],
    serviceType: "SEO and AEO",
    schemaDescription:
      "Technical SEO, AEO and search architecture including metadata, schema, internal linking, Core Web Vitals, content structure and AI search discovery.",
    editorialImage: editorialImages.seoAeo,
    overviewEyebrow: "Search",
    proposition: [
      "Search is an engineering problem as much as a content problem.",
      "We work on the technical surface that Google and AI systems actually read: metadata, schema, internal links, page structure, performance and the content model behind them.",
      "This is a supporting capability of Web & Digital Experience, used when a site needs to be found, cited and understood, not only launched.",
    ],
    problemsEyebrow: "Failure modes",
    problemsHeading: "Where visibility is lost.",
    problems: [
      "Pages are slow, poorly marked up or weakly interlinked, so crawl and ranking stall regardless of the offer.",
      "Metadata, headings and schema do not describe the page the way people and AI systems query it.",
      "Content is unstructured, so answer engines cannot lift a clear, citable explanation.",
      "A redesign ships without URL, redirect and index planning, and search equity is spent by accident.",
    ],
    deliverablesEyebrow: "Work",
    deliverablesHeading: "What the engagement covers.",
    deliverables: [
      "Technical SEO audit and a sequenced fix list",
      "Metadata, heading and internal-link architecture",
      "Schema and structured data where it clarifies the page",
      "Content structure for search and AI retrieval",
      "Core Web Vitals and indexation checks",
      "Redirect and canonical planning for launches or migrations",
    ],
    processEyebrow: "Process",
    processHeading: "How we work",
    process: [
      {
        step: "01",
        title: "Audit",
        description:
          "Technical SEO, page structure, metadata, schema, internal links and content gaps are reviewed against how people and AI systems search.",
      },
      {
        step: "02",
        title: "Map",
        description:
          "Priority pages, queries and AEO targets are defined, including how answer engines read and cite the site.",
      },
      {
        step: "03",
        title: "Implement",
        description:
          "On-page structure, schema, internal links and technical fixes ship in a sequence that preserves existing indexation.",
      },
      {
        step: "04",
        title: "Measure",
        description:
          "Indexing, visibility and conversion signals are verified so the next round of work has a baseline.",
      },
    ],
    capabilitiesEyebrow: "Capabilities",
    capabilities: [
      "Technical SEO",
      "Metadata",
      "Schema",
      "Internal linking",
      "Core Web Vitals",
      "Content structure",
      "AI search / AEO",
      "Search indexing",
    ],
    suitableFor: [],
    relatedServices: related([
      { label: "Web & Digital Experience", href: "/services/website-design-development" },
      { label: "Custom Software Engineering", href: "/services/custom-software-development" },
    ]),
    faqs: [
      {
        question: "What is AEO and why does it matter?",
        answer:
          "Answer-engine optimisation focuses on how AI-powered search tools read, summarise and cite your content. Clear structure, accurate metadata and authoritative pages help those systems use your material instead of a competitor's.",
      },
      {
        question: "Will SEO work hurt existing rankings during a redesign?",
        answer:
          "Not when planned correctly. We map URLs, redirects, canonicals and metadata before launch so search equity is preserved while pages improve.",
      },
    ],
    ctaTitle: "Search should be designed into the site, not bolted on after launch.",
    ctaDescription: "Build the technical surface that Google and AI systems can actually use.",
    ctaLabel: "Discuss SEO & AEO",
  },
];

export function getServiceBySlug(slug: string): ServicePageData | undefined {
  return servicePages.find((service) => service.slug === slug);
}
