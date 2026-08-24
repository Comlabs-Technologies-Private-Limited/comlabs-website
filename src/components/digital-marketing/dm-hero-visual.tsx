"use client";

import { useRef } from "react";

import { DIGITAL_MARKETING_ORANGE } from "@/lib/digital-marketing";
import { gsapEaseSoft, registerGsap } from "@/lib/gsap-client";
import { useGSAP } from "@gsap/react";

export function DigitalMarketingHeroVisual() {
  const rootRef = useRef<HTMLDivElement>(null);
  const gsap = registerGsap();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const layers = root.querySelectorAll<HTMLElement>("[data-layer]");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce) {
        gsap.set(layers, { opacity: 1, y: 0, rotate: 0 });
        return;
      }

      gsap.fromTo(
        layers,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: gsapEaseSoft,
          delay: 0.2,
        },
      );

      const desktop = gsap.matchMedia();
      desktop.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        layers.forEach((layer) => {
          const depth = Number(layer.dataset.depth ?? "12");
          gsap.to(layer, {
            y: depth * -1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="relative mx-auto aspect-[4/5] w-full max-w-[520px] md:aspect-[5/6] lg:max-w-none"
      aria-hidden
    >
      <div
        data-layer
        data-depth="10"
        className="absolute inset-x-[8%] top-[6%] overflow-hidden rounded-[16px] border border-black/[0.08] bg-[#f3f1ec] shadow-[0_24px_60px_rgba(28,25,23,0.08)] motion-safe:opacity-0"
      >
        <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3">
          <span className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
            Campaign 04
          </span>
          <span className="text-[10px] tracking-tight text-muted-foreground">Q3 · Brand</span>
        </div>
        <div className="px-5 py-8 md:px-6 md:py-10">
          <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">Signal</p>
          <p
            className="mt-3 max-w-[12ch] text-[1.75rem] leading-[1.05] font-medium tracking-tight text-foreground md:text-[2.15rem]"
            style={{ letterSpacing: "-0.04em" }}
          >
            Chosen for a reason.
          </p>
          <div
            className="mt-6 h-px w-16"
            style={{ background: DIGITAL_MARKETING_ORANGE }}
          />
          <p className="mt-4 max-w-[28ch] text-[12px] leading-relaxed text-muted-foreground">
            A campaign frame built around the position—not a template of product shots.
          </p>
        </div>
      </div>

      <div
        data-layer
        data-depth="18"
        className="absolute top-[18%] right-[2%] w-[58%] rounded-[14px] border border-black/[0.08] bg-white px-4 py-4 shadow-[0_16px_40px_rgba(28,25,23,0.08)] motion-safe:opacity-0 md:w-[54%]"
      >
        <p className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">Discovery</p>
        <p className="mt-2 text-[13px] font-medium tracking-tight text-foreground">
          design studio pune
        </p>
        <div className="mt-3 space-y-2">
          <div className="h-1.5 w-[88%] rounded-full bg-black/[0.06]" />
          <div className="h-1.5 w-[64%] rounded-full bg-black/[0.06]" />
        </div>
        <div className="mt-4 rounded-[10px] border border-black/[0.06] bg-[#f7f7f4] px-3 py-3">
          <p className="text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
            Cited in AI answers
          </p>
          <p className="mt-1.5 text-[12px] leading-snug text-foreground">
            Comlabs — strategy, product and search under one roof.
          </p>
        </div>
      </div>

      <div
        data-layer
        data-depth="26"
        className="absolute bottom-[16%] left-[4%] w-[64%] rounded-[14px] border border-black/[0.08] bg-white p-4 shadow-[0_16px_40px_rgba(28,25,23,0.08)] motion-safe:opacity-0 md:bottom-[14%] md:w-[58%]"
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
            Qualified demand
          </p>
          <span
            className="text-[10px] font-medium tracking-tight"
            style={{ color: DIGITAL_MARKETING_ORANGE }}
          >
            Direction, not vanity
          </span>
        </div>
        <svg viewBox="0 0 240 72" className="h-16 w-full" fill="none" aria-hidden>
          <path
            d="M4 58 C 28 58, 36 42, 58 40 S 92 52, 112 36 S 150 18, 176 22 S 210 40, 236 12"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-foreground/70"
          />
          <circle cx="236" cy="12" r="3" fill={DIGITAL_MARKETING_ORANGE} />
        </svg>
      </div>

      <div
        data-layer
        data-depth="8"
        className="absolute right-[8%] bottom-[6%] max-w-[200px] rounded-[12px] border border-black/[0.08] bg-[#f7f7f4] px-4 py-3 shadow-[0_10px_28px_rgba(28,25,23,0.06)] motion-safe:opacity-0"
      >
        <p className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">Insight</p>
        <p className="mt-1.5 text-[13px] leading-snug font-medium tracking-tight text-foreground">
          Reach is a signal. The enquiry is the proof.
        </p>
      </div>
    </div>
  );
}
