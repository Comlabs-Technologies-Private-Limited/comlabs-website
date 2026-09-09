import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { canonicalPath } from "@/lib/site";

type MarketingCtaSectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref?: string;
};

/**
 * Dark accent panel, closing out most marketing pages. Square corners and a
 * hairline border, in the same family as the homepage's Agentic AI feature
 * panel, rather than the previous floating rounded-3xl island.
 */
export function MarketingCtaSection({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref = "/contact",
}: MarketingCtaSectionProps) {
  return (
    <section className="relative mb-16">
      <span aria-hidden className="gutter-hatch" />
      <div className="section-layout">
        <div
          className="relative overflow-hidden border"
          style={{ background: "#141414", borderColor: "rgba(247,247,244,0.14)", borderRadius: 0 }}
        >
          <div className="relative grid items-center gap-10 px-8 py-16 md:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] md:px-12 md:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(247,247,244,0.08) 1px, transparent 0)",
                backgroundSize: "22px 22px",
              }}
            />

            <div className="relative z-10 max-w-2xl">
              {eyebrow ? (
                <p
                  className="mb-5 text-xs tracking-widest uppercase"
                  style={{ color: "rgba(247,247,244,0.45)" }}
                >
                  {eyebrow}
                </p>
              ) : null}
              <h2
                className="text-2xl font-medium tracking-tight md:text-4xl"
                style={{ color: "#F7F7F4", letterSpacing: "-0.03em" }}
              >
                {title}
              </h2>
              <p
                className="mt-5 max-w-xl text-base leading-relaxed md:text-[17px]"
                style={{ color: "rgba(247,247,244,0.62)" }}
              >
                {description}
              </p>
              <Link
                href={canonicalPath(ctaHref)}
                className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]"
                style={{ background: "#F7F7F4", color: "#141414" }}
              >
                {ctaLabel} <ArrowRight size={14} aria-hidden />
              </Link>
            </div>

            <aside
              aria-hidden
              className="relative z-10 hidden border border-white/10 p-5 md:block"
              style={{ borderRadius: 0 }}
            >
              <p
                className="text-[10px] tracking-[0.16em] uppercase"
                style={{ fontFamily: "var(--font-mono)", color: "rgba(247,247,244,0.4)" }}
              >
                Engagement
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  { label: "Build", state: "Scoped" },
                  { label: "Operate", state: "Observed" },
                  { label: "Support", state: "Owned" },
                  { label: "Improve", state: "Queued" },
                ].map((row, index) => (
                  <li
                    key={row.label}
                    className={
                      index > 0
                        ? "flex items-center justify-between gap-3 border-t border-white/10 pt-3"
                        : "flex items-center justify-between gap-3"
                    }
                  >
                    <span className="text-[13px] text-neutral-100/80">{row.label}</span>
                    <span className="text-[10px] tracking-wide" style={{ color: "var(--warm-orange)" }}>
                      {row.state}
                    </span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
