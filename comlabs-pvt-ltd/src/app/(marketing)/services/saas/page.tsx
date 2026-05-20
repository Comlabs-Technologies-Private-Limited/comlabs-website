import { TextFade } from "@/components/motion/text-fade";
import { bodyText, cardSurface, pageMain, sectionTitle } from "@/lib/page-styles";
import { cn } from "@/lib/utils";

export default function SaaSServicePage() {
  return (
    <div className={pageMain}>
      <TextFade mode="scroll">
        <h1 className={sectionTitle}>SaaS development</h1>
        <p className={cn(bodyText, "mt-4 max-w-3xl")}>
          From blueprint to launch, we build multi-tenant products designed for recurring
          revenue and operational clarity.
        </p>
      </TextFade>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {["Discover", "Build", "Scale"].map((step, idx) => (
          <article key={step} className={cardSurface}>
            <p className="text-[12px] font-normal uppercase tracking-widest text-[var(--fg-tertiary)]">
              Step {idx + 1}
            </p>
            <h2 className="mt-2 text-[15px] font-medium text-[var(--fg-primary)]">{step}</h2>
            <p className={cn(bodyText, "mt-2 text-[13px]")}>
              Outcome-oriented delivery with clear milestones and stakeholder reporting.
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
