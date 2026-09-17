import type { Metadata } from "next";

import { ContactPage } from "@/components/contact/contact-page";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { listPublishedCaseStudySummaries } from "@/lib/admin/case-studies";
import { primaryServices } from "@/lib/canonical-services";
import { buildPageMetadata } from "@/lib/metadata";
import { getContactPageSchema } from "@/lib/schema";

const CONTACT_TITLE = "Contact Comlabs Technologies";
const CONTACT_DESCRIPTION =
  "Talk to Comlabs about application support, AI engineering, AWS infrastructure, custom software, mobile products or digital experience requirements.";

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadata({
  title: CONTACT_TITLE,
  description: CONTACT_DESCRIPTION,
  path: "/contact",
  absoluteTitle: true,
});

export default async function ContactRoute() {
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
      <JsonLdScript
        data={getContactPageSchema({
          url: "/contact",
          name: CONTACT_TITLE,
          description: CONTACT_DESCRIPTION,
        })}
      />
      <ContactPage
        caseStudies={caseStudies}
        footerCaseStudies={footerCaseStudies}
        services={primaryServices.map((service) => ({
          label: service.title,
          href: service.path,
        }))}
      />
    </>
  );
}
