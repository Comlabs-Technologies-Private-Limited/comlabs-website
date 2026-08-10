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

/** Homepage card visuals keyed by slug — layout/motion only, not service copy. */
export const homeServiceCardVisuals: Record<
  CanonicalServiceSlug,
  {
    id: string;
    mockupImage?: string;
    mockupAlt?: string;
    mockupOverlayClassName?: string;
    mockupWrapperClassName?: string;
    mockupClassName?: string;
  }
> = {
  "website-design-development": {
    id: "website-design",
    mockupImage: "/card-bg/mockup_before.png",
    mockupAlt: "Website design before and after comparison",
    mockupOverlayClassName: "",
    mockupWrapperClassName: "mt-12 md:mt-22",
    mockupClassName: "scale-107 pl-1",
  },
  "custom-software-development": {
    id: "custom-software",
    mockupImage: "/card-bg/product-ui-mockup.png",
    mockupAlt: "Product dashboard UI design mockup",
    mockupOverlayClassName: "mt-5 md:mt-6 scale-112",
    mockupWrapperClassName: "",
    mockupClassName: "",
  },
  "mobile-app-development": {
    id: "mobile-app",
    mockupAlt: "",
    mockupOverlayClassName: "inset-2.5 top-8 bottom-2.5 items-stretch md:inset-3 md:top-10",
    mockupWrapperClassName: "flex h-full w-full max-w-[94%] flex-col",
    mockupClassName: "",
  },
  "seo-aeo-copywriting": {
    id: "seo-aeo",
    mockupAlt: "",
    mockupOverlayClassName: "md:top-16 top-8 items-",
    mockupWrapperClassName: "top-16",
    mockupClassName: "",
  },
  "cloud-infrastructure-scaling": {
    id: "cloud-infrastructure",
    mockupAlt: "",
    mockupOverlayClassName:
      "inset-x-3 top-8 bottom-0 flex items-end justify-center md:inset-x-5 md:top-10",
    mockupWrapperClassName: "flex w-full max-w-[92%] flex-col",
    mockupClassName: "",
  },
};

export const homeServiceBackgrounds = [
  "/services-bg/service-bg-1.png",
  "/services-bg/service-bg-2.png",
  "/services-bg/service-bg-3.png",
  "/services-bg/service-bg-4.png",
  "/services-bg/service-bg-5.png",
] as const;

export function buildHomeServiceCards() {
  return canonicalServices.map((service, index) => ({
    ...service,
    ...homeServiceCardVisuals[service.slug],
    background: homeServiceBackgrounds[index] ?? homeServiceBackgrounds[0],
    linkHref: service.path,
  }));
}

export type HomeServiceCard = ReturnType<typeof buildHomeServiceCards>[number];
