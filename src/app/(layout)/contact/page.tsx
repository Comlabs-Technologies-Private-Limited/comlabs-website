import type { Metadata } from "next";

import { ContactPage } from "@/components/contact/contact-page";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Contact Comlabs Technologies Pvt Ltd in Pune to discuss website design, development, CMS, ERP, or product UI projects.",
  path: "/contact",
});

export default function ContactRoute() {
  return <ContactPage />;
}
