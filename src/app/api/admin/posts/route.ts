import { NextResponse } from "next/server";

import { createPost, listPosts } from "@/lib/admin/posts";
import { getAdminSession } from "@/lib/admin/session";
import { isDatabaseConfigured } from "@/lib/prisma";
import type { PostInput } from "@/lib/admin/posts";

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
  const search = searchParams.get("search") ?? undefined;

  try {
    const posts = await listPosts({
      status: status ?? undefined,
      search,
    });
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to list posts." },
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
    const body = (await request.json()) as PostInput;
    if (!body.title?.trim()) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }
    const post = await createPost(body);
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create post." },
      { status: 500 },
    );
  }
}
