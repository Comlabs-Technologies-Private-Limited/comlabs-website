import { BreadcrumbJsonLd } from "@/components/blog/JsonLd";
import type { CaseStudyContent } from "@/lib/case-studies";
import { canonicalUrl, organizationId, siteName, siteUrl } from "@/lib/site";

type CaseStudyJsonLdProps = {
  content: CaseStudyContent;
  metaTitle: string;
  metaDescription: string;
  updatedAt?: string;
};

export function CaseStudyJsonLd({
  content,
  metaTitle,
  metaDescription,
  updatedAt,
}: CaseStudyJsonLdProps) {
  const pageUrl = canonicalUrl(`/work/${content.slug}`);
  const image = content.leadImage.src.startsWith("http")
    ? content.leadImage.src
    : `${siteUrl}${content.leadImage.src}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: metaTitle,
    description: metaDescription,
    image,
    datePublished: `${content.year}-01-01`,
    ...(updatedAt ? { dateModified: updatedAt } : {}),
    author: {
      "@type": "Organization",
      name: siteName,
      url: canonicalUrl("/"),
    },
    publisher: {
      "@id": organizationId,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    about: {
      "@type": "Organization",
      name: content.client,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: canonicalUrl("/") },
          { name: "Work", url: canonicalUrl("/work") },
          { name: content.client, url: pageUrl },
        ]}
      />
    </>
  );
}
