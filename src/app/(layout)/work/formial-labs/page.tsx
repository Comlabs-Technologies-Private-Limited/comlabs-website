import type { Metadata } from "next";

import { CaseStudyLayout } from "@/components/work/case-study-layout";
import { formialLabsCaseStudy } from "@/lib/case-studies/formial-labs";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Formial Labs — Dashboard Onboarding Flow",
  description:
    "Comlabs Technologies Pvt Ltd designed and built Formial Labs' multi-page dashboard onboarding flow to reduce drop-off and improve first-run activation.",
  path: "/work/formial-labs",
});

export default function FormialLabsCaseStudy() {
  return <CaseStudyLayout content={formialLabsCaseStudy} />;
}
