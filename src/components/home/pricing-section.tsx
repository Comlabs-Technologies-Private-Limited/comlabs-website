"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { SectionHeader } from "@/components/home/section-header";
import { SectionContainer } from "@/components/layout/section-container";
import { cn } from "@/lib/utils";
import { canonicalPath } from "@/lib/site";

const ease = [0.25, 0.1, 0, 1] as const;

const rows = [
  {
    service: "Landing Page Sprint",
    range: "For launches, waitlists, campaigns, and focused product pages.",
    timeline: "1–2 weeks",
  },
  {
    service: "Startup Website Rebuild",
    range: "For founders who need a premium website that explains, sells, and converts.",
    timeline: "3–6 weeks",
  },
  {
    service: "Product UI + Website System",
    range: "For SaaS and product teams that need both marketing pages and product interfaces.",
    timeline: "4–8 weeks",
  },
  {
    service: "Automation Layer",
    range:
      "For lead routing, onboarding, support workflows, internal tools, and AI-assisted operations.",
    timeline: "Scoped after audit",
  },
] as const;

const pricingCta = cn(
  "group mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 py-1 pl-5 pr-1.5",
  "text-[13px] font-medium tracking-tight text-black",
  "bg-white shadow-[0_4px_24px_-4px_rgba(255,255,255,0.35)]",
  "transition-[background-color,transform] duration-150 hover:bg-neutral-100 active:scale-[0.98]",
);

export function PricingSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const reduceMotion = !!useReducedMotion();

  return (
    <section
      id="pricing"
      ref={ref}
      className="relative overflow-x-clip bg-[#111111] py-14 md:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.08),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_0%,rgba(234,179,8,0.06),transparent)]"
      />

      <SectionContainer className="relative z-10 px-3 md:px-8">
        <SectionHeader>
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500 md:text-[11px]">
            Pricing
          </p>
          <h2 className="mt-2.5 text-[clamp(1.5rem,3.2vw,2.375rem)] font-medium leading-[1.14] tracking-tighter text-zinc-50 md:mt-3 md:leading-[1.12]">
            Transparent from the start.
          </h2>
          <p className="mt-3 text-[0.875rem] font-normal leading-relaxed text-zinc-400 md:mt-4 md:text-[0.9375rem]">
            Clear starting points for focused website, product UI, and automation work. Final
            pricing depends on scope, integrations, animation depth, and delivery timeline.
          </p>
        </SectionHeader>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: reduceMotion ? 0 : 0.08, duration: 0.5, ease }}
          className="relative mt-10 overflow-hidden rounded-sm bg-[#14171c] ring-1 ring-inset ring-white/[0.07] shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_20px_56px_-20px_rgba(0,0,0,0.6)] md:mt-12"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
          />

          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left text-[13px]">
              <thead>
                <tr className="border-b border-white/[0.06] text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                  <th className="px-5 py-4 font-medium">Offering</th>
                  <th className="px-5 py-4 font-medium">Scope</th>
                  <th className="px-5 py-4 font-medium">Timeline</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.service}
                    className="border-b border-white/[0.06] last:border-b-0"
                  >
                    <td className="px-5 py-4 font-medium text-zinc-100">{row.service}</td>
                    <td className="px-5 py-4 text-zinc-400">{row.range}</td>
                    <td className="whitespace-nowrap px-5 py-4 tabular-nums text-violet-300">
                      {row.timeline}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <p className="mt-6 text-[13px] font-normal leading-relaxed text-zinc-500">
          Final pricing depends on pages, integrations, CMS, animation depth, and automation
          requirements.
        </p>

        <Link href={canonicalPath("/contact")} className={pricingCta}>
          <span>Book a strategy call</span>
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 transition-transform duration-150 group-hover:translate-x-0.5"
            aria-hidden
          >
            <ArrowRight className="size-4 -rotate-45 text-black" strokeWidth={2} />
          </span>
        </Link>
      </SectionContainer>
    </section>
  );
}
