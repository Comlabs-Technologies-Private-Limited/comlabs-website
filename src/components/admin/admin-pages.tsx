"use client";

import {
  ArrowLeft,
  BookOpenText,
  BriefcaseBusiness,
  CalendarDays,
  Eye,
  EyeOff,
  FilePlus2,
  Pencil,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

import { RichTextEditor } from "@/components/admin/editor/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/post-utils";
import { cn } from "@/lib/utils";
import type { CreatePostInput, Post, PostStatus, PostSummary } from "@/types/post";
import {
  type CaseStudyInput,
  type PublishStatus,
  useAdminStore,
} from "./admin-store";

// ─── Shared UI helpers ────────────────────────────────────────────────────────

const emptyCaseStudy: CaseStudyInput = {
  clientName: "",
  projectTitle: "",
  heroHeadline: "",
  problemStatement: "",
  whatWeBuilt: "",
  resultsImpact: "",
  coverImageName: "",
  status: "draft",
};

function PageHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          {eyebrow}
        </p>
        <h1
          className="text-2xl font-bold tracking-tight md:text-4xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          {title}
        </h1>
      </div>
      {action}
    </div>
  );
}

function StatusBadge({ status }: { status: PublishStatus | PostStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
        status === "published"
          ? "bg-foreground text-background"
          : "border border-border bg-background text-muted-foreground",
      )}
    >
      {status}
    </span>
  );
}

function StatusToggle({
  value,
  onChange,
}: {
  value: PublishStatus | PostStatus;
  onChange: (value: PostStatus) => void;
}) {
  return (
    <div className="inline-grid grid-cols-2 rounded-full border border-border bg-background p-1">
      {(["draft", "published"] as const).map((status) => (
        <button
          key={status}
          type="button"
          onClick={() => onChange(status)}
          className={cn(
            "h-9 rounded-full px-4 text-sm font-medium capitalize transition-colors",
            value === status ? "bg-foreground text-background" : "text-muted-foreground",
          )}
        >
          {status}
        </button>
      ))}
    </div>
  );
}

function UploadField({
  fileName,
  onChange,
}: {
  fileName: string;
  onChange: (fileName: string) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-3xl border border-dashed border-border bg-background p-4 transition-colors hover:bg-accent">
      <span
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{ background: "var(--warm-orange-light)", color: "var(--warm-orange)" }}
      >
        <Upload size={17} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium">
          {fileName || "Choose cover image"}
        </span>
        <span className="block truncate text-xs text-muted-foreground">
          UI only. Upload handling will be wired to the backend later.
        </span>
      </span>
      <input
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(event) => onChange(event.target.files?.[0]?.name ?? "")}
      />
    </label>
  );
}

async function uploadCoverImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: formData });
  if (!res.ok) {
    const err = (await res.json()) as { error?: string };
    throw new Error(err.error ?? "Upload failed");
  }
  const data = (await res.json()) as { url: string };
  return data.url;
}

function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1 block text-sm font-medium text-muted-foreground">{label}</span>
      {hint ? <span className="mb-2 block text-xs text-muted-foreground/70">{hint}</span> : null}
      {children}
    </label>
  );
}

function BackLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft size={15} />
      Back
    </Link>
  );
}

