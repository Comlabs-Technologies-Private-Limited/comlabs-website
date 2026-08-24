import {
  type DmArtefactId,
  type DmPhotoId,
  DM,
  DM_PHOTOS,
} from "@/lib/digital-marketing-media";

export const DIGITAL_MARKETING_PATH = "/digital-marketing" as const;

export const DIGITAL_MARKETING_ORANGE = DM.accent;

export const DIGITAL_MARKETING_CONTACT_EMAIL = "admin@comlabstechnologies.com" as const;

export const DIGITAL_MARKETING_META = {
  title: "Digital Marketing Agency in Pune | Comlabs Technologies",
  description:
    "Comlabs combines brand strategy, creative campaigns, performance marketing, SEO, AI-search visibility and analytics to build measurable digital growth.",
} as const;

export type DigitalMarketingVisual =
  | { kind: "photo"; id: DmPhotoId; alt?: string }
  | { kind: "artefact"; id: DmArtefactId }
  | { kind: "billboard" }
  | { kind: "work"; src: string; alt: string };

export type MosaicAspect = "square" | "four-three" | "three-two" | "portrait" | "feature";

export type MosaicTile = {
  visual: DigitalMarketingVisual;
  aspect: MosaicAspect;
  priority?: boolean;
};

export const DIGITAL_MARKETING_MOSAIC: readonly (readonly MosaicTile[])[] = [
  [
    { visual: { kind: "artefact", id: "performance-panel" }, aspect: "four-three", priority: true },
    { visual: { kind: "photo", id: "IMG-01" }, aspect: "portrait" },
    { visual: { kind: "artefact", id: "social-system" }, aspect: "square" },
    { visual: { kind: "photo", id: "IMG-04" }, aspect: "three-two" },
  ],
  [
    { visual: { kind: "photo", id: "IMG-03" }, aspect: "square", priority: true },
    { visual: { kind: "artefact", id: "campaign-poster" }, aspect: "portrait" },
    { visual: { kind: "photo", id: "IMG-11" }, aspect: "three-two" },
    { visual: { kind: "artefact", id: "search-cluster" }, aspect: "four-three" },
  ],
  [
    { visual: { kind: "photo", id: "IMG-06" }, aspect: "feature", priority: true },
    { visual: { kind: "artefact", id: "landing-experiment" }, aspect: "four-three" },
    { visual: { kind: "photo", id: "IMG-09" }, aspect: "three-two" },
    { visual: { kind: "artefact", id: "customer-journey" }, aspect: "square" },
  ],
  [
    { visual: { kind: "photo", id: "IMG-10" }, aspect: "portrait", priority: true },
    { visual: { kind: "artefact", id: "conversion-funnel" }, aspect: "square" },
    { visual: { kind: "photo", id: "IMG-02" }, aspect: "portrait" },
    { visual: { kind: "artefact", id: "landing-preview" }, aspect: "four-three" },
  ],
] as const;

export type DigitalMarketingCapability = {
  id: string;
  index: string;
  title: string;
  category: string;
  description: string;
  deliverables: readonly string[];
  visuals: readonly DigitalMarketingVisual[];
};

