"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import { DM } from "@/lib/digital-marketing-media";
import { gsapEase, registerGsap } from "@/lib/gsap-client";

export function DigitalMarketingMeasurement() {
  const rootRef = useRef<HTMLElement>(null);
  const gsap = registerGsap();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const headline = root.querySelector("[data-measure-headline]");
      const dots = root.querySelectorAll("[data-signal-dot]");

      if (reduce) {
        gsap.set([headline, dots], { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        headline,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: gsapEase,
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        },
      );
      gsap.fromTo(
        dots,
        { opacity: 0 },
        {
          opacity: 0.35,
          duration: 0.8,
          stagger: 0.05,
          scrollTrigger: { trigger: root, start: "top 70%", once: true },
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="relative overflow-hidden py-28 md:py-36">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1200 400"
        aria-hidden
      >
        {Array.from({ length: 18 }, (_, index) => (
          <circle
            key={index}
            data-signal-dot
            cx={80 + index * 62}
            cy={180 + Math.sin(index) * 48}
            r="3"
            fill={DM.accent}
            opacity="0.28"
          />
        ))}
        <path
          d="M70 190 C 220 90, 420 270, 620 160 S 980 240, 1140 150"
          fill="none"
          stroke={DM.accent}
          strokeWidth="1"
          opacity="0.18"
        />
      </svg>
      <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-6 lg:px-12 xl:px-16">
        <h2
          data-measure-headline
          className="max-w-[12ch] text-[clamp(2.4rem,6vw,5.8rem)] leading-[1.02] font-medium tracking-tight"
          style={{ color: DM.text, letterSpacing: "-0.045em" }}
        >
          Reach is a signal. Growth is the outcome.
        </h2>
        <p className="mt-8 max-w-xl text-[0.9375rem] leading-relaxed" style={{ color: DM.muted }}>
          We measure the complete journey—from discovery and engagement to qualified action—so
          reporting leads to decisions instead of becoming another monthly document.
        </p>
      </div>
    </section>
  );
}
