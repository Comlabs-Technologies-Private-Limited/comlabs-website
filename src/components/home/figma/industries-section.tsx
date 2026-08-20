"use client";

import { Brain, Building2, Cloud, ShoppingBag, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { MarketingFadeIn } from "@/components/marketing/marketing-motion";
import { MarketingOrangeHighlight } from "@/components/marketing/marketing-section-header";

type IndustryItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const INDUSTRIES: IndustryItem[] = [
  {
    title: "Fintech",
    description: "Secure platforms, payment flows, and compliance-ready product engineering.",
    icon: Wallet,
  },
  {
    title: "E-commerce",
    description: "High-converting storefronts, checkout experiences, and scalable catalog systems.",
    icon: ShoppingBag,
  },
  {
    title: "Artificial Intelligence",
    description: "Search, copilots, automation, and model integrations built into real workflows.",
    icon: Brain,
  },
  {
    title: "Cloud & DevOps",
    description: "Infrastructure, CI/CD, observability, and scaling for production workloads.",
    icon: Cloud,
  },
  {
    title: "Enterprise Software",
    description: "Internal tools, dashboards, and custom systems for complex organizations.",
    icon: Building2,
  },
];

export function FigmaIndustriesSection() {
  return (
    <section id="industries" className="border-y border-border bg-card px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <MarketingFadeIn className="mb-12 max-w-2xl">
          <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Industries we serve
          </p>
          <h2
            className="text-2xl font-bold tracking-tight md:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Built for teams shipping in{" "}
            <MarketingOrangeHighlight>high-stakes</MarketingOrangeHighlight> domains.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            From regulated fintech to fast-moving commerce and AI-native products — we bring the
            same engineering discipline across every industry.
          </p>
        </MarketingFadeIn>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {INDUSTRIES.map((industry, i) => {
            const Icon = industry.icon;
            const spanClass = i < 3 ? "lg:col-span-2" : "lg:col-span-3";

            return (
              <article
                key={industry.title}
                className={`group flex flex-col rounded-3xl border border-border bg-background p-8 transition-[border-color,box-shadow] duration-300 hover:border-foreground/20 hover:shadow-[0_8px_32px_rgba(28,25,23,0.06)] ${spanClass}`}
              >
                <div
                  className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border transition-colors group-hover:border-foreground/15"
                  style={{ background: "var(--warm-orange-light)" }}
                >
                  <Icon size={18} style={{ color: "var(--warm-orange)" }} strokeWidth={1.75} />
                </div>
                <h3 className="mb-2 text-sm font-semibold">{industry.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{industry.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
