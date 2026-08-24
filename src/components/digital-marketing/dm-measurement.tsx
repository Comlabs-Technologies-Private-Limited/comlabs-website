"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import { DIGITAL_MARKETING_ORANGE } from "@/lib/digital-marketing";
import { gsapEase, registerGsap } from "@/lib/gsap-client";

const SIGNALS = ["Discovery", "Engagement", "Qualified action"] as const;

export function DigitalMarketingMeasurement() {
  const rootRef = useRef<HTMLElement>(null);
  const gsap = registerGsap();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cells = root.querySelectorAll("[data-signal]");
      const headline = root.querySelector("[data-measure-headline]");

      if (reduce) {
        gsap.set([cells, headline], { opacity: 1, y: 0, clipPath: "none" });
        return;
      }

      gsap.fromTo(
        headline,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: gsapEase,
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        },
      );

      gsap.fromTo(
        cells,
        { opacity: 0, clipPath: "inset(100% 0 0 0)" },
        {
          opacity: 1,
          clipPath: "inset(0% 0 0 0)",
          duration: 0.7,
          stagger: 0.12,
          ease: gsapEase,
          scrollTrigger: { trigger: root, start: "top 68%", once: true },
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="border-b border-border bg-secondary/50">
      <div className="mx-auto w-full max-w-[1380px] px-5 py-[72px] md:px-7 md:py-[120px] lg:px-12 lg:py-40 xl:px-[72px]">
        <h2
          data-measure-headline
          className="max-w-[12ch] text-[clamp(2.25rem,6vw,5.5rem)] leading-[1.02] font-medium tracking-tight"
          style={{ letterSpacing: "-0.045em" }}
        >
          Reach is a signal. Growth is the outcome.
        </h2>
        <p className="mt-8 max-w-xl text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
          We measure the complete journey—from discovery and engagement to qualified action—so
          reporting leads to decisions instead of becoming another monthly document.
        </p>

        <div className="mt-14 grid border-t border-border md:grid-cols-3">
          {SIGNALS.map((signal, index) => (
            <div
              key={signal}
              data-signal
              className={`py-8 ${index > 0 ? "border-t border-border md:border-t-0 md:border-l md:pl-8" : ""} ${index < 2 ? "md:pr-8" : ""}`}
            >
              <p className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                0{index + 1}
              </p>
              <p
                className="mt-3 text-2xl font-medium tracking-tight"
                style={{ letterSpacing: "-0.03em", color: index === 2 ? DIGITAL_MARKETING_ORANGE : undefined }}
              >
                {signal}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
