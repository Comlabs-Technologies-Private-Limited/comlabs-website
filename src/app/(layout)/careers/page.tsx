import type { Metadata } from "next";

import { CareersPage } from "@/components/careers/careers-page";
import { listPublishedCaseStudySummaries } from "@/lib/admin/case-studies";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
    title: "Careers",
    description:
      "Apply to Comlabs Technologies in Pune. We hire engineers and operators who take production systems from build through support.",
  path: "/careers",
});

export default async function CareersRoute() {
  const summaries = await listPublishedCaseStudySummaries();
  const caseStudies = summaries.map((study) => ({
    title: study.title,
    description: study.category,
    href: study.href,
  }));

  return <CareersPage caseStudies={caseStudies} />;
}
