/**
 * Content and design tokens for the Comlabs Digital Marketing & Design Studio
 * page (`/digital-marketing`).
 *
 * Capability, project, process, engagement, FAQ and testimonial copy is
 * imported from `@/lib/digital-marketing` so the page stays the single source
 * of truth for the service, not a second copy of it.
 */

import type { DmPhotoId } from "@/lib/digital-marketing-media";

/**
 * Hero photograph — “Woman’s profile illuminated by blue and orange lights”.
 * Vladislav Nahorny, Unsplash: https://unsplash.com/photos/v0VrVqkNhb0
 * Delivered from images.unsplash.com (allow-listed in `next.config.ts`).
 */
export const digitalStudioHeroImage =
  "https://images.unsplash.com/photo-1775900044697-6e3b7c385321?auto=format&fit=crop&w=2400&q=88";

export const DIGITAL_STUDIO_HERO_ALT =
  "A woman’s profile in darkness, lit from one side by blue light and from the other by warm amber light";

export const DIGITAL_STUDIO_HERO_CREDIT = {
  photographer: "Vladislav Nahorny",
  photographerUrl: "https://unsplash.com/@vladislavnahorny",
  sourceUrl: "https://unsplash.com/photos/v0VrVqkNhb0",
  source: "Unsplash",
} as const;

/** Anchor targets used by the nav, hero and footer. */
export const DIGITAL_STUDIO_SECTIONS = {
  work: "work",
  capabilities: "capabilities",
  process: "process",
  engagements: "engagements",
  faq: "faq",
  contact: "contact",
} as const;

export type StudioPrinciple = {
  index: string;
  label: string;
  title: string;
  body: string;
};

export const DIGITAL_STUDIO_PRINCIPLES: readonly StudioPrinciple[] = [
  {
    index: "01",
    label: "Signal over noise",
    title: "We look for the one thing worth saying.",
    body: "Most marketing fails because it says everything at once. We start by finding the sharpest true claim a business can make, then build the whole system to carry it — positioning, message, creative and page all pointing the same direction.",
  },
  {
    index: "02",
    label: "Creative with a job to do",
    title: "Work that is good and does something.",
    body: "Craft is not decoration. Every concept, layout and line is briefed against a decision we want a real buyer to make. If a piece of creative cannot explain what it is for, it does not ship.",
  },
  {
    index: "03",
    label: "Systems that compound",
    title: "Each cycle should make the next one cheaper.",
    body: "Campaigns end. Systems accumulate. We build content architecture, search foundations, measurement and landing experiences that keep returning value long after a launch window closes.",
  },
] as const;

export type StudioOpeningPoint = {
  title: string;
  body: string;
};

export const DIGITAL_STUDIO_OPENING: readonly StudioOpeningPoint[] = [
  {
    title: "One connected system.",
    body: "Positioning, creative, search, performance and analytics are planned together and briefed against the same objective. No channel runs on its own logic, and nothing is optimised at the expense of the business behind it.",
  },
  {
    title: "Creative judgment. Commercial evidence.",
    body: "We hold a high bar for the work and an equally high bar for what it produces. Decisions come from what the funnel, the search data and the customer journey actually show — not from what performed well for someone else.",
  },
] as const;

/** Marketing lab — the disciplines that run inside a Comlabs engagement. */
export type StudioLabItem = {
  id: string;
  label: string;
  title: string;
  note: string;
};

export const DIGITAL_STUDIO_LAB: readonly StudioLabItem[] = [
  {
    id: "positioning",
    label: "Brand / Positioning",
    title: "Positioning maps",
    note: "Category, buyer and reason-to-choose plotted before a single asset is designed.",
  },
  {
    id: "concept",
    label: "Campaign / Concept",
    title: "Campaign concepts",
    note: "A central idea developed far enough to survive contact with every channel it has to run in.",
  },
  {
    id: "search",
    label: "SEO / Research",
    title: "Search opportunity models",
    note: "Demand, intent and difficulty mapped to the pages that can realistically win them.",
  },
  {
    id: "aeo",
    label: "AEO / System",
    title: "AI-answer readiness",
    note: "Structured content and clean entity data so assistants can quote you correctly.",
  },
  {
    id: "content",
    label: "Content / Framework",
    title: "Content architecture",
    note: "A publishing structure with a spine, so volume never turns into sprawl.",
  },
  {
    id: "social",
    label: "Social / Direction",
    title: "Social systems",
    note: "Formats, cadence and creative direction a team can actually sustain.",
  },
  {
    id: "cro",
    label: "CRO / Experiment",
    title: "Landing experiments",
    note: "Message, proof and form design tested against the action that moves revenue.",
  },
  {
    id: "analytics",
    label: "Analytics / Study",
    title: "Measurement models",
    note: "Events, funnels and attribution built to answer questions, not to fill a dashboard.",
  },
] as const;

/**
 * Photography assignments from the self-hosted library in
 * `public/media/digital-marketing/`. Chosen for subject: research walls for
 * strategy, a camera rig for creative, a billboard for acquisition, and so on.
 */
export const DIGITAL_STUDIO_CAPABILITY_PHOTOS: Record<string, DmPhotoId> = {
  "brand-strategy": "IMG-05",
  "content-creative": "IMG-11",
  performance: "IMG-07",
  search: "IMG-04",
  social: "IMG-10",
  analytics: "IMG-12",
};

export const DIGITAL_STUDIO_LAB_PHOTOS: Record<string, DmPhotoId> = {
  positioning: "IMG-14",
  concept: "IMG-06",
  search: "IMG-08",
  aeo: "IMG-03",
  content: "IMG-09",
  social: "IMG-10",
  cro: "IMG-13",
  analytics: "IMG-01",
};
