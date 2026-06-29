import { NextRequest, NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html";
import { revalidatePath } from "next/cache";

import { connectDB } from "@/lib/db";
import { calcReadingTime, serializePost, slugify } from "@/lib/post-utils";
import { Post } from "@/models/post";
import type { UpdatePostInput } from "@/types/post";

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    "img", "h1", "h2", "h3", "h4", "pre",
  ]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ["src", "alt", "width", "height", "loading"],
    code: ["class"],
    span: ["class"],
    pre: ["class"],
  },
};

export async function GET(_req: NextRequest, ctx: RouteContext<"/api/posts/[id]">) {
  await connectDB();
  const { id } = await ctx.params;

  const post = await Post.findById(id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(serializePost(post));
}

export async function PUT(request: NextRequest, ctx: RouteContext<"/api/posts/[id]">) {
  await connectDB();
  const { id } = await ctx.params;

  const post = await Post.findById(id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = (await request.json()) as Partial<UpdatePostInput>;
  const oldSlug = post.slug;

  if (body.title !== undefined) post.title = body.title.trim();

  if (body.slug !== undefined) {
    const newSlug = slugify(body.slug);
    if (newSlug !== oldSlug) {
      const conflict = await Post.findOne({ slug: newSlug, _id: { $ne: id } }).lean();
      if (conflict) {
        return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
      }
      post.slug = newSlug;
    }
  }

  if (body.excerpt !== undefined) post.excerpt = body.excerpt.trim();
  if (body.coverImage !== undefined) post.coverImage = body.coverImage.trim();
  if (body.tags !== undefined) post.tags = body.tags.map((t) => t.trim()).filter(Boolean);
  if (body.author !== undefined) post.author = body.author.trim() || "Comlabs";
  if (body.metaTitle !== undefined) post.metaTitle = body.metaTitle.trim() || post.title;
  if (body.metaDescription !== undefined) post.metaDescription = body.metaDescription.trim();
  if (body.ogImage !== undefined) post.ogImage = body.ogImage.trim() || post.coverImage;

  if (body.content !== undefined) {
    post.content = sanitizeHtml(body.content, SANITIZE_OPTIONS);
    post.readingTime = calcReadingTime(post.content);
  }

  if (body.status !== undefined && body.status !== post.status) {
    post.status = body.status;
    if (body.status === "published" && !post.publishedAt) {
      post.publishedAt = new Date();
    }
  }

  await post.save();

  revalidatePath("/blog");
  revalidatePath(`/blog/${oldSlug}`);
  revalidatePath(`/blog/${post.slug}`);


  return NextResponse.json(serializePost(post));
}

export async function DELETE(_req: NextRequest, ctx: RouteContext<"/api/posts/[id]">) {
  await connectDB();
  const { id } = await ctx.params;

  const post = await Post.findByIdAndDelete(id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);


  return NextResponse.json({ ok: true });
}
