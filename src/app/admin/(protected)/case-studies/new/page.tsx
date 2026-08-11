import { CaseStudyForm } from "@/components/admin/case-study-form";

export const dynamic = "force-dynamic";

export default function AdminNewCaseStudyPage() {
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
          New case study
        </h1>
      </div>
      <CaseStudyForm />
    </div>
  );
}
