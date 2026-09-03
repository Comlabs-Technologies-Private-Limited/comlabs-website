import type { CaseStudyContent } from "@/lib/case-studies";

/**
 * Radiant — a creative studio digital experience designed and engineered by
 * Comlabs. Technology and design-system details below were read from the
 * published implementation rather than assumed.
 */
export const radiantCaseStudy: CaseStudyContent = {
  slug: "radiant",
  client: "Radiant",
  year: "2026",
  headline: {
    before: "Building a digital studio experience that ",
    highlight: "refuses to disappear",
    after: " into the category.",
  },
  standfirst:
    "Radiant brings strategy, identity, digital products and motion into one expressive studio platform. Comlabs designed and engineered the experience around a simple objective: make ambitious work immediately memorable while keeping the path to enquiry clear.",
  metaTitle: "Radiant Engineering Case Study | Comlabs",
  metaDescription:
    "See how Comlabs designed and engineered Radiant, a cinematic creative studio website combining editorial storytelling, responsive development and conversion-focused UX.",
  ogImage: "/work/radiant/radiant-case-study-hero.webp",
  meta: [
    { label: "Project", value: "Radiant" },
    { label: "Service", value: "Web & Digital Experience" },
    { label: "Industry", value: "Creative Services" },
    { label: "Year", value: "2026" },
    { label: "Scope", value: "Strategy · UX · Design · Development" },
    { label: "Platform", value: "Responsive Web" },
    { label: "Role", value: "End-to-end digital experience" },
  ],
  leadImage: {
    src: "/work/radiant/radiant-case-study-hero.webp",
    alt: "Radiant homepage hero with the studio wordmark set behind full-bleed motion panels on a near-black background",
    variant: "wide",
    caption:
      "The opening frame sets the terms: oversized type, cinematic media and almost nothing else competing for attention.",
  },
  sections: [
    {
      number: "01",
      title: "The opportunity",
      lede: "Creative studios are judged before a visitor reads a single paragraph.",
      paragraphs: [
        "The site had to present strategy, identity, digital and motion without flattening them into a conventional agency grid — expressive enough to prove taste, structured enough to make a broad offer understandable, and direct enough to move serious visitors towards a conversation.",
      ],
      media: {
        src: "/work/radiant/radiant-homepage.webp",
        alt: "Radiant homepage selected-work module with an oversized headline reading Built to be remembered above a full-width project image",
        variant: "wide",
        caption: "Work is the first argument the homepage makes — the studio explanation comes afterwards.",
      },
    },
    {
      number: "02",
      title: "Experience strategy",
      lede: "A portfolio journey built around momentum.",
      paragraphs: [
        "The homepage is one editorial sequence, not a stack of independent marketing blocks. Work establishes the standard. Positioning explains the thinking. Services add commercial clarity. Process reduces uncertainty. Engagement models and contact turn interest into action.",
      ],
      sequence: ["Work", "Positioning", "Capabilities", "Process", "Engagement", "Contact"],
      principles: [
        { number: "01", text: "Selected work appears before lengthy company explanation." },
        { number: "02", text: "Service breadth is organised without fragmenting the narrative." },
        { number: "03", text: "Pricing, process and contact qualify the enquiry instead of hiding it." },
      ],
      media: {
        src: "/work/radiant/radiant-selected-work.webp",
        alt: "Radiant work index page showing the Ideas made visible headline, discipline filters and a featured project card",
        variant: "wide",
        caption:
          "The dedicated work index repeats the homepage logic at greater depth, with filtering by discipline.",
      },
    },
    {
      number: "03",
      title: "Visual system",
      lede: "Editorial restraint with moments of deliberate intensity.",
      paragraphs: [
        "Oversized type, monochrome surfaces and cinematic imagery create contrast without visual noise. Motion is reserved for transitions, navigation and portfolio moments, so the work feels alive while the interface stays controlled.",
      ],
      media: {
        src: "/work/radiant/radiant-visual-system.webp",
        alt: "Radiant interface details: the navigation bar, an oversized section headline and two project cards with category tags and captions over monochrome imagery",
        variant: "wide",
        caption: "Navigation, display typography and card anatomy share one set of rules across every route.",
      },
      specs: [
        {
          label: "Typography",
          value: "Aspekta, set tight at display sizes. Colour appears only in the mark and primary action.",
        },
        {
          label: "Colour",
          value: "#050505 base, #111111 surfaces, #FFFFFF and #999999 text.",
        },
        {
          label: "Motion",
          value:
            "Viewport-triggered reveals, with a prefers-reduced-motion rule that disables looping animation.",
        },
      ],
    },
    {
      number: "04",
      title: "From portfolio to enquiry",
      lede: "Different stories, one recognisable system — and a clear next step.",
      paragraphs: [
        "Project narratives across technology, hospitality, architecture and publishing keep the same hierarchy, metadata and pacing. Only the subject changes. Services, engagement models and a low-friction contact route then turn that attention into intent.",
      ],
      media: [
        {
          src: "/work/radiant/radiant-project-page.webp",
          alt: "Aether project page on Radiant with the headline Making spatial computing feel human beside a spatial render",
          variant: "wide",
          caption: "Aether opens on a technical subject with a human sentence.",
        },
        {
          src: "/work/radiant/radiant-engagement.webp",
          alt: "Radiant engagement models section showing three ways of working with scope and starting ranges",
          variant: "wide",
          caption: "Engagement models qualify the enquiry before a form is ever reached.",
        },
        {
          src: "/work/radiant/radiant-contact.webp",
          alt: "Radiant contact page with the headline Tell us what is changing above the enquiry form",
          variant: "wide",
          caption: "The contact route opens with a sentence, not a field list.",
        },
      ],
    },
    {
      number: "05",
      title: "The outcome",
      lede: "A complete digital presence built to make creative work feel consequential.",
      paragraphs: [
        "Radiant brings portfolio, positioning, services, process and enquiry into one coherent experience — with enough clarity to sell complex capabilities and enough personality to remain memorable.",
      ],
      media: {
        src: "/work/radiant/radiant-responsive.webp",
        alt: "The Radiant work index shown at desktop width beside the same page at mobile width, with the project grid reflowing to a single column",
        variant: "wide",
        caption: "The same route at 1600px and 390px: the grid reflows, the hierarchy does not.",
      },
      outcomes: [
        {
          title: "Stronger portfolio storytelling",
          description:
            "A repeatable system gives varied projects individual character without losing consistency.",
        },
        {
          title: "Clearer commercial structure",
          description:
            "Services, process and engagement models turn a broad creative offer into an understandable buying journey.",
        },
        {
          title: "Production-ready responsive experience",
          description:
            "A complete multi-page implementation carries the same visual standard across desktop and mobile.",
        },
      ],
    },
  ],
};
