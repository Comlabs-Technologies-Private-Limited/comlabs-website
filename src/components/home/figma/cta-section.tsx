import { ArrowRight } from "lucide-react";

import { canonicalPath } from "@/lib/site";

export function FigmaCtaSection() {
  return (
    <section
      id="contact"
      className="mx-6 mb-16 overflow-hidden rounded-3xl"
      style={{ background: "var(--foreground)" }}
    >
      <div className="mx-auto max-w-2xl px-10 py-24 text-center">
        <p
          className="mb-6 text-xs font-semibold tracking-widest uppercase"
          style={{ color: "rgba(247,247,244,0.45)" }}
        >
          Let&apos;s talk
        </p>
        <h2
          className="mb-6 text-2xl font-bold tracking-tight md:text-5xl"
          style={{ color: "var(--background)", letterSpacing: "-0.03em" }}
        >
          Your technology should not become your operational bottleneck.
        </h2>
        <p className="mb-10 text-base leading-relaxed" style={{ color: "rgba(247,247,244,0.55)" }}>
          Whether you need stronger application support, production infrastructure, AI engineering
          or a new software system, Comlabs brings the engineering depth to take responsibility for
          it.
        </p>
        <a
          href={canonicalPath("/contact")}
          className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: "var(--background)", color: "var(--foreground)" }}
        >
          Talk to our team <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
}
