import type { CaseStudyContent } from "@/lib/case-studies";

export const vithubCaseStudy: CaseStudyContent = {
  slug: "vithub",
  client: "Vithub",
  year: "2025",
  headline: {
    before: "A brand Vithub can ",
    highlight: "grow",
    after: " on.",
  },
  standfirst:
    "We designed and built Vithub's marketing website — a design-led digital identity and campaign-ready foundation for a brand that needed somewhere credible to send traffic.",
  ogImage: "/work/vithub/vithub-case-study-hero.webp",
  meta: [
    { label: "Client", value: "Vithub" },
    { label: "Service", value: "Website Design & Development" },
    { label: "Scope", value: "Brand Identity · Website Design · Marketing Site Build" },
    { label: "Year", value: "2025" },
    { label: "Website", value: "vithub.in", href: "https://vithub.in" },
  ],
  leadImage: {
    src: "/work/vithub/vithub-case-study-hero.webp",
    alt: "Vithub homepage hero with Unleash Your Power over product photography and a Shop Now action",
    variant: "wide",
    caption:
      "The homepage leads with product, campaign photography and a single next step — not a placeholder brand page.",
  },
  sections: [
    {
      number: "01",
      title: "The context",
      paragraphs: [
        "Vithub needed more than a placeholder site. As a consumer brand building recognition in a competitive category, they needed a credible digital identity — something marketing could point traffic at and convert.",
        "The challenge was not simply building pages. It was defining how Vithub should look, communicate and feel online before a single campaign went live.",
      ],
    },
    {
      number: "02",
      title: "The problem",
      paragraphs: [
        "Without a strong website, growth efforts had nowhere meaningful to land. Traffic could arrive, but the brand would not feel established enough to convert interest into action.",
        "Vithub needed a presence that felt considered from the first interaction — a site that reflected the brand they were building, not one they were still figuring out.",
      ],
      media: {
        src: "/work/vithub/vithub-catalog.webp",
        alt: "Vithub homepage Complete Health Range module with lifestyle photography and product pouches",
        caption:
          "The brand needed a website that felt as intentional as the products themselves.",
      },
    },
    {
      number: "03",
      title: "What we needed to solve",
      paragraphs: [
        "The project required both a visual communication system and a website structure that could support ongoing marketing — not a one-off landing page.",
      ],
      principles: [
        { number: "01", text: "Establish a credible visual identity from the first frame." },
        { number: "02", text: "Build a site structure that supports campaigns and product discovery." },
        { number: "03", text: "Create a foundation marketing can grow on." },
      ],
    },
    {
      number: "04",
      title: "The approach",
      paragraphs: [
        "We treated the website as a brand system, not a template. Visual identity, typography, section rhythm and product presentation all needed to work together as one coherent experience.",
        "Every section was designed to earn attention and point somewhere — whether that was product discovery, brand story or purchase.",
      ],
      media: {
        src: "/work/vithub/vithub-shop.webp",
        alt: "Vithub All Products collection page with a product grid and add-to-cart pricing",
        variant: "wide",
        caption:
          "Collections present the range as a shoppable system, not a gallery of disconnected SKUs.",
      },
    },
    {
      number: "05",
      title: "Designing the website",
      subsections: [
        {
          title: "Visual identity",
          paragraphs: [
            "The site's visual language needed to make Vithub feel established at a glance — clean product photography, consistent spacing and a tone that matched the brand's positioning in wellness.",
          ],
          media: {
            src: "/work/vithub/vithub-case-study-hero.webp",
            alt: "Homepage hero with campaign photography, product pouches and certification marks",
            caption: "The homepage leads with product and brand clarity, not generic marketing filler.",
          },
        },
        {
          title: "Site structure",
          paragraphs: [
            "We built a structure that supports both discovery and conversion — product collections, campaign-ready pages and clear paths from first visit to purchase.",
          ],
          media: {
            src: "/work/vithub/vithub-product.webp",
            alt: "Vithub product page for 3 in 1 Gummies with gallery, benefits, pack size and add to cart",
            caption:
              "Product pages carry the campaign look through to a complete purchase decision.",
          },
        },
        {
          title: "Campaign-ready foundation",
          paragraphs: [
            "The website was built as a foundation for ongoing marketing, not a single launch moment. Sections, templates and visual patterns can support future campaigns without rebuilding from scratch.",
          ],
          media: {
            src: "/work/vithub/vithub-range.webp",
            alt: "Vithub homepage wellness banner with product pouches and a Shop Now action",
            caption: "Campaign modules sit inside the same system as the catalogue.",
          },
        },
      ],
    },
    {
      number: "06",
      title: "Building for growth",
      paragraphs: [
        "The project moved from brand definition into design and development as one engagement — so the visual system and the built site remained aligned throughout.",
        "The result is a marketing-focused website with a strong, consistent identity: design-led from the first frame, built for campaigns, and ready to support user acquisition.",
      ],
    },
    {
      number: "07",
      title: "The outcome",
      paragraphs: [
        "Vithub now has a digital identity that matches the brand they were building. The site gives marketing and growth efforts somewhere credible to send traffic — and makes the brand feel established from the first visit.",
      ],
      transformation: {
        before: ["No credible digital home", "Growth efforts without a destination", "Brand still finding its shape online"],
        after: ["Design-led marketing site", "Campaign-ready foundation", "Credible identity at first glance"],
      },
      media: {
        src: "/work/vithub/vithub-mobile.webp",
        alt: "Vithub homepage on two mobile screens showing the hero campaign and product modules",
        variant: "wide",
        caption:
          "The finished site holds together on a phone as clearly as it does on a campaign landing page.",
      },
    },
    {
      number: "08",
      title: "What changed",
      outcomes: [
        {
          title: "Credible brand presence",
          description: "Vithub now has a clear identity that makes the brand feel established at a glance.",
        },
        {
          title: "A destination for growth",
          description: "Marketing and acquisition efforts finally have somewhere meaningful to send traffic.",
        },
        {
          title: "Campaign-ready foundation",
          description: "The site supports ongoing marketing without needing to be rebuilt for every push.",
        },
      ],
    },
  ],
};
