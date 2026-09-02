import type { Metadata } from "next";

import { ContactPage } from "@/components/contact/contact-page";
import { listPublishedCaseStudySummaries } from "@/lib/admin/case-studies";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Contact Comlabs Technologies Pvt Ltd in Pune to discuss websites, custom software, mobile apps, SEO/AEO, or cloud infrastructure projects.",
  path: "/contact",
});

export default async function ContactRoute() {
  const summaries = await listPublishedCaseStudySummaries();
  const caseStudies = summaries.map((study) => ({
    title: study.title,
    description: study.category,
    href: study.href,
  }));

  return <ContactPage caseStudies={caseStudies} />;
}
