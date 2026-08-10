"use client";

import { FigmaAppliedAiSection } from "@/components/home/figma/applied-ai-section";
import { FigmaCtaSection } from "@/components/home/figma/cta-section";
import { FigmaIndustriesSection } from "@/components/home/figma/industries-section";
import { FigmaHeroSection } from "@/components/home/figma/hero-section";
import { FigmaProcessSection } from "@/components/home/figma/process-section";
import { FigmaServicesSection } from "@/components/home/figma/services-section";
import { FigmaSpecialtySection } from "@/components/home/figma/specialty-section";
import { FigmaTestimonialsSection } from "@/components/home/figma/testimonials-section";
import { FigmaWorkSection } from "@/components/home/figma/work-section";
import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNav } from "@/components/layout/figma-nav";

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
