import { NextResponse } from "next/server";

import { createCaseStudy, listCaseStudies } from "@/lib/admin/case-studies";
import { getAdminSession } from "@/lib/admin/session";
import { isDatabaseConfigured } from "@/lib/prisma";
import type { CaseStudyInput } from "@/lib/admin/case-studies";

async function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) return unauthorized();

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "MONGODB_URI is not configured." }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") as "draft" | "published" | null;

  try {
    const caseStudies = await listCaseStudies({ status: status ?? undefined });
    return NextResponse.json({ caseStudies });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to list case studies." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return unauthorized();

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "MONGODB_URI is not configured." }, { status: 503 });
  }

  try {
    const body = (await request.json()) as CaseStudyInput;
    if (!body.slug?.trim() || !body.client?.trim()) {
      return NextResponse.json({ error: "Slug and client are required." }, { status: 400 });
    }
    const caseStudy = await createCaseStudy(body);
    return NextResponse.json({ caseStudy }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create case study." },
      { status: 500 },
    );
  }
}
