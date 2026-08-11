import { NextResponse } from "next/server";

import { deletePost, getPostById, updatePost } from "@/lib/admin/posts";
import { getAdminSession } from "@/lib/admin/session";
import { isDatabaseConfigured } from "@/lib/prisma";
import type { PostInput } from "@/lib/admin/posts";

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
    const post = await getPostById(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch post." },
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
    const body = (await request.json()) as PostInput;
    const post = await updatePost(id, body);
    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update post." },
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
    const deleted = await deletePost(id);
    if (!deleted) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete post." },
      { status: 500 },
    );
  }
}