export const DIGITAL_MARKETING_CAPABILITIES: readonly DigitalMarketingCapability[] = [
  {
    id: "brand-strategy",
    index: "01",
    title: "Brand Strategy & Positioning",
    category: "Strategy",
    description:
      "Clarify who you are for, what makes you worth choosing and how that position should appear across every digital touchpoint.",
    deliverables: [
      "Audience and category research",
      "Brand positioning",
      "Messaging architecture",
      "Campaign direction",
    ],
    visuals: [
      { kind: "photo", id: "IMG-04" },
      { kind: "photo", id: "IMG-05" },
      { kind: "artefact", id: "positioning-map" },
    ],
  },
  {
    id: "content-creative",
    index: "02",
    title: "Content & Creative Systems",
    category: "Creative",
    description:
      "Build a recognisable content language that scales across campaigns without becoming repetitive or losing quality.",
    deliverables: [
      "Creative direction",
      "Campaign concepts",
      "Social content systems",
      "Design and production guidance",
    ],
    visuals: [
      { kind: "photo", id: "IMG-08" },
      { kind: "photo", id: "IMG-09" },
      { kind: "artefact", id: "campaign-poster" },
    ],
  },
  {
    id: "performance",
    index: "03",
    title: "Performance & Acquisition",
    category: "Growth",
    description:
      "Plan, launch and improve campaigns around qualified demand, conversion quality and sustainable acquisition—not vanity traffic.",
    deliverables: [
      "Paid campaign strategy",
      "Audience planning",
      "Landing-page alignment",
      "Experimentation and optimisation",
    ],
    visuals: [
      { kind: "artefact", id: "performance-panel" },
      { kind: "artefact", id: "channel-attribution" },
      { kind: "artefact", id: "landing-experiment" },
    ],
  },
  {
    id: "search",
    index: "04",
    title: "SEO, AEO & GEO",
    category: "Search",
    description:
      "Build authority across traditional search and AI-powered discovery through technically sound pages, useful content and clear information architecture.",
    deliverables: [
      "Search opportunity research",
      "Technical SEO",
      "Content architecture",
      "AI-search readiness",
    ],
    visuals: [
      { kind: "artefact", id: "search-cluster" },
      { kind: "artefact", id: "ai-visibility" },
      { kind: "artefact", id: "content-architecture" },
    ],
  },
  {
    id: "social",
    index: "05",
    title: "Social Media & Community",
    category: "Distribution",
    description:
      "Turn social channels into a consistent source of relevance, trust and demand through clear editorial thinking and platform-aware execution.",
    deliverables: [
      "Channel strategy",
      "Content calendars",
      "Founder and brand content",
      "Distribution experiments",
    ],
    visuals: [
      { kind: "photo", id: "IMG-11" },
      { kind: "photo", id: "IMG-10" },
      { kind: "artefact", id: "social-system" },
    ],
  },
  {
    id: "analytics",
    index: "06",
    title: "Analytics & Conversion",
    category: "Optimisation",
    description:
      "Connect marketing activity to user behaviour and business outcomes, then use those signals to improve the complete customer journey.",
    deliverables: [
      "Measurement planning",
      "Funnel analysis",
      "Conversion optimisation",
      "Reporting and insights",
    ],
    visuals: [
      { kind: "artefact", id: "customer-journey" },
      { kind: "artefact", id: "conversion-funnel" },
      { kind: "artefact", id: "landing-experiment" },
    ],
  },
] as const;

export type DigitalMarketingStage = {
  index: string;
  title: string;
  description: string;
};

export const DIGITAL_MARKETING_STAGES: readonly DigitalMarketingStage[] = [
  {
    index: "01",
    title: "Diagnose",
    description: "Understand the market, customer, existing performance and constraints.",
  },
  {
    index: "02",
    title: "Position",
    description: "Define the message, offer, audience and creative direction.",
  },
  {
    index: "03",
    title: "Launch",
    description: "Build the campaign system, assets, landing experiences and measurement.",
  },
  {
    index: "04",
    title: "Compound",
    description: "Learn from performance and continuously improve what produces results.",
  },
] as const;

export type DigitalMarketingWorkItem = {
  client: string;
  discipline: string;
  outcome: string;
  href: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
};

export const DIGITAL_MARKETING_WORK: readonly DigitalMarketingWorkItem[] = [
  {
    client: "Global Services",
    discipline: "Brand credibility · Conversion",
    outcome:
      "A full website rebuild that lifted conversion and helped present the company at the same level as its enterprise clients.",
    href: "/work/global-services",
    image: "/work/global-services/global-services-case-study-hero.webp",
    imageAlt: "Global Services website homepage",
    featured: true,
  },
  {
    client: "Radiant",
    discipline: "Positioning · Digital experience",
    outcome:
      "An editorial studio website built around bold work, expressive motion and clear conversion paths.",
    href: "/work/radiant",
    image: "/work/radiant/radiant-case-study-hero.webp",
    imageAlt: "Radiant studio website",
  },
  {
    client: "Vithub",
    discipline: "Brand identity · Content foundation",
    outcome:
      "A design-led marketing website that gave Vithub a stronger digital identity and a base for growth.",
    href: "/work/vithub",
    image: "/work/vithub/vithub-case-study-hero.webp",
    imageAlt: "Vithub marketing website",
  },
  {
    client: "Formial Labs",
    discipline: "Acquisition · Activation",
    outcome:
      "A multi-page onboarding flow built to reduce drop-off and get users to the first useful moment faster.",
    href: "/work/formial-labs",
    image: "/work/formial-labs/formial-case-study-hero.webp",
    imageAlt: "Formial Labs onboarding product",
  },
] as const;

export type DigitalMarketingEngagement = {
  index: string;
  title: string;
  description: string;
};

export const DIGITAL_MARKETING_ENGAGEMENTS: readonly DigitalMarketingEngagement[] = [
  {
    index: "01",
    title: "Growth Sprint",
    description:
      "Focused diagnosis of positioning, opportunity, measurement and execution priorities.",
  },
  {
    index: "02",
    title: "Campaign Partnership",
    description:
      "Strategy, creative, launch and optimisation for a defined campaign or growth objective.",
  },
  {
    index: "03",
    title: "Ongoing Growth System",
    description:
      "Continuous content, search, performance and conversion work operating as one connected system.",
  },
] as const;

