import Image from "next/image";
import Link from "next/link";
import type { PostSummary } from "@/types/post";

type PostCardProps = {
  post: PostSummary;
};

export function PostCard({ post }: PostCardProps) {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <article>
      <Link
        href={`/blog/${post.slug}`}
        className="group block rounded-3xl border border-border bg-card transition-colors hover:border-foreground/15"
      >
        {post.coverImage ? (
          <div className="relative aspect-[16/9] overflow-hidden rounded-t-3xl bg-secondary">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        ) : null}
        <div className="p-6 md:p-7">
          {post.tags.length > 0 ? (
            <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              {post.tags[0]}
            </p>
          ) : null}
          <h2
            className="mb-3 text-xl font-bold leading-snug tracking-tight text-foreground group-hover:text-foreground/80 transition-colors md:text-2xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            {post.title}
          </h2>
          {post.excerpt ? (
            <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
              {post.excerpt}
            </p>
          ) : null}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {date ? <span>{date}</span> : null}
            {date && post.readingTime ? <span>·</span> : null}
            {post.readingTime ? <span>{post.readingTime} min read</span> : null}
          </div>
        </div>
      </Link>
    </article>
  );
}
