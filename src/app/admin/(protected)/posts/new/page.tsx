import { PostForm } from "@/components/admin/post-form";

export const dynamic = "force-dynamic";

export default function AdminNewPostPage() {
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
          New post
        </h1>
      </div>
      <PostForm />
    </div>
  );
}
