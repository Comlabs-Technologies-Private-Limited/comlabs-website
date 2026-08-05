import { canonicalUrl, organizationId, siteName, siteOgImagePath, siteUrl } from "@/lib/site";
import type { Post } from "@/types/post";

type JsonLdProps = {
  post: Post;
};

export function PostJsonLd({ post }: JsonLdProps) {
  const pageUrl = post.canonicalUrl
    ? canonicalUrl(post.canonicalUrl)
    : canonicalUrl(`/blog/${post.slug}`);
  const image = post.ogImage || post.coverImage || `${siteUrl}${siteOgImagePath}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    image,
    datePublished: post.publishedAt ?? post.createdAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: post.author || siteName,
      url: canonicalUrl("/"),
    },
    publisher: {
      "@id": organizationId,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.url),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
