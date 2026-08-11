import type { Post as PrismaPost } from "@prisma/client";
import { calcReadingTime, slugify } from "@/lib/post-utils";
import { getPrisma } from "@/lib/prisma";
import type { Post, PostStatus, PostSummary } from "@/types/post";

export type PostInput = {
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  tags?: string[];
  status?: PostStatus;
  author?: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
};

function serializePost(record: PrismaPost): Post {
  return {
    _id: record.id,
    title: record.title,
    slug: record.slug,
    excerpt: record.excerpt,
    content: record.content,
    coverImage: record.coverImage,
    tags: record.tags,
    status: record.status as PostStatus,
    author: record.author,
    publishedAt: record.publishedAt?.toISOString() ?? null,
    readingTime: record.readingTime,
    metaTitle: record.metaTitle,
    metaDescription: record.metaDescription,
    ogImage: record.ogImage,
    canonicalUrl: record.canonicalUrl,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}

export function serializePostSummary(record: PrismaPost): PostSummary {
  const post = serializePost(record);
  const { content: _content, ...summary } = post;
  return summary;
}

function resolvePublishedAt(status: PostStatus, existing: Date | null): Date | null {
  if (status === "published") {
    return existing ?? new Date();
  }
  return null;
}

export async function listPosts(options?: {
  status?: PostStatus;
  search?: string;
}): Promise<PostSummary[]> {
  const prisma = getPrisma();
  const records = await prisma.post.findMany({
    where: {
      ...(options?.status ? { status: options.status } : {}),
      ...(options?.search
        ? {
            OR: [
              { title: { contains: options.search } },
              { slug: { contains: options.search } },
            ],
          }
        : {}),
    },
    orderBy: { updatedAt: "desc" },
  });

  return records.map(serializePostSummary);
}

export async function getPostById(id: string): Promise<Post | null> {
  const prisma = getPrisma();
  const record = await prisma.post.findUnique({ where: { id } });
  return record ? serializePost(record) : null;
}

export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  const prisma = getPrisma();
  const record = await prisma.post.findFirst({
    where: { slug, status: "published" },
  });
  return record ? serializePost(record) : null;
}

export async function getPublishedPostSlugs(): Promise<string[]> {
  const prisma = getPrisma();
  const records = await prisma.post.findMany({
    where: { status: "published" },
    select: { slug: true },
  });
  return records.map((record) => record.slug);
}

export async function createPost(input: PostInput): Promise<Post> {
  const prisma = getPrisma();
  const slug = input.slug?.trim() || slugify(input.title);
  const status = input.status ?? "draft";
  const content = input.content ?? "";

  const record = await prisma.post.create({
    data: {
      title: input.title.trim(),
      slug,
      excerpt: input.excerpt ?? "",
      content,
      coverImage: input.coverImage ?? "",
      tags: input.tags ?? [],
      status,
      author: input.author ?? "Comlabs Technologies Pvt Ltd",
      readingTime: calcReadingTime(content),
      metaTitle: input.metaTitle ?? "",
      metaDescription: input.metaDescription ?? "",
      ogImage: input.ogImage ?? "",
      canonicalUrl: input.canonicalUrl ?? "",
      publishedAt: resolvePublishedAt(status, null),
    },
  });

  return serializePost(record);
}

export async function updatePost(id: string, input: PostInput): Promise<Post | null> {
  const prisma = getPrisma();
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return null;

  const status = input.status ?? (existing.status as PostStatus);
  const content = input.content ?? existing.content;

  const record = await prisma.post.update({
    where: { id },
    data: {
      ...(input.title !== undefined ? { title: input.title.trim() } : {}),
      ...(input.slug !== undefined ? { slug: input.slug.trim() } : {}),
      ...(input.excerpt !== undefined ? { excerpt: input.excerpt } : {}),
      ...(input.content !== undefined ? { content: input.content } : {}),
      ...(input.coverImage !== undefined ? { coverImage: input.coverImage } : {}),
      ...(input.tags !== undefined ? { tags: input.tags } : {}),
      ...(input.status !== undefined ? { status: input.status } : {}),
      ...(input.author !== undefined ? { author: input.author } : {}),
      ...(input.metaTitle !== undefined ? { metaTitle: input.metaTitle } : {}),
      ...(input.metaDescription !== undefined ? { metaDescription: input.metaDescription } : {}),
      ...(input.ogImage !== undefined ? { ogImage: input.ogImage } : {}),
      ...(input.canonicalUrl !== undefined ? { canonicalUrl: input.canonicalUrl } : {}),
      readingTime: calcReadingTime(content),
      publishedAt: resolvePublishedAt(status, existing.publishedAt),
    },
  });

  return serializePost(record);
}

export async function deletePost(id: string): Promise<boolean> {
  const prisma = getPrisma();
  try {
    await prisma.post.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}
