import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // `/admin/(protected)` is already `noindex`, but noindex requires Google to
      // fetch the page first. Disallowing keeps crawlers off the CMS and the API
      // entirely, and covers the `/admin` sign-in page, which has no noindex.
      disallow: ["/api/", "/admin/"],
    },
    // Derived rather than hardcoded so a preview deployment advertises its own
    // sitemap instead of production's (NEXT_PUBLIC_SITE_URL).
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