export type DigitalMarketingFaq = {
  question: string;
  answer: string;
};

export const DIGITAL_MARKETING_FAQS: readonly DigitalMarketingFaq[] = [
  {
    question: "What does Comlabs’ digital marketing service include?",
    answer:
      "Brand strategy and positioning, content and creative systems, performance and acquisition, SEO, AEO and GEO, social and community, and analytics connected to conversion. The work is planned as one system, not as isolated channel tasks.",
  },
  {
    question: "Can Comlabs manage both strategy and execution?",
    answer:
      "Yes. We start with diagnosis and positioning, then carry that into campaign systems, landing experiences, search, content and measurement. Strategy and execution stay on the same brief.",
  },
  {
    question: "Do you work with B2B and technology companies?",
    answer:
      "Yes. We work with companies that need positioning, demand and conversion to move together—including B2B, technology and product-led teams.",
  },
  {
    question: "How do you measure marketing performance?",
    answer:
      "We look at the complete journey: discovery, engagement and qualified action. Reporting is built to support decisions—what to keep, what to change and where to put the next effort.",
  },
  {
    question: "Can you work with our existing internal team?",
    answer:
      "Yes. Engagements are shaped around the problem, not a fixed roster of deliverables. We can lead the system, or work alongside an in-house marketing or product team.",
  },
  {
    question: "How quickly can a project begin?",
    answer:
      "A Growth Sprint is the fastest way to start: diagnosis, positioning and a clear execution plan. From there we can move into a campaign partnership or an ongoing growth system if that is the right fit.",
  },
] as const;

export type DigitalMarketingInsight = {
  category: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  thumbnailAlt: string;
};

export const DIGITAL_MARKETING_INSIGHTS: readonly DigitalMarketingInsight[] = [
  {
    category: "Positioning",
    title: "Make the offer unmistakable",
    excerpt:
      "When the category is noisy, the work is to name the problem, the buyer and the reason you win—then hold that line everywhere.",
    thumbnail: DM_PHOTOS["IMG-09"].srcSm,
    thumbnailAlt: DM_PHOTOS["IMG-09"].alt,
  },
  {
    category: "Search",
    title: "Be findable in Google and in AI answers",
    excerpt:
      "SEO, AEO and structured content planned as one visibility system, not a list of disconnected keywords.",
    thumbnail: DM_PHOTOS["IMG-04"].srcSm,
    thumbnailAlt: DM_PHOTOS["IMG-04"].alt,
  },
  {
    category: "Conversion",
    title: "Turn attention into a decision",
    excerpt:
      "Landing experiences, proof and measurement designed around the action that actually moves the business.",
    thumbnail: DM_PHOTOS["IMG-06"].srcSm,
    thumbnailAlt: DM_PHOTOS["IMG-06"].alt,
  },
] as const;

export const DIGITAL_MARKETING_PROOF = [
  {
    quote:
      "We deal with companies like JIO and Vodafone, so I didn't want a website that looked small. Comlabs got that immediately. They rebuilt the whole thing and now it actually looks like a company at our level.",
    name: "Pramod Mishra",
    title: "Director",
    company: "Global Services Enterprise",
    initials: "PM",
    avatarSrc:
      "https://res.cloudinary.com/p8osc4y4/image/upload/v1786453596/pramod-mishra_rygkvp.jpg",
  },
  {
    quote:
      "I'd been putting off the website for ages. Comlabs made it painless. The site finally looks like the brand I've had in my head, and people have actually noticed.",
    name: "Harsh Sihag",
    title: "Director and Founder",
    company: "Vithub",
    initials: "HS",
    avatarSrc:
      "https://res.cloudinary.com/p8osc4y4/image/upload/v1786453597/harsh-sihag_tdj4k7.jpg",
  },
] as const;

export type MarketingLabLabel =
  | "Campaign / Concept"
  | "SEO / Research"
  | "AEO / System"
  | "Social / Direction"
  | "CRO / Experiment"
  | "Brand / Positioning"
  | "Content / Framework"
  | "Analytics / Study"
  | "Landing Page / Build"
  | "Comlabs / Internal";

export type MarketingLabItem = {
  id: string;
  label: MarketingLabLabel;
  visual: DigitalMarketingVisual;
  span: string;
};

