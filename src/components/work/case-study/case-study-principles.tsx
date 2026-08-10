import type { CaseStudyPrinciple } from "@/lib/case-studies";

type CaseStudyPrinciplesProps = {
  principles: CaseStudyPrinciple[];
};

export function CaseStudyPrinciples({ principles }: CaseStudyPrinciplesProps) {
  return (
    <div className="mt-8 space-y-6 border-t border-border pt-8">
      {principles.map((principle) => (
        <div key={principle.number} className="grid grid-cols-[2.5rem_1fr] gap-4">
          <span className="text-xs tracking-widest text-muted-foreground tabular-nums">
            {principle.number}
          </span>
          <p className="text-base leading-[1.7] text-foreground md:text-[17px]">{principle.text}</p>
        </div>
      ))}
    </div>
  );
}
