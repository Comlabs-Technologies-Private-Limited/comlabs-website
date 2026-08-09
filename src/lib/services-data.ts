import { editorialImages } from "@/lib/editorial-images";

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServicePageData = {
  slug: string;
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  serviceType: string;
  schemaDescription: string;
  editorialImage?: (typeof editorialImages)[keyof typeof editorialImages];
  proposition: string[];
  problems: string[];
  deliverables: string[];
  process: { step: string; title: string; description: string }[];
  capabilities: string[];
  suitableFor: string[];
  relatedCaseStudy?: {
    client: string;
    href: string;
    summary: string;
  };
  relatedServices: { label: string; href: string }[];
  faqs: ServiceFaq[];
};

const sharedProcess = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We review goals, constraints, existing systems, and the workflows that matter — then define scope that can ship.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Structure, UI, and technical approach are shaped together so what gets built matches how the business runs.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Production code in focused releases — with clear milestones, review points, and quality checks throughout.",
  },
  {
    step: "04",
    title: "Launch",
    description:
      "We deploy, verify critical paths, hand over documentation, and support the transition to your team or ours.",
  },
] as const;

export const servicesIndex = {
  path: "/services",
  metaTitle: "Website, Software & Mobile Development Services",
  metaDescription:
    "Website design, custom software, mobile apps, SEO/AEO, and cloud infrastructure from Comlabs Technologies Pvt Ltd — a Pune-based design and engineering studio.",
  eyebrow: "Services",
  headline: "Design and engineering for products that need to ship.",
  subheadline:
    "Comlabs Technologies Pvt Ltd builds high-performance websites, custom software, mobile products, and scalable digital infrastructure for teams in Pune, India, and worldwide.",
} as const;

export const canonicalServicePaths = [
  "/services/website-design-development",
  "/services/custom-software-development",
  "/services/mobile-app-development",
  "/services/seo-aeo-copywriting",
  "/services/cloud-infrastructure-scaling",
] as const;

