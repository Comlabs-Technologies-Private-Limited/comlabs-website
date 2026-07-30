/**
 * Canonical site origin for metadata, sitemap, and JSON-LD.
 * Production should use https://comlabstechnologies.com — set NEXT_PUBLIC_SITE_URL in Vercel
 * after connecting the custom domain as the primary deployment URL.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://comlabstechnologies.com"
).replace(/\/$/, "");
