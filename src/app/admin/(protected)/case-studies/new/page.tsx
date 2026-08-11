import { CaseStudyForm } from "@/components/admin/case-study-form";

export default function AdminNewCaseStudyPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs tracking-widest text-muted-foreground uppercase">Work</p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight" style={{ letterSpacing: "-0.03em" }}>
          New case study
        </h1>
      </div>
      <CaseStudyForm />
    </div>
  );
}
