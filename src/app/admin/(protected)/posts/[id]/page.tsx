import { notFound } from "next/navigation";

import { PostForm } from "@/components/admin/post-form";
import { getPostById } from "@/lib/admin/posts";
import { isDatabaseConfigured } from "@/lib/prisma";

type AdminEditPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditPostPage({ params }: AdminEditPostPageProps) {
  if (!isDatabaseConfigured()) notFound();

  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs tracking-widest text-muted-foreground uppercase">Blog</p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight" style={{ letterSpacing: "-0.03em" }}>
          Edit post
        </h1>
      </div>
      <PostForm post={post} />
    </div>
  );
}
