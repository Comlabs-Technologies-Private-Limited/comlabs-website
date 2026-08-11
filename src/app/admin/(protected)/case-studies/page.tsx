import Link from "next/link";

import { AdminDbError } from "@/components/admin/admin-db-error";
import { listCaseStudies } from "@/lib/admin/case-studies";
import { isDatabaseConfigured } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminCaseStudiesPage() {
  if (!isDatabaseConfigured()) {
    return (
      <AdminDbError message="Add MONGODB_URI to your environment to manage case studies." />
    );
  }

  let caseStudies: Awaited<ReturnType<typeof listCaseStudies>> = [];
  let loadError: string | null = null;

  try {
    caseStudies = await listCaseStudies();
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Failed to load case studies.";
  }

  if (loadError) {
    return <AdminDbError message={loadError} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Work
          </p>
          <h1
            className="text-2xl font-bold tracking-tight md:text-4xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Case studies
          </h1>
        </div>
        <Link
          href="/admin/case-studies/new"
          className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          style={{ background: "var(--foreground)" }}
        >
          New case study
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-border bg-secondary/40 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            <tr>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Updated</th>
            </tr>
          </thead>
          <tbody>
            {caseStudies.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-muted-foreground">
                  No case studies in the database yet. Run the seed script or create a new one.
                </td>
              </tr>
            ) : (
              caseStudies.map((caseStudy) => (
                <tr key={caseStudy.id} className="border-b border-border last:border-b-0">
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/case-studies/${caseStudy.id}`}
                      className="font-medium text-foreground transition-colors hover:text-[var(--warm-orange)]"
                    >
                      {caseStudy.client}
                    </Link>
                    <p className="mt-1 text-xs text-muted-foreground">/{caseStudy.slug}</p>
                  </td>
                  <td className="px-6 py-4 capitalize text-muted-foreground">{caseStudy.status}</td>
                  <td className="px-6 py-4 text-muted-foreground">
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
