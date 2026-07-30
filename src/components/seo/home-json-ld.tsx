import { homeFaqs } from "@/lib/faq-data";
import { siteUrl } from "@/lib/site";

const homeUrl = `${siteUrl}/`;
const logoUrl = `${siteUrl}/logo.png`;

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Comlabs Technologies",
  legalName: "Comlabs Technologies Pvt Ltd",
  url: homeUrl,
  logo: logoUrl,
  description:
    "Comlabs is a design and development studio that creates high-performance websites and web applications for ambitious companies.",
  foundingDate: "2024",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hello@comlabstechnologies.com",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://www.linkedin.com/company/comlabs",
    "https://twitter.com/comlabs",
    "https://github.com/comlabs",
  ],
} as const;

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Comlabs Technologies",
  alternateName: ["Comlabs", "Comlabs Technologies Pvt Ltd"],
  url: homeUrl,
} as const;

const servicesOffered = [
  {
    name: "Startup website rebuilds",
    description:
      "Premium, conversion-focused website rebuilds for startups that need clearer positioning, faster pages, and credible design.",
  },
  {
    name: "Launch-ready landing pages",
    description:
      "Focused landing pages for launches, waitlists, campaigns, and high-intent traffic with analytics-ready implementation.",
  },
  {
    name: "Product UI and frontend development",
    description:
      "Product interfaces, dashboards, and customer-facing flows with responsive frontend development for startups.",
  },
  {
    name: "AI automation layers",
    description:
      "Workflow automation for lead routing, onboarding, support, and internal operations when it improves outcomes.",
  },
  {
    name: "Maintenance and iteration",
    description:
      "Ongoing improvements after launch — updates, analytics, and conversion refinements for founders who want the site to keep evolving.",
  },
].map((s) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: s.name,
  provider: { "@type": "Organization", name: "Comlabs Technologies", url: homeUrl },
  areaServed: "Worldwide",
  description: s.description,
}));

const faqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
} as const;

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function HomeJsonLd() {
  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={website} />
      {servicesOffered.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
      <JsonLd data={faqPage} />
    </>
  );
}
