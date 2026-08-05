/**
 * Canonical production origin for metadata, sitemap, JSON-LD, and redirects.
 * Override with NEXT_PUBLIC_SITE_URL for preview/staging; local dev keeps defaults.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.comlabstechnologies.com"
).replace(/\/$/, "");

export const siteName = "Comlabs Technologies Pvt Ltd" as const;
export const siteShortName = "Comlabs Technologies" as const;
export const siteDescriptor =
  "Website Design & Software Development Studio" as const;
export const siteLocation = "Pune, Maharashtra, India" as const;

export const organizationId = `${siteUrl}/#organization` as const;
export const websiteId = `${siteUrl}/#website` as const;
export const logoUrl = `${siteUrl}/logo.png` as const;

/** Default brand assets served from /public */
export const siteFaviconPath = "/favicon.png";
export const siteOgImagePath = "/opengraph.png";

export const siteOgImage = {
  url: siteOgImagePath,
  width: 1731,
  height: 909,
  alt: "Comlabs Technologies Pvt Ltd — website design and software development studio",
  type: "image/png",
} as const;

/** Public marketing routes included in the sitemap when indexable. */
export const indexableStaticPaths = [
  "/",
  "/services",
  "/services/website-design-development",
  "/services/website-redesign",
  "/services/cms-development",
  "/services/erp-development",
  "/services/product-ui-development",
  "/about",
  "/work",
  "/contact",
  "/work/global-services",
  "/work/formula-lab",
  "/work/with-hub",
] as const;

/** Blog requires MongoDB on the server. */
export function isBlogEnabled(): boolean {
  return Boolean(process.env.MONGODB_URI);
}

/** Client-safe flag — set NEXT_PUBLIC_BLOG_ENABLED=true when the blog is live in production. */
export function isBlogPublic(): boolean {
  return process.env.NEXT_PUBLIC_BLOG_ENABLED === "true";
}
