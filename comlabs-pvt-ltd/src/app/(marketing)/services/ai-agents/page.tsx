import { TextFade } from "@/components/motion/text-fade";
import { bodyText, cardSurface, pageMain, sectionTitle } from "@/lib/page-styles";
import { cn } from "@/lib/utils";

const sectors = ["FinTech", "HealthTech", "Logistics"];

export default function AIAgentsServicePage() {
  return (
    <div className={pageMain}>
      <TextFade mode="scroll">
        <h1 className={sectionTitle}>AI agent systems</h1>
        <p className={cn(bodyText, "mt-4 max-w-3xl")}>
          Task-capable agents with governance, observability, and feedback loops that match
          how your business actually runs.
        </p>
      </TextFade>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {["Brain", "Memory", "Planning"].map((item) => (
          <article key={item} className={cardSurface}>
            <h2 className="text-[15px] font-medium text-[var(--fg-primary)]">{item}</h2>
            <p className={cn(bodyText, "mt-2 text-[13px]")}>
              Orchestration patterns built for reliability, context, and iteration.
            </p>
          </article>
        ))}
      </div>

      <div className={cn(cardSurface, "mt-8")}>
        <h2 className="text-[15px] font-medium text-[var(--fg-primary)]">Timeline</h2>
        <ul className={cn(bodyText, "mt-4 list-inside list-disc space-y-2 text-[13px]")}>
          <li>POC (4–8 weeks): validate workflows and tool access safely.</li>
          <li>Build (3–6 months): integrate systems and tune for production.</li>
          <li>Optimize: close the loop with real usage and feedback.</li>
        </ul>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {sectors.map((sector) => (
          <div key={sector} className={cn(cardSurface, "py-5 text-center text-[13px] text-[var(--fg-primary)]")}>
            {sector}
          </div>
        ))}
      </div>
    </div>
  );
}
