import { NextRequest, NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html";
import { revalidatePath } from "next/cache";

import { connectDB } from "@/lib/db";
import { calcReadingTime, serializePostSummary, slugify } from "@/lib/post-utils";
import { Post } from "@/models/post";
import type { CreatePostInput } from "@/types/post";

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

export async function GET(request: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") ?? 20)));

  const filter: Record<string, unknown> = {};
  if (status === "draft" || status === "published") filter.status = status;
  if (search) filter.$or = [
    { title: { $regex: search, $options: "i" } },
    { excerpt: { $regex: search, $options: "i" } },
    { tags: { $regex: search, $options: "i" } },
  ];

  const [posts, total] = await Promise.all([
    Post.find(filter)
      .select("-content")
      .sort({ updatedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Post.countDocuments(filter),
  ]);

  return NextResponse.json({
    posts: posts.map((p) => serializePostSummary(p as Parameters<typeof serializePostSummary>[0])),
    total,
    page,
    pages: Math.ceil(total / limit),
  });
}

export async function POST(request: NextRequest) {
  await connectDB();

  const body = (await request.json()) as Partial<CreatePostInput>;

  if (!body.title?.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const slug = body.slug?.trim() ? slugify(body.slug) : slugify(body.title);

  const existing = await Post.findOne({ slug }).lean();
  if (existing) {
    return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
  }

  const cleanContent = sanitizeHtml(body.content ?? "", SANITIZE_OPTIONS);
  const readingTime = calcReadingTime(cleanContent);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://comlabs.in";
  const canonicalUrl = body.canonicalUrl?.trim() || `${siteUrl}/blog/${slug}`;

  const post = await Post.create({
    title: body.title.trim(),
    slug,
    excerpt: body.excerpt?.trim() ?? "",
    content: cleanContent,
    coverImage: body.coverImage?.trim() ?? "",
    tags: (body.tags ?? []).map((t) => t.trim()).filter(Boolean),
    status: body.status ?? "draft",
    author: body.author?.trim() || "Comlabs",
    publishedAt: body.status === "published" ? new Date() : null,
    readingTime,
    metaTitle: body.metaTitle?.trim() || body.title.trim(),
    metaDescription: body.metaDescription?.trim() || body.excerpt?.trim() || "",
    ogImage: body.ogImage?.trim() || body.coverImage?.trim() || "",
    canonicalUrl,
  });

  if (post.status === "published") {
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
  }

  return NextResponse.json(post, { status: 201 });
}
