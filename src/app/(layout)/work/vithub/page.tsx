import type { Metadata } from "next";

import { CaseStudyLayout } from "@/components/work/case-study-layout";
import { vithubCaseStudy } from "@/lib/case-studies/vithub";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Vithub — Marketing Website for Growth",
  description:
    "Comlabs Technologies Pvt Ltd designed and built Vithub's marketing website — a design-led brand identity built to support marketing and drive user acquisition.",
  path: "/work/vithub",
});

export default function VithubCaseStudy() {
  return <CaseStudyLayout content={vithubCaseStudy} />;
}
