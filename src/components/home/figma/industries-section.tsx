"use client";

import { Brain, Building2, Cog, Cpu, ShoppingBag } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { BlurReveal, BLUR_REVEAL_NORMAL_SPEED } from "@/components/blur-reveal";
import {
  RevealStagger,
  RevealStaggerItem,
  useAfterTitleReveal,
} from "@/components/home/figma/after-title-reveal";

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
  const { revealed, onTitleComplete } = useAfterTitleReveal();
  return (
    <section id="industries" className="relative border-y border-border py-14 md:py-16">
      <span aria-hidden className="gutter-hatch" />
      <div className="section-layout">
        <div className="mb-8 max-w-2xl px-3 md:px-4 md:mb-10">
          <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Industries
          </p>
          <BlurReveal
            as="h2"
            inView
            speedReveal={BLUR_REVEAL_NORMAL_SPEED}
            onAnimationComplete={onTitleComplete}
            className="text-2xl font-bold tracking-tight md:text-4xl"
            style={{ letterSpacing: "-0.03em" }}
            segments={[
              { text: "Built for companies where" },
              { text: "software", style: { color: "var(--warm-orange)" } },
              { text: "is part of the operation." },
            ]}
          />
        </div>

        <RevealStagger
          revealed={revealed}
          delay={0.08}
          className="grid grid-cols-1 gap-x-8 gap-y-5 px-3 md:px-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {INDUSTRIES.map((industry) => {
            const Icon = industry.icon;
            return (
              <RevealStaggerItem key={industry.title}>
                <div className="min-w-0 border-t border-border px-2 pt-4 pb-3">
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
                </div>
              </RevealStaggerItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
