import type { Post as PrismaPost } from "@prisma/client";
import { calcReadingTime, slugify } from "@/lib/post-utils";
import {
  getStaticPostBySlug,
  getStaticPublishedPostBySlug,
  mergePostSummaries,
} from "@/lib/posts";
import { getPrisma, isDatabaseConfigured } from "@/lib/prisma";
import { buildPostSeo } from "@/lib/seo/auto-metadata";
import { revalidateContentPaths } from "@/lib/seo/revalidate-content";
import type { Post, PostStatus, PostSummary } from "@/types/post";

export type PostInput = {
  title?: string;
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
  let databasePosts: PostSummary[] = [];

  if (isDatabaseConfigured()) {
    try {
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
      databasePosts = records.map(serializePostSummary);
    } catch {
      databasePosts = [];
    }
  }

  return mergePostSummaries(databasePosts, options);
}

export async function getPostById(id: string): Promise<Post | null> {
  if (id.startsWith("static:")) {
    return getStaticPostBySlug(id.slice("static:".length));
  }

  if (!isDatabaseConfigured()) {
    return getStaticPostBySlug(id);
  }

  try {
    const prisma = getPrisma();
    const record = await prisma.post.findUnique({ where: { id } });
    if (record) return serializePost(record);
  } catch {
    // fall through
  }
  return getStaticPostBySlug(id);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (isDatabaseConfigured()) {
    try {
      const prisma = getPrisma();
      const record = await prisma.post.findFirst({ where: { slug } });
      if (record) return serializePost(record);
    } catch {
      // fall through to static posts
    }
  }
  return getStaticPostBySlug(slug);
}

export async function resolvePost(idOrSlug: string): Promise<Post | null> {
  const byId = await getPostById(idOrSlug);
  if (byId) return byId;
  return getPostBySlug(idOrSlug);
}

export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  if (isDatabaseConfigured()) {
    try {
      const prisma = getPrisma();
      const record = await prisma.post.findFirst({
        where: { slug, status: "published" },
      });
      if (record) return serializePost(record);
    } catch {
      // fall through to static posts
    }
  }
  return getStaticPublishedPostBySlug(slug);
}

export async function getPublishedPostSlugs(): Promise<string[]> {
  const posts = await listPosts({ status: "published" });
  return posts.map((post) => post.slug);
}

export async function createPost(input: PostInput): Promise<Post> {
  const prisma = getPrisma();
  const slug = input.slug?.trim() || slugify(input.title ?? "");
  const status = input.status ?? "draft";
  const content = input.content ?? "";
  const seo = buildPostSeo({
    title: input.title?.trim() ?? "",
    content,
    excerpt: input.excerpt,
    metaTitle: input.metaTitle,
    metaDescription: input.metaDescription,
  });

  const record = await prisma.post.create({
    data: {
      title: input.title?.trim() ?? "",
      slug,
      excerpt: seo.excerpt,
      content,
      coverImage: input.coverImage ?? "",
      tags: input.tags ?? [],
      status,
      author: input.author ?? "Comlabs Technologies Pvt Ltd",
      readingTime: calcReadingTime(content),
      metaTitle: seo.metaTitle,
      metaDescription: seo.metaDescription,
      ogImage: input.ogImage ?? "",
      canonicalUrl: input.canonicalUrl ?? "",
      publishedAt: resolvePublishedAt(status, null),
    },
  });

  revalidateContentPaths({ type: "post", slug });
  return serializePost(record);
}

export async function updatePost(id: string, input: PostInput): Promise<Post | null> {
  const prisma = getPrisma();
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return null;

  const status = input.status ?? (existing.status as PostStatus);
  const content = input.content ?? existing.content;
  const title = input.title !== undefined ? input.title.trim() : existing.title;
  const slug = input.slug !== undefined ? input.slug.trim() : existing.slug;
  const seo = buildPostSeo({
    title,
    content,
    excerpt: input.excerpt ?? existing.excerpt,
    metaTitle: input.metaTitle ?? existing.metaTitle,
    metaDescription: input.metaDescription ?? existing.metaDescription,
  });

  const record = await prisma.post.update({
    where: { id },
    data: {
      ...(input.title !== undefined ? { title } : {}),
      ...(input.slug !== undefined ? { slug } : {}),
      excerpt: seo.excerpt,
      ...(input.content !== undefined ? { content: input.content } : {}),
      ...(input.coverImage !== undefined ? { coverImage: input.coverImage } : {}),
      ...(input.tags !== undefined ? { tags: input.tags } : {}),
      ...(input.status !== undefined ? { status: input.status } : {}),
      ...(input.author !== undefined ? { author: input.author } : {}),
      metaTitle: seo.metaTitle,
      metaDescription: seo.metaDescription,
      ...(input.ogImage !== undefined ? { ogImage: input.ogImage } : {}),
      ...(input.canonicalUrl !== undefined ? { canonicalUrl: input.canonicalUrl } : {}),
      readingTime: calcReadingTime(content),
      publishedAt: resolvePublishedAt(status, existing.publishedAt),
    },
  });

  revalidateContentPaths({ type: "post", slug: existing.slug });
  if (slug !== existing.slug) {
    revalidateContentPaths({ type: "post", slug });
  }
  return serializePost(record);
}

export async function deletePost(id: string): Promise<boolean> {
  const prisma = getPrisma();
  try {
    const existing = await prisma.post.findUnique({ where: { id }, select: { slug: true } });
    await prisma.post.delete({ where: { id } });
    if (existing?.slug) {
      revalidateContentPaths({ type: "post", slug: existing.slug });
    } else {
      revalidateContentPaths({ type: "post" });
    }
    return true;
  } catch {
    return false;
  }
}
