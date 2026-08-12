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
          className="grid gap-1 border-b border-border py-5 sm:grid-cols-[8.5rem_1fr] sm:gap-6"
        >
          <dt className="text-xs tracking-widest text-muted-foreground uppercase">
            {spec.label}
          </dt>
          <dd className="text-sm leading-[1.7] text-foreground md:text-base">
            {spec.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
