import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth(function middleware(req) {
  if (!req.auth) {
    if (req.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin", req.url));
  }
});

export const config = {
  matcher: ["/admin/:path+", "/api/posts/:path*"],
};
