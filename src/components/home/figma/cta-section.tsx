"use client";

import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";

import { BlurReveal, BLUR_REVEAL_NORMAL_SPEED } from "@/components/blur-reveal";
import { RevealCopy, useAfterTitleReveal } from "@/components/home/figma/after-title-reveal";
import { canonicalPath } from "@/lib/site";

const CtaPixelBeams = dynamic(
  () => import("./cta-pixel-beams").then((mod) => mod.CtaPixelBeams),
  { ssr: false },
);

export function FigmaCtaSection() {
  const { revealed, onTitleComplete } = useAfterTitleReveal();
  return (
    <div className="relative pb-0">
      <span aria-hidden className="gutter-hatch" />
      <div className="hatch-aligned-frame border-y border-border px-1 py-1 md:px-0 md:py-0">
        <section
          id="contact"
          className="section-layout relative overflow-hidden"
          style={{ background: "var(--foreground)" }}
        >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <CtaPixelBeams />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 48%, rgba(28,25,23,0.45) 0%, rgba(28,25,23,0.12) 54%, transparent 78%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-2xl px-10 py-14 text-center md:py-16">
          <p
            className="mb-6 text-xs font-semibold tracking-widest uppercase"
            style={{ color: "rgba(247,247,244,0.45)" }}
          >
            Let&apos;s talk
          </p>
          <BlurReveal
            as="h2"
            inView
            speedReveal={BLUR_REVEAL_NORMAL_SPEED}
            onAnimationComplete={onTitleComplete}
            className="mb-10 text-2xl font-bold tracking-tight md:text-4xl"
            style={{ color: "var(--background)", letterSpacing: "-0.03em" }}
          >
            Your technology should not become your operational bottleneck.
          </BlurReveal>
          <RevealCopy revealed={revealed} delay={0.08} as="div">
            <a
              href={canonicalPath("/contact")}
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--background)", color: "var(--foreground)" }}
            >
              Talk to our team <ArrowRight size={14} />
            </a>
          </RevealCopy>
          <RevealCopy
            revealed={revealed}
            delay={0.32}
            className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          >
            <a
              href={canonicalPath("/case-studies")}
              className="text-sm transition-opacity hover:opacity-80"
              style={{ color: "rgba(247,247,244,0.55)" }}
            >
              Explore Case Studies
            </a>
            <a
              href={canonicalPath("/about")}
              className="text-sm transition-opacity hover:opacity-80"
              style={{ color: "rgba(247,247,244,0.55)" }}
            >
              About Comlabs
            </a>
            <a
              href={canonicalPath("/blog")}
              className="text-sm transition-opacity hover:opacity-80"
              style={{ color: "rgba(247,247,244,0.55)" }}
            >
              Engineering insights
            </a>
          </RevealCopy>
        </div>
        </section>
      </div>
    </div>
  );
}
