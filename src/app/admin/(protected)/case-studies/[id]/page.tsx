import { notFound } from "next/navigation";

import { CaseStudyForm } from "@/components/admin/case-study-form";
import { getCaseStudyById } from "@/lib/admin/case-studies";
import { isDatabaseConfigured } from "@/lib/prisma";

type AdminEditCaseStudyPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditCaseStudyPage({ params }: AdminEditCaseStudyPageProps) {
  if (!isDatabaseConfigured()) notFound();

  const { id } = await params;
  const caseStudy = await getCaseStudyById(id);
  if (!caseStudy) notFound();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs tracking-widest text-muted-foreground uppercase">Work</p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight" style={{ letterSpacing: "-0.03em" }}>
          Edit case study
        </h1>
      </div>
      <CaseStudyForm caseStudy={caseStudy} />
    </div>
  );
}