export const servicePages: ServicePageData[] = [
  {
    slug: "website-design-development",
    path: "/services/website-design-development",
    title: "Website Design & Development",
    metaTitle: "Website Design & Development Company in Pune",
    metaDescription:
      "Comlabs designs and develops fast, conversion-focused websites — new builds, redesigns, landing pages, and CMS-backed marketing sites from wireframe to production.",
    eyebrow: "Website design & development",
    headline: "Websites designed to earn trust and convert.",
    subheadline:
      "We plan, design, and build marketing and company sites with clear messaging, responsive UI, and performance that holds up under real traffic.",
    serviceType: "Website design and development",
    schemaDescription:
      "Website design and development including new sites, redesigns, landing pages, front-end builds, and CMS-backed marketing websites.",
    editorialImage: editorialImages.websiteDesign,
    proposition: [
      "Comlabs combines UX structure, visual design, and front-end development so your site ships as one coherent product — not a handoff between teams.",
      "Engagements cover new websites, full redesigns, campaign landing pages, and CMS-backed marketing sites — built around how your team publishes and sells.",
    ],
    problems: [
      "Visitors leave because the site looks outdated or unclear about what you offer.",
      "Pages load slowly or break on mobile, undermining trust before a sales conversation starts.",
      "Marketing wants updates but the current stack makes every change slow or risky.",
      "A redesign is overdue but you cannot afford to lose search visibility or brand equity.",
    ],
    deliverables: [
      "Information architecture and page wireframes aligned to your offer",
      "High-fidelity UI design for key templates and components",
      "Responsive front-end build with analytics and form integrations",
      "CMS setup or integration for pages your team can maintain",
      "Launch support, documentation, and a path for post-launch iteration",
    ],
    process: [...sharedProcess],
    capabilities: [
      "New company and marketing websites",
      "Website redesigns and conversion-focused rebuilds",
      "Landing pages for launches, waitlists, and campaigns",
      "Next.js and React front-end development",
      "CMS-backed page templates and content models",
      "Core Web Vitals–aware implementation",
    ],
    suitableFor: [
      "Companies launching or repositioning online",
      "Teams replacing a template site with something credible",
      "Marketing leaders who need measurable uplift, not just new visuals",
      "Founders who need one partner for design through deployment",
    ],
    relatedCaseStudy: {
      client: "Global Services",
      href: "/work/global-services",
      summary:
        "A full website rebuild that improved conversion and helped position Global Services for enterprise telecom clients.",
    },
    relatedServices: [
      { label: "SEO / AEO & copywriting", href: "/services/seo-aeo-copywriting" },
      { label: "Custom software development", href: "/services/custom-software-development" },
      { label: "Cloud infrastructure & scaling", href: "/services/cloud-infrastructure-scaling" },
    ],
    faqs: [
      {
        question: "Do you handle both design and development?",
        answer:
          "Yes. Most website projects include UX structure, visual design, and front-end implementation in one engagement so nothing gets lost between handoffs.",
      },
      {
        question: "Can you redesign an existing site without starting from scratch?",
        answer:
          "Yes. We audit messaging, page flow, and technical debt first — then rebuild what is holding the business back while planning redirects and metadata carefully.",
      },
      {
        question: "What stack do you typically use?",
        answer:
          "We usually build with Next.js, React, and TypeScript, paired with a CMS or content approach that fits how your team publishes updates.",
      },
    ],
  },
  {
    slug: "custom-software-development",
    path: "/services/custom-software-development",
    title: "Custom Software Development",
    metaTitle: "Custom Software Development Services in Pune",
    metaDescription:
      "Custom web applications, SaaS products, dashboards, ERP modules, and internal tools — designed and built around how your business actually operates.",
    eyebrow: "Custom software development",
    headline: "Software shaped around how your business runs.",
    subheadline:
      "We build web applications, SaaS products, dashboards, ERP modules, and internal tools when off-the-shelf products do not fit the workflow.",
    serviceType: "Custom software development",
    schemaDescription:
      "Custom software development including web applications, SaaS, dashboards, ERP systems, CMS platforms, internal tools, APIs, and product UI.",
    editorialImage: editorialImages.customSoftware,
    proposition: [
      "We scope software around concrete operational problems — not a generic platform pitch.",
      "Engagements combine data modeling, role-based admin UI, product front-ends, integrations, and phased rollout so teams adopt new workflows without a big-bang cutover.",
    ],
    problems: [
      "Spreadsheets and disconnected tools create errors and slow reporting.",
      "Off-the-shelf products handle your edge cases poorly or require expensive customization.",
      "Product UI has grown cluttered as features accumulate without a coherent system.",
      "Marketing and operations depend on developers for changes that should be self-serve.",
    ],
    deliverables: [
      "Process mapping and module scope for phase one",
      "Data models, permissions, and API contracts",
      "Admin, dashboard, and customer-facing UI",
      "Integrations with CRM, accounting, or third-party tools where required",
      "Deployment plan with documentation and handover",
    ],
    process: [...sharedProcess],
    capabilities: [
      "Web applications and SaaS products",
      "Dashboards, settings, and operator interfaces",
      "ERP modules and internal operations tools",
      "Custom CMS platforms and structured content systems",
      "Product UI and front-end for customer-facing flows",
      "APIs, integrations, and workflow automation",
    ],
    suitableFor: [
      "Operations teams outgrowing spreadsheets",
      "SaaS teams improving activation, retention, or internal tooling",
      "Businesses with specialized workflows in manufacturing, distribution, or services",
      "Leaders who need phased delivery rather than a massive platform rollout",
    ],
    relatedCaseStudy: {
      client: "Formial Labs",
      href: "/work/formial-labs",
      summary:
        "A structured product onboarding flow and dashboard UI built to move users from signup to first value with less friction.",
    },
    relatedServices: [
      { label: "Website design & development", href: "/services/website-design-development" },
      { label: "Mobile app development", href: "/services/mobile-app-development" },
      { label: "Cloud infrastructure & scaling", href: "/services/cloud-infrastructure-scaling" },
    ],
    faqs: [
      {
        question: "Do you replace entire ERP suites like SAP or Oracle?",
        answer:
          "Usually no. We build targeted modules or internal tools that integrate with existing systems, or replace only the parts that block daily operations.",
      },
      {
        question: "Can software work start with a single module?",
        answer:
          "Yes. Phased delivery is the default — prove value on one workflow, then expand.",
      },
      {
        question: "Do you work from existing product designs?",
        answer:
          "Yes. We can implement your Figma files, or design and build when product UX is part of the scope.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    path: "/services/mobile-app-development",
    title: "Mobile App Development",
    metaTitle: "Mobile App Development Services",
    metaDescription:
      "iOS and Android product development with clear UX, production-ready engineering, and the backend infrastructure to support them.",
    eyebrow: "Mobile app development",
    headline: "Mobile products built for daily use.",
    subheadline:
      "We design and build iOS and Android applications with polished UX, reliable engineering, and the APIs and infrastructure they depend on.",
    serviceType: "Mobile app development",
    schemaDescription:
      "Mobile app development including iOS and Android products, cross-platform apps, mobile UI, application APIs, and integrations.",
    editorialImage: editorialImages.mobileApp,
    proposition: [
      "Mobile work spans product UX, native or cross-platform engineering, and the backend services that power accounts, data, and notifications.",
      "We treat mobile as part of the product system — not an isolated screen design exercise.",
    ],
    problems: [
      "A web product needs a credible mobile experience but the team lacks mobile delivery capacity.",
      "An existing app feels slow, dated, or hard to extend as features accumulate.",
      "Onboarding and core flows were never designed for small screens and real usage patterns.",
      "Backend APIs and integrations were bolted on after the UI, causing reliability issues.",
    ],
    deliverables: [
      "Mobile UX flows for core jobs-to-be-done",
      "UI design for iOS and Android (or cross-platform) patterns",
      "Production app builds with store-ready assets",
      "Application APIs and integration points where required",
      "Launch support and a plan for post-release iteration",
    ],
    process: [...sharedProcess],
    capabilities: [
      "iOS and Android product development",
      "Cross-platform apps where it fits the product",
      "Mobile product UI and interaction design",
      "Application APIs and backend services",
      "Push notifications, auth, and third-party integrations",
      "App store submission support",
    ],
    suitableFor: [
      "Product teams extending a web platform to mobile",
      "Founders shipping an MVP app without hiring a full mobile team",
      "Businesses replacing a legacy app with something maintainable",
    ],
    relatedServices: [
      { label: "Custom software development", href: "/services/custom-software-development" },
      { label: "Cloud infrastructure & scaling", href: "/services/cloud-infrastructure-scaling" },
      { label: "Website design & development", href: "/services/website-design-development" },
    ],
    faqs: [
      {
        question: "Do you build native or cross-platform apps?",
        answer:
          "We choose based on product requirements, timeline, and team constraints — native when platform-specific quality matters most, cross-platform when speed and shared logic are the priority.",
      },
      {
        question: "Can you connect a mobile app to our existing backend?",
        answer:
          "Yes. We often extend existing APIs or build the services needed to support mobile accounts, data sync, and integrations.",
      },
    ],
  },
  {
    slug: "seo-aeo-copywriting",
    path: "/services/seo-aeo-copywriting",
    title: "SEO / AEO Optimisation & Copywriting",
    metaTitle: "SEO, AEO & Copywriting Services",
    metaDescription:
      "Technical SEO, search positioning, AI search optimisation, structured content, schema, and conversion copywriting for websites that need to be found and understood.",
    eyebrow: "SEO / AEO & copywriting",
    headline: "Found in search. Clear on the page.",
    subheadline:
      "We improve how your site ranks, reads, and converts — across Google and AI-powered search — with technical SEO, structured content, and copy that earns attention.",
    serviceType: "SEO, AEO optimisation and copywriting",
    schemaDescription:
      "SEO and AEO optimisation, technical search improvements, structured content, schema markup, and conversion copywriting for websites and product pages.",
    editorialImage: editorialImages.seoAeo,
    proposition: [
      "Search work combines technical fixes, page structure, and copy that matches what people actually search for — including how AI systems summarise and cite content.",
      "We align metadata, schema, internal linking, and on-page copy so visibility and conversion improve together.",
    ],
    problems: [
      "Good traffic arrives but visitors leave because the message is vague or the page structure is confusing.",
      "Technical issues — slow pages, poor metadata, broken indexing — limit reach regardless of content quality.",
      "AI search and answer engines surface competitors because your content lacks structure and clarity.",
      "Marketing copy was written for the brand, not for the queries that drive qualified visits.",
    ],
    deliverables: [
      "Technical SEO audit and priority fix list",
      "Page-level metadata, headings, and internal link updates",
      "Schema and structured data where it adds clarity for search",
      "Conversion-focused copy for key pages and landing templates",
      "Content guidelines your team can follow after handover",
    ],
    process: [...sharedProcess],
    capabilities: [
      "Technical SEO and on-page optimisation",
      "Search positioning and keyword-informed page structure",
      "AI search / answer-engine optimisation (AEO)",
      "Structured content and schema markup",
      "Website and landing page copywriting",
      "Redirect and metadata planning for site migrations",
    ],
    suitableFor: [
      "Companies launching or relaunching a site that needs to rank from day one",
      "Marketing teams with traffic but weak conversion on key pages",
      "Businesses repositioning and needing copy that matches the new offer",
    ],
    relatedCaseStudy: {
      client: "Vithub",
      href: "/work/vithub",
      summary:
        "A design-led marketing website built to give Vithub a strong digital identity and clearer positioning online.",
    },
    relatedServices: [
      { label: "Website design & development", href: "/services/website-design-development" },
      { label: "Custom software development", href: "/services/custom-software-development" },
      { label: "Cloud infrastructure & scaling", href: "/services/cloud-infrastructure-scaling" },
    ],
    faqs: [
      {
        question: "What is AEO and why does it matter?",
        answer:
          "Answer-engine optimisation focuses on how AI-powered search tools read, summarise, and cite your content. Clear structure, accurate metadata, and authoritative copy help your pages appear in those results.",
      },
      {
        question: "Will SEO work hurt our existing rankings during a redesign?",
        answer:
          "Not when planned correctly. We map URLs, redirects, and metadata before launch so search equity is preserved while pages improve.",
      },
    ],
  },
  {
    slug: "cloud-infrastructure-scaling",
    path: "/services/cloud-infrastructure-scaling",
    title: "Cloud Infrastructure & Scaling",
    metaTitle: "Cloud Infrastructure & Scaling Services",
    metaDescription:
      "Cloud architecture, deployments, databases, caching, performance engineering, and observability — built to keep products fast and reliable as usage grows.",
    eyebrow: "Cloud infrastructure & scaling",
    headline: "Infrastructure that keeps pace with usage.",
    subheadline:
      "We design and operate cloud architecture, deployments, and performance engineering so your product stays fast, observable, and reliable in production.",
    serviceType: "Cloud infrastructure and scaling",
    schemaDescription:
      "Cloud infrastructure and scaling including architecture, application deployments, databases, CDN and caching, performance, observability, and reliability engineering.",
    editorialImage: editorialImages.cloudInfrastructure,
    proposition: [
      "Infrastructure work is tied to product outcomes — uptime, response times, deployment confidence, and cost that scales sensibly.",
      "We help teams move from fragile manual deploys to environments they can trust as traffic and complexity grow.",
    ],
    problems: [
      "Production deploys are manual, risky, or slow — blocking releases and fixes.",
      "Performance degrades under load because caching, databases, or architecture were not planned for growth.",
      "Incidents are hard to diagnose without logging, monitoring, or clear environment separation.",
      "Cloud costs climb without a clear map of what is running or why.",
    ],
    deliverables: [
      "Infrastructure review and target architecture outline",
      "Deployment pipelines and environment configuration",
      "Database, CDN, and caching strategy for your stack",
      "Observability setup — logging, monitoring, and alerts",
      "Runbooks and handover for your team",
    ],
    process: [...sharedProcess],
    capabilities: [
      "Cloud architecture and environment design",
      "Application deployments and CI/CD pipelines",
      "Database setup, migrations, and scaling patterns",
      "CDN, caching, and performance optimisation",
      "Observability, logging, and incident response readiness",
      "Infrastructure cost and reliability reviews",
    ],
    suitableFor: [
      "Product teams preparing for launch or a traffic spike",
      "Companies outgrowing a single-server or manual deploy setup",
      "Engineering leads who need production confidence without hiring a full platform team",
    ],
    relatedServices: [
      { label: "Custom software development", href: "/services/custom-software-development" },
      { label: "Mobile app development", href: "/services/mobile-app-development" },
      { label: "Website design & development", href: "/services/website-design-development" },
    ],
    faqs: [
      {
        question: "Which cloud providers do you work with?",
        answer:
          "Most engagements use AWS, Google Cloud, or Vercel-style edge hosting depending on the product stack. We recommend based on your requirements, not a fixed vendor preference.",
      },
      {
        question: "Can you improve an existing deployment without a full rebuild?",
        answer:
          "Yes. Many projects start with observability, caching, and deployment fixes that deliver immediate reliability gains before larger architectural changes.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServicePageData | undefined {
  return servicePages.find((service) => service.slug === slug);
}
