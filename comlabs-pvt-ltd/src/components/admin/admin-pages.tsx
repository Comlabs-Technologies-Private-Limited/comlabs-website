"use client";

import {
  ArrowLeft,
  BookOpenText,
  BriefcaseBusiness,
  CalendarDays,
  FilePlus2,
  Pencil,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  BlogPostInput,
  CaseStudyInput,
  PublishStatus,
  slugify,
  useAdminStore,
} from "./admin-store";

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

const emptyBlogPost: BlogPostInput = {
  title: "",
  slug: "",
  coverImageName: "",
  body: "",
  tags: [],
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

function StatusBadge({ status }: { status: PublishStatus }) {
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
  value: PublishStatus;
  onChange: (value: PublishStatus) => void;
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

export function DashboardPage() {
  const { caseStudies, blogPosts } = useAdminStore();
  const allItems = [...caseStudies, ...blogPosts];
  const stats = [
    { label: "Case studies", value: caseStudies.length, icon: BriefcaseBusiness },
    { label: "Blog posts", value: blogPosts.length, icon: BookOpenText },
    { label: "Drafts", value: allItems.filter((item) => item.status === "draft").length, icon: FilePlus2 },
    {
      label: "Published",
      value: allItems.filter((item) => item.status === "published").length,
      icon: CalendarDays,
    },
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
  const [form, setForm] = useState<CaseStudyInput>(mode === "edit" && existing ? existing : emptyCaseStudy);

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
      <form onSubmit={handleSubmit} className="grid gap-5 rounded-3xl border border-border bg-card p-5 shadow-[0_2px_24px_rgba(28,25,23,0.07)] lg:grid-cols-2">
        <Field label="Client name">
          <Input value={form.clientName} onChange={(event) => updateField("clientName", event.target.value)} required />
        </Field>
        <Field label="Project title">
          <Input value={form.projectTitle} onChange={(event) => updateField("projectTitle", event.target.value)} required />
        </Field>
        <Field label="Hero headline" className="lg:col-span-2">
          <Input value={form.heroHeadline} onChange={(event) => updateField("heroHeadline", event.target.value)} required />
        </Field>
        <Field label="Problem statement" className="lg:col-span-2">
          <Textarea value={form.problemStatement} onChange={(event) => updateField("problemStatement", event.target.value)} />
        </Field>
        <Field label="What we built" className="lg:col-span-2">
          <Textarea value={form.whatWeBuilt} onChange={(event) => updateField("whatWeBuilt", event.target.value)} />
        </Field>
        <Field label="Results / Impact" className="lg:col-span-2">
          <Textarea value={form.resultsImpact} onChange={(event) => updateField("resultsImpact", event.target.value)} />
        </Field>
        <Field label="Cover image">
          <UploadField fileName={form.coverImageName} onChange={(fileName) => updateField("coverImageName", fileName)} />
        </Field>
        <Field label="Status">
          <StatusToggle value={form.status} onChange={(value) => updateField("status", value)} />
        </Field>
        <div className="flex flex-wrap justify-end gap-3 lg:col-span-2">
          <Link href="/admin/case-studies">
            <Button type="button" variant="ghost">Cancel</Button>
          </Link>
          <Button type="submit">{mode === "edit" ? "Save changes" : "Create case study"}</Button>
        </div>
      </form>
    </section>
  );
}

export function BlogListPage() {
  const { blogPosts, deleteBlogPost } = useAdminStore();

  return (
    <section>
      <PageHeader
        eyebrow="Blog"
        title="Editorial workspace."
        action={
          <Link href="/admin/blog/new">
            <Button className="gap-2">
              <Plus size={15} />
              Add new
            </Button>
          </Link>
        }
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {blogPosts.map((item) => (
          <article
            key={item.id}
            className="rounded-3xl border border-border bg-card p-5 shadow-[0_2px_24px_rgba(28,25,23,0.07)]"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-sm text-muted-foreground">{item.date}</p>
                <h2 className="text-xl font-bold tracking-tight">{item.title}</h2>
              </div>
              <StatusBadge status={item.status} />
            </div>
            <p className="mb-3 text-sm text-muted-foreground">/{item.slug}</p>
            <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {item.body || "No body content yet."}
            </p>
            <div className="flex flex-wrap gap-2">
              <Link href={`/admin/blog/edit/${item.id}`}>
                <Button variant="ghost" className="gap-2">
                  <Pencil size={14} />
                  Edit
                </Button>
              </Link>
              <Button
                type="button"
                variant="ghost"
                className="gap-2 text-destructive hover:text-destructive"
                onClick={() => deleteBlogPost(item.id)}
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

export function BlogFormPage({ mode }: { mode: "new" | "edit" }) {
  const params = useParams<{ id?: string }>();
  const router = useRouter();
  const { blogPosts, addBlogPost, updateBlogPost } = useAdminStore();
  const existing = useMemo(
    () => blogPosts.find((item) => item.id === params.id),
    [blogPosts, params.id],
  );
  const [form, setForm] = useState<BlogPostInput>(
    mode === "edit" && existing
      ? { ...existing }
      : emptyBlogPost,
  );
  const [slugTouched, setSlugTouched] = useState(mode === "edit");

  if (mode === "edit" && !existing) {
    return <MissingRecord backHref="/admin/blog" label="blog post" />;
  }

  function updateField<K extends keyof BlogPostInput>(key: K, value: BlogPostInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleTitleChange(value: string) {
    setForm((current) => ({
      ...current,
      title: value,
      slug: slugTouched ? current.slug : slugify(value),
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = { ...form, slug: form.slug || slugify(form.title) };
    if (mode === "edit" && existing) {
      updateBlogPost(existing.id, payload);
    } else {
      addBlogPost(payload);
    }
    router.push("/admin/blog");
  }

  return (
    <section>
      <BackLink href="/admin/blog" />
      <PageHeader eyebrow="Blog" title={mode === "edit" ? "Edit blog post." : "Add blog post."} />
      <form onSubmit={handleSubmit} className="grid gap-5 rounded-3xl border border-border bg-card p-5 shadow-[0_2px_24px_rgba(28,25,23,0.07)] lg:grid-cols-2">
        <Field label="Title">
          <Input value={form.title} onChange={(event) => handleTitleChange(event.target.value)} required />
        </Field>
        <Field label="Slug">
          <Input
            value={form.slug}
            onChange={(event) => {
              setSlugTouched(true);
              updateField("slug", slugify(event.target.value));
            }}
            required
          />
        </Field>
        <Field label="Cover image">
          <UploadField fileName={form.coverImageName} onChange={(fileName) => updateField("coverImageName", fileName)} />
        </Field>
        <Field label="Status">
          <StatusToggle value={form.status} onChange={(value) => updateField("status", value)} />
        </Field>
        <Field label="Body content" className="lg:col-span-2">
          <Textarea
            value={form.body}
            onChange={(event) => updateField("body", event.target.value)}
            className="min-h-[260px]"
            required
          />
        </Field>
        <Field label="Tags" className="lg:col-span-2">
          <Input
            value={form.tags.join(", ")}
            onChange={(event) =>
              updateField(
                "tags",
                event.target.value
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean),
              )
            }
            placeholder="strategy, product, websites"
          />
        </Field>
        <div className="flex flex-wrap justify-end gap-3 lg:col-span-2">
          <Link href="/admin/blog">
            <Button type="button" variant="ghost">Cancel</Button>
          </Link>
          <Button type="submit">{mode === "edit" ? "Save changes" : "Create post"}</Button>
        </div>
      </form>
    </section>
  );
}

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block text-sm font-medium text-muted-foreground">{label}</span>
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
      <p className="mb-6 text-sm text-muted-foreground">
        The item may have been deleted from local storage.
      </p>
      <Link href={backHref}>
        <Button>Return to list</Button>
      </Link>
    </section>
  );
}
