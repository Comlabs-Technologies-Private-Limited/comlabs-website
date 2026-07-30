/**
 * Canonical site origin for metadata, sitemap, and JSON-LD.
 * Production should use https://comlabstechnologies.com — set NEXT_PUBLIC_SITE_URL in Vercel
 * after connecting the custom domain as the primary deployment URL.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://comlabstechnologies.com"
).replace(/\/$/, "");

/** Default brand assets served from /public */
export const siteFaviconPath = "/favicon.png";
export const siteOgImagePath = "/opengraph.png";

export const siteOgImage = {
  url: siteOgImagePath,
  width: 1731,
  height: 909,
  alt: "Comlabs Technologies — Web experiences, products, and AI systems",
  type: "image/png",
} as const;
