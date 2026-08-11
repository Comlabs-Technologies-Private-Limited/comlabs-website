import Link from "next/link";

import { AdminDbError } from "@/components/admin/admin-db-error";
import { listPosts } from "@/lib/admin/posts";
import { isDatabaseConfigured } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  if (!isDatabaseConfigured()) {
    return (
      <AdminDbError message="Add MONGODB_URI to your environment to manage blog posts." />
    );
  }

  let posts: Awaited<ReturnType<typeof listPosts>> = [];
  let loadError: string | null = null;

  try {
    posts = await listPosts();
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Failed to load posts.";
  }

  if (loadError) {
    return <AdminDbError message={loadError} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Blog
          </p>
          <h1
            className="text-2xl font-bold tracking-tight md:text-4xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Posts
          </h1>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          style={{ background: "var(--foreground)" }}
        >
          New post
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-border bg-secondary/40 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Updated</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-muted-foreground">
                  No posts yet. Create your first article.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post._id} className="border-b border-border last:border-b-0">
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/posts/${post._id}`}
                      className="font-medium text-foreground transition-colors hover:text-[var(--warm-orange)]"
                    >
                      {post.title}
                    </Link>
                    <p className="mt-1 text-xs text-muted-foreground">/{post.slug}</p>
                  </td>
                  <td className="px-6 py-4 capitalize text-muted-foreground">{post.status}</td>
                  <td className="px-6 py-4 text-muted-foreground">
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
