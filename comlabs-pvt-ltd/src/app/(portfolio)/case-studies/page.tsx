import Link from "next/link";

import { TextFade } from "@/components/motion/text-fade";
import { caseStudies } from "./data";
import { bodyText, cardSurface, pageMain, sectionTitle } from "@/lib/page-styles";
import { cn } from "@/lib/utils";

export default function CaseStudiesPage() {
  return (
    <div className={pageMain}>
      <TextFade mode="scroll">
        <h1 className={sectionTitle}>Case studies</h1>
        <p className={cn(bodyText, "mt-4 max-w-2xl")}>
          Selected work across product builds, integrations, and growth surfaces.
        </p>
      </TextFade>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {caseStudies.map((study) => (
          <article key={study.slug} className={cardSurface}>
            <p className="text-[12px] font-normal uppercase tracking-widest text-[var(--fg-tertiary)]">
              {study.industry}
            </p>
            <h2 className="mt-2 text-[15px] font-medium text-[var(--fg-primary)]">{study.company}</h2>
            <p className={cn(bodyText, "mt-2 text-[13px]")}>{study.keyResult}</p>
            <Link
              href={`/case-studies/${study.slug}`}
              className="mt-4 inline-block text-[13px] font-normal text-[var(--fg-secondary)] underline-offset-4 hover:text-[var(--fg-primary)] hover:underline"
            >
              Read full story
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
