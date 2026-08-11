import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyLayout } from "@/components/work/case-study-layout";
import { CaseStudyJsonLd } from "@/components/work/case-study-json-ld";
import {
  getPublishedCaseStudyPage,
  getPublishedCaseStudySlugs,
} from "@/lib/admin/case-studies";
import { buildPageMetadata } from "@/lib/metadata";

export const revalidate = 60;

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
    path: `/work/${slug}`,
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

  return (
    <>
      <CaseStudyJsonLd
        content={content}
        metaTitle={metaTitle}
        metaDescription={metaDescription}
        updatedAt={updatedAt}
      />
      <CaseStudyLayout content={content} />
    </>
  );
}
