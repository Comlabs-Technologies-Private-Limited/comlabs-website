import { NextResponse } from "next/server";

import {
  deleteCaseStudy,
  getCaseStudyById,
  updateCaseStudy,
} from "@/lib/admin/case-studies";
import { getAdminSession } from "@/lib/admin/session";
import { isDatabaseConfigured } from "@/lib/prisma";
import type { CaseStudyInput } from "@/lib/admin/case-studies";

async function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const session = await getAdminSession();
  if (!session) return unauthorized();

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "MONGODB_URI is not configured." }, { status: 503 });
  }

  const { id } = await context.params;

  try {
    const caseStudy = await getCaseStudyById(id);
    if (!caseStudy) {
      return NextResponse.json({ error: "Case study not found." }, { status: 404 });
    }
    return NextResponse.json({ caseStudy });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch case study." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  const session = await getAdminSession();
  if (!session) return unauthorized();

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "MONGODB_URI is not configured." }, { status: 503 });
  }

  const { id } = await context.params;

  try {
    const body = (await request.json()) as Partial<CaseStudyInput>;
    const caseStudy = await updateCaseStudy(id, body);
    if (!caseStudy) {
      return NextResponse.json({ error: "Case study not found." }, { status: 404 });
    }
    return NextResponse.json({ caseStudy });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update case study." },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const session = await getAdminSession();
  if (!session) return unauthorized();

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "MONGODB_URI is not configured." }, { status: 503 });
  }

  const { id } = await context.params;

  try {
    const deleted = await deleteCaseStudy(id);
    if (!deleted) {
      return NextResponse.json({ error: "Case study not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete case study." },
      { status: 500 },
    );
  }
}
