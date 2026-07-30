import type { IPost } from "@/models/post";
import type { Post, PostSummary } from "@/types/post";

export function serializePost(doc: IPost): Post {
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    _id: obj._id.toString(),
    title: obj.title,
    slug: obj.slug,
    excerpt: obj.excerpt ?? "",
    content: obj.content ?? "",
    coverImage: obj.coverImage ?? "",
    tags: obj.tags ?? [],
    status: obj.status,
    author: obj.author ?? "Comlabs",
    publishedAt: obj.publishedAt ? (obj.publishedAt as Date).toISOString() : null,
    readingTime: obj.readingTime ?? 0,
    metaTitle: obj.metaTitle ?? "",
    metaDescription: obj.metaDescription ?? "",
    ogImage: obj.ogImage ?? "",
    canonicalUrl: obj.canonicalUrl ?? "",
    createdAt: (obj.createdAt as Date).toISOString(),
    updatedAt: (obj.updatedAt as Date).toISOString(),
  };
}

export function serializePostSummary(doc: IPost): PostSummary {
  const { content: _content, ...rest } = serializePost(doc);
  return rest;
}

export function calcReadingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
