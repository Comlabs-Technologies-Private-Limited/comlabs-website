import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyLayout } from "@/components/work/case-study-layout";
import { getPublishedCaseStudy } from "@/lib/admin/case-studies";
import { formialLabsCaseStudy } from "@/lib/case-studies/formial-labs";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Formial Labs — Dashboard Onboarding Flow",
  description:
    "Comlabs Technologies Pvt Ltd designed and built Formial Labs' multi-page dashboard onboarding flow to reduce drop-off and improve first-run activation.",
  path: "/work/formial-labs",
});

export default async function FormialLabsCaseStudy() {
  const content =
    (await getPublishedCaseStudy("formial-labs")) ?? formialLabsCaseStudy;

  if (!content) notFound();

  return <CaseStudyLayout content={content} />;
}
