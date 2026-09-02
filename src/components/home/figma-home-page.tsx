"use client";

import { FigmaCtaSection } from "@/components/home/figma/cta-section";
import { FigmaIndustriesSection } from "@/components/home/figma/industries-section";
import { FigmaHeroSection } from "@/components/home/figma/hero-section";
import { FigmaPositioningBridgeSection } from "@/components/home/figma/positioning-bridge-section";
import { FigmaProcessSection } from "@/components/home/figma/process-section";
import { FigmaServicesSection } from "@/components/home/figma/services-section";
import { FigmaTestimonialsSection } from "@/components/home/figma/testimonials-section";
import {
  FigmaWorkSection,
  type WorkProject,
} from "@/components/home/figma/work-section";
import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNav, type NavCaseStudyItem } from "@/components/layout/figma-nav";

type FigmaHomePageProps = {
  caseStudies: NavCaseStudyItem[];
  projects: WorkProject[];
  footerCaseStudies: Array<{ label: string; href: string }>;
};

export function FigmaHomePage({
  caseStudies,
  projects,
  footerCaseStudies,
}: FigmaHomePageProps) {
  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <FigmaNav caseStudies={caseStudies} />

      <main>
        <FigmaHeroSection />
        <FigmaPositioningBridgeSection />
        <FigmaServicesSection />
        <FigmaWorkSection projects={projects} />
        <FigmaProcessSection />
        <FigmaTestimonialsSection />
        <FigmaIndustriesSection />
        <FigmaCtaSection />
      </main>

      <FigmaFooter caseStudies={footerCaseStudies} />
    </div>
  );
}
