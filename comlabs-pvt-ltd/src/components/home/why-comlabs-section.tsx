"use client";

import { SectionHeader } from "@/components/home/section-header";
import { bodyText, cardSurface, eyebrow, sectionTitle } from "@/lib/page-styles";
import { cn } from "@/lib/utils";

const pillars = [
  {
    title: "Direct founder access",
    body: "You work directly with the builder, not an account manager or rotating delivery team.",
  },
  {
    title: "Design and development together",
    body: "Every decision is made with implementation, performance, responsiveness, and conversion in mind.",
  },
  {
    title: "Fast, focused delivery",
    body: "Clear scope, tight feedback loops, and visible progress from strategy to launch.",
  },
  {
    title: "Built to evolve",
    body: "Your website can grow into product pages, dashboards, automations, and internal tools over time.",
  },
];

export function WhyComlabsSection() {
  return (
    <section className="bg-[var(--bg-primary)] px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader>
          <p className={eyebrow}>Why Comlabs</p>
          <h2 className={cn(sectionTitle, "mt-4 max-w-[28ch]")}>
            Senior execution without agency overhead.
          </h2>
          <p className={cn(bodyText, "mt-4 max-w-2xl")}>
            You work directly with the person designing, building, and shipping the work. No
            handoffs. No bloated team. No slow communication.
          </p>
        </SectionHeader>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {pillars.map((p) => (
            <article key={p.title} className={cn(cardSurface, "flex flex-col gap-3")}>
              <h3 className="text-[15px] font-medium text-[var(--fg-primary)]">{p.title}</h3>
              <p className={cn(bodyText, "text-[13px]")}>{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
