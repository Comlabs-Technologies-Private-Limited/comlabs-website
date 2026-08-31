/**
 * Canonical production origin for metadata, sitemap, JSON-LD, and redirects.
 * Override with NEXT_PUBLIC_SITE_URL for preview/staging; local dev keeps defaults.
 */
import { canonicalServicePaths } from "@/lib/canonical-services";
import { absoluteMediaUrl } from "@/lib/cloudinary";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.comlabstechnologies.com"
).replace(/\/$/, "");

export const siteName = "Comlabs Technologies Pvt Ltd" as const;
export const siteShortName = "Comlabs Technologies" as const;
export const siteDescriptor =
  "Application Support · AI Infrastructure · Cloud · Engineering" as const;
export const siteLocation = "Pune, Maharashtra, India" as const;

/** Default meta description — keep at or below ~155 characters for SERP display. */
export const siteDefaultDescription =
  "Comlabs provides L1–L4 application support, agentic AI engineering, AWS cloud and DevOps services, custom software development and production engineering." as const;

export const organizationId = `${siteUrl}/#organization` as const;
export const websiteId = `${siteUrl}/#website` as const;
export const logoUrl = absoluteMediaUrl("/logo.svg", siteUrl);

export function isSiteHostname(hostname: string): boolean {
  const host = hostname.replace(/\.$/, "").toLowerCase();
  return host === "comlabstechnologies.com" || host === "www.comlabstechnologies.com";
}

/**
 * Absolute canonical URL for an indexable page path or same-origin absolute URL.
 * Homepage → `https://www.comlabstechnologies.com/`
 * Do not use for entity fragments (#website), assets (.png), or external URLs.
 */
export function canonicalUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return `${siteUrl}/`;

  if (/^https?:\/\//i.test(pathOrUrl)) {
    const parsed = new URL(pathOrUrl);
    if (isSiteHostname(parsed.hostname)) {
      return canonicalUrl(`${parsed.pathname}${parsed.search}`);
    }
    return pathOrUrl;
  }

  const hashIndex = pathOrUrl.indexOf("#");
  const withoutHash = hashIndex >= 0 ? pathOrUrl.slice(0, hashIndex) : pathOrUrl;

  const queryIndex = withoutHash.indexOf("?");
  const query = queryIndex >= 0 ? withoutHash.slice(queryIndex) : "";
  const pathname = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;

  if (!pathname || pathname === "/") {
    return query ? `${siteUrl}/${query}` : `${siteUrl}/`;
  }

  const normalized = pathname.replace(/\/+$/, "").replace(/^\/+/, "");
  return `${siteUrl}/${normalized}/${query}`;
}

/**
 * Relative canonical path for internal page links (trailing slash, preserves hash anchors).
 */
export function canonicalPath(href: string): string {
  if (!href) return "/";
  if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("/api")) return href;
  if (href.startsWith("#")) return href;
  if (!href.startsWith("/")) return href;

  const hashIndex = href.indexOf("#");
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
  const pathname = hashIndex >= 0 ? href.slice(0, hashIndex) : href;

  if (pathname === "/") return hash ? `/${hash}` : "/";

  const normalized = pathname.replace(/\/+$/, "").replace(/^\/+/, "");
  return `/${normalized}/${hash}`;
}

/** Default brand assets served from /public */
export const siteFaviconPath = "/favicon.svg";
export const siteFaviconPngPath = "/favicon.png";
export const siteAppleIconPath = "/apple-touch-icon.png";
export const siteOgImagePath = "/opengraph.png";

export const siteOgImage = {
  url: absoluteMediaUrl(siteOgImagePath, siteUrl),
  width: 1731,
  height: 909,
  alt: "Comlabs Technologies Pvt Ltd — application support, AI, cloud and engineering",
  type: "image/png",
} as const;

/** Public marketing routes included in the sitemap when indexable. */
export { canonicalServicePaths as indexableServicePaths } from "@/lib/canonical-services";

export const indexableStaticPaths = [
  "/",
  "/services",
  ...canonicalServicePaths,
  "/digital-marketing",
  "/about",
  "/careers",
  "/work",
  "/contact",
] as const;

/** Blog ships with statically authored posts; hide with NEXT_PUBLIC_BLOG_ENABLED=false. */
export function isBlogEnabled(): boolean {
  return process.env.NEXT_PUBLIC_BLOG_ENABLED !== "false";
}

/** Client-safe flag — the blog is public unless explicitly disabled. */
export function isBlogPublic(): boolean {
  return isBlogEnabled();
}
