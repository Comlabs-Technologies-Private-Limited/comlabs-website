"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { PostBody } from "@/components/blog/PostBody";
import { slugify } from "@/lib/post-utils";
import type { Post, PostStatus } from "@/types/post";

type PostFormProps = {
  post?: Post;
};

type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string;
  status: PostStatus;
  author: string;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  canonicalUrl: string;
};

function toFormState(post?: Post): FormState {
  return {
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    coverImage: post?.coverImage ?? "",
    tags: post?.tags.join(", ") ?? "",
    status: post?.status ?? "draft",
    author: post?.author ?? "Comlabs Technologies Pvt Ltd",
    metaTitle: post?.metaTitle ?? "",
    metaDescription: post?.metaDescription ?? "",
    ogImage: post?.ogImage ?? "",
    canonicalUrl: post?.canonicalUrl ?? "",
  };
}

export function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const isEditing = Boolean(post);
  const [form, setForm] = useState<FormState>(() => toFormState(post));
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const tags = useMemo(
    () =>
      form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    [form.tags],
  );

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      ...form,
      slug: form.slug.trim() || slugify(form.title),
      tags,
    };

    const response = await fetch(isEditing ? `/api/admin/posts/${post?._id}` : "/api/admin/posts", {
      method: isEditing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? "Save failed.");
      setLoading(false);
      return;
    }

    router.push("/admin/posts");
    router.refresh();
  }

  async function handleDelete() {
    if (!post || !window.confirm("Delete this post permanently?")) return;
    setLoading(true);
    const response = await fetch(`/api/admin/posts/${post._id}`, { method: "DELETE" });
    if (!response.ok) {
      setError("Delete failed.");
      setLoading(false);
      return;
    }
    router.push("/admin/posts");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-xs tracking-widest text-muted-foreground uppercase">
              Title
            </label>
            <input
              id="title"
              required
              value={form.title}
              onChange={(event) => {
                updateField("title", event.target.value);
                if (!isEditing && !form.slug) {
                  updateField("slug", slugify(event.target.value));
                }
              }}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base font-medium outline-none focus:border-foreground/30"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="slug" className="text-xs tracking-widest text-muted-foreground uppercase">
              Slug
            </label>
            <input
              id="slug"
              value={form.slug}
              onChange={(event) => updateField("slug", slugify(event.target.value))}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground/30"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="excerpt" className="text-xs tracking-widest text-muted-foreground uppercase">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              rows={3}
              value={form.excerpt}
              onChange={(event) => updateField("excerpt", event.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm leading-relaxed outline-none focus:border-foreground/30"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setTab("write")}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  tab === "write" ? "bg-secondary text-foreground" : "text-muted-foreground"
                }`}
              >
                Write
              </button>
              <button
                type="button"
                onClick={() => setTab("preview")}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  tab === "preview" ? "bg-secondary text-foreground" : "text-muted-foreground"
                }`}
              >
                Preview
              </button>
            </div>

            {tab === "write" ? (
              <textarea
                id="content"
                rows={18}
                value={form.content}
                onChange={(event) => updateField("content", event.target.value)}
                placeholder="<p>Write HTML content here...</p>"
                className="w-full rounded-xl border border-border bg-background px-4 py-4 font-mono text-sm leading-relaxed outline-none focus:border-foreground/30"
              />
            ) : (
              <div className="rounded-xl border border-border bg-card p-6">
                <PostBody html={form.content || "<p>Nothing to preview yet.</p>"} />
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs tracking-widest text-muted-foreground uppercase">Publish</p>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm text-muted-foreground">
                  Status
                </label>
                <select
                  id="status"
                  value={form.status}
                  onChange={(event) => updateField("status", event.target.value as PostStatus)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Saving..." : isEditing ? "Update post" : "Create post"}
              </button>
              {isEditing ? (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center rounded-full border border-border px-5 py-3 text-sm text-muted-foreground transition-colors hover:text-destructive"
                >
                  Delete post
                </button>
              ) : null}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <p className="text-xs tracking-widest text-muted-foreground uppercase">Details</p>
            <input
              value={form.author}
              onChange={(event) => updateField("author", event.target.value)}
              placeholder="Author"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none"
            />
            <input
              value={form.coverImage}
              onChange={(event) => updateField("coverImage", event.target.value)}
              placeholder="Cover image URL"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none"
            />
            <input
              value={form.tags}
              onChange={(event) => updateField("tags", event.target.value)}
              placeholder="Tags, comma separated"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none"
            />
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <p className="text-xs tracking-widest text-muted-foreground uppercase">SEO</p>
            <input
              value={form.metaTitle}
              onChange={(event) => updateField("metaTitle", event.target.value)}
              placeholder="Meta title"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none"
            />
            <textarea
              rows={3}
              value={form.metaDescription}
              onChange={(event) => updateField("metaDescription", event.target.value)}
              placeholder="Meta description"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none"
            />
            <input
              value={form.ogImage}
              onChange={(event) => updateField("ogImage", event.target.value)}
              placeholder="OG image URL"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none"
            />
            <input
              value={form.canonicalUrl}
              onChange={(event) => updateField("canonicalUrl", event.target.value)}
              placeholder="Canonical URL"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none"
            />
          </div>
        </aside>
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <p className="text-sm text-muted-foreground">
        Need to leave?{" "}
        <Link href="/admin/posts" className="text-foreground underline-offset-4 hover:underline">
          Back to posts
        </Link>
      </p>
    </form>
  );
}
