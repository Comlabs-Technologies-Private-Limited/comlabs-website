import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { canonicalPath } from "@/lib/site";

export function CaseStudyCta() {
  return (
    <section
      className="mx-6 mb-16 overflow-hidden rounded-3xl"
      style={{ background: "var(--foreground)" }}
      aria-label="Contact Comlabs"
    >
      <div className="mx-auto max-w-2xl px-8 py-20 text-center md:px-10 md:py-24">
        <p
          className="mb-5 text-xs tracking-widest uppercase"
          style={{ color: "rgba(247,247,244,0.45)" }}
        >
          Let&apos;s build something
        </p>
        <h2
          className="mb-5 text-3xl font-medium tracking-tight md:text-5xl"
          style={{ color: "var(--background)", letterSpacing: "-0.03em" }}
        >
          Start a project.
        </h2>
        <p
          className="mb-10 text-base leading-[1.7] md:text-lg"
          style={{ color: "rgba(247,247,244,0.55)" }}
        >
          Tell us what you&apos;re building. We&apos;ll tell you how we&apos;d approach it — no
          commitment required.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href={canonicalPath("/contact")}
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: "var(--background)", color: "var(--foreground)" }}
          >
            Get in touch <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <Link
            href={canonicalPath("/work")}
            className="inline-flex items-center gap-2 rounded-full border px-8 py-3.5 text-sm font-medium transition-opacity hover:opacity-90"
            style={{ borderColor: "rgba(247,247,244,0.25)", color: "var(--background)" }}
          >
            See more work
          </Link>
        </div>
      </div>
    </section>
  );
}
