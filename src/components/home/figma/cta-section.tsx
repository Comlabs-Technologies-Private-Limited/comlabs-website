import { ArrowRight } from "lucide-react";

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
          Let&apos;s build something
        </p>
        <h2
          className="mb-6 text-2xl font-bold tracking-tight md:text-5xl"
          style={{ color: "var(--background)", letterSpacing: "-0.03em" }}
        >
          Start a project.
        </h2>
        <p className="mb-10 text-base leading-relaxed" style={{ color: "rgba(247,247,244,0.55)" }}>
          Tell us what you&apos;re building. We&apos;ll tell you how we&apos;d approach it — no
          commitment required.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: "var(--background)", color: "var(--foreground)" }}
        >
          Get in touch <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
}
