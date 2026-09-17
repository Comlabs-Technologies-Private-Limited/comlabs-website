import type { CaseStudySpec } from "@/lib/case-studies";

type CaseStudySpecsProps = {
  specs: CaseStudySpec[];
};

/** Factual label/value rows — used for design-system and implementation detail. */
export function CaseStudySpecs({ specs }: CaseStudySpecsProps) {
  return (
    <dl className="mt-8 border-t border-border">
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="grid grid-cols-1 items-baseline gap-1 border-b border-border py-4 sm:grid-cols-[6.5rem_1fr] sm:gap-x-4"
        >
          <dt className="text-xs tracking-widest text-muted-foreground uppercase">
            {spec.label}
          </dt>
          <dd className="min-w-0 text-sm leading-relaxed text-foreground">
            {spec.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
