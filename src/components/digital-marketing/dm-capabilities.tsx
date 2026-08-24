"use client";

import { useGSAP } from "@gsap/react";
import {
  Compass,
  LineChart,
  Megaphone,
  PenLine,
  Search,
  Share2,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import type { LucideIcon } from "lucide-react";

import { DmVisual } from "@/components/digital-marketing/dm-visual";
import {
  DIGITAL_MARKETING_CAPABILITIES,
  DIGITAL_MARKETING_RELATED_LINKS,
  type DigitalMarketingCapability,
} from "@/lib/digital-marketing";
import { DM, DM_EASE } from "@/lib/digital-marketing-media";
import { gsapEase, registerGsap } from "@/lib/gsap-client";
import { canonicalPath } from "@/lib/site";
import Link from "next/link";

const ICONS: Record<string, LucideIcon> = {
  "brand-strategy": Compass,
  "content-creative": PenLine,
  performance: Megaphone,
  search: Search,
  social: Share2,
  analytics: LineChart,
};

export function DigitalMarketingCapabilities() {
  const rootRef = useRef<HTMLElement>(null);
  const gsap = registerGsap();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const rows = root.querySelectorAll<HTMLElement>("[data-capability-row]");

      rows.forEach((row) => {
        const frames = row.querySelectorAll("[data-capability-frame]");
        if (reduce) {
          gsap.set(frames, { opacity: 1, clipPath: "none" });
          return;
        }
        gsap.fromTo(
          frames,
          { clipPath: "inset(0 0 100% 0)", opacity: 0.4 },
          {
            clipPath: "inset(0 0 0% 0)",
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: gsapEase,
            scrollTrigger: { trigger: row, start: "top 78%", once: true },
          },
        );
      });
    },
    { scope: rootRef },
  );

  return (
    <section id="capabilities" ref={rootRef} className="scroll-mt-24 pb-8 md:pb-16">
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-6 lg:px-12 xl:px-16">
        <h2
          className="max-w-[16ch] text-[clamp(2rem,3.6vw,3.5rem)] leading-[1.06] font-medium tracking-tight"
          style={{ color: DM.text, letterSpacing: "-0.035em" }}
        >
          One connected marketing system.
        </h2>
        <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed" style={{ color: DM.muted }}>
          Strategy, creative and distribution work better when they share the same customer
          understanding, business goals and measurement model.
        </p>

        <div className="mt-16">
          {DIGITAL_MARKETING_CAPABILITIES.map((capability) => (
            <CapabilityRow key={capability.id} capability={capability} />
          ))}
        </div>

        <p className="mt-12 text-sm" style={{ color: DM.muted }}>
          Related:{" "}
          {DIGITAL_MARKETING_RELATED_LINKS.map((link, index) => (
            <span key={link.href}>
              {index > 0 ? " · " : null}
              <Link
                href={canonicalPath(link.href)}
                className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2"
                style={{ color: DM.text }}
              >
                {link.label}
              </Link>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

function CapabilityRow({ capability }: { capability: DigitalMarketingCapability }) {
  const Icon = ICONS[capability.id] ?? Compass;
  const reduce = useReducedMotion();

  return (
    <article
      data-capability-row
      className="grid gap-8 py-10 lg:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)] lg:gap-12 lg:py-14"
      style={{ borderTop: `1px solid ${DM.hairline}` }}
    >
      <div>
        <p className="text-[11px] tracking-[0.16em] uppercase" style={{ color: DM.muted }}>
          {capability.index} · {capability.category}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <span
            className="flex h-9 w-9 items-center justify-center"
            style={{ boxShadow: `inset 0 0 0 1px ${DM.hairline}`, borderRadius: 8 }}
          >
            <Icon size={16} aria-hidden style={{ color: DM.accent }} />
          </span>
          <h3
            className="text-[1.65rem] leading-tight font-medium tracking-tight"
            style={{ letterSpacing: "-0.03em" }}
          >
            {capability.title}
          </h3>
        </div>
        <p className="mt-4 max-w-md text-sm leading-relaxed" style={{ color: DM.muted }}>
          {capability.description}
        </p>
        <ul className="mt-6 space-y-2">
          {capability.deliverables.map((item) => (
            <li key={item} className="flex items-center gap-2 text-[13px]" style={{ color: DM.text }}>
              <span className="h-1 w-1 rounded-full" style={{ background: DM.accent }} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:gap-3 lg:overflow-visible lg:pb-0">
        {capability.visuals.map((visual, index) => (
          <motion.div
            key={`${capability.id}-${index}`}
            whileHover={reduce ? undefined : { scale: 1.015 }}
            transition={{ duration: 0.35, ease: DM_EASE }}
            className="min-w-[78%] snap-start overflow-hidden sm:min-w-[56%] lg:min-w-0"
            style={{ borderRadius: 12 }}
          >
            <div data-capability-frame className="aspect-[4/5] min-h-[220px]">
              <DmVisual visual={visual} size="tile" className="h-full w-full" />
            </div>
          </motion.div>
        ))}
      </div>
    </article>
  );
}
