import { NextResponse } from "next/server";

import {
  COOKIE_NAME,
  createAdminToken,
  isAdminConfigured,
  verifyAdminCredentials,
} from "@/lib/auth";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin auth is not configured. Set ADMIN_EMAIL, ADMIN_PASSWORD_HASH, and JWT_SECRET." },
      { status: 503 },
    );
  }

  const body = (await request.json()) as { email?: string; password?: string };
  const email = body.email?.trim() ?? "";
  const password = body.password ?? "";

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const valid = await verifyAdminCredentials(email, password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const token = await createAdminToken(email);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
