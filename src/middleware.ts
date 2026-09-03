import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const APEX_HOST = "comlabstechnologies.com";
const CANONICAL_HOST = "www.comlabstechnologies.com";

const WORK_SLUG_ALIASES: Record<string, string> = {
  "formula-lab": "formial-labs",
  "with-hub": "vithub",
};

function withTrailingSlash(pathname: string): string {
  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

/** Page routes only: `/work` or `/work/:slug`. Does not match media under `/work/:slug/:file`. */
function caseStudiesPathFromWork(pathname: string): string | null {
  const match = pathname.match(/^\/work(?:\/([^/]+))?\/?$/);
  if (!match) return null;

  const slug = match[1];
  if (!slug) return "/case-studies/";

  const canonicalSlug = WORK_SLUG_ALIASES[slug] ?? slug;
  return `/case-studies/${canonicalSlug}/`;
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  const pathname = request.nextUrl.pathname;
  const workDestination = caseStudiesPathFromWork(pathname);
  const hostname = host?.split(":")[0]?.toLowerCase();
  const isApex = hostname === APEX_HOST;

  if (workDestination) {
    if (isApex) {
      return NextResponse.redirect(
        `https://${CANONICAL_HOST}${workDestination}${request.nextUrl.search}`,
        308,
      );
    }

    const destination = request.nextUrl.clone();
    destination.pathname = workDestination;
    return NextResponse.redirect(destination, 308);
  }

  if (!host || !isApex) return NextResponse.next();

  const canonicalPath = withTrailingSlash(pathname);
  return NextResponse.redirect(
    `https://${CANONICAL_HOST}${canonicalPath}${request.nextUrl.search}`,
    308,
  );
}

export const config = {
  matcher: "/:path*",
};
