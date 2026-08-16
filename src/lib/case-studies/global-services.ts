import type { CaseStudyContent } from "@/lib/case-studies";

export const globalServicesCaseStudy: CaseStudyContent = {
  slug: "global-services",
  client: "Global Services",
  year: "2025",
  headline: {
    before: "A website built to earn ",
    highlight: "enterprise",
    after: " trust.",
  },
  standfirst:
    "We rebuilt Global Services' website to close the gap between their capability in the field and how they appeared online — with clearer positioning, stronger structure and conversion paths built for enterprise buyers.",
  ogImage: "/work/global-services/global-services-case-study-hero.webp",
  meta: [
    { label: "Client", value: "Global Services" },
    { label: "Service", value: "Website Design & Development" },
    { label: "Scope", value: "Positioning · Information Architecture · Website Design & Build" },
    { label: "Year", value: "2025" },
    {
      label: "Clients served",
      value: "JIO · Vodafone-Idea",
    },
    {
      label: "Website",
      value: "global-services-website.vercel.app",
      href: "https://global-services-website.vercel.app",
    },
  ],
  leadImage: {
    src: "/work/global-services/global-services-case-study-hero.webp",
    alt: "Global Services homepage hero with the headline Infrastructure delivered with discipline beside a tower-work photograph",
    variant: "wide",
    caption:
      "The opening frame now reads at enterprise scale: category, claim, proof of field work, and a direct path to consultation.",
  },
  sections: [
    {
      number: "01",
      title: "The context",
      paragraphs: [
        "Global Services operates in serious infrastructure work. Their team handles complex engagements with large organisations — but their website told a different story.",
        "There was a mismatch between what the company could deliver in the field and how it appeared online. For a business pursuing enterprise contracts, that gap creates friction long before a conversation begins.",
      ],
    },
    {
      number: "02",
      title: "The problem",
      paragraphs: [
        "The old site did not win enterprise trust. It failed to communicate the scale and seriousness of Global Services' work, and good leads slipped through because the website could not carry the pitch.",
        "Enterprise buyers evaluate credibility quickly. Messaging, structure and visual tone all need to align — otherwise a capable company reads as smaller or less established than it actually is.",
      ],
      media: {
        src: "/work/global-services/global-services-about.webp",
        alt: "Global Services about page with Field experience that shows in every handover beside a tower technician photograph",
        caption:
          "About is written for buyers who need to know the company has been on site since 2005 — not for a generic corporate bio.",
      },
    },
    {
      number: "03",
      title: "What we needed to solve",
      paragraphs: [
        "The rebuild needed to do more than look modern. It had to restructure how Global Services presented their work, their credibility and the path from first visit to enquiry.",
      ],
      principles: [
        { number: "01", text: "Communicate enterprise credibility from the first scroll." },
        { number: "02", text: "Make the company's capability legible through structure, not jargon." },
        { number: "03", text: "Design conversion paths that support real sales conversations." },
      ],
    },
    {
      number: "04",
      title: "The approach",
      paragraphs: [
        "We started with positioning and information architecture — understanding what enterprise buyers needed to see, in what order, before they would trust Global Services with a conversation.",
        "The site structure was rebuilt around clarity: who Global Services works with, what they deliver, and why a buyer should take the next step. Every section needed to earn the one after it.",
      ],
      media: {
        src: "/work/global-services/global-services-work.webp",
        alt: "Homepage project modules for Reliance Jio OFC rollout and Pune Municipal Corporation water-supply infrastructure",
        variant: "wide",
        caption:
          "Named clients and scoped work sit on the homepage, so credibility is evidence rather than a logo row.",
      },
    },
    {
      number: "05",
      title: "Designing and building the site",
      subsections: [
        {
          title: "Positioning and messaging",
          paragraphs: [
            "The homepage and core pages needed to speak to enterprise decision-makers in language that felt direct and credible — not generic agency copy.",
          ],
          media: {
            src: "/work/global-services/global-services-services.webp",
            alt: "Services page opening with Capabilities across the infrastructure lifecycle and Telecom Installation and Commissioning",
            caption:
              "Services open with the lifecycle, then unpack each capability with scope a buyer can recognise.",
          },
        },
        {
          title: "Structure and navigation",
          paragraphs: [
            "We reorganised the site's information architecture so visitors could understand Global Services' scope without hunting for it. Services, credibility signals and contact paths were placed where buyers naturally look.",
          ],
          media: {
            src: "/work/global-services/global-services-capabilities.webp",
            alt: "Services page sections for OFC Construction and FTTx Deployment with field photography",
            caption:
              "OFC, FTTx and adjacent disciplines are separate stories with the same page grammar.",
          },
        },
        {
          title: "Conversion paths",
          paragraphs: [
            "Conversion was treated as a design problem, not an afterthought. Enquiry flows and calls to action were built to convert interest into conversations — not just decorate the page.",
          ],
          media: {
            src: "/work/global-services/global-services-contact.webp",
            alt: "Project consultation page with what to include guidance beside a structured enquiry form",
            variant: "wide",
            caption:
              "Contact is a project briefing, not a generic message box — the form asks for the details a sales conversation actually needs.",
          },
        },
      ],
    },
    {
      number: "06",
      title: "Engineering and delivery",
      paragraphs: [
        "The project moved from structure and design into a full website rebuild — designed and developed as one continuous engagement so positioning decisions were not lost between handoffs.",
        "The result is a site built to perform as a sales asset: credible from the first scroll, clear in its messaging, and structured to guide visitors toward enquiry.",
      ],
    },
    {
      number: "07",
      title: "The outcome",
      paragraphs: [
        "The rebuilt website gave Global Services a digital presence that finally matched their capability. Conversion improved, and the site began supporting client acquisition rather than undermining it.",
        "The positioning proved strong enough to support enterprise wins — including relationships with JIO and Vodafone-Idea, two of India's largest telecom enterprises.",
      ],
      transformation: {
        before: ["Weak digital credibility", "Unclear positioning", "Leads lost before contact"],
        after: ["Enterprise-ready presence", "Clear messaging and structure", "Conversion paths that convert"],
      },
      media: {
        src: "/work/global-services/global-services-projects.webp",
        alt: "Projects page featuring Reliance Jio OFC Infrastructure Rollout with scope of work",
        variant: "wide",
        caption:
          "Selected projects name the client, the discipline and the scope — the evidence enterprise buyers look for.",
      },
    },
    {
      number: "08",
      title: "What changed",
      outcomes: [
        {
          title: "Stronger enterprise-facing credibility",
          description: "The site now reads at the level of the clients Global Services pursues.",
        },
        {
          title: "A site that supports sales",
          description: "The website stopped being a brochure and started pulling weight as a business asset.",
        },
        {
          title: "Clearer positioning",
          description: "Visitors understand what Global Services does and why they should reach out.",
        },
      ],
    },
  ],
};