function MissingRecord({ backHref, label }: { backHref: string; label: string }) {
  return (
    <section className="rounded-3xl border border-border bg-card p-8 shadow-[0_2px_24px_rgba(28,25,23,0.07)]">
      <h1 className="mb-2 text-2xl font-bold tracking-tight">Missing {label}.</h1>
      <p className="mb-6 text-sm text-muted-foreground">The item could not be found.</p>
      <Link href={backHref}>
        <Button>Return to list</Button>
      </Link>
    </section>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export function DashboardPage() {
  const { caseStudies } = useAdminStore();
  const [blogTotal, setBlogTotal] = useState(0);
  const [blogPublished, setBlogPublished] = useState(0);

  useEffect(() => {
    fetch("/api/posts?limit=1")
      .then((r) => r.json())
      .then((data: { total: number }) => {
        setBlogTotal(data.total);
      })
      .catch(() => null);

    fetch("/api/posts?limit=1&status=published")
      .then((r) => r.json())
      .then((data: { total: number }) => setBlogPublished(data.total))
      .catch(() => null);
  }, []);

  const stats = [
    { label: "Case studies", value: caseStudies.length, icon: BriefcaseBusiness },
    { label: "Blog posts", value: blogTotal, icon: BookOpenText },
    { label: "Drafts", value: blogTotal - blogPublished, icon: FilePlus2 },
    { label: "Published", value: blogPublished, icon: CalendarDays },
  ];

  return (
    <section>
      <PageHeader eyebrow="Overview" title="Content command center." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article
              key={stat.label}
              className="rounded-3xl border border-border bg-card p-5 shadow-[0_2px_24px_rgba(28,25,23,0.07)]"
            >
              <div
                className="mb-8 inline-flex h-10 w-10 items-center justify-center rounded-full"
                style={{ background: "var(--warm-orange-light)", color: "var(--warm-orange)" }}
              >
                <Icon size={17} />
              </div>
              <p className="text-4xl font-bold tracking-tight">{stat.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

// ─── Case Studies (unchanged, still uses local store) ─────────────────────────

export function CaseStudiesListPage() {
  const { caseStudies, deleteCaseStudy } = useAdminStore();

  return (
    <section>
      <PageHeader
        eyebrow="Case studies"
        title="Project proof library."
        action={
          <Link href="/admin/case-studies/new">
            <Button className="gap-2">
              <Plus size={15} />
              Add new
            </Button>
          </Link>
        }
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {caseStudies.map((item) => (
          <article
            key={item.id}
            className="rounded-3xl border border-border bg-card p-5 shadow-[0_2px_24px_rgba(28,25,23,0.07)]"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-sm text-muted-foreground">{item.clientName}</p>
                <h2 className="text-xl font-bold tracking-tight">{item.projectTitle}</h2>
              </div>
              <StatusBadge status={item.status} />
            </div>
            <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {item.heroHeadline || item.problemStatement || "No summary yet."}
            </p>
            <div className="flex flex-wrap gap-2">
              <Link href={`/admin/case-studies/edit/${item.id}`}>
                <Button variant="ghost" className="gap-2">
                  <Pencil size={14} />
                  Edit
                </Button>
              </Link>
              <Button
                type="button"
                variant="ghost"
                className="gap-2 text-destructive hover:text-destructive"
                onClick={() => deleteCaseStudy(item.id)}
              >
                <Trash2 size={14} />
                Delete
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CaseStudyFormPage({ mode }: { mode: "new" | "edit" }) {
  const params = useParams<{ id?: string }>();
  const router = useRouter();
  const { caseStudies, addCaseStudy, updateCaseStudy } = useAdminStore();
  const existing = useMemo(
    () => caseStudies.find((item) => item.id === params.id),
    [caseStudies, params.id],
  );
  const [form, setForm] = useState<CaseStudyInput>(
    mode === "edit" && existing ? existing : emptyCaseStudy,
  );

  if (mode === "edit" && !existing) {
    return <MissingRecord backHref="/admin/case-studies" label="case study" />;
  }

  function updateField<K extends keyof CaseStudyInput>(key: K, value: CaseStudyInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mode === "edit" && existing) {
      updateCaseStudy(existing.id, form);
    } else {
      addCaseStudy(form);
    }
    router.push("/admin/case-studies");
  }

  return (
    <section>
      <BackLink href="/admin/case-studies" />
      <PageHeader
        eyebrow="Case studies"
        title={mode === "edit" ? "Edit case study." : "Add case study."}
      />
      <form
        onSubmit={handleSubmit}
        className="grid gap-5 rounded-3xl border border-border bg-card p-5 shadow-[0_2px_24px_rgba(28,25,23,0.07)] lg:grid-cols-2"
      >
        <Field label="Client name">
          <Input
            value={form.clientName}
            onChange={(event) => updateField("clientName", event.target.value)}
            required
          />
        </Field>
        <Field label="Project title">
          <Input
            value={form.projectTitle}
            onChange={(event) => updateField("projectTitle", event.target.value)}
            required
          />
        </Field>
        <Field label="Hero headline" className="lg:col-span-2">
          <Input
            value={form.heroHeadline}
            onChange={(event) => updateField("heroHeadline", event.target.value)}
            required
          />
        </Field>
        <Field label="Problem statement" className="lg:col-span-2">
          <Textarea
            value={form.problemStatement}
            onChange={(event) => updateField("problemStatement", event.target.value)}
          />
        </Field>
        <Field label="What we built" className="lg:col-span-2">
          <Textarea
            value={form.whatWeBuilt}
            onChange={(event) => updateField("whatWeBuilt", event.target.value)}
          />
        </Field>
        <Field label="Results / Impact" className="lg:col-span-2">
          <Textarea
            value={form.resultsImpact}
            onChange={(event) => updateField("resultsImpact", event.target.value)}
          />
        </Field>
        <Field label="Cover image">
          <UploadField
            fileName={form.coverImageName}
            onChange={(fileName) => updateField("coverImageName", fileName)}
          />
        </Field>
        <Field label="Status">
          <StatusToggle
            value={form.status}
            onChange={(value) => updateField("status", value as PublishStatus)}
          />
        </Field>
        <div className="flex flex-wrap justify-end gap-3 lg:col-span-2">
          <Link href="/admin/case-studies">
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </Link>
          <Button type="submit">
            {mode === "edit" ? "Save changes" : "Create case study"}
          </Button>
        </div>
      </form>
    </section>
  );
}

// ─── Blog (API-backed) ────────────────────────────────────────────────────────

export function BlogListPage() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<PostStatus | "">("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ limit: "50" });
    if (statusFilter) params.set("status", statusFilter);
    if (search) params.set("search", search);
    const res = await fetch(`/api/posts?${params}`);
    const data = (await res.json()) as { posts: PostSummary[]; total: number };
    setPosts(data.posts);
    setTotal(data.total);
    setLoading(false);
  }, [search, statusFilter]);

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this post? This cannot be undone.")) return;
    setDeletingId(id);
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    setDeletingId(null);
    void fetchPosts();
  }

  async function handleTogglePublish(id: string) {
    setTogglingId(id);
    await fetch(`/api/posts/${id}/publish`, { method: "POST" });
    setTogglingId(null);
    void fetchPosts();
  }

  return (
    <section>
      <PageHeader
        eyebrow="Blog"
        title="Editorial workspace."
        action={
          <Link href="/admin/blog/new">
            <Button className="gap-2">
              <Plus size={15} />
              New post
            </Button>
          </Link>
        }
      />

      <div className="mb-6 flex flex-wrap gap-3">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts…"
          className="max-w-xs"
        />
        <div className="inline-grid grid-cols-3 rounded-full border border-border bg-background p-1 text-sm">
          {(
            [
              ["", "All"],
              ["published", "Published"],
              ["draft", "Drafts"],
            ] as const
          ).map(([val, label]) => (
            <button
              key={val}
              type="button"
              onClick={() => setStatusFilter(val as PostStatus | "")}
              className={cn(
                "h-9 rounded-full px-4 font-medium transition-colors",
                statusFilter === val ? "bg-foreground text-background" : "text-muted-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          Loading posts…
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-3xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          {total === 0 ? "No posts yet. Create your first one." : "No posts match your filters."}
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {posts.map((item) => (
            <article
              key={item._id}
              className="rounded-3xl border border-border bg-card p-5 shadow-[0_2px_24px_rgba(28,25,23,0.07)]"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="mb-1 text-xs text-muted-foreground">
                    {item.publishedAt
                      ? new Date(item.publishedAt).toLocaleDateString("en-IN", {
                          dateStyle: "medium",
                        })
                      : "Draft"}
                    {item.readingTime ? ` · ${item.readingTime} min read` : ""}
                  </p>
                  <h2 className="text-lg font-bold leading-snug tracking-tight">{item.title}</h2>
                </div>
                <StatusBadge status={item.status} />
              </div>
              {item.excerpt ? (
                <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {item.excerpt}
                </p>
              ) : null}
              <p className="mb-5 text-xs text-muted-foreground">/blog/{item.slug}</p>
              <div className="flex flex-wrap gap-2">
                <Link href={`/admin/blog/edit/${item._id}`}>
                  <Button variant="ghost" className="gap-2">
                    <Pencil size={14} />
                    Edit
                  </Button>
                </Link>
                <Button
                  type="button"
                  variant="ghost"
                  className="gap-2"
                  onClick={() => handleTogglePublish(item._id)}
                  disabled={togglingId === item._id}
                >
                  {item.status === "published" ? <EyeOff size={14} /> : <Eye size={14} />}
                  {item.status === "published" ? "Unpublish" : "Publish"}
                </Button>
                <Link href={`/blog/${item.slug}`} target="_blank">
                  <Button variant="ghost" className="gap-2">
                    <Eye size={14} />
                    View
                  </Button>
                </Link>
                <Button
                  type="button"
                  variant="ghost"
                  className="gap-2 text-destructive hover:text-destructive"
                  onClick={() => handleDelete(item._id)}
                  disabled={deletingId === item._id}
                >
                  <Trash2 size={14} />
                  Delete
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

// ─── Blog form ────────────────────────────────────────────────────────────────

type BlogFormState = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string;
  status: PostStatus;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
};

const emptyBlogForm: BlogFormState = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  tags: "",
  status: "draft",
  metaTitle: "",
  metaDescription: "",
  ogImage: "",
};

export function BlogFormPage({ mode }: { mode: "new" | "edit" }) {
  const params = useParams<{ id?: string }>();
  const router = useRouter();

  const [form, setForm] = useState<BlogFormState>(emptyBlogForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  useEffect(() => {
    if (mode !== "edit" || !params.id) return;
    fetch(`/api/posts/${params.id}`)
      .then((r) => r.json())
      .then((post: Post) => {
        setForm({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          coverImage: post.coverImage,
          tags: post.tags.join(", "),
          status: post.status,
          metaTitle: post.metaTitle,
          metaDescription: post.metaDescription,
          ogImage: post.ogImage,
        });
        setSlugTouched(true);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [mode, params.id]);

  function set<K extends keyof BlogFormState>(key: K, value: BlogFormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleTitleChange(value: string) {
    setForm((f) => ({
      ...f,
      title: value,
      slug: slugTouched ? f.slug : slugify(value),
    }));
  }

  async function handleCoverUpload(file: File) {
    setUploadingCover(true);
    try {
      const url = await uploadCoverImage(file);
      set("coverImage", url);
    } catch {
      alert("Cover image upload failed.");
    }
    setUploadingCover(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSaving(true);

    const payload: Partial<CreatePostInput> = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      excerpt: form.excerpt,
      content: form.content,
      coverImage: form.coverImage,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      status: form.status,
      metaTitle: form.metaTitle || form.title,
      metaDescription: form.metaDescription || form.excerpt,
      ogImage: form.ogImage || form.coverImage,
    };

    const url = mode === "edit" ? `/api/posts/${params.id}` : "/api/posts";
    const method = mode === "edit" ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? "Something went wrong. Please try again.");
      return;
    }

    router.push("/admin/blog");
  }

  if (loading) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-sm text-muted-foreground">
        Loading post…
      </div>
    );
  }

  return (
    <section>
      <BackLink href="/admin/blog" />
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Blog
          </p>
          <h1
            className="text-2xl font-bold tracking-tight md:text-4xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            {mode === "edit" ? "Edit post." : "New post."}
          </h1>
        </div>
        <Button
          type="button"
          variant="ghost"
          className="gap-2"
          onClick={() => setShowPreview((v) => !v)}
        >
          {showPreview ? <EyeOff size={15} /> : <Eye size={15} />}
          {showPreview ? "Hide preview" : "Preview"}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Main content column */}
        <div className="space-y-5">
          <div className="space-y-5 rounded-3xl border border-border bg-card p-5 shadow-[0_2px_24px_rgba(28,25,23,0.07)]">
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Content
            </p>
            <Field label="Title">
              <Input
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Post title"
                required
              />
            </Field>
            <Field label="Slug" hint="Auto-generated from title — edit to customise">
              <Input
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  set("slug", slugify(e.target.value));
                }}
                placeholder="post-slug"
                required
              />
            </Field>
            <Field
              label="Excerpt"
              hint="Shown on the blog index and used as the default meta description"
            >
              <Textarea
                value={form.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
                placeholder="A one-sentence summary of the post…"
                className="min-h-[80px]"
              />
            </Field>
            <Field label="Body content">
              <RichTextEditor
                value={form.content}
                onChange={(html) => set("content", html)}
                placeholder="Start writing your post…"
              />
            </Field>
          </div>

          <div className="space-y-5 rounded-3xl border border-border bg-card p-5 shadow-[0_2px_24px_rgba(28,25,23,0.07)]">
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              SEO & Metadata
            </p>
            <Field label="Meta title" hint="Defaults to post title · keep under 60 characters">
              <Input
                value={form.metaTitle}
                onChange={(e) => set("metaTitle", e.target.value)}
                placeholder={form.title || "Post title"}
                maxLength={80}
              />
            </Field>
            <Field
              label="Meta description"
              hint="Defaults to excerpt · keep under 160 characters"
            >
              <Textarea
                value={form.metaDescription}
                onChange={(e) => set("metaDescription", e.target.value)}
                placeholder={form.excerpt || "A short description for search engines…"}
                className="min-h-[80px]"
                maxLength={200}
              />
            </Field>
            <Field label="OG image URL" hint="Social share image · defaults to cover image">
              <Input
                value={form.ogImage}
                onChange={(e) => set("ogImage", e.target.value)}
                placeholder={form.coverImage || "https://…"}
              />
            </Field>
          </div>
        </div>

        {/* Sidebar column */}
        <div className="space-y-5">
          <div className="space-y-5 rounded-3xl border border-border bg-card p-5 shadow-[0_2px_24px_rgba(28,25,23,0.07)]">
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Settings
            </p>
            <Field label="Status">
              <StatusToggle value={form.status} onChange={(v) => set("status", v)} />
            </Field>
            <Field label="Tags" hint="Comma-separated">
              <Input
                value={form.tags}
                onChange={(e) => set("tags", e.target.value)}
                placeholder="strategy, product, design"
              />
            </Field>
            <Field label="Cover image">
              <label
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-border bg-background p-4 transition-colors hover:bg-accent",
                  uploadingCover && "pointer-events-none opacity-60",
                )}
              >
                {form.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={form.coverImage}
                    alt="Cover"
                    className="h-16 w-24 rounded-lg object-cover"
                  />
                ) : (
                  <span
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "var(--warm-orange-light)", color: "var(--warm-orange)" }}
                  >
                    <Upload size={17} />
                  </span>
                )}
                <span className="min-w-0">
                  <span className="block text-sm font-medium">
                    {uploadingCover
                      ? "Uploading…"
                      : form.coverImage
                        ? "Change image"
                        : "Upload cover"}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    PNG, JPG, WebP · max 5 MB
                  </span>
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void handleCoverUpload(file);
                    e.target.value = "";
                  }}
                />
              </label>
            </Field>
          </div>

          {error ? (
            <p className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          ) : null}

          <div className="flex flex-col gap-3">
            <Button type="submit" disabled={saving} className="h-11 w-full">
              {saving ? "Saving…" : mode === "edit" ? "Save changes" : "Create post"}
            </Button>
            <Link href="/admin/blog">
              <Button type="button" variant="ghost" className="w-full">
                Cancel
              </Button>
            </Link>
          </div>
        </div>
      </form>

      {showPreview ? (
        <div className="mt-12">
          <div className="mb-4 flex items-center gap-3">
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Preview
            </p>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-[0_2px_24px_rgba(28,25,23,0.07)] md:p-12">
            {form.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={form.coverImage}
                alt={form.title}
                className="mb-8 w-full rounded-2xl object-cover"
                style={{ maxHeight: 360 }}
              />
            ) : null}
            <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              {form.tags.split(",")[0]?.trim() || "Blog"}
            </p>
            <h1
              className="mb-4 text-3xl font-bold tracking-tight md:text-4xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              {form.title || "Post title"}
            </h1>
            {form.excerpt ? (
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">{form.excerpt}</p>
            ) : null}
            <div
              className="post-body"
              dangerouslySetInnerHTML={{ __html: form.content }}
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}

