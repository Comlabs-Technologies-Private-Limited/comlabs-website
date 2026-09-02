export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Assess",
    description:
      "We map the system, operating constraints and business outcome before changing anything.",
  },
  {
    step: "02",
    title: "Engineer",
    description:
      "We design and build the software, infrastructure or workflows required to solve the problem properly.",
  },
  {
    step: "03",
    title: "Deploy",
    description:
      "We release through controlled environments, testing and production validation.",
  },
  {
    step: "04",
    title: "Operate",
    description:
      "Where needed, we stay responsible through monitoring, support, incident resolution and continuous improvement.",
  },
] as const;

export const PROJECTS = [
  {
    title: "Global Services",
    category: "Website Design & Development",
    desc: "Full website rebuild that lifted conversion and helped land JIO and Vodafone-Idea as enterprise clients.",
    href: "/work/global-services",
    liveSiteUrl: "https://global-services-website.vercel.app",
    image: "/work/global-services/global-services-case-study-hero.webp",
    featured: true,
  },
  {
    title: "Radiant",
    category: "Website Design & Development",
    desc: "An editorial studio website built around bold work, expressive motion and clear conversion paths.",
    href: "/work/radiant",
    liveSiteUrl: "https://radiant.comlabstechnologies.com/",
    image: "/work/radiant/radiant-case-study-hero.webp",
  },
  {
    title: "Formial Labs",
    category: "Custom Software Development",
    desc: "Multi-page onboarding flow for an internal dashboard — built to cut drop-off and get users to activation fast.",
    href: "/work/formial-labs",
    liveSiteUrl: "https://formial.in",
    image: "/work/formial-labs/formial-case-study-hero.webp",
  },
  {
    title: "Vithub",
    category: "Website Design & Development",
    desc: "Design-led marketing website built to give Vithub a strong digital identity and a foundation for growth.",
    href: "/work/vithub",
    liveSiteUrl: "https://vithub.in",
    image: "/work/vithub/vithub-case-study-hero.webp",
  },
] as const;

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
  initials: string;
  /** Founder headshot URL — add when available */
  avatarSrc?: string;
  linkedinUrl?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We deal with companies like JIO and Vodafone, so I didn't want a website that looked small. Comlabs got that immediately. They rebuilt the whole thing and now it actually looks like a company at our level. No hand-holding, no chasing — they just got it done.",
    name: "Pramod Mishra",
    title: "Director",
    company: "Global Services Enterprise",
    initials: "PM",
    avatarSrc:
      "https://res.cloudinary.com/p8osc4y4/image/upload/v1786453596/pramod-mishra_rygkvp.jpg",
  },
  {
    quote:
      "Honestly, I came to Comlabs with a messy idea and not much else. They figured out what I was actually trying to build and turned it into a dashboard that just works. Our users went from confused to comfortable. Felt less like hiring an agency and more like having someone on the team who cared.",
    name: "Jeet Patel",
    title: "Founder",
    company: "Formial",
    initials: "JP",
    avatarSrc:
      "https://res.cloudinary.com/p8osc4y4/image/upload/v1786453596/jeet-patel_hewm25.jpg",
  },
  {
    quote:
      "I'd been putting off the website for ages. Comlabs made it painless. The site finally looks like the brand I've had in my head, and people have actually noticed. Quick, easy to talk to, and they got Vithub in a way I didn't expect.",
    name: "Harsh Sihag",
    title: "Director and Founder",
    company: "Vithub",
    initials: "HS",
    avatarSrc:
      "https://res.cloudinary.com/p8osc4y4/image/upload/v1786453597/harsh-sihag_tdj4k7.jpg",
  },
];
