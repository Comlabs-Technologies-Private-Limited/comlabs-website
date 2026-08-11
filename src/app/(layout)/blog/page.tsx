import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { PostCard } from "@/components/blog/PostCard";
import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNav } from "@/components/layout/figma-nav";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import {
  MarketingOrangeHighlight,
  MarketingSectionHeader,
} from "@/components/marketing/marketing-section-header";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { listPosts } from "@/lib/admin/posts";
import { buildPageMetadata } from "@/lib/metadata";
import { isBlogEnabled } from "@/lib/site";
import type { PostSummary } from "@/types/post";

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadata({
  title: "Blog",
  description:
    "Strategy, design, and development insights from Comlabs Technologies Pvt Ltd on websites, product UI, and shipping reliable software.",
  path: "/blog",
});

const PAGE_SIZE = 9;

async function getPosts(page: number): Promise<{ posts: PostSummary[]; total: number }> {
  const allPosts = await listPosts({ status: "published" });
  const total = allPosts.length;
  const posts = allPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return { posts, total };
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  if (!isBlogEnabled()) {
    notFound();
  }

  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam ?? 1));

  let posts: PostSummary[] = [];
  let total = 0;

  try {
    const result = await getPosts(page);
    posts = result.posts;
    total = result.total;
  } catch {
    notFound();
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <FigmaNav />

      <main>
        <MarketingPageHero
          eyebrow="Blog"
          title={
            <>
              Insights on building things that{" "}
              <MarketingOrangeHighlight>work</MarketingOrangeHighlight>.
            </>
          }
          description="Strategy, design, and development from Comlabs Technologies Pvt Ltd — websites, product UI, and shipping reliable software."
        >
          <PageBreadcrumbs currentPath="/blog" items={[{ label: "Blog" }]} />
        </MarketingPageHero>

        <section className="border-y border-border bg-card px-6 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <MarketingSectionHeader
              className="mb-10 md:mb-12"
              eyebrow="Latest posts"
              title="Practical notes from the studio."
              description="Product thinking, engineering decisions, and lessons from client work."
            />

            {posts.length === 0 ? (
              <p className="py-16 text-center text-muted-foreground">
                No posts yet — check back soon.
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )}

            {totalPages > 1 ? (
              <nav
                aria-label="Pagination"
                className="mt-14 flex items-center justify-center gap-2"
              >
                {page > 1 ? (
                  <Link
                    href={`/blog?page=${page - 1}`}
                    className="inline-flex h-10 items-center rounded-full border border-border bg-background px-5 text-sm font-medium transition-colors hover:border-foreground/20"
                  >
                    Previous
                  </Link>
                ) : null}
                <span className="px-4 text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages ? (
                  <Link
                    href={`/blog?page=${page + 1}`}
                    className="inline-flex h-10 items-center rounded-full border border-border bg-background px-5 text-sm font-medium transition-colors hover:border-foreground/20"
                  >
                    Next
                  </Link>
                ) : null}
              </nav>
            ) : null}
          </div>
        </section>
      </main>

      <FigmaFooter />
    </div>
  );
}
