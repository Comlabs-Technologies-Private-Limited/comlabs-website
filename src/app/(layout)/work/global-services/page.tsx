import type { Metadata } from "next";

import { CaseStudyLayout } from "@/components/work/case-study-layout";
import { globalServicesCaseStudy } from "@/lib/case-studies/global-services";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Global Services — Website & Conversion Growth",
  description:
    "Comlabs Technologies Pvt Ltd rebuilt Global Services' website for enterprise trust and stronger conversion — supporting wins with JIO and Vodafone-Idea.",
  path: "/work/global-services",
});

export default function GlobalServicesCaseStudy() {
  return <CaseStudyLayout content={globalServicesCaseStudy} />;
}
