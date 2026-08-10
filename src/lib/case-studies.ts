import type { ReactNode } from "react";

export type CaseStudyMetaItem = {
  label: string;
  value: string;
  href?: string;
};

export type CaseStudyMedia = {
  src: string;
  alt: string;
  caption?: string;
  /** article = within text column; wide = breaks slightly wider; full = container width */
  variant?: "article" | "wide" | "full";
  /** Centered logo/mark presentation on warm background */
  padded?: boolean;
};

export type CaseStudyPrinciple = {
  number: string;
  text: string;
};

export type CaseStudySubsection = {
  title: string;
  paragraphs: string[];
  media?: CaseStudyMedia;
};

export type CaseStudyOutcomeRow = {
  title: string;
  description: string;
};

export type CaseStudySection = {
  number: string;
  title: string;
  paragraphs?: string[];
  principles?: CaseStudyPrinciple[];
  subsections?: CaseStudySubsection[];
  media?: CaseStudyMedia | CaseStudyMedia[];
  transformation?: {
    before: string[];
    after: string[];
  };
  outcomes?: CaseStudyOutcomeRow[];
};

export type CaseStudyHeadline = {
  before?: string;
  highlight: string;
  after?: string;
};

export type CaseStudyContent = {
  slug: string;
  client: string;
  year: string;
  headline: CaseStudyHeadline;
  standfirst: string;
  meta: CaseStudyMetaItem[];
  leadImage: CaseStudyMedia;
  sections: CaseStudySection[];
};

export type CaseStudySlug = "formial-labs" | "global-services" | "vithub";

export const CASE_STUDY_ORDER: readonly CaseStudySlug[] = [
  "formial-labs",
  "global-services",
  "vithub",
] as const;

export const RELATED_SERVICE_BY_SLUG: Record<
  CaseStudySlug,
  { label: string; href: string; description: string }
> = {
  "formial-labs": {
    label: "Custom Software Development",
    href: "/services/custom-software-development",
    description: "Software built around how your business actually works.",
  },
  "global-services": {
    label: "Website Design & Development",
    href: "/services/website-design-development",
    description:
      "High-performance websites designed around positioning, usability and conversion.",
  },
  vithub: {
    label: "Website Design & Development",
    href: "/services/website-design-development",
    description:
      "High-performance websites designed around positioning, usability and conversion.",
  },
};

export const NEXT_CASE_STUDY_HEADLINE: Record<CaseStudySlug, string> = {
  "formial-labs": "A website built to earn enterprise trust.",
  "global-services": "A brand Vithub can grow on.",
  vithub: "A clearer path from signup to the first useful moment.",
};

export const NEXT_CASE_STUDY_CLIENT: Record<CaseStudySlug, string> = {
  "formial-labs": "Global Services",
  "global-services": "Vithub",
  vithub: "Formial Labs",
};

export const NEXT_CASE_STUDY_THUMBNAIL: Record<CaseStudySlug, string> = {
  "formial-labs":
    "https://media.licdn.com/dms/image/v2/D4D0BAQGQX5VqkCJ3Kw/company-logo_200_200/B4DZ_HUcVbK4AE-/0/1785755452993?e=1787788800&v=beta&t=0m0sb88g-MtInzITn26oE280SA6izWiywxQvtZIsbGo",
  "global-services":
    "https://vithub.in/cdn/shop/files/Vit_hub_web_logo_temp.png?height=100&v=1762338028",
  vithub:
    "https://formial.in/cdn/shop/files/Brand_Design-04_90b8501a-2715-48dc-934d-b45bba7f000b.png?v=1747823670&width=200",
};

export function getNextCaseStudy(slug: CaseStudySlug): {
  slug: CaseStudySlug;
  client: string;
  headline: string;
  href: string;
  thumbnail: string;
} {
  const index = CASE_STUDY_ORDER.indexOf(slug);
  const nextSlug = CASE_STUDY_ORDER[(index + 1) % CASE_STUDY_ORDER.length]!;
  return {
    slug: nextSlug,
    client: NEXT_CASE_STUDY_CLIENT[slug],
    headline: NEXT_CASE_STUDY_HEADLINE[slug],
    href: `/work/${nextSlug}`,
    thumbnail: NEXT_CASE_STUDY_THUMBNAIL[slug],
  };
}

/** @deprecated Legacy shape — use CaseStudyContent from this module instead. */
export type CaseStudyMetric = { value: string; label: string };

/** @deprecated Legacy shape — use CaseStudyContent from this module instead. */
export type LegacyCaseStudyContent = {
  slug: string;
  client: string;
  category: string;
  year: string;
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  coverImage: string;
  liveSiteUrl?: string;
  metrics: CaseStudyMetric[];
  problem: string[];
  whatWeBuilt: string[];
  results: string[];
  clients?: { label: string; note?: string };
};
