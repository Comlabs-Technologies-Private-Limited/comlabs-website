import type { CaseStudySection as CaseStudySectionType } from "@/lib/case-studies";

import { MarketingFadeIn } from "@/components/marketing/marketing-motion";

import { CaseStudyMedia } from "./case-study-media";
import { CaseStudyOutcomeRows } from "./case-study-outcome-rows";
import { CaseStudyPrinciples } from "./case-study-principles";
import { CaseStudySequence } from "./case-study-sequence";
import { CaseStudySpecs } from "./case-study-specs";
import { CaseStudyTransformation } from "./case-study-transformation";

type CaseStudySectionProps = {
  section: CaseStudySectionType;
};

function renderMediaList(media: CaseStudySectionType["media"]) {
  if (!media) return null;
  const items = Array.isArray(media) ? media : [media];
  if (items.length === 2) {
    const groupCaption = items.find((item) => item.caption)?.caption;
    return (
      <div className="mt-10">
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <CaseStudyMedia key={item.src} media={{ ...item, caption: undefined }} />
          ))}
        </div>
        {groupCaption ? (
          <p className="mt-3 max-w-[640px] text-xs leading-relaxed text-muted-foreground md:text-sm md:leading-relaxed">
            {groupCaption}
          </p>
        ) : null}
      </div>
    );
  }
  return (
    <div className="mt-10 space-y-10">
      {items.map((item) => (
        <CaseStudyMedia key={item.src} media={item} />
      ))}
    </div>
  );
}

export function CaseStudySection({ section }: CaseStudySectionProps) {
  const {
    number,
    title,
    lede,
    paragraphs,
    principles,
    sequence,
    specs,
    subsections,
    media,
    transformation,
    outcomes,
  } = section;

  return (
    <MarketingFadeIn>
      <section className="scroll-mt-24 py-16 md:py-24 lg:py-32">
        <div className="mb-8 flex items-baseline gap-4">
          <span className="text-xs tracking-widest text-muted-foreground tabular-nums">{number}</span>
          <h2 className="text-xl font-medium tracking-tight md:text-2xl" style={{ letterSpacing: "-0.025em" }}>
            {title}
          </h2>
        </div>

        {lede ? (
          <p
            className="mb-8 max-w-[36rem] text-2xl leading-[1.15] font-medium tracking-tight text-foreground md:text-[2rem]"
            style={{ letterSpacing: "-0.03em" }}
          >
            {lede}
          </p>
        ) : null}

        {paragraphs?.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-6 text-base leading-[1.7] text-muted-foreground first:mt-0 md:text-[17px] md:leading-[1.75]"
          >
            {paragraph}
          </p>
        ))}

        {sequence ? <CaseStudySequence steps={sequence} /> : null}

        {principles ? <CaseStudyPrinciples principles={principles} /> : null}

        {specs ? <CaseStudySpecs specs={specs} /> : null}

        {subsections?.map((subsection) => (
          <div key={subsection.title} className="mt-12 md:mt-16">
            <h3 className="text-base font-medium tracking-tight text-foreground md:text-lg">
              {subsection.title}
            </h3>
            {subsection.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 text-base leading-[1.7] text-muted-foreground md:text-[17px] md:leading-[1.75]"
              >
                {paragraph}
              </p>
            ))}
            {subsection.media ? (
              <div className="mt-8">
                <CaseStudyMedia media={subsection.media} />
              </div>
            ) : null}
          </div>
        ))}

        {renderMediaList(media)}

        {transformation ? (
          <CaseStudyTransformation before={transformation.before} after={transformation.after} />
        ) : null}

        {outcomes ? <CaseStudyOutcomeRows outcomes={outcomes} /> : null}
      </section>
    </MarketingFadeIn>
  );
}
