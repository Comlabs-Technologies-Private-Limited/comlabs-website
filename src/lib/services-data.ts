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

export const servicesIndex = {
  path: "/services",
  metaTitle: "Website & Software Development Services",
  metaDescription:
    "Website design, redesign, CMS, ERP, and product UI development from Comlabs Technologies Pvt Ltd — a Pune-based studio for companies that need reliable delivery.",
  eyebrow: "Services",
  headline: "Website and software development, end to end.",
  subheadline:
    "Comlabs Technologies Pvt Ltd builds high-performance websites, CMS platforms, product interfaces, and custom web applications for teams in Pune, India, and worldwide.",
} as const;

export const servicePages: ServicePageData[] = [
  {
    slug: "website-design-development",
    path: "/services/website-design-development",
    title: "Website Design & Development",
    metaTitle: "Website Design & Development Company in Pune",
    metaDescription:
      "Comlabs designs and develops fast, conversion-focused websites for growing companies — from structure and UI to production-ready Next.js builds.",
    eyebrow: "Website design & development",
    headline: "Websites designed to earn trust and convert.",
    subheadline:
      "We plan, design, and build marketing and product sites with clear messaging, responsive UI, and performance that holds up under real traffic.",
    serviceType: "Website design and development",
    schemaDescription:
      "Website design and development for companies that need credible positioning, fast pages, and maintainable front-end implementation.",
    proposition: [
      "Comlabs combines UX structure, visual design, and front-end development so your site ships as one coherent product — not a handoff between teams.",
      "Based in Pune, we work with local and remote clients on marketing sites, product landing pages, and multi-page company websites.",
    ],
    problems: [
      "Visitors leave because the site looks outdated or unclear about what you offer.",
      "Pages load slowly or break on mobile, undermining trust before a sales conversation starts.",
      "Marketing wants updates but the current stack makes every change slow or risky.",
    ],
    deliverables: [
      "Information architecture and page wireframes aligned to your offer",
      "High-fidelity UI design for key templates and components",
      "Responsive front-end build with analytics and form integrations",
      "Launch support, documentation, and a path for post-launch iteration",
    ],
    process: [
      {
        step: "01",
        title: "Discovery",
        description:
          "We review goals, audience, existing content, and constraints — then define the pages and flows that matter most.",
      },
      {
        step: "02",
        title: "Design",
        description:
          "Wireframes become polished UI with typography, spacing, and component patterns that match your brand direction.",
      },
      {
        step: "03",
        title: "Build",
        description:
          "Production code in a modern stack — typically Next.js and React — with performance, accessibility, and SEO basics built in.",
      },
      {
        step: "04",
        title: "Launch",
        description:
          "We deploy, verify critical paths, and hand over a site your team can keep improving without starting from scratch.",
      },
    ],
    capabilities: [
      "Next.js and React front-end development",
      "Responsive marketing and product pages",
      "Component systems and design tokens",
      "Forms, CRM, and analytics integrations",
      "Core Web Vitals–aware implementation",
    ],
    suitableFor: [
      "Companies launching or repositioning online",
      "Teams replacing a template site with something credible",
      "Founders who need one partner for design through deployment",
    ],
    relatedCaseStudy: {
      client: "With Hub",
      href: "/work/with-hub",
      summary:
        "A design-led marketing website built to give With Hub a strong digital identity and room to grow.",
    },
    relatedServices: [
      { label: "Website redesign", href: "/services/website-redesign" },
      { label: "CMS development", href: "/services/cms-development" },
      { label: "Product UI development", href: "/services/product-ui-development" },
    ],
    faqs: [
      {
        question: "Do you handle both design and development?",
        answer:
          "Yes. Most website projects include UX structure, visual design, and front-end implementation in one engagement so nothing gets lost between handoffs.",
      },
      {
        question: "What stack do you typically use?",
        answer:
          "We usually build with Next.js, React, and TypeScript, paired with a CMS or content approach that fits how your team publishes updates.",
      },
      {
        question: "Can you work with our existing brand?",
        answer:
          "Yes. We can refine and extend existing brand direction rather than forcing a full rebrand when that is not needed.",
      },
    ],
  },
  {
    slug: "website-redesign",
    path: "/services/website-redesign",
    title: "Website Redesign",
    metaTitle: "Website Redesign Services for Growing Companies",
    metaDescription:
      "Upgrade an underperforming website with clearer messaging, modern UI, and faster pages — without losing the brand equity you have already built.",
    eyebrow: "Website redesign",
    headline: "Redesigns that fix positioning, speed, and conversion.",
    subheadline:
      "When your site no longer reflects the business you run today, we rebuild structure, design, and front-end quality so it supports sales instead of slowing it down.",
    serviceType: "Website redesign",
    schemaDescription:
      "Website redesign services for companies whose current site hurts credibility, conversion, or maintainability.",
    proposition: [
      "A redesign is not a visual refresh alone. We audit messaging, page flow, and technical debt, then rebuild what is holding the business back.",
      "Comlabs has delivered full rebuilds for clients who needed enterprise-grade credibility — see our Global Services case study.",
    ],
    problems: [
      "The site looks smaller than the deals you are trying to win.",
      "Conversion paths are buried or confusing, so good traffic does not become pipeline.",
      "The codebase or CMS makes simple updates expensive.",
    ],
    deliverables: [
      "Audit of current pages, messaging, and technical constraints",
      "Updated information architecture and conversion-focused layouts",
      "New UI system applied across priority templates",
      "Migrated or rebuilt front-end with improved performance",
    ],
    process: [
      {
        step: "01",
        title: "Audit",
        description:
          "We map what is working, what is not, and which pages drive revenue or trust.",
      },
      {
        step: "02",
        title: "Restructure",
        description:
          "Messaging and navigation are simplified so visitors understand the offer quickly.",
      },
      {
        step: "03",
        title: "Redesign & rebuild",
        description:
          "New design and code replace the weakest templates first, then roll out site-wide.",
      },
      {
        step: "04",
        title: "Measure",
        description:
          "Analytics and key conversion events are verified so improvements can be tracked after launch.",
      },
    ],
    capabilities: [
      "Conversion-focused page structure",
      "Enterprise-ready visual design",
      "Performance improvements on launch",
      "Content migration support",
      "SEO-safe URL and metadata updates",
    ],
    suitableFor: [
      "B2B teams outgrowing an old brochure site",
      "Service businesses targeting larger accounts",
      "Marketing leaders who need measurable uplift, not just new visuals",
    ],
    relatedCaseStudy: {
      client: "Global Services",
      href: "/work/global-services",
      summary:
        "A full website rebuild that improved conversion and helped position Global Services for enterprise telecom clients.",
    },
    relatedServices: [
      { label: "Website design & development", href: "/services/website-design-development" },
      { label: "CMS development", href: "/services/cms-development" },
      { label: "Product UI development", href: "/services/product-ui-development" },
    ],
    faqs: [
      {
        question: "Will a redesign hurt our existing SEO?",
        answer:
          "We plan URL, redirect, and metadata changes carefully so search equity is preserved while pages improve.",
      },
      {
        question: "Can you keep parts of the current brand?",
        answer:
          "Yes. Redesigns often keep core brand elements while improving layout, typography, and clarity.",
      },
      {
        question: "How long does a typical redesign take?",
        answer:
          "Most multi-page redesigns run a few weeks to a couple of months depending on scope, content readiness, and integrations.",
      },
    ],
  },
  {
    slug: "cms-development",
    path: "/services/cms-development",
    title: "Custom CMS Development",
    metaTitle: "Custom CMS Development Services",
    metaDescription:
      "Custom CMS development so marketing and operations teams can publish and manage content without fighting the codebase — built around your workflows.",
    eyebrow: "CMS development",
    headline: "Content systems your team can actually run.",
    subheadline:
      "We design and build CMS setups — headless or integrated — that match how your team creates pages, updates copy, and ships campaigns.",
    serviceType: "Custom CMS development",
    schemaDescription:
      "Custom CMS development for teams that need structured content, editorial workflows, and maintainable publishing tools.",
    proposition: [
      "The right CMS reduces dependency on developers for everyday updates while keeping the front-end fast and flexible.",
      "Comlabs implements content models, admin UX, and front-end rendering so publishing stays predictable after launch.",
    ],
    problems: [
      "Marketing waits on developers for simple copy or landing page changes.",
      "Off-the-shelf CMS templates fight your page structure and brand.",
      "Content is duplicated across tools with no single source of truth.",
    ],
    deliverables: [
      "Content model design for pages, modules, and reusable blocks",
      "CMS configuration or custom admin where needed",
      "Front-end integration with preview and publishing workflow",
      "Editor documentation and handover",
    ],
    process: [
      {
        step: "01",
        title: "Model content",
        description:
          "We define fields, relationships, and reusable blocks based on real page types you publish.",
      },
      {
        step: "02",
        title: "Configure CMS",
        description:
          "Admin views, roles, and validation are set up so editors see only what they need.",
      },
      {
        step: "03",
        title: "Connect front-end",
        description:
          "Pages render from the CMS with type-safe data fetching and preview support.",
      },
      {
        step: "04",
        title: "Train & launch",
        description:
          "We walk your team through publishing workflows before go-live.",
      },
    ],
    capabilities: [
      "Headless CMS integration",
      "Structured content and reusable blocks",
      "Preview and staging workflows",
      "Role-based editing access",
      "Next.js rendering and caching patterns",
    ],
    suitableFor: [
      "Marketing teams publishing frequently",
      "Companies with multiple page templates or locales",
      "Products that mix marketing pages with logged-in experiences",
    ],
    relatedServices: [
      { label: "Website design & development", href: "/services/website-design-development" },
      { label: "Website redesign", href: "/services/website-redesign" },
      { label: "Product UI development", href: "/services/product-ui-development" },
    ],
    faqs: [
      {
        question: "Do you only build custom CMS platforms from scratch?",
        answer:
          "No. We often integrate proven headless CMS tools and tailor the content model, admin experience, and front-end — custom builds only when requirements demand it.",
      },
      {
        question: "Can non-technical editors manage pages safely?",
        answer:
          "Yes. We constrain layouts with reusable blocks and validation so updates stay on-brand and hard to break.",
      },
    ],
  },
  {
    slug: "erp-development",
    path: "/services/erp-development",
    title: "Custom ERP Development",
    metaTitle: "Custom ERP Development Services",
    metaDescription:
      "Custom ERP development for operations teams — modules, integrations, and workflows built around how your business actually runs, not generic templates.",
    eyebrow: "ERP development",
    headline: "ERP modules and workflows built for your operations.",
    subheadline:
      "When off-the-shelf ERP products do not fit, Comlabs builds focused internal systems — inventory, orders, approvals, reporting — integrated with the tools you already use.",
    serviceType: "Custom ERP development",
    schemaDescription:
      "Custom ERP development including business modules, workflow automation, integrations, and admin interfaces for operations teams.",
    proposition: [
      "We scope ERP work around concrete operational problems — not a generic platform pitch.",
      "Engagements typically combine data modeling, role-based admin UI, integrations, and phased rollout.",
    ],
    problems: [
      "Spreadsheets and disconnected tools create errors and slow reporting.",
      "Legacy ERP modules are expensive to change and do not match current processes.",
      "Teams need approvals, inventory, or order flows that standard products handle poorly.",
    ],
    deliverables: [
      "Process mapping and module scope for phase one",
      "Data models for core entities and permissions",
      "Admin and operations UI for day-to-day tasks",
      "Integrations with accounting, CRM, or warehouse tools where required",
      "Deployment plan with training for internal users",
    ],
    process: [
      {
        step: "01",
        title: "Scope modules",
        description:
          "We identify the highest-friction workflows to automate first instead of boiling the ocean.",
      },
      {
        step: "02",
        title: "Design operations UI",
        description:
          "Screens are built for the people doing the work — clear tables, filters, and actions.",
      },
      {
        step: "03",
        title: "Build & integrate",
        description:
          "Backend services, permissions, and integrations are implemented in focused releases.",
      },
      {
        step: "04",
        title: "Roll out in phases",
        description:
          "Modules go live incrementally so teams adopt new workflows without a big-bang cutover.",
      },
    ],
    capabilities: [
      "Role-based admin interfaces",
      "Inventory, orders, and approval workflows",
      "API integrations with third-party systems",
      "Reporting views and export flows",
      "TypeScript/Node services with structured data stores",
    ],
    suitableFor: [
      "Operations teams outgrowing spreadsheets",
      "Businesses with specialized workflows in manufacturing, distribution, or services",
      "Leaders who need a phased internal system rather than a massive ERP rollout",
    ],
    relatedServices: [
      { label: "CMS development", href: "/services/cms-development" },
      { label: "Product UI development", href: "/services/product-ui-development" },
      { label: "Website design & development", href: "/services/website-design-development" },
    ],
    faqs: [
      {
        question: "Do you replace entire ERP suites like SAP or Oracle?",
        answer:
          "Usually no. We build targeted modules or internal tools that integrate with existing systems, or replace only the parts that block daily operations.",
      },
      {
        question: "Can ERP work start with a single module?",
        answer:
          "Yes. Phased delivery is the default — prove value on one workflow, then expand.",
      },
    ],
  },
  {
    slug: "product-ui-development",
    path: "/services/product-ui-development",
    title: "Product UI & Frontend Development",
    metaTitle: "Product UI & Frontend Development Studio",
    metaDescription:
      "Product UI and front-end development for dashboards, onboarding, and customer-facing flows — designed and built to feel polished from the first session.",
    eyebrow: "Product UI & front-end",
    headline: "Product interfaces that feel clear on day one.",
    subheadline:
      "We design and build dashboards, onboarding, and customer-facing product UI with the same attention to detail we bring to marketing sites.",
    serviceType: "Product UI and frontend development",
    schemaDescription:
      "Product UI and frontend development for SaaS dashboards, onboarding flows, and customer-facing web applications.",
    proposition: [
      "Product UI work spans UX flow, visual design, and front-end implementation — especially where first-run experience affects retention.",
      "See our Formula Lab case study for a multi-page onboarding flow built to reduce drop-off.",
    ],
    problems: [
      "New users stall during setup and never reach activation.",
      "Dashboards grow cluttered as features accumulate.",
      "Design and engineering speak different languages, so UI quality slips at implementation.",
    ],
    deliverables: [
      "User flows for key jobs-to-be-done",
      "UI design for web dashboards and responsive views",
      "Component libraries aligned to product patterns",
      "Front-end implementation with accessible, testable components",
    ],
    process: [
      {
        step: "01",
        title: "Map flows",
        description:
          "We document the paths users take to complete critical tasks and where they drop off.",
      },
      {
        step: "02",
        title: "Design UI",
        description:
          "Screens and components are designed for clarity, density, and consistent interaction patterns.",
      },
      {
        step: "03",
        title: "Implement",
        description:
          "Front-end code matches the design system and connects to your APIs or prototypes.",
      },
      {
        step: "04",
        title: "Iterate",
        description:
          "We refine with your team based on usage feedback and release constraints.",
      },
    ],
    capabilities: [
      "Dashboard and settings UI",
      "Multi-step onboarding",
      "Design systems and component libraries",
      "React / Next.js product front-ends",
      "Motion for state changes where it aids comprehension",
    ],
    suitableFor: [
      "SaaS teams improving activation or retention",
      "Internal tools that need a credible operator experience",
      "Founders shipping an MVP UI without hiring a full product team",
    ],
    relatedCaseStudy: {
      client: "Formula Lab",
      href: "/work/formula-lab",
      summary:
        "A structured onboarding flow that moves users from signup to first value with less friction.",
    },
    relatedServices: [
      { label: "Website design & development", href: "/services/website-design-development" },
      { label: "CMS development", href: "/services/cms-development" },
      { label: "Website redesign", href: "/services/website-redesign" },
    ],
    faqs: [
      {
        question: "Do you work from existing product designs?",
        answer:
          "Yes. We can implement your Figma files, or design and build when product UX is part of the scope.",
      },
      {
        question: "Can you help only with front-end implementation?",
        answer:
          "Yes, when designs and API contracts are stable. Combined design + build is common when speed and cohesion matter.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServicePageData | undefined {
  return servicePages.find((service) => service.slug === slug);
}
