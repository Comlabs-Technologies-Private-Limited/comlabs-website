/**
 * Single source of truth for Comlabs service taxonomy.
 * Consumed by service pages, sitemap, and marketing components.
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
