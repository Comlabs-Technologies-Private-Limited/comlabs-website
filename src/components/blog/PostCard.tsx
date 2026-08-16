import Image from "next/image";
import Link from "next/link";

import { canonicalPath } from "@/lib/site";
import type { PostSummary } from "@/types/post";

type PostCardProps = {
  post: PostSummary;
  featured?: boolean;
};

function formatDate(value: string | null): string | null {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const date = formatDate(post.publishedAt);
  const href = canonicalPath(`/blog/${post.slug}`);
  const tag = post.tags[0];

  if (featured) {
    return (
      <article>
        <Link
          href={href}
          className="group grid overflow-hidden rounded-3xl border border-border bg-background transition-[border-color,box-shadow] duration-300 hover:border-foreground/20 hover:shadow-[0_8px_32px_rgba(28,25,23,0.06)] lg:grid-cols-2"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-secondary lg:aspect-auto lg:min-h-[360px]">
            {post.coverImage ? (
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            ) : (
              <div className="flex h-full min-h-[240px] items-center justify-center bg-[var(--warm-orange-light)]">
                <span className="text-4xl font-medium tracking-tight text-[var(--warm-orange)]">
                  {post.title.slice(0, 1)}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center p-8 md:p-10">
            <p className="mb-4 text-xs font-medium tracking-[0.18em] uppercase text-muted-foreground">
              Featured
            </p>
            {tag ? (
              <p
                className="mb-3 text-xs font-medium tracking-widest uppercase"
                style={{ color: "var(--warm-orange)" }}
              >
                {tag}
              </p>
            ) : null}
            <h2
              className="text-2xl font-medium leading-snug tracking-tight text-foreground md:text-3xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              {post.title}
            </h2>
            {post.excerpt ? (
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {post.excerpt}
              </p>
            ) : null}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              {date ? <time dateTime={post.publishedAt ?? undefined}>{date}</time> : null}
              {date && post.readingTime ? <span aria-hidden>·</span> : null}
              {post.readingTime ? <span>{post.readingTime} min read</span> : null}
            </div>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--warm-orange)] transition-transform duration-300 group-hover:translate-x-0.5">
              Read the note
            </span>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="h-full">
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background transition-[border-color,box-shadow] duration-300 hover:border-foreground/20 hover:shadow-[0_8px_32px_rgba(28,25,23,0.06)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-secondary">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[var(--warm-orange-light)]">
              <span className="text-3xl font-medium tracking-tight text-[var(--warm-orange)]">
                {post.title.slice(0, 1)}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6 md:p-7">
          {tag ? (
            <p
              className="mb-3 text-xs font-medium tracking-widest uppercase"
              style={{ color: "var(--warm-orange)" }}
            >
              {tag}
            </p>
          ) : null}
          <h2
            className="mb-3 text-xl font-medium leading-snug tracking-tight text-foreground transition-colors group-hover:text-foreground/80 md:text-[1.35rem]"
            style={{ letterSpacing: "-0.025em" }}
          >
            {post.title}
          </h2>
          {post.excerpt ? (
            <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
              {post.excerpt}
            </p>
          ) : null}
          <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground">
            {date ? <span>{date}</span> : null}
            {date && post.readingTime ? <span aria-hidden>·</span> : null}
            {post.readingTime ? <span>{post.readingTime} min read</span> : null}
          </div>
        </div>
      </Link>
    </article>
  );
}
