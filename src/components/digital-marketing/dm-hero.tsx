"use client";

import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import { DM } from "@/lib/digital-marketing-media";
import { gsapEase, registerGsap } from "@/lib/gsap-client";

export function DigitalMarketingHero() {
  const rootRef = useRef<HTMLElement>(null);
  const gsap = registerGsap();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const intro = root.querySelectorAll("[data-hero-intro]");
      const headline = root.querySelector("[data-hero-headline]");

      if (reduce) {
        gsap.set([intro, headline], { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        intro,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: gsapEase },
      );
      gsap.fromTo(
        headline,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.12, ease: gsapEase },
      );
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="pt-8 md:pt-12">
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-6 lg:px-12 xl:px-16">
        <p
          data-hero-intro
          className="mb-6 text-xs tracking-[0.18em] uppercase motion-safe:opacity-0"
          style={{ color: DM.muted }}
        >
          Digital marketing
        </p>
        <h1
          data-hero-headline
          className="max-w-[13ch] text-[clamp(3.1rem,6vw,7.5rem)] leading-[0.94] font-medium tracking-tight motion-safe:opacity-0"
          style={{ color: DM.text, letterSpacing: "-0.045em" }}
        >
          Marketing that turns attention into{" "}
          <em
            className="italic"
            style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontWeight: 400 }}
          >
            measurable growth
          </em>
          .
        </h1>
        <p
          data-hero-intro
          className="mt-8 max-w-xl text-[0.9375rem] leading-relaxed motion-safe:opacity-0 md:text-base"
          style={{ color: DM.muted }}
        >
          We connect positioning, creative, search, performance and analytics into one growth
          system—so every campaign strengthens the business behind it.
        </p>
        <div
          data-hero-intro
          className="mt-10 flex flex-col gap-3 motion-safe:opacity-0 sm:flex-row sm:items-center"
        >
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              background: DM.accent,
              color: DM.warm,
              outlineColor: DM.warm,
            }}
          >
            Plan a growth sprint
            <ArrowRight size={15} aria-hidden />
          </a>
          <a
            href="#services"
            className="inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2"
            style={{
              color: DM.text,
              boxShadow: `inset 0 0 0 1px ${DM.hairline}`,
            }}
          >
            Explore our capabilities
          </a>
        </div>
      </div>
    </section>
  );
}
