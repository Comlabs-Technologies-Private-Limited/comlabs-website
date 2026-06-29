import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { connectDB } from "@/lib/db";
import { serializePost } from "@/lib/post-utils";
import { Post } from "@/models/post";

export async function POST(_req: NextRequest, ctx: RouteContext<"/api/posts/[id]/publish">) {
  await connectDB();
  const { id } = await ctx.params;

  const post = await Post.findById(id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const publishing = post.status === "draft";
  post.status = publishing ? "published" : "draft";
  if (publishing && !post.publishedAt) post.publishedAt = new Date();

  await post.save();

  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);

  return NextResponse.json(serializePost(post));
}
