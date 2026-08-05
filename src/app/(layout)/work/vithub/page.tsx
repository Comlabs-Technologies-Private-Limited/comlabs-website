import type { Metadata } from "next";

import { CaseStudyLayout, type CaseStudyContent } from "@/components/work/case-study-layout";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Vithub — Marketing Website for Growth",
  description:
    "Comlabs Technologies Pvt Ltd designed and built Vithub's marketing website — a design-led brand identity built to support marketing and drive user acquisition.",
  path: "/work/vithub",
});

const content: CaseStudyContent = {
  slug: "vithub",
  client: "Vithub",
  liveSiteUrl: "https://vithub.in",
  category: "Brand · Marketing Site",
  year: "2025",
  eyebrow: "Case Study — Brand & Marketing Site",
  title: (
    <>
      A brand Vithub can{" "}
      <span className="italic" style={{ color: "var(--warm-orange)" }}>
        grow on.
      </span>
    </>
  ),
  subtitle:
    "A design-led marketing website built to give Vithub a digital identity that actually pulls its weight.",
  coverImage: "/services-bg/service-bg-4.png",
  metrics: [
    { value: "Design-led", label: "Brand-first build" },
    { value: "Growth", label: "Made for acquisition" },
    { value: "Campaign-ready", label: "Foundation, not just a page" },
  ],
  problem: [
    "Vithub needed more than a placeholder site.",
    "They needed a presence that could actually drive growth — something marketing could point traffic at and convert.",
  ],
  whatWeBuilt: [
    "A marketing-focused website with a strong, consistent visual identity.",
    "Design-led from the first frame — every section earns attention and points somewhere.",
    "A foundation built for campaigns, not just a single homepage.",
    "A look that makes the brand feel established, not early.",
  ],
  results: [
    "Positioned Vithub for marketing and user acquisition.",
    "A clear identity that makes the brand feel credible at a glance.",
    "A site that finally gives growth efforts somewhere to land.",
  ],
};

export default function VithubCaseStudy() {
  return <CaseStudyLayout content={content} />;
}
