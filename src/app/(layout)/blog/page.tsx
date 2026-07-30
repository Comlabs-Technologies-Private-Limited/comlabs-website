import type { Metadata } from "next";
import Link from "next/link";

import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNav } from "@/components/layout/figma-nav";
import { PostCard } from "@/components/blog/PostCard";
import { connectDB } from "@/lib/db";
import { serializePostSummary } from "@/lib/post-utils";
import { Post } from "@/models/post";
import { siteOgImage, siteUrl } from "@/lib/site";
import type { PostSummary } from "@/types/post";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog — Comlabs Technologies",
  description:
    "Strategy, design, and development insights from the Comlabs team. We write about building products, websites, and brand systems that perform.",
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: "Blog — Comlabs Technologies",
    description:
      "Strategy, design, and development insights from the Comlabs team.",
    url: `${siteUrl}/blog`,
    type: "website",
    images: [siteOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Comlabs Technologies",
    description:
      "Strategy, design, and development insights from the Comlabs team.",
    images: [siteOgImage.url],
  },
};

const PAGE_SIZE = 9;

async function getPosts(page: number): Promise<{ posts: PostSummary[]; total: number }> {
  await connectDB();
  const [docs, total] = await Promise.all([
    Post.find({ status: "published" })
      .select("-content")
      .sort({ publishedAt: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean(),
    Post.countDocuments({ status: "published" }),
  ]);

  return {
    posts: docs.map((d) =>
      serializePostSummary(d as Parameters<typeof serializePostSummary>[0]),
    ),
    total,
  };
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam ?? 1));
  const { posts, total } = await getPosts(page);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <FigmaNav />
      <main>
        <section className="px-6 pt-14 pb-16 md:pt-20 md:pb-20">
          <div className="mx-auto max-w-6xl">
            <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Comlabs Blog
            </p>
            <h1
              className="max-w-2xl text-3xl font-bold tracking-tight md:text-5xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              Insights on building things that work.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Strategy, design, and development — from the Comlabs team.
            </p>
          </div>
        </section>

        <section className="px-6 pb-24 md:pb-32">
          <div className="mx-auto max-w-6xl">
            {posts.length === 0 ? (
              <p className="text-center text-muted-foreground py-16">
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
                    className="inline-flex h-10 items-center rounded-full border border-border px-5 text-sm font-medium transition-colors hover:bg-accent"
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
                    className="inline-flex h-10 items-center rounded-full border border-border px-5 text-sm font-medium transition-colors hover:bg-accent"
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
