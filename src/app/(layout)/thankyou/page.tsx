import type { Metadata } from "next";

import { ThankYouPage } from "@/components/contact/thank-you-page";
import { listPublishedCaseStudySummaries } from "@/lib/admin/case-studies";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Thank You",
    description:
      "Thank you for contacting Comlabs Technologies Pvt Ltd. Our team will get back to you within 48 hours.",
    path: "/thankyou",
  }),
  robots: {
    index: false,
    follow: true,
  },
};

export default async function ThankYouRoute({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  const summaries = await listPublishedCaseStudySummaries();
  const caseStudies = summaries.map((study) => ({
    title: study.title,
    description: study.category,
    href: study.href,
  }));

  return (
    <ThankYouPage
      variant={from === "careers" ? "careers" : "contact"}
      caseStudies={caseStudies}
    />
  );
}
