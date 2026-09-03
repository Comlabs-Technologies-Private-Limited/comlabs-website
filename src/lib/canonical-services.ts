/**
 * Single source of truth for Comlabs service taxonomy.
 * Consumed by service pages, sitemap, navigation, and marketing components.
 */

export type CanonicalServiceSlug =
  | "application-support"
  | "ai-agent-development"
  | "cloud-infrastructure-scaling"
  | "custom-software-development"
  | "website-design-development"
  | "mobile-app-development"
  | "seo-aeo-copywriting";

export type CanonicalService = {
  slug: CanonicalServiceSlug;
  path: `/services/${CanonicalServiceSlug}`;
  title: string;
  /** Short label for nav and footer. */
  navLabel: string;
  /** One word from `title` highlighted in service index cards. */
  cardTitleHighlight: string;
  cardDescription: string;
  cardBody: string;
  /** One-line qualifier shown before capabilities on /services. */
  bestWhen: string;
  capabilities: readonly string[];
  linkLabel: string;
  eyebrow: string;
  /** Shown as a primary card on /services/. SEO/AEO is secondary. */
  primary: boolean;
};

export const canonicalServices: readonly CanonicalService[] = [
  {
    slug: "application-support",
    path: "/services/application-support",
    title: "L1–L4 Application Support",
    navLabel: "Application Support",
    cardTitleHighlight: "Support",
    cardDescription:
      "Support that reaches engineering when the problem demands it.",
    cardBody:
      "Structured application support from first-line issue handling through technical diagnosis, code-level remediation and specialist escalation.",
    bestWhen:
      "Production tickets keep returning to the product team, or first-line support cannot reach the code.",
    capabilities: [
      "L1 Service Support",
      "L2 Technical Support",
      "L3 Engineering Support",
      "L4 Specialist Engineering",
    ],
    linkLabel: "Explore Application Support",
    eyebrow: "Application support",
    primary: true,
  },
  {
    slug: "ai-agent-development",
    path: "/services/ai-agent-development",
    title: "Agentic Infrastructure & AI Agents",
    navLabel: "AI Engineering",
    cardTitleHighlight: "Agents",
    cardDescription: "AI built to operate inside real systems.",
    cardBody:
      "We engineer AI agents with the context, tools, integrations, evaluations and controls required to perform useful work across business workflows.",
    bestWhen: "The model can answer, but it cannot safely use your business systems.",
    capabilities: [
      "AI Agents",
      "Agentic Workflows",
      "RAG & Context",
      "Tool Orchestration",
      "Evaluations & Guardrails",
    ],
    linkLabel: "Explore AI Engineering",
    eyebrow: "AI engineering",
    primary: true,
  },
  {
    slug: "cloud-infrastructure-scaling",
    path: "/services/cloud-infrastructure-scaling",
    title: "AWS Cloud & DevOps",
    navLabel: "Cloud & DevOps",
    cardTitleHighlight: "DevOps",
    cardDescription: "Infrastructure built for production.",
    cardBody:
      "AWS architecture, deployment systems, observability and operational engineering designed to make releases safer and infrastructure easier to understand.",
    bestWhen: "Releases still depend on heroics, and production is invisible until users complain.",
    capabilities: [
      "AWS",
      "CI/CD",
      "Docker",
      "Terraform",
      "Observability",
      "Backup & Recovery",
    ],
    linkLabel: "Explore Cloud & DevOps",
    eyebrow: "AWS Cloud & DevOps",
    primary: true,
  },
  {
    slug: "custom-software-development",
    path: "/services/custom-software-development",
    title: "Custom Software Engineering",
    navLabel: "Software Engineering",
    cardTitleHighlight: "Software",
    cardDescription: "Build the system your operation actually needs.",
    cardBody:
      "Custom web applications, SaaS platforms, internal systems, ERP workflows and integrations engineered around real business processes.",
    bestWhen: "The operation has outgrown the software you bought, and work still lives in handoffs.",
    capabilities: [
      "Web Applications",
      "SaaS",
      "Internal Platforms",
      "ERP Workflows",
      "APIs & Integrations",
    ],
    linkLabel: "Explore Software Engineering",
    eyebrow: "Custom software engineering",
    primary: true,
  },
  {
    slug: "website-design-development",
    path: "/services/website-design-development",
    title: "Web & Digital Experience",
    navLabel: "Web & Digital Experience",
    cardTitleHighlight: "Experience",
    cardDescription:
      "Your digital presence should carry the same weight as your business.",
    cardBody:
      "High-performance websites and product interfaces combining positioning, design, frontend engineering, performance and search fundamentals.",
    bestWhen: "The company has grown, but the site still describes an earlier version of the business.",
    capabilities: [
      "Website Engineering",
      "Product UI",
      "Frontend",
      "Performance",
      "SEO & AEO",
    ],
    linkLabel: "Explore Digital Experience",
    eyebrow: "Web & digital experience",
    primary: true,
  },
  {
    slug: "mobile-app-development",
    path: "/services/mobile-app-development",
    title: "Mobile Engineering",
    navLabel: "Mobile Engineering",
    cardTitleHighlight: "Engineering",
    cardDescription: "Mobile products engineered beyond the screen.",
    cardBody:
      "Production mobile applications connected to the APIs, authentication, payments, infrastructure and operational systems behind them.",
    bestWhen: "The work has to happen on a phone, with the same systems behind it.",
    capabilities: [
      "Cross-platform",
      "Backend Integration",
      "Authentication",
      "Payments",
      "Deployment",
    ],
    linkLabel: "Explore Mobile Engineering",
    eyebrow: "Mobile engineering",
    primary: true,
  },
  {
    slug: "seo-aeo-copywriting",
    path: "/services/seo-aeo-copywriting",
    title: "SEO, AEO & Search Engineering",
    navLabel: "SEO & AEO",
    cardTitleHighlight: "Search",
    cardDescription:
      "Technical SEO, AEO and search architecture for Google and AI search discovery.",
    cardBody:
      "Technical SEO, content architecture and AI-search optimisation built into the systems that publish your content.",
    bestWhen: "Pages exist, but search and answer engines cannot read them clearly.",
    capabilities: [
      "Technical SEO",
      "Metadata & schema",
      "Internal linking",
      "Core Web Vitals",
      "AEO",
    ],
    linkLabel: "Explore SEO & AEO",
    eyebrow: "SEO, AEO & search engineering",
    primary: false,
  },
] as const;

export const canonicalServicePaths = canonicalServices.map((service) => service.path);

export const primaryServices = canonicalServices.filter((service) => service.primary);

export function getCanonicalService(slug: string): CanonicalService | undefined {
  return canonicalServices.find((service) => service.slug === slug);
}

export const SERVICE_NAV_ITEMS = [
  {
    title: "L1–L4 Application Support",
    description: "Support that escalates to engineering.",
    href: "/services/application-support",
  },
  {
    title: "Agentic Infrastructure & AI Agents",
    description: "Agents, tools, context and controls.",
    href: "/services/ai-agent-development",
  },
  {
    title: "AWS Cloud & DevOps",
    description: "AWS, pipelines and production reliability.",
    href: "/services/cloud-infrastructure-scaling",
  },
  {
    title: "Custom Software Engineering",
    description: "SaaS, platforms and internal systems.",
    href: "/services/custom-software-development",
  },
  {
    title: "Mobile Engineering",
    description: "Production-ready apps with the systems behind them.",
    href: "/services/mobile-app-development",
  },
  {
    title: "Web & Digital Experience",
    description: "Websites, product UI and frontend engineering.",
    href: "/services/website-design-development",
  },
] as const;
