import { ContactSection } from "@/components/home/contact-section";
import { FaqSection } from "@/components/home/faq-section";
import { FounderProblemSection } from "@/components/home/founder-problem-section";
import { MetricsSection } from "@/components/home/metrics-section";
import { PricingSection } from "@/components/home/pricing-section";
import { ProcessSection } from "@/components/home/process-section";
import { ServicesSection } from "@/components/home/services-section";
import { ToolsTechSection } from "@/components/home/tools-tech-section";
import { WhyComlabsSection } from "@/components/home/why-comlabs-section";
import { WorkSection } from "@/components/home/work-section";
import { HeroSection } from "@/components/hero/hero-section";
import { HomeJsonLd } from "@/components/seo/home-json-ld";

export function MarketingHomePage() {
  return (
    <div className="divide-y divide-gray-200">
      <HomeJsonLd />
      <HeroSection />
      <FounderProblemSection />
      <ServicesSection />
      <WorkSection />
      <WhyComlabsSection />
      <ProcessSection />
      <ToolsTechSection />
      <MetricsSection />
      <PricingSection />
      <FaqSection />
      <ContactSection />
    </div>
  );
}

export default MarketingHomePage;
