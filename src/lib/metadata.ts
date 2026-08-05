import type { Metadata } from "next";

import { canonicalUrl, siteName, siteOgImage } from "@/lib/site";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Path including leading slash, e.g. `/services` or `/`. */
  path: string;
  /** Use for homepage and other pages that must not use the root title template. */
  absoluteTitle?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const canonical = canonicalUrl(path);

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
      images: [siteOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteOgImage.url],
    },
  };
}
