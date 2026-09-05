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
// import { ThemeProvider, useTheme } from "@/components/theme/theme-provider";

type FigmaHomePageProps = {
  caseStudies: NavCaseStudyItem[];
  projects: WorkProject[];
  footerCaseStudies: Array<{ label: string; href: string }>;
};

/*
 * Dark mode (ThemeProvider + nav toggle) — re-enable when needed:
 *
 * function HomePageShell(props: FigmaHomePageProps) {
 *   const { resolvedTheme } = useTheme();
 *   const tone = resolvedTheme === "dark" ? "dark" : "light";
 *   return (
 *     <>
 *       <FigmaNav caseStudies={props.caseStudies} tone={tone} />
 *       <main>...</main>
 *       <FigmaFooter caseStudies={props.footerCaseStudies} tone={tone} />
 *     </>
 *   );
 * }
 *
 * export function FigmaHomePage(props: FigmaHomePageProps) {
 *   return (
 *     <ThemeProvider defaultTheme="dark">
 *       <HomePageShell {...props} />
 *     </ThemeProvider>
 *   );
 * }
 */

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
        <FigmaWorkSection projects={projects} />
        <FigmaServicesSection />
        <FigmaProcessSection />
        <FigmaTestimonialsSection />
        <FigmaIndustriesSection />
        <FigmaCtaSection />
      </main>

      <FigmaFooter caseStudies={footerCaseStudies} />
    </div>
  );
}
