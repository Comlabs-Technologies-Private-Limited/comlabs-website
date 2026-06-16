export const SHOWCASE_IMAGES = {
  primary: "/imports/image.png",
  secondary: "/imports/image-1.png",
} as const;

export const TRUST_STATS = [
  { value: "12+", label: "Years in business" },
  { value: "83%", label: "Clients who return" },
  { value: "140+", label: "Projects shipped" },
  { value: "4.9★", label: "Average rating" },
] as const;

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery",
    description:
      "Deep listening first. We learn your business goals, your users, and the constraints that matter.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Wireframes become high-fidelity prototypes. Every interaction is considered before code ships.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Clean, documented, production-grade code. Short cycles, frequent check-ins, no surprises.",
  },
  {
    step: "04",
    title: "Launch & Grow",
    description:
      "We handle deployment and hand you the keys — with optional ongoing support to keep momentum.",
  },
] as const;

export const PROJECTS = [
  {
    title: "Formula Lab",
    category: "Product UX · Dashboard",
    desc: "Multi-page onboarding flow for an internal dashboard — built to cut drop-off and get users to activation fast.",
    href: "/work/formula-lab",
    image: SHOWCASE_IMAGES.primary,
  },
  {
    title: "Global Services",
    category: "Website · Conversion",
    desc: "Full website rebuild that lifted conversion and helped land JIO and Vodafone-Idea as enterprise clients.",
    href: "/work/global-services",
    image: SHOWCASE_IMAGES.secondary,
  },
  {
    title: "With Hub",
    category: "Brand · Marketing Site",
    desc: "Design-led marketing website built to give With Hub a strong digital identity and a foundation for growth.",
    href: "/work/with-hub",
    image: SHOWCASE_IMAGES.primary,
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "It was night and day from one batch to another, adoption went from single digits to over 80%. It just spread like wildfire, all the best builders were using Cursor.",
    author: "Diana Hu",
    role: "General Partner, Y Combinator",
    initials: "DH",
  },
  {
    quote:
      "My favorite enterprise AI service is Cursor. Every one of our engineers, some 40,000, are now assisted by AI and our productivity has gone up incredibly.",
    author: "Jensen Huang",
    role: "President & CEO, NVIDIA",
    initials: "JH",
  },
  {
    quote:
      "The best LLM applications have an autonomy slider: you control how much independence to give the AI. In Cursor, you can do Tab completion, Cmd+K for targeted edits, or you can let it rip with the full autonomy agentic version.",
    author: "Andrej Karpathy",
    role: "CEO, Eureka Labs",
    initials: "AK",
  },
  {
    quote:
      "Cursor quickly grew from hundreds to thousands of extremely enthusiastic Stripe employees. We spend more on R&D and software creation than any other undertaking, and there's significant economic outcomes when making that process more efficient.",
    author: "Patrick Collison",
    role: "Co Founder & CEO, Stripe",
    initials: "PC",
  },
  {
    quote:
      "The most useful AI tool that I currently pay for, hands down, is Cursor. It's fast, autocompletes when and where you need it to, handles brackets properly, sensible keyboard shortcuts, bring-your-own-model... everything is well put together.",
    author: "shadcn",
    role: "Creator of shadcn/ui",
    initials: "SC",
  },
  {
    quote:
      "It's definitely becoming more fun to be a programmer. We are at the 1% of what's possible, and it's in interactive experiences like Cursor where models like GPT-5 shine brightest.",
    author: "Greg Brockman",
    role: "President, OpenAI",
    initials: "GB",
  },
] as const;
