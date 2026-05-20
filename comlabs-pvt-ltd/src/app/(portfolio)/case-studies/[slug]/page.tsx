import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TextFade } from "@/components/motion/text-fade";
import { caseStudies, getCaseStudyBySlug } from "../data";
import { bodyText, cardSurface, pageMain, sectionTitle } from "@/lib/page-styles";
import { cn } from "@/lib/utils";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: "Case study not found",
    };
  }

  return {
    title: study.company,
    description: study.keyResult,
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return (
    <div className={pageMain}>
      <TextFade mode="scroll">
        <h1 className={sectionTitle}>{study.company}</h1>
      </TextFade>
      <div className={cn(cardSurface, "mt-8 grid gap-3 text-[13px] text-[var(--fg-secondary)] md:grid-cols-2")}>
        <p>Industry: {study.industry}</p>
        <p>Size: {study.size}</p>
        <p>Use case: {study.useCase}</p>
        <p className="font-medium text-[var(--fg-primary)]">Key result: {study.keyResult}</p>
      </div>

      <article className="mt-10 space-y-8">
        <section>
          <TextFade mode="scroll">
            <h2 className="text-[15px] font-medium text-[var(--fg-primary)]">The challenge</h2>
            <p className={cn(bodyText, "mt-3 text-[13px]")}>{study.challenge}</p>
          </TextFade>
        </section>
        <section>
          <TextFade mode="scroll">
            <h2 className="text-[15px] font-medium text-[var(--fg-primary)]">The solution</h2>
            <p className={cn(bodyText, "mt-3 text-[13px]")}>{study.solution}</p>
          </TextFade>
        </section>
        <section>
          <TextFade mode="scroll">
            <h2 className="text-[15px] font-medium text-[var(--fg-primary)]">The results</h2>
            <p className={cn(bodyText, "mt-3 text-[13px]")}>{study.results}</p>
            <blockquote
              className={cn(
                cardSurface,
                "mt-4 border-l-2 border-[var(--border-strong)] text-[13px] italic text-[var(--fg-primary)]",
              )}
            >
              {study.quote}
            </blockquote>
          </TextFade>
        </section>
      </article>

      <TextFade mode="scroll">
        <p className="mt-10 text-[15px] font-medium text-[var(--fg-primary)]">
          Want similar results? Let&apos;s talk.
        </p>
      </TextFade>
    </div>
  );
}
