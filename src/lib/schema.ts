import {
  logoUrl,
  organizationId,
  siteLocation,
  siteName,
  siteShortName,
  siteUrl,
  websiteId,
} from "@/lib/site";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteName,
    alternateName: siteShortName,
    url: `${siteUrl}/`,
    logo: logoUrl,
    description:
      "Comlabs Technologies Pvt Ltd is a website design and software development studio in Pune, India.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
  } as const;
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: `${siteUrl}/`,
    name: siteName,
    alternateName: [
      siteShortName,
      "Comlabs",
      "comlabstechnologies.com",
    ],
    publisher: {
      "@id": organizationId,
    },
    inLanguage: "en-IN",
  } as const;
}

export function getServiceSchema(input: {
  url: string;
  name: string;
  description: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": input.url,
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    provider: {
      "@id": organizationId,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Pune",
      },
      {
        "@type": "Country",
        name: "India",
      },
    ],
    url: input.url,
  } as const;
}

export function getFaqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  } as const;
}

export function getBreadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  } as const;
}

/** Visible location string for pages and footer copy. */
export const siteLocationLine = siteLocation;
