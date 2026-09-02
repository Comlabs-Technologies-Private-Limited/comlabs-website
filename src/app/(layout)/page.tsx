import type { Metadata } from "next";

import { FigmaHomePage } from "@/components/home/figma-home-page";
import { HomeJsonLd } from "@/components/seo/home-json-ld";
import { listPublishedCaseStudySummaries } from "@/lib/admin/case-studies";
import { buildPageMetadata } from "@/lib/metadata";
import { siteDefaultDescription } from "@/lib/site";

const HOME_TITLE = "Comlabs Technologies | Application Support, AI, Cloud & Engineering";
const HOME_CASE_STUDY_COUNT = 3;

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadata({
  title: HOME_TITLE,
  description: siteDefaultDescription,
  path: "/",
  absoluteTitle: true,
});

export default async function MarketingHomePage() {
  const summaries = await listPublishedCaseStudySummaries();
  const homepageSummaries = summaries.slice(0, HOME_CASE_STUDY_COUNT);

  const caseStudies = summaries.map((study) => ({
    title: study.title,
    description: study.category,
    href: study.href,
  }));

  const projects = homepageSummaries.map((study, index) => ({
    title: study.title,
    category: study.category,
    desc: study.description,
    href: study.href,
    image: study.image,
    featured: index === 0,
  }));

  const footerCaseStudies = summaries.map((study) => ({
    label: study.title,
    href: study.href,
  }));

  return (
    <>
      <HomeJsonLd />
      <FigmaHomePage
        caseStudies={caseStudies}
        projects={projects}
        footerCaseStudies={footerCaseStudies}
      />
    </>
  );
}
