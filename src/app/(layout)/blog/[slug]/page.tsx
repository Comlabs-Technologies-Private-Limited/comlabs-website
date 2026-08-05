import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNav } from "@/components/layout/figma-nav";
import { PostBody } from "@/components/blog/PostBody";
import { BreadcrumbJsonLd, PostJsonLd } from "@/components/blog/JsonLd";
import { buildPageMetadata } from "@/lib/metadata";
import { serializePost } from "@/lib/post-utils";
import { canonicalPath, canonicalUrl, isBlogEnabled, siteOgImagePath } from "@/lib/site";
import type { Post as PostType } from "@/types/post";

export const revalidate = 60;

async function getPost(slug: string): Promise<PostType | null> {
  try {
    const { connectDB } = await import("@/lib/db");
    const { Post } = await import("@/models/post");
    await connectDB();
    const doc = await Post.findOne({ slug, status: "published" });
    if (!doc) return null;
    return serializePost(doc);
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  if (!isBlogEnabled()) return [];

  try {
    const { connectDB } = await import("@/lib/db");
    const { Post } = await import("@/models/post");
    await connectDB();
    const slugs = await Post.find({ status: "published" }).select("slug").lean();
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  if (!isBlogEnabled()) return {};

  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const canonical = post.canonicalUrl
    ? canonicalUrl(post.canonicalUrl)
    : canonicalUrl(`/blog/${post.slug}`);
  const ogImage = post.ogImage || post.coverImage || siteOgImagePath;

  return {
    ...buildPageMetadata({
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      path: `/blog/${post.slug}`,
    }),
    alternates: { canonical },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      url: canonical,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      authors: [post.author || "Comlabs Technologies Pvt Ltd"],
      images: [{ url: ogImage }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!isBlogEnabled()) {
    notFound();
  }

  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <PostJsonLd post={post} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: canonicalUrl("/") },
          { name: "Blog", url: canonicalUrl("/blog") },
          { name: post.title, url: canonicalUrl(`/blog/${post.slug}`) },
        ]}
      />
      <FigmaNav showBlogLink={false} />

      <main>
        <article>
          <header className="px-6 pt-14 pb-10 md:pt-20 md:pb-14">
            <div className="mx-auto max-w-3xl">
              <Link
                href={canonicalPath("/blog")}
                className="mb-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft size={14} /> All posts
              </Link>

              {post.tags.length > 0 ? (
                <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  {post.tags[0]}
                </p>
              ) : null}

              <h1
                className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl"
                style={{ letterSpacing: "-0.03em" }}
              >
                {post.title}
              </h1>

              {post.excerpt ? (
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
                  {post.excerpt}
                </p>
              ) : null}

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>{post.author || "Comlabs Technologies Pvt Ltd"}</span>
                {publishedDate ? (
                  <>
                    <span aria-hidden>·</span>
                    <time dateTime={post.publishedAt ?? post.createdAt}>{publishedDate}</time>
                  </>
                ) : null}
                {post.readingTime ? (
                  <>
                    <span aria-hidden>·</span>
                    <span>{post.readingTime} min read</span>
                  </>
                ) : null}
              </div>
            </div>
          </header>

          {post.coverImage ? (
            <div className="px-6 pb-10 md:pb-14">
              <div className="mx-auto max-w-5xl">
                <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-secondary">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    priority
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ) : null}

          <div className="px-6 pb-24 md:pb-32">
            <div className="mx-auto max-w-3xl">
              <PostBody html={post.content} />

              {post.tags.length > 0 ? (
                <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </article>
      </main>

      <FigmaFooter showBlogLink={false} />
    </div>
  );
}
