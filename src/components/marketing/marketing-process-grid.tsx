"use client";

import { MarketingFadeIn } from "@/components/marketing/marketing-motion";

type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

type MarketingProcessGridProps = {
  steps: ProcessStep[];
};

export function MarketingProcessGrid({ steps }: MarketingProcessGridProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
      {steps.map((step, index) => (
        <MarketingFadeIn key={step.step} delay={index * 0.07}>
          <article className="relative h-full rounded-2xl border border-border bg-background p-6 transition-colors hover:border-foreground/15 md:p-7">
            <div
              className="mb-4 text-xs font-medium tabular-nums"
              style={{ fontFamily: "var(--font-mono)", color: "var(--warm-orange)" }}
            >
              {step.step}
            </div>
            <h3 className="mb-2 text-sm font-semibold tracking-tight">{step.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
          </article>
        </MarketingFadeIn>
      ))}
    </div>
  );
}
