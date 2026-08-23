import type { CaseStudyPrinciple } from "@/lib/case-studies";

type CaseStudyPrinciplesProps = {
  principles: CaseStudyPrinciple[];
};

export function CaseStudyPrinciples({ principles }: CaseStudyPrinciplesProps) {
  return (
    <div className="mt-8 space-y-6 border-t border-border pt-8">
      {principles.map((principle) => (
        <div key={principle.number} className="flex items-baseline gap-4">
          <span className="shrink-0 text-xs tracking-widest text-muted-foreground tabular-nums">
            {principle.number}
          </span>
          <p className="min-w-0 text-base leading-[1.7] text-foreground md:text-[17px]">{principle.text}</p>
        </div>
      ))}
    </div>
  );
}
