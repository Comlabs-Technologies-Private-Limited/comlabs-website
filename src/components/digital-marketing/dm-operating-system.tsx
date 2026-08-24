"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import { DIGITAL_MARKETING_STAGES } from "@/lib/digital-marketing";
import { DM } from "@/lib/digital-marketing-media";
import { gsapEase, registerGsap } from "@/lib/gsap-client";

export function DigitalMarketingOperatingSystem() {
  const rootRef = useRef<HTMLElement>(null);
  const gsap = registerGsap();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const line = root.querySelector("[data-process-line]");
      const steps = root.querySelectorAll("[data-process-step]");

      if (reduce) {
        gsap.set(line, { scaleX: 1, scaleY: 1 });
        gsap.set(steps, { opacity: 1, y: 0 });
        return;
      }

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: { trigger: root, start: "top 70%", end: "bottom 55%", scrub: 0.4 },
          },
        );
      });
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: { trigger: root, start: "top 75%", end: "bottom 50%", scrub: 0.4 },
          },
        );
      });
      gsap.fromTo(
        steps,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: gsapEase,
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-6 lg:px-12 xl:px-16">
        <h2
          className="text-[clamp(2rem,3.6vw,3.5rem)] leading-[1.06] font-medium tracking-tight"
          style={{ color: DM.text, letterSpacing: "-0.035em" }}
        >
          How the system moves.
        </h2>

        <div className="relative mt-20">
          <div
            className="absolute top-3 bottom-3 left-[11px] w-px origin-top md:top-5 md:right-0 md:bottom-auto md:left-0 md:h-px md:w-full md:origin-left"
            style={{ background: DM.hairline }}
            aria-hidden
          />
          <div
            data-process-line
            className="absolute top-3 bottom-3 left-[11px] w-px origin-top md:top-5 md:right-0 md:bottom-auto md:left-0 md:h-px md:w-full md:origin-left"
            style={{ background: DM.accent }}
            aria-hidden
          />
          <ol className="grid gap-14 md:grid-cols-4 md:gap-x-8">
            {DIGITAL_MARKETING_STAGES.map((stage) => (
              <li key={stage.index} data-process-step className="relative pl-8 md:pl-0">
                <span
                  className="absolute top-0 left-0 h-6 w-6 rounded-full md:relative md:mb-8"
                  style={{
                    background: DM.bg,
                    boxShadow: `inset 0 0 0 1px ${DM.accent}`,
                  }}
                  aria-hidden
                />
                <p className="text-[11px] tracking-[0.16em] uppercase" style={{ color: DM.muted }}>
                  {stage.index}
                </p>
                <h3 className="mt-3 text-xl font-medium tracking-tight">{stage.title}</h3>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: DM.muted }}>
                  {stage.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
