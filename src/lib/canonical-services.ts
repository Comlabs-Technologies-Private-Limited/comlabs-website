/**
 * Single source of truth for Comlabs service taxonomy.
 * Consumed by homepage cards, service pages, footer, and marketing components.
 */

export type CanonicalServiceSlug =
  | "website-design-development"
  | "custom-software-development"
  | "mobile-app-development"
  | "seo-aeo-copywriting"
  | "cloud-infrastructure-scaling";

export type CanonicalService = {
  slug: CanonicalServiceSlug;
  path: `/services/${CanonicalServiceSlug}`;
  title: string;
  /** One word from `title` highlighted in service index cards. */
  cardTitleHighlight: string;
  cardDescription: string;
  linkLabel: string;
  eyebrow: string;
};

export const canonicalServices: readonly CanonicalService[] = [
  {
    slug: "website-design-development",
    path: "/services/website-design-development",
    title: "Website Design & Development",
    cardTitleHighlight: "Development",
    cardDescription:
      "High-performance websites designed around positioning, usability and conversion — from first wireframe to production.",
    linkLabel: "View website services",
    eyebrow: "Website design & development",
  },
  {
    slug: "custom-software-development",
    path: "/services/custom-software-development",
    title: "Custom Software Development",
    cardTitleHighlight: "Software",
    cardDescription:
      "Custom web applications, SaaS products and internal systems built around how your business actually works.",
    linkLabel: "View custom software",
    eyebrow: "Custom software development",
  },
  {
    slug: "mobile-app-development",
    path: "/services/mobile-app-development",
    title: "Mobile App Development",
    cardTitleHighlight: "Mobile",
    cardDescription:
      "Polished mobile products with clear UX, production-ready engineering and the infrastructure behind them.",
    linkLabel: "View mobile services",
    eyebrow: "Mobile app development",
  },
  {
    slug: "seo-aeo-copywriting",
    path: "/services/seo-aeo-copywriting",
    title: "SEO / AEO Optimisation & Copywriting",
    cardTitleHighlight: "Copywriting",
    cardDescription:
      "Search strategy, technical optimisation and clear content built to earn visibility across Google and AI-powered search.",
    linkLabel: "View SEO & copywriting",
    eyebrow: "SEO / AEO & copywriting",
  },
  {
    slug: "cloud-infrastructure-scaling",
    path: "/services/cloud-infrastructure-scaling",
    title: "Cloud Infrastructure & Scaling",
    cardTitleHighlight: "Infrastructure",
    cardDescription:
      "Reliable cloud architecture, deployments and performance engineering designed to keep products fast as usage grows.",
    linkLabel: "View cloud services",
    eyebrow: "Cloud infrastructure & scaling",
  },
] as const;

export const canonicalServicePaths = canonicalServices.map((service) => service.path);

export function getCanonicalService(slug: string): CanonicalService | undefined {
  return canonicalServices.find((service) => service.slug === slug);
}

/** Footer and nav service links — same labels everywhere. */
export const footerServiceLinks = canonicalServices.map((service) => ({
  label: service.title,
  href: service.path,
}));

/** Homepage service section backgrounds — hosted on Cloudinary. */
export const homeServiceBackgrounds: Record<CanonicalServiceSlug, string> = {
  "website-design-development":
    "https://res.cloudinary.com/p8osc4y4/image/upload/v1786362044/ChatGPT_Image_Aug_10_2026_05_09_44_PM_1_gqznci.png",
  "custom-software-development":
    "https://res.cloudinary.com/p8osc4y4/image/upload/v1786362044/ChatGPT_Image_Aug_10_2026_05_09_44_PM_2_o2vuma.png",
  "mobile-app-development":
    "https://res.cloudinary.com/p8osc4y4/image/upload/v1786362044/ChatGPT_Image_Aug_10_2026_05_09_44_PM_3_uo0nwu.png",
  "seo-aeo-copywriting":
    "https://res.cloudinary.com/p8osc4y4/image/upload/v1786362045/ChatGPT_Image_Aug_10_2026_05_09_44_PM_4_k8jhhj.png",
  "cloud-infrastructure-scaling":
    "https://res.cloudinary.com/p8osc4y4/image/upload/v1786362045/ChatGPT_Image_Aug_10_2026_05_09_44_PM_5_lbsvbf.png",
};

/** Homepage card visuals keyed by slug — layout/motion only, not service copy. */
export const homeServiceCardVisuals: Record<
  CanonicalServiceSlug,
  {
    id: string;
    /** When true, show only the editorial background — no UI mockup overlay. */
    backgroundOnly?: boolean;
    mockupImage?: string;
    mockupAlt?: string;
    mockupOverlayClassName?: string;
    mockupWrapperClassName?: string;
    mockupClassName?: string;
  }
> = {
  "website-design-development": {
    id: "website-design",
    backgroundOnly: true,
  },
  "custom-software-development": {
    id: "custom-software",
    backgroundOnly: true,
  },
  "mobile-app-development": {
    id: "mobile-app",
    backgroundOnly: true,
  },
  "seo-aeo-copywriting": {
    id: "seo-aeo",
    backgroundOnly: true,
  },
  "cloud-infrastructure-scaling": {
    id: "cloud-infrastructure",
    backgroundOnly: true,
  },
};

export function buildHomeServiceCards() {
  return canonicalServices.map((service) => ({
    ...service,
    ...homeServiceCardVisuals[service.slug],
    background: homeServiceBackgrounds[service.slug],
    linkHref: service.path,
  }));
}

export type HomeServiceCard = ReturnType<typeof buildHomeServiceCards>[number];
