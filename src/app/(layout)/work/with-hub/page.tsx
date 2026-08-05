import type { Metadata } from "next";

import { CaseStudyLayout, type CaseStudyContent } from "@/components/work/case-study-layout";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "With Hub — Marketing Website for Growth",
  description:
    "Comlabs Technologies Pvt Ltd designed and built With Hub's marketing website — a design-led brand identity built to support marketing and drive user acquisition.",
  path: "/work/with-hub",
});

const content: CaseStudyContent = {
  slug: "with-hub",
  client: "With Hub",
  category: "Brand · Marketing Site",
  year: "2025",
  eyebrow: "Case Study — Brand & Marketing Site",
  title: (
    <>
      A brand With Hub can{" "}
      <span className="italic" style={{ color: "var(--warm-orange)" }}>
        grow on.
      </span>
    </>
  ),
  subtitle:
    "A design-led marketing website built to give With Hub a digital identity that actually pulls its weight.",
  coverImage: "/services-bg/service-bg-4.png",
  metrics: [
    { value: "Design-led", label: "Brand-first build" },
    { value: "Growth", label: "Made for acquisition" },
    { value: "Campaign-ready", label: "Foundation, not just a page" },
  ],
  problem: [
    "With Hub needed more than a placeholder site.",
    "They needed a presence that could actually drive growth — something marketing could point traffic at and convert.",
  ],
  whatWeBuilt: [
    "A marketing-focused website with a strong, consistent visual identity.",
    "Design-led from the first frame — every section earns attention and points somewhere.",
    "A foundation built for campaigns, not just a single homepage.",
    "A look that makes the brand feel established, not early.",
  ],
  results: [
    "Positioned With Hub for marketing and user acquisition.",
    "A clear identity that makes the brand feel credible at a glance.",
    "A site that finally gives growth efforts somewhere to land.",
  ],
};

export default function WithHubCaseStudy() {
  return <CaseStudyLayout content={content} />;
}
