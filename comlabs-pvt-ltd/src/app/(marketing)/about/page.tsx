import { TextFade } from "@/components/motion/text-fade";
import { bodyText, cardSurface, pageMain, sectionTitle } from "@/lib/page-styles";
import { cn } from "@/lib/utils";

export default function AboutPage() {
  return (
    <div className={pageMain}>
      <TextFade mode="scroll">
        <h1 className={sectionTitle}>About Comlabs</h1>
        <p className={cn(bodyText, "mt-4 max-w-3xl")}>
          We are a software studio focused on shipping systems that scale — SaaS, SAP
          integrations, MVPs, marketing sites, and mobile apps — without the noise.
        </p>
      </TextFade>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {[
          "Small teams, senior ownership, no bait-and-switch staffing.",
          "Architecture first, then incremental delivery you can measure.",
          "Direct communication; you talk to the people doing the work.",
          "Quality bar modeled on the best product companies, not agency defaults.",
        ].map((point) => (
          <div key={point} className={cn(cardSurface, "text-[13px] font-normal text-[var(--fg-secondary)]")}>
            {point}
          </div>
        ))}
      </div>
    </div>
  );
}
