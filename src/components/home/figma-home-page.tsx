import dynamic from "next/dynamic";

import { FigmaCtaSection } from "@/components/home/figma/cta-section";
import { FigmaHeroSection } from "@/components/home/figma/hero-section";
import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNav } from "@/components/layout/figma-nav";

const FigmaServicesSection = dynamic(
  () =>
    import("@/components/home/figma/services-section").then((mod) => mod.FigmaServicesSection),
);
const FigmaAppliedAiSection = dynamic(
  () =>
    import("@/components/home/figma/applied-ai-section").then((mod) => mod.FigmaAppliedAiSection),
);
const FigmaProcessSection = dynamic(
  () =>
    import("@/components/home/figma/process-section").then((mod) => mod.FigmaProcessSection),
);
const FigmaSpecialtySection = dynamic(
  () =>
    import("@/components/home/figma/specialty-section").then((mod) => mod.FigmaSpecialtySection),
);
const FigmaWorkSection = dynamic(
  () => import("@/components/home/figma/work-section").then((mod) => mod.FigmaWorkSection),
);
const FigmaIndustriesSection = dynamic(
  () =>
    import("@/components/home/figma/industries-section").then((mod) => mod.FigmaIndustriesSection),
);
const FigmaTestimonialsSection = dynamic(
  () =>
    import("@/components/home/figma/testimonials-section").then(
      (mod) => mod.FigmaTestimonialsSection,
    ),
);

export function FigmaHomePage() {
  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <FigmaNav />

      <main>
        <FigmaHeroSection />
        <FigmaServicesSection />
        <FigmaAppliedAiSection />
        <FigmaProcessSection />
        <FigmaSpecialtySection />
        <FigmaWorkSection />
        <FigmaIndustriesSection />
        <FigmaTestimonialsSection />
        <FigmaCtaSection />
      </main>

      <FigmaFooter />
    </div>
  );
}
