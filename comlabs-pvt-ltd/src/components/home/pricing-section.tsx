"use client";

import Link from "next/link";

import { PixelGridMark } from "@/components/decorative/pixel-grid-mark";
import { TextFade } from "@/components/motion/text-fade";
import { bodyText, eyebrow, sectionTitle } from "@/lib/page-styles";
import { cn } from "@/lib/utils";

const rows = [
  {
    service: "Landing Page Sprint",
    range:
      "For launches, waitlists, campaigns, and focused product pages.",
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
];

const pricingCtaClass =
  "mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-b from-neutral-800 to-neutral-950 px-6 py-2.5 text-[13px] font-normal tracking-tight text-white shadow-[0px_3.5px_1px_0px_var(--color-neutral-700)_inset,0px_1px_4px_0px_var(--color-neutral-900)] transition-all duration-150 hover:from-neutral-700 hover:to-neutral-900 active:scale-[0.97]";

export function PricingSection() {
  return (
    <section id="pricing" className="bg-[var(--bg-primary)] px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8 lg:gap-10">
          <div className="pointer-events-none relative shrink-0 select-none sm:pt-1">
            <div
              className="absolute -inset-6 rounded-full bg-violet-500/[0.14] blur-2xl"
              aria-hidden
            />
            <div className="relative scale-[0.92] opacity-[0.92] sm:scale-100 sm:opacity-100">
              <PixelGridMark surface="light" />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <TextFade mode="scroll">
              <p className={eyebrow}>Pricing</p>
              <h2 className={cn(sectionTitle, "mt-4")}>Transparent from the start.</h2>
              <p className={cn(bodyText, "mt-4 max-w-2xl")}>
                Clear starting points for focused website, product UI, and automation work. Final
                pricing depends on scope, integrations, animation depth, and delivery timeline.
              </p>
            </TextFade>
          </div>
        </div>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] shadow-sm shadow-black/[0.04]">
          <table className="w-full min-w-[520px] border-collapse text-left text-[13px]">
            <thead>
              <tr className="border-b border-[var(--border)] text-[11px] font-normal uppercase tracking-widest text-[var(--fg-tertiary)]">
                <th className="px-5 py-3 font-normal">Offering</th>
                <th className="px-5 py-3 font-normal">Scope</th>
                <th className="px-5 py-3 font-normal">Timeline</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.service}
                  className="border-b border-[var(--border)] last:border-b-0"
                >
                  <td className="px-5 py-4 font-medium text-[var(--fg-primary)]">{r.service}</td>
                  <td className="px-5 py-4 text-[var(--fg-secondary)]">{r.range}</td>
                  <td className="px-5 py-4 text-[var(--fg-secondary)]">{r.timeline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className={cn(bodyText, "mt-6 max-w-2xl text-[13px]")}>
          Final pricing depends on pages, integrations, CMS, animation depth, and automation
          requirements.
        </p>

        <Link href="/#contact" className={pricingCtaClass}>
          Book a strategy call
        </Link>
      </div>
    </section>
  );
}
