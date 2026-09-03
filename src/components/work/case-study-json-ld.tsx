import type { CaseStudyContent } from "@/lib/case-studies";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { caseStudyPath, canonicalUrl, organizationId, siteName, siteUrl } from "@/lib/site";

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
  const pageUrl = canonicalUrl(caseStudyPath(content.slug));
  const image = content.leadImage.src.startsWith("http")
    ? content.leadImage.src
    : `${siteUrl}${content.leadImage.src}`;
  const headline = [content.headline.before, content.headline.highlight, content.headline.after]
    .filter(Boolean)
    .join("");

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: headline || metaTitle,
    description: metaDescription,
    image,
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

  // The breadcrumb trail is emitted by PageBreadcrumbs inside the case-study hero.
  return <JsonLdScript data={articleJsonLd} />;
}
