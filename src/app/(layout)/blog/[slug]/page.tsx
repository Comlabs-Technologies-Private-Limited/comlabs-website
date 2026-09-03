import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { PostBody } from "@/components/blog/PostBody";
import { PostJsonLd } from "@/components/blog/JsonLd";
import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNavLoader } from "@/components/layout/figma-nav-loader";
import { MarketingCtaSection } from "@/components/marketing/marketing-cta-section";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { getPublishedPostBySlug, getPublishedPostSlugs } from "@/lib/admin/posts";
import { buildPageMetadata } from "@/lib/metadata";
import { HERO_BACKGROUND_PATH, layeredBackgroundImage, absoluteMediaUrl } from "@/lib/cloudinary";
import { indexableCanonicalUrl } from "@/lib/seo/indexable-canonical";
import { canonicalPath, isBlogEnabled, siteUrl } from "@/lib/site";
import type { Post as PostType } from "@/types/post";

const BLOG_RELATED_SERVICES: Record<string, { label: string; href: string }[]> = {
  "when-ai-agents-get-stuck-in-loops": [
    {
      label: "AI Agent Engineering",
      href: "/services/ai-agent-development",
    },
    {
      label: "L1–L4 Application Support",
      href: "/services/application-support",
    },
  ],
};

export const revalidate = 60;
export const dynamicParams = true;

async function getPost(slug: string): Promise<PostType | null> {
  try {
    return await getPublishedPostBySlug(slug);
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  if (!isBlogEnabled()) return [];

  try {
    const slugs = await getPublishedPostSlugs();
    return slugs.map((slug) => ({ slug }));
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

  const canonical = indexableCanonicalUrl(post.canonicalUrl, `/blog/${post.slug}`);
  const ogImage = absoluteMediaUrl(
    post.ogImage || post.coverImage || "/opengraph.png",
    siteUrl,
  );

  const title = post.metaTitle || `${post.title} | Comlabs Technologies`;

  return {
    ...buildPageMetadata({
      title,
      description: post.metaDescription || post.excerpt,
      path: `/blog/${post.slug}`,
      absoluteTitle: true,
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
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <PostJsonLd post={post} />
      <FigmaNavLoader />

      <main>
        <article>
          <header
            className="relative overflow-hidden px-6 pt-12 pb-12 md:pt-16 md:pb-16"
            style={{
              backgroundImage: layeredBackgroundImage(
              "linear-gradient(180deg, rgba(247,247,244,0.86) 0%, rgba(247,247,244,0.78) 45%, rgba(247,247,244,0.92) 100%)",
              HERO_BACKGROUND_PATH,
            ),
              backgroundSize: "cover",
              backgroundPosition: "center right",
            }}
          >
            <div className="relative mx-auto max-w-3xl">
              <PageBreadcrumbs
                currentPath={`/blog/${post.slug}`}
                items={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
                className="mb-0"
              />

              <div className="mt-6 flex flex-col items-start gap-4 md:mt-8">
                <Link
                  href={canonicalPath("/blog")}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowLeft size={14} /> All posts
                </Link>

                {post.tags.length > 0 ? (
                  <div
                    className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium"
                    style={{ color: "var(--warm-orange)", background: "var(--warm-orange-light)" }}
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--warm-orange)" }}
                    />
                    {post.tags[0]}
                  </div>
                ) : null}
              </div>

              <h1
                className="mt-8 text-3xl leading-[1.12] font-medium tracking-tight md:mt-10 md:text-4xl lg:text-[2.75rem]"
                style={{ letterSpacing: "-0.03em" }}
              >
                {post.title}
              </h1>

              {post.excerpt ? (
                <p className="mt-5 text-base leading-[1.7] text-muted-foreground md:text-lg">
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
            <div className="border-b border-border bg-card px-6 py-10 md:py-14">
              <div className="mx-auto max-w-5xl">
                <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-border bg-secondary">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    priority
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          ) : null}

          <div className="border-b border-border bg-background px-6 py-16 md:py-24">
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

              {BLOG_RELATED_SERVICES[post.slug] ? (
                <nav aria-label="Related services" className="mt-10 border-t border-border pt-8">
                  <p className="mb-3 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                    Related services
                  </p>
                  <ul className="flex flex-col gap-2">
                    {BLOG_RELATED_SERVICES[post.slug]!.map((service) => (
                      <li key={service.href}>
                        <Link
                          href={canonicalPath(service.href)}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {service.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : null}

              <div className="mt-10">
                <Link
                  href={canonicalPath("/blog")}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowLeft size={14} /> All notes
                </Link>
              </div>
            </div>
          </div>
        </article>

        <MarketingCtaSection
          title="Have a looping workflow to untangle?"
          description="We design and engineer product software with stop conditions, budgets, and traces you can actually read."
          ctaLabel="Start a conversation"
        />
      </main>

      <FigmaFooter />
    </div>
  );
}
