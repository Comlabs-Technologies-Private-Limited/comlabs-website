import type { Metadata } from "next";

import { CaseStudyLayout, type CaseStudyContent } from "@/components/work/case-study-layout";

export const metadata: Metadata = {
  title: "Formula Lab — Dashboard Onboarding Flow",
  description:
    "Comlabs designed and built Formula Lab's multi-page dashboard onboarding flow — from signup to activation — to cut drop-off and make a complex product feel simple on day one.",
};

const content: CaseStudyContent = {
  slug: "formula-lab",
  client: "Formula Lab",
  category: "Product UX · Dashboard",
  year: "2025",
  eyebrow: "Case Study — Product UX",
  title: (
    <>
      We made Formula Lab&apos;s dashboard click on the{" "}
      <span className="italic" style={{ color: "var(--warm-orange)" }}>
        first try.
      </span>
    </>
  ),
  subtitle:
    "A complete, multi-page onboarding flow for Formula Lab's internal dashboard — built to walk every new user from signup to their first real win.",
  coverImage: "/services-bg/service-bg-1.png",
  metrics: [
    { value: "Multi-page", label: "Guided onboarding flow" },
    { value: "Signup → Active", label: "End-to-end journey" },
    { value: "Lower", label: "First-run drop-off" },
  ],
  problem: [
    "Formula Lab had a capable dashboard, but new users hit friction before they ever saw the payoff.",
    "Onboarding was scattered, so people stalled and left before activating — the quickest way to lose retention you haven't earned yet.",
  ],
  whatWeBuilt: [
    "A structured, multi-page onboarding flow that moves users from signup to their first real action.",
    "Each step does one job, in plain language, with no dead ends.",
    "Visible progress, so users always know how far they are from done.",
    "Designed and developed end to end — UX, UI, and front-end.",
  ],
  results: [
    "Users finish onboarding instead of bailing halfway through setup.",
    "The product makes a strong first impression — complexity hidden, value up front.",
    "A first run that feels simple, even though the product underneath isn't.",
  ],
};

export default function FormulaLabCaseStudy() {
  return <CaseStudyLayout content={content} />;
}
