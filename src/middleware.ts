import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const APEX_HOST = "comlabstechnologies.com";
const CANONICAL_HOST = "www.comlabstechnologies.com";

function withTrailingSlash(pathname: string): string {
  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  if (!host) return NextResponse.next();

  const hostname = host.split(":")[0]?.toLowerCase();
  if (hostname !== APEX_HOST) return NextResponse.next();

  const pathname = withTrailingSlash(request.nextUrl.pathname);
  const destination = `https://${CANONICAL_HOST}${pathname}${request.nextUrl.search}`;

  return NextResponse.redirect(destination, 308);
}

export const config = {
  matcher: "/:path*",
};
