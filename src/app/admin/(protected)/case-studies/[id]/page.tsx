import { notFound } from "next/navigation";

import { AdminDbError } from "@/components/admin/admin-db-error";
import { CaseStudyForm } from "@/components/admin/case-study-form";
import { getCaseStudyById } from "@/lib/admin/case-studies";
import { isDatabaseConfigured } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type AdminEditCaseStudyPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditCaseStudyPage({ params }: AdminEditCaseStudyPageProps) {
  if (!isDatabaseConfigured()) {
    return <AdminDbError message="Add MONGODB_URI to your environment to edit case studies." />;
  }

  const { id } = await params;

  try {
    const caseStudy = await getCaseStudyById(id);
    if (!caseStudy) notFound();

    return (
      <div className="space-y-8">
        <div>
          <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Work
          </p>
          <h1
            className="text-2xl font-bold tracking-tight md:text-3xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Edit case study
          </h1>
        </div>
        <CaseStudyForm caseStudy={caseStudy} />
      </div>
    );
  } catch (error) {
    return (
      <AdminDbError
        message={error instanceof Error ? error.message : "Failed to load this case study."}
      />
    );
  }
}
