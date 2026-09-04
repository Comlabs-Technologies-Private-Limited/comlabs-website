export type HomeServiceId =
  | "application-support"
  | "agentic-infrastructure"
  | "cloud-infrastructure"
  | "custom-software"
  | "website-design"
  | "mobile-app";

export type HomeService = {
  id: HomeServiceId;
  title: string;
  description: string;
  /** ~15-word card blurb used on mobile viewports. */
  mobileDescription: string;
  capabilities: readonly string[];
  linkLabel: string;
  href: string;
  background: string;
  /** Full-width bento tile on the homepage services grid. */
  featured?: boolean;
};

/**
 * Homepage capability cards in 1-2-1-2 bento order:
 * AI Agents (full) → AWS + Web → Custom Software (full) → Mobile + Application Support.
 */
export const HOME_SERVICES: readonly HomeService[] = [
  {
    id: "agentic-infrastructure",
    title: "Agentic Infrastructure & AI Agents",
    description:
      "AI systems built to operate, not just respond. We engineer agents, tool integrations and context infrastructure that connect AI to real workflows, data and business systems.",
    mobileDescription:
      "Agents, tools and context systems that connect AI to real business workflows.",
    capabilities: [
      "AI Agents",
      "Agentic Workflows",
      "RAG & Context Systems",
      "Tool Orchestration",
      "Evaluations & Guardrails",
    ],
    linkLabel: "Explore AI engineering",
    href: "/services/ai-agent-development",
    background: "/services-bg/service-bg-4.png",
    featured: true,
  },
  {
    id: "cloud-infrastructure",
    title: "AWS Cloud & DevOps",
    description:
      "Infrastructure built for production. We design and operate AWS environments, deployment pipelines and reliability systems that keep applications available, observable and ready to scale.",
    mobileDescription:
      "AWS environments, pipelines and reliability systems that keep production ready to scale.",
    capabilities: [
      "AWS Infrastructure",
      "CI/CD",
      "Docker & Terraform",
      "Monitoring & Observability",
      "Backups & Recovery",
      "Performance & Cost Optimisation",
    ],
    linkLabel: "Explore cloud & DevOps",
    href: "/services/cloud-infrastructure-scaling",
    background: "/services-bg/service-bg-5.png",
  },
  {
    id: "website-design",
    title: "Web & Digital Experience",
    description:
      "High-performance digital experiences with engineering behind them. From corporate websites to product interfaces, we build fast, clear and technically robust digital experiences designed to perform in production.",
    mobileDescription:
      "Fast, clear websites and product interfaces engineered to perform in production.",
    capabilities: [
      "Websites",
      "Product UI",
      "Frontend Engineering",
      "Performance",
      "Technical SEO & AEO",
    ],
    linkLabel: "Explore digital experiences",
    href: "/services/website-design-development",
    background: "/services-bg/service-bg-1.png",
  },
  {
    id: "custom-software",
    title: "Custom Software Engineering",
    description:
      "Software built around the way your business actually works. We engineer web applications, SaaS products, internal platforms and integrations for businesses that need more than off-the-shelf software.",
    mobileDescription:
      "Web apps, SaaS and internal platforms engineered around how your business works.",
    capabilities: [
      "Web Applications",
      "SaaS Platforms",
      "Internal Systems",
      "APIs & Integrations",
      "ERP & Workflow Tools",
    ],
    linkLabel: "Explore software engineering",
    href: "/services/custom-software-development",
    background: "/services-bg/service-bg-2.png",
    featured: true,
  },
  {
    id: "mobile-app",
    title: "Mobile Engineering",
    description:
      "Production-ready mobile products without disconnected backend thinking. We build mobile applications alongside the APIs, infrastructure and operational systems required to support them reliably.",
    mobileDescription:
      "Mobile apps built with the APIs and infrastructure needed to run reliably.",
    capabilities: [
      "Cross-platform Apps",
      "Backend Integrations",
      "Authentication",
      "Payments",
      "Production Deployment",
    ],
    linkLabel: "Explore mobile engineering",
    href: "/services/mobile-app-development",
    background: "/services-bg/service-bg-3.png",
  },
  {
    id: "application-support",
    title: "L1–L4 Application Support",
    description:
      "Support that escalates all the way to engineering. We manage application issues from first-line support to complex production defects, code-level fixes and specialist escalation.",
    mobileDescription:
      "From first-line triage to engineering fixes and specialist production escalation.",
    capabilities: [
      "L1 Service Support",
      "L2 Technical Support",
      "L3 Engineering Support",
      "L4 Specialist Engineering",
    ],
    linkLabel: "Explore application support",
    href: "/services/application-support",
    background: "/services-bg/service-bg-2.png",
  },
] as const;
