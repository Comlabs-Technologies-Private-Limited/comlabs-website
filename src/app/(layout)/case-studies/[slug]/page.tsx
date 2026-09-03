import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyLayout } from "@/components/work/case-study-layout";
import { CaseStudyJsonLd } from "@/components/work/case-study-json-ld";
import {
  getPublishedCaseStudyPage,
  getPublishedCaseStudySlugs,
  listPublishedCaseStudySummaries,
} from "@/lib/admin/case-studies";
import { buildPageMetadata } from "@/lib/metadata";
import { caseStudyPath } from "@/lib/site";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const slugs = await getPublishedCaseStudySlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPublishedCaseStudyPage(slug);
  if (!page) return {};

  return buildPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: caseStudyPath(slug),
    image: page.ogImage,
    absoluteTitle: page.absoluteTitle,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPublishedCaseStudyPage(slug);
  if (!page) notFound();

  const { metaTitle, metaDescription, updatedAt, ...content } = page;
  const summaries = await listPublishedCaseStudySummaries();
  const caseStudies = summaries.map((study) => ({
    title: study.title,
    description: study.category,
    href: study.href,
  }));
  const footerCaseStudies = summaries.map((study) => ({
    label: study.title,
    href: study.href,
  }));

  return (
    <>
      <CaseStudyJsonLd
        content={content}
        metaTitle={metaTitle}
        metaDescription={metaDescription}
        updatedAt={updatedAt}
      />
      <CaseStudyLayout
        content={content}
        caseStudies={caseStudies}
        footerCaseStudies={footerCaseStudies}
      />
    </>
  );
}
