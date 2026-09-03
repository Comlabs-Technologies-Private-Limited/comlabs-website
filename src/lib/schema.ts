import {
  canonicalUrl,
  logoUrl,
  organizationId,
  siteLocation,
  siteName,
  siteShortName,
  siteSocialProfileUrls,
  websiteId,
} from "@/lib/site";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteName,
    alternateName: siteShortName,
    url: canonicalUrl("/"),
    logo: logoUrl,
    description:
      "Comlabs Technologies is an engineering and technology operations company supporting production applications, AI systems, cloud infrastructure and digital products.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    sameAs: [...siteSocialProfileUrls],
  } as const;
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: canonicalUrl("/"),
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
  const url = canonicalUrl(input.url);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": url,
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    provider: {
      "@type": "Organization",
      "@id": organizationId,
      name: siteName,
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
    url,
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
      item: canonicalUrl(item.url),
    })),
  } as const;
}

export function getServiceCollectionSchema(input: {
  url: string;
  name: string;
  description: string;
  services: { name: string; url: string }[];
}) {
  return getCollectionPageSchema({
    url: input.url,
    name: input.name,
    description: input.description,
    items: input.services,
  });
}

export function getCollectionPageSchema(input: {
  url: string;
  name: string;
  description: string;
  items: { name: string; url: string }[];
}) {
  const url = canonicalUrl(input.url);

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url,
    url,
    name: input.name,
    description: input.description,
    publisher: {
      "@id": organizationId,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: input.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: canonicalUrl(item.url),
      })),
    },
  } as const;
}

export function getAboutPageSchema(input: {
  url: string;
  name: string;
  description: string;
}) {
  const url = canonicalUrl(input.url);

  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": url,
    url,
    name: input.name,
    description: input.description,
    mainEntity: {
      "@id": organizationId,
    },
    publisher: {
      "@id": organizationId,
    },
  } as const;
}

export function getContactPageSchema(input: {
  url: string;
  name: string;
  description: string;
}) {
  const url = canonicalUrl(input.url);

  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": url,
    url,
    name: input.name,
    description: input.description,
    mainEntity: {
      "@id": organizationId,
    },
    publisher: {
      "@id": organizationId,
    },
  } as const;
}

export function getBlogSchema(input: {
  url: string;
  name: string;
  description: string;
}) {
  const url = canonicalUrl(input.url);

  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": url,
    url,
    name: input.name,
    description: input.description,
    publisher: {
      "@id": organizationId,
    },
    inLanguage: "en-IN",
  } as const;
}

/** Visible location string for pages and footer copy. */
export const siteLocationLine = siteLocation;
