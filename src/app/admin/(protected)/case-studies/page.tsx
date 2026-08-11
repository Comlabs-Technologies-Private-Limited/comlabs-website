import Link from "next/link";

import { listCaseStudies } from "@/lib/admin/case-studies";
import { isDatabaseConfigured } from "@/lib/prisma";

export default async function AdminCaseStudiesPage() {
  if (!isDatabaseConfigured()) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
        Configure <code className="text-foreground">MONGODB_URI</code> to manage case studies.
      </div>
    );
  }

  const caseStudies = await listCaseStudies();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-widest text-muted-foreground uppercase">Work</p>
          <h1 className="mt-3 text-3xl font-medium tracking-tight" style={{ letterSpacing: "-0.03em" }}>
            Case studies
          </h1>
        </div>
        <Link
          href="/admin/case-studies/new"
          className="inline-flex items-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          New case study
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-border bg-secondary/40 text-xs tracking-widest text-muted-foreground uppercase">
            <tr>
              <th className="px-5 py-4 font-medium">Client</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 font-medium">Updated</th>
            </tr>
          </thead>
          <tbody>
            {caseStudies.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-5 py-10 text-center text-muted-foreground">
                  No case studies in the database yet. Seed existing content or create a new one.
                </td>
              </tr>
            ) : (
              caseStudies.map((caseStudy) => (
                <tr key={caseStudy.id} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/case-studies/${caseStudy.id}`}
                      className="font-medium text-foreground transition-colors hover:text-[var(--warm-orange)]"
                    >
                      {caseStudy.client}
                    </Link>
                    <p className="mt-1 text-xs text-muted-foreground">/{caseStudy.slug}</p>
                  </td>
                  <td className="px-5 py-4 capitalize text-muted-foreground">{caseStudy.status}</td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {new Date(caseStudy.updatedAt).toLocaleDateString("en-IN", {
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
