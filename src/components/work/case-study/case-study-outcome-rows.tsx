import type { CaseStudyOutcomeRow } from "@/lib/case-studies";

type CaseStudyOutcomeRowsProps = {
  outcomes: CaseStudyOutcomeRow[];
};

export function CaseStudyOutcomeRows({ outcomes }: CaseStudyOutcomeRowsProps) {
  return (
    <div className="mt-8 space-y-8 border-t border-border pt-8">
      {outcomes.map((outcome) => (
        <div key={outcome.title}>
          <h3 className="text-base font-medium tracking-tight text-foreground md:text-lg">
            {outcome.title}
          </h3>
          <p className="mt-2 text-base leading-[1.7] text-muted-foreground md:text-[17px]">
            {outcome.description}
          </p>
        </div>
      ))}
    </div>
  );
}
