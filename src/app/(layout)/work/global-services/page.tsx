import type { Metadata } from "next";

import { CaseStudyLayout, type CaseStudyContent } from "@/components/work/case-study-layout";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Global Services — Website & Conversion Growth",
  description:
    "Comlabs Technologies Pvt Ltd rebuilt Global Services' website for enterprise trust and stronger conversion — supporting wins with JIO and Vodafone-Idea.",
  path: "/work/global-services",
});

const content: CaseStudyContent = {
  slug: "global-services",
  client: "Global Services",
  category: "Website · Conversion",
  year: "2025",
  eyebrow: "Case Study — Website & Conversion",
  title: (
    <>
      A website that earns{" "}
      <span className="font-bold" style={{ color: "var(--warm-orange)" }}>
        enterprise trust.
      </span>
    </>
  ),
  subtitle:
    "We rebuilt Global Services' website to convert — and to hold its own next to the biggest names they wanted to sign.",
  coverImage: "/services-bg/service-bg-2.png",
  metrics: [
    { value: "↑ Conversion", label: "More visitors become leads" },
    { value: "Enterprise", label: "Credible from first scroll" },
    { value: "2 telecoms", label: "JIO & Vodafone-Idea" },
  ],
  problem: [
    "Global Services were doing serious work, but their old site didn't say so.",
    "It wasn't winning enterprise trust, and good leads slipped through because the site couldn't carry the pitch.",
  ],
  whatWeBuilt: [
    "A full website rebuild, positioned for credibility from the first scroll.",
    "Clear messaging and a sharp structure that guide visitors instead of losing them.",
    "Conversion paths designed to actually convert, not just decorate.",
    "Built to look like a partner enterprise buyers can sign.",
  ],
  results: [
    "Conversion rate went up, and client acquisition followed.",
    "The site stopped being a brochure and started pulling weight as a sales asset.",
    "Positioning strong enough to land two of India's largest telecom enterprises.",
  ],
  clients: {
    label: "JIO · Vodafone-Idea",
    note: "Two of India's largest telecom enterprises now sit on the Global Services roster.",
  },
};

export default function GlobalServicesCaseStudy() {
  return <CaseStudyLayout content={content} />;
}
