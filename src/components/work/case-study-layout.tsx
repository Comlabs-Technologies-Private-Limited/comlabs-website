"use client";

import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNav, type NavCaseStudyItem } from "@/components/layout/figma-nav";
import {
  type CaseStudyContent,
  type CaseStudyServiceLink,
  type CaseStudySlug,
  CASE_STUDY_EXTRAS,
  CASE_STUDY_ORDER,
  getNextCaseStudy,
  RELATED_SERVICE_BY_SLUG,
} from "@/lib/case-studies";

import { CaseStudyCta } from "./case-study/case-study-cta";
import { CaseStudyHero } from "./case-study/case-study-hero";
import { CaseStudyMedia } from "./case-study/case-study-media";
import { CaseStudyMeta } from "./case-study/case-study-meta";
import { CaseStudySection } from "./case-study/case-study-section";
import { NextCaseStudy } from "./case-study/next-case-study";
import { RelatedService } from "./case-study/related-service";

export type { CaseStudyContent } from "@/lib/case-studies";

type CaseStudyLayoutProps = {
  content: CaseStudyContent;
  caseStudies?: NavCaseStudyItem[];
  footerCaseStudies?: Array<{ label: string; href: string }>;
};

export function CaseStudyLayout({
  content,
  caseStudies,
  footerCaseStudies,
}: CaseStudyLayoutProps) {
  const { slug, client, year, headline, standfirst, meta, leadImage, sections } = content;
  const isKnownSlug = CASE_STUDY_ORDER.includes(slug as CaseStudySlug);
  const slugKey = slug as CaseStudySlug;
  const relatedService = isKnownSlug ? RELATED_SERVICE_BY_SLUG[slugKey] : undefined;
  const relatedServices: CaseStudyServiceLink[] = relatedService
    ? Array.isArray(relatedService)
      ? relatedService
      : [relatedService]
    : [];
  const nextCaseStudy = isKnownSlug ? getNextCaseStudy(slugKey) : null;
  const extras = isKnownSlug ? CASE_STUDY_EXTRAS[slugKey] : undefined;

  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <FigmaNav caseStudies={caseStudies} />

      <main>
        <CaseStudyHero
          slug={slug}
          client={client}
          year={year}
          headline={headline}
          standfirst={standfirst}
          eyebrow={extras?.eyebrow}
          liveSite={extras?.liveSite}
        />

        <div className="border-t border-border px-6 pb-8 md:pb-10">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-12 gap-x-8 gap-y-10 pt-10 lg:gap-x-12 lg:pt-12">
              <div className="col-span-12 lg:col-span-3">
                <CaseStudyMeta items={meta} />
              </div>

              <div className="col-span-12 lg:col-span-7 lg:col-start-5">
                <div className="-mx-0 mb-12 md:mb-14 lg:-mx-8">
                  <CaseStudyMedia media={{ ...leadImage, variant: leadImage.variant ?? "wide" }} />
                </div>

                <article className="max-w-[720px]">
                  {sections.map((section) => (
                    <CaseStudySection key={section.number} section={section} />
                  ))}
                </article>
              </div>
            </div>
          </div>
        </div>

        {relatedServices.length > 0 ? (
          <RelatedService services={relatedServices} />
        ) : null}

        {nextCaseStudy ? (
          <NextCaseStudy
            client={nextCaseStudy.client}
            headline={nextCaseStudy.headline}
            href={nextCaseStudy.href}
            thumbnail={nextCaseStudy.thumbnail}
          />
        ) : null}

        <CaseStudyCta
          heading={extras?.cta?.heading}
          body={extras?.cta?.body}
          primaryLabel={extras?.cta?.primaryLabel}
          secondary={extras?.cta?.secondary}
        />
      </main>

      <FigmaFooter caseStudies={footerCaseStudies} />
    </div>
  );
}
