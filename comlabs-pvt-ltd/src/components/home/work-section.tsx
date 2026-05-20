import Link from "next/link";

import { bodyText, cardSurface, eyebrow, sectionTitle } from "@/lib/page-styles";
import { cn } from "@/lib/utils";

const stories = [
  {
    tag: "90+ performance target · SEO-ready structure",
    title: "Rebuilding a SaaS homepage for trust and conversion",
    before: "The story was buried below the fold and the primary action competed with three other links.",
    improved: "A single narrative arc, one primary CTA, and pricing signals where buyers expect them.",
    shipped: "Mobile-first rebuild, clearer CTA flow, analytics-ready launch.",
  },
  {
    tag: "Clearer CTA flow · Analytics-ready launch",
    title: "Turning a generic agency site into a premium conversion system",
    before: "Copy read like a capabilities list — visitors could not tell who it was for or what to do next.",
    improved: "Tighter positioning, section order built around decisions, and proof placed next to claims.",
    shipped: "Structured for conversion-focused website goals without a full rebrand.",
  },
  {
    tag: "Mobile-first rebuild · Clearer CTA flow",
    title: "Designing a product dashboard for faster user decisions",
    before: "Key metrics were scattered across tabs; onboarding dropped after the first session.",
    improved: "A default view that answers “what changed?” and guided next steps on one screen.",
    shipped: "Product UI adjustments shipped behind the same auth and API layer.",
  },
  {
    tag: "SEO-ready structure · 90+ performance target",
    title: "Building a launch page for early-stage customer validation",
    before: "The team had a deck and a waitlist form, but no credible URL to send cold outreach.",
    improved: "A tight launch narrative, waitlist capture, and social proof placeholders ready to fill in.",
    shipped: "Landing page sprint with event tracking for sign-up and scroll depth.",
  },
];

export function WorkSection() {
  return (
    <section className="bg-[var(--bg-primary)] px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className={eyebrow}>Work</p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className={sectionTitle}>Work that ships.</h2>
          <Link
            href="/case-studies"
            className="shrink-0 text-[13px] font-normal text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
          >
            View work →
          </Link>
        </div>
        <p className={cn(bodyText, "mt-4 max-w-2xl")}>
          Selected builds, rebuilds, and product interfaces focused on clarity, credibility, and
          speed.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {stories.map((s) => (
            <article key={s.title} className={cn(cardSurface, "flex flex-col")}>
              <p className="text-[11px] font-normal uppercase tracking-widest text-[var(--fg-tertiary)]">
                {s.tag}
              </p>
              <h3 className="mt-3 text-[15px] font-medium text-[var(--fg-primary)]">{s.title}</h3>
              <p className={cn(bodyText, "mt-2 text-[13px]")}>
                <span className="font-medium text-[var(--fg-primary)]">Before: </span>
                {s.before}
              </p>
              <p className={cn(bodyText, "mt-2 text-[13px]")}>
                <span className="font-medium text-[var(--fg-primary)]">Improved: </span>
                {s.improved}
              </p>
              <p className={cn(bodyText, "mt-2 text-[13px] font-medium text-[var(--fg-primary)]")}>
                Shipped: {s.shipped}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
