"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import { DM } from "@/lib/digital-marketing-media";
import { gsapEase, registerGsap } from "@/lib/gsap-client";

const LINES = ["Good marketing should feel original—", "and prove its value."] as const;

export function DigitalMarketingPositioning() {
  const rootRef = useRef<HTMLElement>(null);
  const gsap = registerGsap();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const lines = root.querySelectorAll("[data-pov-line]");
      const copy = root.querySelector("[data-pov-copy]");

      if (reduce) {
        gsap.set([lines, copy], { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        lines,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: gsapEase,
          scrollTrigger: { trigger: root, start: "top 75%", once: true },
        },
      );
      gsap.fromTo(
        copy,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.15,
          ease: gsapEase,
          scrollTrigger: { trigger: root, start: "top 75%", once: true },
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="py-24 md:py-32 lg:py-40">
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-6 lg:px-12 xl:px-16">
        <p className="mb-8 text-xs tracking-[0.18em] uppercase" style={{ color: DM.muted }}>
          Our point of view
        </p>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,0.28fr)] lg:justify-between">
          <h2
            className="text-[clamp(2.1rem,4.4vw,4.5rem)] leading-[1.02] font-medium tracking-tight"
            style={{ color: DM.text, letterSpacing: "-0.04em" }}
          >
            {LINES.map((line) => (
              <span key={line} className="block overflow-hidden">
                <span data-pov-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </h2>
          <div data-pov-copy className="lg:pt-4">
            <span
              className="mb-6 block h-px w-10"
              style={{ background: DM.accent }}
              aria-hidden
            />
            <p className="text-[0.9375rem] leading-relaxed" style={{ color: DM.muted }}>
              The strongest digital brands do not separate creative ambition from commercial logic.
              We connect the story people remember with the systems that reveal what is working,
              what is not and where growth should come from next.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
