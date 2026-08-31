import type { Metadata } from "next";

import { CareersPage } from "@/components/careers/careers-page";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Careers",
  description:
    "Apply to Comlabs Technologies Pvt Ltd in Pune. We hire designers and engineers who ship websites, software, and digital products.",
  path: "/careers",
});

export default function CareersRoute() {
  return <CareersPage />;
}
