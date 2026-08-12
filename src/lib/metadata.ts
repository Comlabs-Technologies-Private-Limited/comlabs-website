import type { Metadata } from "next";

import { canonicalUrl, siteName, siteOgImage } from "@/lib/site";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Path including leading slash, e.g. `/services` or `/`. */
  path: string;
  /** Use for homepage and other pages that must not use the root title template. */
  absoluteTitle?: boolean;
  /** Page-specific share image path or URL; falls back to the site image. */
  image?: string;
};

export function buildPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  image,
}: PageMetadataInput): Metadata {
  const canonical = canonicalUrl(path);
  const shareImage = image
    ? { url: image.startsWith("http") ? image : canonicalUrl(image), alt: title }
    : siteOgImage;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName,
      title,
      description,
      url: canonical,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage.url],
    },
  };
}
