import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PostCard } from "@/components/blog/PostCard";
import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNavLoader } from "@/components/layout/figma-nav-loader";
import { MarketingCtaSection } from "@/components/marketing/marketing-cta-section";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import {
  MarketingOrangeHighlight,
  MarketingSectionHeader,
} from "@/components/marketing/marketing-section-header";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { listPosts } from "@/lib/admin/posts";
import { buildPageMetadata } from "@/lib/metadata";
import { getBlogSchema } from "@/lib/schema";
import { canonicalPath, isBlogEnabled } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { PostSummary } from "@/types/post";

const BLOG_TITLE = "Engineering Insights | Comlabs Technologies";
const BLOG_DESCRIPTION =
  "Practical writing from Comlabs on application reliability, AI agents, cloud infrastructure, software engineering and production operations.";

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadata({
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
  path: "/blog",
  absoluteTitle: true,
});

const PAGE_SIZE = 8;

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
  const featured = page === 1 ? posts[0] : undefined;
  const remaining = page === 1 ? posts.slice(1) : posts;

  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <JsonLdScript
        data={getBlogSchema({
          url: "/blog",
          name: BLOG_TITLE,
          description: BLOG_DESCRIPTION,
        })}
      />
      <FigmaNavLoader />

      <main>
        <MarketingPageHero
          eyebrow="Engineering insights"
          title={
            <>
              Practical writing on systems that have to{" "}
              <MarketingOrangeHighlight>hold</MarketingOrangeHighlight>.
            </>
          }
          description="Notes on application reliability, AI agents, cloud infrastructure, software engineering and production operations."
          action={
            <Link
              href={canonicalPath("/contact")}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2"
            >
              Talk to us
              <ArrowRight size={14} aria-hidden />
            </Link>
          }
        >
          <PageBreadcrumbs currentPath="/blog" items={[{ label: "Blog" }]} />
        </MarketingPageHero>

        <section className="relative border-y border-border bg-card py-14 md:py-16">
          <span aria-hidden className="gutter-hatch" />
          <div className="section-layout">
            <MarketingSectionHeader
              className="mb-10 px-1 md:mb-12 md:px-4"
              eyebrow="Latest"
              title="From the engineering floor."
              description="Short notes from production work and internal builds — written for people who have to operate the system after it ships."
            />

            {posts.length === 0 ? (
              <p className="py-16 text-center text-muted-foreground">
                No posts yet — check back soon.
              </p>
            ) : (
              <div className="border-y border-border p-2 md:p-3">
                <div className="flat-frame">
                  {featured ? (
                    <div className={remaining.length > 0 ? "border-b border-border" : undefined}>
                      <PostCard post={featured} featured />
                    </div>
                  ) : null}
                  {remaining.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      {remaining.map((post, index) => (
                        <PostCard
                          key={post._id}
                          post={post}
                          className={cn(
                            index > 0 && "border-t border-border",
                            "md:border-t-0",
                            index >= 2 && "md:border-t md:border-border",
                            index % 2 !== 0 && "md:border-l md:border-border",
                          )}
                        />
                      ))}
                    </div>
                  ) : null}
                </div>
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

        <MarketingCtaSection
          title="Building with agents, or around them?"
          description="If a workflow is looping, stalling, or costing more than it returns, we can help you put a stop condition on it."
          ctaLabel="Start a conversation"
        />
      </main>

      <FigmaFooter />
    </div>
  );
}
