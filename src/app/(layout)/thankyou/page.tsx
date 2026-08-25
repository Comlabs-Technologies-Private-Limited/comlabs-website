import type { Metadata } from "next";

import { ThankYouPage } from "@/components/contact/thank-you-page";
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

export default function ThankYouRoute() {
  return <ThankYouPage />;
}
