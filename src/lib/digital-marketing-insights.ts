import { listPosts } from "@/lib/admin/posts";
import type { PostSummary } from "@/types/post";

export type MarketingInsight = {
  category: string;
  dateLabel?: string;
  title: string;
  excerpt: string;
  href: string;
  thumbnail: string;
  thumbnailAlt: string;
};

const MARKETING_KEYWORDS = [
  "seo",
  "search",
  "aeo",
  "geo",
  "marketing",
  "position",
  "conversion",
  "performance",
  "content",
  "ai",
  "visibility",
  "strategy",
  "agent",
] as const;

function scorePost(post: PostSummary): number {
  const haystack = `${post.title} ${post.excerpt} ${post.tags.join(" ")}`.toLowerCase();
  return MARKETING_KEYWORDS.reduce(
    (score, keyword) => (haystack.includes(keyword) ? score + 1 : score),
    0,
  );
}

function formatInsightDate(iso: string | null): string | undefined {
  if (!iso) return undefined;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return undefined;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function excerptTwoLines(text: string): string {
  const trimmed = text.replace(/\s+/g, " ").trim();
  if (trimmed.length <= 140) return trimmed;
  return `${trimmed.slice(0, 137).trim()}…`;
}

function fromPost(post: PostSummary): MarketingInsight {
  return {
    category: post.tags[0] ?? "Studio notes",
    dateLabel: formatInsightDate(post.publishedAt ?? post.createdAt),
    title: post.title,
    excerpt: excerptTwoLines(post.excerpt),
    href: `/blog/${post.slug}`,
    thumbnail: post.coverImage,
    thumbnailAlt: post.title,
  };
}

const RELATED_PAGES: readonly MarketingInsight[] = [
  {
    category: "Search",
    title: "SEO, AEO and copy that earns visibility",
    excerpt:
      "Search strategy, technical optimisation and clear content built for Google and AI-powered discovery.",
    href: "/services/seo-aeo-copywriting",
    thumbnail: "/services-bg/service-bg-4.png",
    thumbnailAlt: "SEO and AEO service at Comlabs",
  },
  {
    category: "Conversion",
    title: "Websites designed around the decision",
    excerpt:
      "High-performance sites planned around positioning, usability and conversion—from first structure to production.",
    href: "/services/website-design-development",
    thumbnail: "/services-bg/service-bg-1.png",
    thumbnailAlt: "Website design and development at Comlabs",
  },
];

export async function getMarketingInsights(): Promise<MarketingInsight[]> {
  const posts = await listPosts({ status: "published" });
  const ranked = [...posts].sort((a, b) => {
    const scoreDiff = scorePost(b) - scorePost(a);
    if (scoreDiff !== 0) return scoreDiff;
    const aDate = a.publishedAt ?? a.updatedAt;
    const bDate = b.publishedAt ?? b.updatedAt;
    return bDate.localeCompare(aDate);
  });

  const fromPosts = ranked.slice(0, 3).map(fromPost);
  if (fromPosts.length >= 3) return fromPosts;

  const usedHrefs = new Set(fromPosts.map((item) => item.href));
  const extras = RELATED_PAGES.filter((item) => !usedHrefs.has(item.href));
  return [...fromPosts, ...extras].slice(0, 3);
}
