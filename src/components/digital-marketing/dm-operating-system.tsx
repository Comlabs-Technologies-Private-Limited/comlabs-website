"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import {
  DIGITAL_MARKETING_ORANGE,
  DIGITAL_MARKETING_STAGES,
} from "@/lib/digital-marketing";
import { gsapEase, registerGsap } from "@/lib/gsap-client";

export function DigitalMarketingOperatingSystem() {
  const rootRef = useRef<HTMLElement>(null);
  const gsap = registerGsap();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mobileLine = root.querySelector<HTMLElement>("[data-os-line-mobile]");
      const desktopLine = root.querySelector<HTMLElement>("[data-os-line-desktop]");
      const stages = root.querySelectorAll("[data-os-stage]");

      if (reduce) {
        gsap.set(stages, { opacity: 1, y: 0 });
        if (mobileLine) gsap.set(mobileLine, { scaleY: 1 });
        if (desktopLine) gsap.set(desktopLine, { scaleX: 1 });
        return;
      }

      gsap.fromTo(
        stages,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: gsapEase,
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        },
      );

      if (mobileLine) {
        gsap.fromTo(
          mobileLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.1,
            ease: gsapEase,
            scrollTrigger: { trigger: root, start: "top 70%", once: true },
          },
        );
      }

      if (desktopLine) {
        gsap.fromTo(
          desktopLine,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: gsapEase,
            scrollTrigger: { trigger: root, start: "top 70%", once: true },
          },
        );
      }
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="border-b border-border bg-card">
      <div className="mx-auto w-full max-w-[1380px] px-5 py-[72px] md:px-7 md:py-[120px] lg:px-12 lg:py-40 xl:px-[72px]">
        <p className="mb-5 text-xs tracking-[0.18em] text-muted-foreground uppercase">
          How we think
        </p>
        <h2
          className="max-w-[18ch] text-[clamp(1.85rem,3.4vw,3.25rem)] leading-[1.08] font-medium tracking-tight"
          style={{ letterSpacing: "-0.035em" }}
        >
          A marketing operating system, not a list of tasks.
        </h2>
        <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-muted-foreground">
          Diagnose before you invent. Position before you publish. Launch with measurement already
          attached. Then compound what actually produces results.
        </p>

        <div className="relative mt-14 md:mt-20">
          <span
            data-os-line-mobile
            className="pointer-events-none absolute top-0 bottom-0 left-[11px] origin-top bg-black/[0.1] md:hidden"
            style={{ width: "1px" }}
            aria-hidden
          />
          <span
            data-os-line-desktop
            className="pointer-events-none absolute top-5 right-0 left-0 hidden h-px origin-left md:block"
            style={{ background: DIGITAL_MARKETING_ORANGE, opacity: 0.55 }}
            aria-hidden
          />

          <ol className="grid gap-10 md:grid-cols-4 md:gap-8">
            {DIGITAL_MARKETING_STAGES.map((stage) => (
              <li key={stage.title} data-os-stage className="relative pl-8 md:pl-0">
                <span
                  className="absolute top-1.5 left-0 h-2.5 w-2.5 rounded-full border border-black/20 bg-background md:top-3.5"
                  style={{ boxShadow: `0 0 0 4px var(--background)` }}
                  aria-hidden
                />
                <p className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                  {stage.index}
                </p>
                <h3
                  className="mt-3 text-xl font-medium tracking-tight"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {stage.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
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
