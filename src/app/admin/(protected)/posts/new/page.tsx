import { PostForm } from "@/components/admin/post-form";

export default function AdminNewPostPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs tracking-widest text-muted-foreground uppercase">Blog</p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight" style={{ letterSpacing: "-0.03em" }}>
          New post
        </h1>
      </div>
      <PostForm />
    </div>
  );
}
