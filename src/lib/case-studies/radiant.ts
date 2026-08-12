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
  metaTitle: "Radiant Creative Studio Website Case Study | Comlabs Technologies",
  metaDescription:
    "See how Comlabs designed and engineered Radiant, a cinematic creative studio website combining editorial storytelling, responsive development and conversion-focused UX.",
  ogImage: "/work/radiant/radiant-case-study-hero.webp",
  meta: [
    { label: "Project", value: "Radiant" },
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
        "The challenge was to create an experience capable of presenting very different disciplines—strategy, identity, digital and motion—without flattening them into a conventional agency grid.",
        "The website needed to feel expressive enough to demonstrate taste, structured enough to make a broad offer understandable and direct enough to move serious visitors towards a conversation.",
      ],
      media: {
        src: "/work/radiant/radiant-homepage.webp",
        alt: "Radiant homepage selected-work module with an oversized headline reading Built to be remembered above a full-width project image",
        variant: "wide",
        caption:
          "Work is the first argument the homepage makes — the studio explanation comes afterwards.",
      },
    },
    {
      number: "02",
      title: "Experience strategy",
      lede: "A portfolio journey built around momentum.",
      paragraphs: [
        "Rather than treating the homepage as a sequence of independent marketing sections, we structured it as a continuous editorial journey. Work establishes the standard first. Studio positioning explains the thinking behind it. Services add commercial clarity. Process reduces uncertainty. Engagement models and the final contact moment turn interest into action.",
      ],
      sequence: [
        "Work",
        "Positioning",
        "Capabilities",
        "Process",
        "Engagement",
        "Contact",
      ],
      principles: [
        { number: "01", text: "Selected work appears before lengthy company explanation." },
        { number: "02", text: "Service breadth is organised without fragmenting the narrative." },
        { number: "03", text: "Pricing and engagement models qualify enquiries." },
        {
          number: "04",
          text: "Repeated contact paths support conversion without aggressive calls to action.",
        },
        {
          number: "05",
          text: "Internal case studies create depth without breaking the homepage rhythm.",
        },
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
        "The visual system uses oversized typography, disciplined grids, monochrome surfaces and cinematic imagery to create contrast without visual noise.",
        "Motion is concentrated around transitions, navigation and portfolio moments, allowing the work to feel alive while the underlying interface remains controlled.",
      ],
      media: {
        src: "/work/radiant/radiant-visual-system.webp",
        alt: "Radiant interface details: the navigation bar, an oversized section headline and two project cards with category tags and captions over monochrome imagery",
        variant: "wide",
        caption:
          "Navigation, display typography and card anatomy share one set of rules across every route.",
      },
      specs: [
        {
          label: "Typography",
          value:
            "Aspekta in four weights (300–900), set tight at display sizes with −0.04em to −0.06em tracking and 0.14em on uppercase labels.",
        },
        {
          label: "Colour",
          value:
            "#050505 base, #111111 surfaces, #FFFFFF and #999999 text. Colour appears only in the mark and primary action, as a cyan-to-violet-to-pink gradient (#06B6D4 → #7C3AED → #EC4899).",
        },
        {
          label: "Grid",
          value: "A twelve-column layout inside a 90rem container, stepping down to four, three, two and one column tracks.",
        },
        {
          label: "Motion",
          value:
            "Scroll-triggered reveals driven by IntersectionObserver, with a prefers-reduced-motion rule that disables looping animation and instant scroll behaviour.",
        },
        {
          label: "Image treatment",
          value:
            "Full-bleed monochrome photography and 3D renders, cropped wide with project metadata set directly on the image.",
        },
      ],
    },
    {
      number: "04",
      title: "Portfolio architecture",
      lede: "Different stories, one recognisable system.",
      paragraphs: [
        "Radiant contains multiple project narratives across technology, hospitality, architecture, fashion, publishing and climate. The portfolio system needed to give each project its own atmosphere while retaining consistent hierarchy, navigation and pacing.",
      ],
      media: [
        {
          src: "/work/radiant/radiant-project-page.webp",
          alt: "Aether project page on Radiant with the headline Making spatial computing feel human beside a spatial render",
        },
        {
          src: "/work/radiant/radiant-project-nocturne.webp",
          alt: "Nocturne project page on Radiant with the headline A hotel identity designed for life after dark beside a monochrome building photograph",
          caption:
            "Aether and Nocturne share a structure but not an atmosphere — the imagery carries the difference.",
        },
      ],
      principles: [
        { number: "01", text: "Consistent project metadata: discipline, year and a single-line premise." },
        { number: "02", text: "Flexible cinematic imagery that adapts to each subject." },
        { number: "03", text: "A repeatable case-study structure across every project route." },
        { number: "04", text: "Cross-project browsing from the end of each story." },
        { number: "05", text: "Clear return paths back to the studio offer and contact." },
      ],
      subsections: [
        {
          title: "Range without inconsistency",
          paragraphs: [
            "Architecture and publishing sit at opposite ends of the portfolio, yet both projects read as part of the same studio. The layout, metadata and typographic hierarchy stay fixed; only the subject and its treatment change.",
          ],
          media: {
            src: "/work/radiant/radiant-portfolio-range.webp",
            alt: "Forma and Field Notes project pages side by side on Radiant, showing the same page structure with different subject matter",
            variant: "wide",
          },
        },
      ],
    },
    {
      number: "05",
      title: "Responsive engineering",
      lede: "The same visual confidence at every viewport.",
      paragraphs: [
        "The desktop experience relies on scale, rhythm and wide compositions. On smaller screens, those qualities had to be translated rather than merely reduced.",
        "Typography, project imagery, navigation and content density were recalibrated so the mobile experience retained the same character without sacrificing readability or speed.",
      ],
      media: {
        src: "/work/radiant/radiant-responsive.webp",
        alt: "The Radiant work index shown at desktop width beside the same page at mobile width, with the project grid reflowing to a single column",
        variant: "wide",
        caption:
          "The same route at 1600px and 390px: the grid reflows, the hierarchy does not.",
      },
      principles: [
        { number: "01", text: "Responsive typography that keeps display type dominant on small screens." },
        { number: "02", text: "Adaptive navigation that becomes a full-screen overlay on mobile." },
        { number: "03", text: "Reordered layouts, stepping from twelve-column compositions to single-column reading." },
        { number: "04", text: "Touch-friendly controls with generously sized actions and filters." },
        {
          number: "05",
          text: "Optimised image delivery through per-width variants and lazy loading below the fold.",
        },
        {
          number: "06",
          text: "A prefers-reduced-motion rule and semantic landmarks, headings and labelled navigation throughout.",
        },
      ],
      subsections: [
        {
          title: "Translated, not shrunk",
          paragraphs: [
            "The mobile navigation resolves to a full-screen overlay with the primary action kept in view, and the contact route keeps its editorial opening above the form rather than collapsing into a bare field list.",
          ],
          media: {
            src: "/work/radiant/radiant-mobile.webp",
            alt: "Three Radiant mobile screens: the homepage hero, the full-screen navigation overlay and the contact page with its enquiry form",
            variant: "wide",
          },
        },
      ],
    },
    {
      number: "06",
      title: "Conversion",
      lede: "Expression earns attention. Structure turns it into intent.",
      paragraphs: [
        "The experience balances visual ambition with commercial clarity. Service descriptions explain the offer, engagement models establish expectations, FAQs reduce friction and contextual calls to action give visitors a natural next step throughout the journey.",
      ],
      media: [
        {
          src: "/work/radiant/radiant-engagement.webp",
          alt: "Radiant engagement models section showing three ways of working with scope and starting ranges",
        },
        {
          src: "/work/radiant/radiant-contact.webp",
          alt: "Radiant contact page with the headline Tell us what is changing above the enquiry form",
          caption:
            "Engagement models qualify the enquiry before the form is ever reached.",
        },
      ],
      principles: [
        { number: "01", text: "Clear service categories across strategy, identity, digital and motion." },
        { number: "02", text: "Defined ways of working for each type of engagement." },
        { number: "03", text: "Transparent engagement ranges stated up front." },
        { number: "04", text: "Objection-handling questions answered before the form." },
        { number: "05", text: "Persistent but restrained project calls to action." },
        { number: "06", text: "A dedicated contact route with a low-friction opening." },
      ],
      subsections: [
        {
          title: "A broad offer, made legible",
          paragraphs: [
            "The services route expands each discipline into deliverables without turning the page into a specification sheet, so breadth reads as capability rather than as a list.",
          ],
          media: {
            src: "/work/radiant/radiant-services.webp",
            alt: "Radiant services page with the headline One studio from first question to final build above discipline sections",
            variant: "wide",
          },
        },
      ],
    },
    {
      number: "07",
      title: "Engineering",
      lede: "Designed and developed as one continuous system.",
      paragraphs: [
        "The finished experience depends on design and engineering remaining aligned. Layout, type scale, media behaviour and motion were treated as parts of the same system, allowing expressive compositions to remain consistent across routes and responsive states.",
      ],
      specs: [
        {
          label: "Framework",
          value:
            "Next.js 15 on the App Router, statically prerendered per route and deployed on Vercel.",
        },
        {
          label: "Styling",
          value:
            "Tailwind CSS v4 with the palette, tracking and spacing scale defined as theme tokens rather than ad-hoc values.",
        },
        {
          label: "Motion",
          value:
            "Motion for React, using viewport-triggered reveals so animation is tied to reading position instead of running continuously.",
        },
        {
          label: "Content model",
          value:
            "A shared project model drives the work index, homepage grid and every project route from one source, so metadata stays consistent.",
        },
        {
          label: "Media",
          value:
            "Images served through the framework image pipeline with per-width variants, modern formats and lazy loading below the fold.",
        },
        {
          label: "Metadata",
          value:
            "Route-specific titles and descriptions, including project name and premise on each case-study route.",
        },
      ],
    },
    {
      number: "08",
      title: "The outcome",
      lede: "A complete digital presence built to make creative work feel consequential.",
      paragraphs: [
        "Radiant brings portfolio, positioning, services, process and enquiry into one coherent experience. The result is not simply a collection of attractive pages—it is a working studio platform with enough clarity to sell complex capabilities and enough personality to remain memorable.",
      ],
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
