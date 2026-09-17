import { aiAgentLoopingPost } from "@/lib/posts/ai-agent-looping";
import type { Post, PostStatus, PostSummary } from "@/types/post";

export const STATIC_POSTS: Post[] = [aiAgentLoopingPost];

function toSummary(post: Post): PostSummary {
  const { content: _content, ...summary } = post;
  return summary;
}

export function listStaticPosts(options?: {
  status?: PostStatus;
  search?: string;
}): PostSummary[] {
  const search = options?.search?.trim().toLowerCase();

  return STATIC_POSTS.filter((post) => {
    if (options?.status && post.status !== options.status) return false;
    if (!search) return true;
    return (
      post.title.toLowerCase().includes(search) ||
      post.slug.toLowerCase().includes(search)
    );
  }).map(toSummary);
}

export function getStaticPostBySlug(slug: string): Post | null {
  return STATIC_POSTS.find((post) => post.slug === slug) ?? null;
}

export function getStaticPublishedPostBySlug(slug: string): Post | null {
  const post = getStaticPostBySlug(slug);
  if (!post || post.status !== "published") return null;
  return post;
}

export function mergePostSummaries(
  databasePosts: PostSummary[],
  options?: { status?: PostStatus; search?: string },
): PostSummary[] {
  const bySlug = new Map(databasePosts.map((post) => [post.slug, post]));

  for (const staticPost of listStaticPosts(options)) {
    const existing = bySlug.get(staticPost.slug);
    if (!existing) {
      bySlug.set(staticPost.slug, staticPost);
      continue;
    }
    if (options?.status === "published" && existing.status !== "published") {
      bySlug.set(staticPost.slug, staticPost);
    }
  }

  return [...bySlug.values()].sort((a, b) => {
    const aDate = a.publishedAt ?? a.updatedAt;
    const bDate = b.publishedAt ?? b.updatedAt;
    return bDate.localeCompare(aDate);
  });
}
