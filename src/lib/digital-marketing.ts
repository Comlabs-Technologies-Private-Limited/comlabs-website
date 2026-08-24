export const DIGITAL_MARKETING_PATH = "/digital-marketing" as const;

export const DIGITAL_MARKETING_ORANGE = "#D9603D" as const;

export const DIGITAL_MARKETING_CONTACT_EMAIL = "admin@comlabstechnologies.com" as const;

export const DIGITAL_MARKETING_META = {
  title: "Digital Marketing Agency in Pune | Comlabs Technologies",
  description:
    "Comlabs combines brand strategy, creative campaigns, performance marketing, SEO, AI-search visibility and analytics to build measurable digital growth.",
} as const;

export type DigitalMarketingCapability = {
  id: string;
  index: string;
  title: string;
  description: string;
  deliverables: readonly string[];
};

export const DIGITAL_MARKETING_CAPABILITIES: readonly DigitalMarketingCapability[] = [
  {
    id: "brand-strategy",
    index: "01",
    title: "Brand Strategy & Positioning",
    description:
      "Clarify who you are for, what makes you worth choosing and how that position should show up across every digital touchpoint.",
    deliverables: [
      "Audience and category research",
      "Brand positioning",
      "Messaging architecture",
      "Campaign direction",
    ],
  },
  {
    id: "content-creative",
    index: "02",
    title: "Content & Creative Systems",
    description:
      "Build a recognisable content language that can scale across campaigns without becoming repetitive or losing quality.",
    deliverables: [
      "Creative direction",
      "Campaign concepts",
      "Social content systems",
      "Design and production guidance",
    ],
  },
  {
    id: "performance",
    index: "03",
    title: "Performance & Acquisition",
    description:
      "Plan, launch and improve campaigns around qualified demand, conversion quality and sustainable acquisition—not vanity traffic.",
    deliverables: [
      "Paid campaign strategy",
      "Audience planning",
      "Landing-page alignment",
      "Experimentation and optimisation",
    ],
  },
  {
    id: "search",
    index: "04",
    title: "SEO, AEO & GEO",
    description:
      "Build authority across traditional search and AI-powered discovery through technically sound pages, useful content and clear information architecture.",
    deliverables: [
      "Search opportunity research",
      "Technical SEO",
      "Content architecture",
      "AI-search and answer-engine readiness",
    ],
  },
  {
    id: "social",
    index: "05",
    title: "Social Media & Community",
    description:
      "Turn social channels into a consistent source of relevance, trust and demand through clear editorial thinking and platform-aware execution.",
    deliverables: [
      "Channel strategy",
      "Content calendars",
      "Founder and brand content",
      "Distribution experiments",
    ],
  },
  {
    id: "analytics",
    index: "06",
    title: "Analytics & Conversion",
    description:
      "Connect marketing activity to user behaviour and business outcomes, then use those signals to improve the complete customer journey.",
    deliverables: [
      "Measurement planning",
      "Funnel analysis",
      "Conversion optimisation",
      "Reporting and actionable insights",
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
    description: "Understand the market, customer, current performance and constraints.",
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
    description: "Focused diagnosis, positioning and an execution plan for the next move.",
  },
  {
    index: "02",
    title: "Campaign Partnership",
    description: "Strategy, creative, launch and optimisation around a defined growth problem.",
  },
  {
    index: "03",
    title: "Ongoing Growth System",
    description: "Continuous content, search, performance and conversion work as one operating rhythm.",
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
      "Brand strategy and positioning, content and creative systems, performance and acquisition, SEO / AEO / GEO, social and community, and analytics connected to conversion. The work is planned as one system, not as isolated channel tasks.",
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

export const DIGITAL_MARKETING_RELATED_LINKS = [
  {
    label: "Website Design & Development",
    href: "/services/website-design-development",
  },
  {
    label: "SEO / AEO & Copywriting",
    href: "/services/seo-aeo-copywriting",
  },
  {
    label: "Selected work",
    href: "/work",
  },
] as const;
