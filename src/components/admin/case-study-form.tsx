"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { CaseStudyRecord } from "@/lib/admin/case-studies";
import type {
  CaseStudyHeadline,
  CaseStudyMedia,
  CaseStudyMetaItem,
  CaseStudySection,
} from "@/lib/case-studies";

type CaseStudyFormProps = {
  caseStudy?: CaseStudyRecord;
};

type FormState = {
  slug: string;
  client: string;
  year: string;
  headlineBefore: string;
  headlineHighlight: string;
  headlineAfter: string;
  standfirst: string;
  status: "draft" | "published";
  metaTitle: string;
  metaDescription: string;
  metaJson: string;
  leadImageJson: string;
  sectionsJson: string;
};

function toFormState(caseStudy?: CaseStudyRecord): FormState {
  return {
    slug: caseStudy?.slug ?? "",
    client: caseStudy?.client ?? "",
    year: caseStudy?.year ?? new Date().getFullYear().toString(),
    headlineBefore: caseStudy?.headline.before ?? "",
    headlineHighlight: caseStudy?.headline.highlight ?? "",
    headlineAfter: caseStudy?.headline.after ?? "",
    standfirst: caseStudy?.standfirst ?? "",
    status: caseStudy?.status ?? "draft",
    metaTitle: caseStudy?.metaTitle ?? "",
    metaDescription: caseStudy?.metaDescription ?? "",
    metaJson: JSON.stringify(caseStudy?.meta ?? [], null, 2),
    leadImageJson: JSON.stringify(
      caseStudy?.leadImage ?? { src: "", alt: "", variant: "wide" },
      null,
      2,
    ),
    sectionsJson: JSON.stringify(caseStudy?.sections ?? [], null, 2),
  };
}

function parseJsonField<T>(value: string, fieldName: string): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    throw new Error(`${fieldName} must be valid JSON.`);
  }
}

export function CaseStudyForm({ caseStudy }: CaseStudyFormProps) {
  const router = useRouter();
  const isEditing = Boolean(caseStudy);
  const [form, setForm] = useState<FormState>(() => toFormState(caseStudy));
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const headline: CaseStudyHeadline = {
        before: form.headlineBefore,
        highlight: form.headlineHighlight,
        after: form.headlineAfter,
      };
      const meta = parseJsonField<CaseStudyMetaItem[]>(form.metaJson, "Metadata");
      const leadImage = parseJsonField<CaseStudyMedia>(form.leadImageJson, "Lead image");
      const sections = parseJsonField<CaseStudySection[]>(form.sectionsJson, "Sections");

      const payload = {
        slug: form.slug.trim(),
        client: form.client.trim(),
        year: form.year.trim(),
        headline,
        standfirst: form.standfirst,
        meta,
        leadImage,
        sections,
        status: form.status,
        metaTitle: form.metaTitle,
        metaDescription: form.metaDescription,
      };

      const response = await fetch(
        isEditing ? `/api/admin/case-studies/${caseStudy?.id}` : "/api/admin/case-studies",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Save failed.");
      }

      router.push("/admin/case-studies");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Save failed.");
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!caseStudy || !window.confirm("Delete this case study permanently?")) return;
    setLoading(true);
    const response = await fetch(`/api/admin/case-studies/${caseStudy.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      setError("Delete failed.");
      setLoading(false);
      return;
    }
    router.push("/admin/case-studies");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="client" className="text-xs tracking-widest text-muted-foreground uppercase">
                Client
              </label>
              <input
                id="client"
                required
                value={form.client}
                onChange={(event) => updateField("client", event.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="slug" className="text-xs tracking-widest text-muted-foreground uppercase">
                Slug
              </label>
              <input
                id="slug"
                required
                value={form.slug}
                onChange={(event) => updateField("slug", event.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs tracking-widest text-muted-foreground uppercase">Headline</label>
            <div className="grid gap-3 md:grid-cols-3">
              <input
                value={form.headlineBefore}
                onChange={(event) => updateField("headlineBefore", event.target.value)}
                placeholder="Before highlight"
                className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none"
              />
              <input
                value={form.headlineHighlight}
                onChange={(event) => updateField("headlineHighlight", event.target.value)}
                placeholder="Orange highlight"
                className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none"
              />
              <input
                value={form.headlineAfter}
                onChange={(event) => updateField("headlineAfter", event.target.value)}
                placeholder="After highlight"
                className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="standfirst" className="text-xs tracking-widest text-muted-foreground uppercase">
              Standfirst
            </label>
            <textarea
              id="standfirst"
              rows={4}
              value={form.standfirst}
              onChange={(event) => updateField("standfirst", event.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm leading-relaxed outline-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="metaJson" className="text-xs tracking-widest text-muted-foreground uppercase">
              Metadata JSON
            </label>
            <textarea
              id="metaJson"
              rows={8}
              value={form.metaJson}
              onChange={(event) => updateField("metaJson", event.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 font-mono text-xs leading-relaxed outline-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="leadImageJson" className="text-xs tracking-widest text-muted-foreground uppercase">
              Lead image JSON
            </label>
            <textarea
              id="leadImageJson"
              rows={8}
              value={form.leadImageJson}
              onChange={(event) => updateField("leadImageJson", event.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 font-mono text-xs leading-relaxed outline-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="sectionsJson" className="text-xs tracking-widest text-muted-foreground uppercase">
              Sections JSON
            </label>
            <textarea
              id="sectionsJson"
              rows={18}
              value={form.sectionsJson}
              onChange={(event) => updateField("sectionsJson", event.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 font-mono text-xs leading-relaxed outline-none"
            />
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs tracking-widest text-muted-foreground uppercase">Publish</p>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <label htmlFor="year" className="text-sm text-muted-foreground">
                  Year
                </label>
                <input
                  id="year"
                  value={form.year}
                  onChange={(event) => updateField("year", event.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm text-muted-foreground">
                  Status
                </label>
                <select
                  id="status"
                  value={form.status}
                  onChange={(event) =>
                    updateField("status", event.target.value as "draft" | "published")
                  }
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
                {loading ? "Saving..." : isEditing ? "Update case study" : "Create case study"}
              </button>
              {isEditing ? (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center rounded-full border border-border px-5 py-3 text-sm text-muted-foreground transition-colors hover:text-destructive"
                >
                  Delete case study
                </button>
              ) : null}
            </div>
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
              rows={4}
              value={form.metaDescription}
              onChange={(event) => updateField("metaDescription", event.target.value)}
              placeholder="Meta description"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none"
            />
          </div>
        </aside>
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <p className="text-sm text-muted-foreground">
        Need to leave?{" "}
        <Link
          href="/admin/case-studies"
          className="text-foreground underline-offset-4 hover:underline"
        >
          Back to case studies
        </Link>
      </p>
    </form>
  );
}
