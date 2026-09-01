import type { ReactNode } from "react";

import {
  MarketingOrangeHighlight,
  MarketingSectionLabel,
} from "@/components/marketing/marketing-section-header";
import { cn } from "@/lib/utils";

type ServiceOverviewSectionProps = {
  eyebrow?: string;
  proposition: readonly string[];
  problemsEyebrow?: string;
  problemsHeading?: ReactNode;
  problems: readonly string[];
  deliverablesEyebrow?: string;
  deliverablesHeading?: ReactNode;
  deliverables: readonly string[];
};

function formatIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function ServiceOverviewSection({
  eyebrow = "What we do",
  proposition,
  problemsEyebrow = "Problems we address",
  problemsHeading = "Where the work actually starts.",
  problems,
  deliverablesEyebrow = "Deliverables",
  deliverablesHeading = (
    <>
      What you get at{" "}
      <MarketingOrangeHighlight>delivery</MarketingOrangeHighlight>.
    </>
  ),
  deliverables,
}: ServiceOverviewSectionProps) {
  const [lead, ...support] = proposition;
  const hasProblems = problems.length > 0;
  const hasDeliverables = deliverables.length > 0;

  return (
    <section className="border-y border-border bg-card px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        {lead ? (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,11rem)_1fr] lg:gap-16 xl:grid-cols-[minmax(0,12.5rem)_1fr] xl:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <MarketingSectionLabel>{eyebrow}</MarketingSectionLabel>
            </div>
            <div className="max-w-3xl">
              <p
                className="text-[22px] font-medium leading-snug tracking-tight text-foreground md:text-[28px] md:leading-[1.3]"
                style={{ letterSpacing: "-0.03em" }}
              >
                {lead}
              </p>
              {support.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-6 text-[15px] leading-relaxed text-muted-foreground md:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ) : null}

        {hasProblems || hasDeliverables ? (
          <div
            className={cn(
              "grid overflow-hidden rounded-2xl border border-border",
              lead ? "mt-16 md:mt-20" : "",
              hasProblems && hasDeliverables ? "lg:grid-cols-2" : "grid-cols-1",
            )}
          >
            {hasProblems ? (
              <OverviewPanel
                eyebrow={problemsEyebrow}
                heading={problemsHeading}
                items={problems}
              />
            ) : null}
            {hasDeliverables ? (
              <OverviewPanel
                eyebrow={deliverablesEyebrow}
                heading={deliverablesHeading}
                items={deliverables}
                className={
                  hasProblems ? "border-t border-border lg:border-t-0 lg:border-l" : undefined
                }
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function OverviewPanel({
  eyebrow,
  heading,
  items,
  className,
}: {
  eyebrow: string;
  heading: ReactNode;
  items: readonly string[];
  className?: string;
}) {
  return (
    <div className={cn("bg-background px-6 py-8 md:px-10 md:py-10", className)}>
      <p className="mb-3 text-[11px] tracking-widest text-muted-foreground uppercase">
        {eyebrow}
      </p>
      <h2
        className="mb-8 max-w-sm text-lg font-medium tracking-tight text-foreground md:text-xl"
        style={{ letterSpacing: "-0.03em" }}
      >
        {heading}
      </h2>
      <ul>
        {items.map((item, index) => (
          <li
            key={item}
            className="flex gap-4 border-t border-border py-5 first:border-t-0 first:pt-0 last:pb-0"
          >
            <span
              className="w-7 shrink-0 pt-0.5 text-[11px] tabular-nums text-muted-foreground"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {formatIndex(index)}
            </span>
            <p className="text-[15px] leading-relaxed text-foreground/85">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
