import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNav } from "@/components/layout/figma-nav";
import { PostBody } from "@/components/blog/PostBody";
import { BreadcrumbJsonLd, PostJsonLd } from "@/components/blog/JsonLd";
import { connectDB } from "@/lib/db";
import { serializePost } from "@/lib/post-utils";
import { Post } from "@/models/post";
import { siteUrl } from "@/lib/site";
import type { Post as PostType } from "@/types/post";

export const revalidate = 60;

async function getPost(slug: string): Promise<PostType | null> {
  await connectDB();
  const doc = await Post.findOne({ slug, status: "published" });
  if (!doc) return null;
  return serializePost(doc);
}

export async function generateStaticParams() {
  try {
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
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const base = siteUrl.replace(/\/$/, "");
  const canonical = post.canonicalUrl || `${base}/blog/${post.slug}`;
  const ogImage = post.ogImage || post.coverImage || undefined;

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    alternates: { canonical },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      url: canonical,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      authors: [post.author || "Comlabs"],
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const base = siteUrl.replace(/\/$/, "");
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
          { name: "Home", url: base },
          { name: "Blog", url: `${base}/blog` },
          { name: post.title, url: `${base}/blog/${post.slug}` },
        ]}
      />
      <FigmaNav />

      <main>
        <article>
          {/* Header */}
          <header className="px-6 pt-14 pb-10 md:pt-20 md:pb-14">
            <div className="mx-auto max-w-3xl">
              <Link
                href="/blog"
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
                <span>{post.author || "Comlabs"}</span>
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

          {/* Cover image */}
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

          {/* Post body */}
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

      <FigmaFooter />
    </div>
  );
}
