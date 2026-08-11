import { notFound } from "next/navigation";

import { AdminDbError } from "@/components/admin/admin-db-error";
import { PostForm } from "@/components/admin/post-form";
import { getPostById } from "@/lib/admin/posts";
import { isDatabaseConfigured } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type AdminEditPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditPostPage({ params }: AdminEditPostPageProps) {
  if (!isDatabaseConfigured()) {
    return <AdminDbError message="Add MONGODB_URI to your environment to edit posts." />;
  }

  const { id } = await params;

  try {
    const post = await getPostById(id);
    if (!post) notFound();

    return (
      <div className="space-y-8">
        <div>
          <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Blog
          </p>
          <h1
            className="text-2xl font-bold tracking-tight md:text-3xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Edit post
          </h1>
        </div>
        <PostForm post={post} />
      </div>
    );
  } catch (error) {
    return (
      <AdminDbError
        message={error instanceof Error ? error.message : "Failed to load this post."}
      />
    );
  }
}
