import type { Metadata } from "next";

import { ContactPage } from "@/components/contact/contact-page";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Comlabs Technologies. Tell us what you're building and we'll tell you how we'd approach it.",
};

export default function ContactRoute() {
  return <ContactPage />;
}