export const DIGITAL_MARKETING_LAB: readonly MarketingLabItem[] = [
  {
    id: "lab-01",
    label: "Campaign / Concept",
    visual: { kind: "billboard" },
    span: "col-span-6 row-span-2 md:col-span-4 lg:col-span-4",
  },
  {
    id: "lab-02",
    label: "Brand / Positioning",
    visual: { kind: "artefact", id: "positioning-map" },
    span: "col-span-6 md:col-span-4 lg:col-span-2",
  },
  {
    id: "lab-03",
    label: "SEO / Research",
    visual: { kind: "artefact", id: "search-cluster" },
    span: "col-span-6 md:col-span-4 lg:col-span-2",
  },
  {
    id: "lab-04",
    label: "Comlabs / Internal",
    visual: { kind: "photo", id: "IMG-01" },
    span: "col-span-6 md:col-span-3 lg:col-span-2",
  },
  {
    id: "lab-05",
    label: "AEO / System",
    visual: { kind: "artefact", id: "ai-visibility" },
    span: "col-span-6 md:col-span-5 lg:col-span-3",
  },
  {
    id: "lab-06",
    label: "Social / Direction",
    visual: { kind: "photo", id: "IMG-11" },
    span: "col-span-6 md:col-span-4 lg:col-span-3",
  },
  {
    id: "lab-07",
    label: "Content / Framework",
    visual: { kind: "artefact", id: "content-calendar" },
    span: "col-span-6 md:col-span-4 lg:col-span-4",
  },
  {
    id: "lab-08",
    label: "Landing Page / Build",
    visual: {
      kind: "work",
      src: "/work/global-services/global-services-case-study-hero.webp",
      alt: "Global Services marketing website",
    },
    span: "col-span-6 row-span-2 md:col-span-6 lg:col-span-4",
  },
  {
    id: "lab-09",
    label: "CRO / Experiment",
    visual: { kind: "artefact", id: "landing-experiment" },
    span: "col-span-6 md:col-span-4 lg:col-span-2",
  },
  {
    id: "lab-10",
    label: "Analytics / Study",
    visual: { kind: "artefact", id: "conversion-funnel" },
    span: "col-span-6 md:col-span-4 lg:col-span-2",
  },
  {
    id: "lab-11",
    label: "Campaign / Concept",
    visual: { kind: "photo", id: "IMG-06" },
    span: "col-span-6 md:col-span-4 lg:col-span-3",
  },
  {
    id: "lab-12",
    label: "Brand / Positioning",
    visual: { kind: "photo", id: "IMG-13" },
    span: "col-span-6 row-span-2 md:col-span-3 lg:col-span-2",
  },
  {
    id: "lab-13",
    label: "Content / Framework",
    visual: { kind: "photo", id: "IMG-09" },
    span: "col-span-6 md:col-span-5 lg:col-span-3",
  },
  {
    id: "lab-14",
    label: "Social / Direction",
    visual: { kind: "artefact", id: "social-system" },
    span: "col-span-6 md:col-span-4 lg:col-span-4",
  },
  {
    id: "lab-15",
    label: "Comlabs / Internal",
    visual: {
      kind: "work",
      src: "/work/radiant/radiant-case-study-hero.webp",
      alt: "Radiant studio website",
    },
    span: "col-span-6 md:col-span-4 lg:col-span-3",
  },
  {
    id: "lab-16",
    label: "SEO / Research",
    visual: { kind: "artefact", id: "content-architecture" },
    span: "col-span-6 md:col-span-4 lg:col-span-3",
  },
  {
    id: "lab-17",
    label: "CRO / Experiment",
    visual: { kind: "photo", id: "IMG-08" },
    span: "col-span-6 md:col-span-4 lg:col-span-2",
  },
  {
    id: "lab-18",
    label: "Analytics / Study",
    visual: { kind: "artefact", id: "channel-attribution" },
    span: "col-span-6 md:col-span-4 lg:col-span-4",
  },
  {
    id: "lab-19",
    label: "Campaign / Concept",
    visual: { kind: "photo", id: "IMG-02" },
    span: "col-span-6 md:col-span-4 lg:col-span-3",
  },
  {
    id: "lab-20",
    label: "AEO / System",
    visual: { kind: "photo", id: "IMG-03" },
    span: "col-span-6 md:col-span-4 lg:col-span-3",
  },
  {
    id: "lab-21",
    label: "Social / Direction",
    visual: { kind: "photo", id: "IMG-10" },
    span: "col-span-6 md:col-span-4 lg:col-span-2",
  },
  {
    id: "lab-22",
    label: "Landing Page / Build",
    visual: {
      kind: "work",
      src: "/work/vithub/vithub-case-study-hero.webp",
      alt: "Vithub marketing website",
    },
    span: "col-span-6 md:col-span-4 lg:col-span-4",
  },
] as const;
