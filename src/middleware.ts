import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { CASE_STUDY_ORDER } from "@/lib/case-studies";

/**
 * Single place where a request is normalised, so every visitor and crawler
 * reaches the canonical URL in exactly ONE redirect.
 *
 * Three corrections are composed into one 308 rather than chained:
 *   1. apex host            comlabstechnologies.com -> www.comlabstechnologies.com
 *   2. retired path         /work/... and legacy service slugs -> current route
 *   3. trailing slash       /about -> /about/   (the site's `trailingSlash: true` policy)
 *
 * `skipTrailingSlashRedirect` is set in `next.config.ts` so Next does not issue
 * its own slash redirect first. Without that, a request to `/work/global-services`
 * was answered with `/work/global-services/` and only then `/case-studies/global-services/`
 * — a two-hop chain, which is what Search Console was reporting.
 *
 * Because slash handling now lives here, this file is load-bearing for every
 * URL on the site: it must stay in place and keep its broad matcher.
 */

const APEX_HOST = "comlabstechnologies.com";
const CANONICAL_HOST = "www.comlabstechnologies.com";

/** Retired portfolio slugs that were renamed during the /work -> /case-studies move. */
const WORK_SLUG_ALIASES: Record<string, string> = {
  "formula-lab": "formial-labs",
  "with-hub": "vithub",
};

/** Retired service routes, each mapped to the single page that replaced it. */
const LEGACY_SERVICE_PATHS: Record<string, string> = {
  "/services/website-redesign": "/services/website-design-development/",
  "/services/cms-development": "/services/custom-software-development/",
  "/services/erp-development": "/services/custom-software-development/",
  "/services/product-ui-development": "/services/custom-software-development/",
};

const CASE_STUDY_SLUGS = new Set<string>(CASE_STUDY_ORDER);

/** Paths that must never gain a trailing slash. */
function isFileLikePath(pathname: string): boolean {
  return pathname.startsWith("/.well-known/") || /\.[a-z0-9]+$/i.test(pathname);
}

function withTrailingSlash(pathname: string): string {
  if (pathname === "/" || isFileLikePath(pathname)) return pathname;
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

/**
 * Final destination for a retired path, or null when the path is current.
 * Page routes only — media under `/work/:slug/:file` keeps serving from /public.
 */
function retiredPathDestination(pathname: string): string | null {
  const withoutSlash =
    pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  const legacyService = LEGACY_SERVICE_PATHS[withoutSlash];
  if (legacyService) return legacyService;

  const workMatch = withoutSlash.match(/^\/work(?:\/([^/]+))?$/);
  if (!workMatch) return null;

  const slug = workMatch[1];
  if (!slug) return "/case-studies/";

  const canonicalSlug = WORK_SLUG_ALIASES[slug] ?? slug;

  // An unknown slug would otherwise redirect to a 404. Send it to the index
  // it belonged to instead — the closest relevant page, not the homepage.
  if (!CASE_STUDY_SLUGS.has(canonicalSlug)) return "/case-studies/";

  return `/case-studies/${canonicalSlug}/`;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Framework internals and API routes are left entirely alone.
  if (pathname.startsWith("/_next/") || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const hostname = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  const needsHostRedirect = hostname === APEX_HOST;

  const targetPathname = withTrailingSlash(
    retiredPathDestination(pathname) ?? pathname,
  );
  const needsPathRedirect = targetPathname !== pathname;

  if (!needsHostRedirect && !needsPathRedirect) {
    return NextResponse.next();
  }

  // One response carries every correction at once.
  //
  // The destination is assembled as a string rather than via `nextUrl.clone()`:
  // assigning to `NextURL.pathname` re-applies Next's own normalisation and
  // strips the trailing slash back off, which turns `/about` -> `/about/` into
  // a redirect to itself.
  if (needsHostRedirect) {
    return NextResponse.redirect(
      `https://${CANONICAL_HOST}${targetPathname}${search}`,
      308,
    );
  }

  const origin = new URL(request.url).origin;
  return NextResponse.redirect(`${origin}${targetPathname}${search}`, 308);
}

export const config = {
  matcher: "/:path*",
};
