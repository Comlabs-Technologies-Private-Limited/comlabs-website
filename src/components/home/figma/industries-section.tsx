"use client";

import { Brain, Building2, Cog, Cpu, ShoppingBag } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { MarketingFadeIn } from "@/components/marketing/marketing-motion";

type IndustryItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const INDUSTRIES: IndustryItem[] = [
  {
    title: "SaaS & Technology",
    description: "Applications, AI systems and production infrastructure.",
    icon: Cpu,
  },
  {
    title: "Enterprise Software",
    description: "Internal platforms and complex integrations.",
    icon: Building2,
  },
  {
    title: "Manufacturing & Operations",
    description: "ERP workflows and operational software.",
    icon: Cog,
  },
  {
    title: "AI-native Products",
    description: "Agents, model integrations and context systems.",
    icon: Brain,
  },
  {
    title: "Commerce",
    description: "Customer platforms and scalable digital infrastructure.",
    icon: ShoppingBag,
  },
];

/** Quiet industries strip — lighter weight than Services or Work. */
export function FigmaIndustriesSection() {
  return (
    <section id="industries" className="border-y border-border px-6 py-14 md:py-16">
      <div className="mx-auto max-w-6xl">
        <MarketingFadeIn className="mb-8 max-w-2xl md:mb-10">
          <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Industries
          </p>
          <h2
            className="text-2xl font-bold tracking-tight md:text-4xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Built for companies where{" "}
            <span style={{ color: "var(--warm-orange)" }}>software</span> is part of the
            operation.
          </h2>
        </MarketingFadeIn>

        <ul className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-5">
          {INDUSTRIES.map((industry) => {
            const Icon = industry.icon;
            return (
              <li key={industry.title} className="min-w-0 border-t border-border pt-4">
                <div className="mb-2 flex items-center gap-2">
                  <Icon
                    size={14}
                    className="shrink-0"
                    style={{ color: "var(--warm-orange)" }}
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <h3 className="truncate text-sm font-medium tracking-tight">{industry.title}</h3>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{industry.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
