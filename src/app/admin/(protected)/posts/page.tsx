import Link from "next/link";

import { listPosts } from "@/lib/admin/posts";
import { isDatabaseConfigured } from "@/lib/prisma";

export default async function AdminPostsPage() {
  if (!isDatabaseConfigured()) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
        Configure <code className="text-foreground">MONGODB_URI</code> to manage blog posts.
      </div>
    );
  }

  const posts = await listPosts();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-widest text-muted-foreground uppercase">Blog</p>
          <h1 className="mt-3 text-3xl font-medium tracking-tight" style={{ letterSpacing: "-0.03em" }}>
            Posts
          </h1>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          New post
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-border bg-secondary/40 text-xs tracking-widest text-muted-foreground uppercase">
            <tr>
              <th className="px-5 py-4 font-medium">Title</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 font-medium">Updated</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-5 py-10 text-center text-muted-foreground">
                  No posts yet.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post._id} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/posts/${post._id}`}
                      className="font-medium text-foreground transition-colors hover:text-[var(--warm-orange)]"
                    >
                      {post.title}
                    </Link>
                    <p className="mt-1 text-xs text-muted-foreground">/{post.slug}</p>
                  </td>
                  <td className="px-5 py-4 capitalize text-muted-foreground">{post.status}</td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {new Date(post.updatedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
