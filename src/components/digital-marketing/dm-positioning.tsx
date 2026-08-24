"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import { DIGITAL_MARKETING_ORANGE } from "@/lib/digital-marketing";
import { gsapEase, registerGsap } from "@/lib/gsap-client";

export function DigitalMarketingPositioning() {
  const rootRef = useRef<HTMLElement>(null);
  const gsap = registerGsap();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const items = root.querySelectorAll("[data-pos]");
      if (reduce) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        items,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: gsapEase,
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            once: true,
          },
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="border-b border-border">
      <div className="mx-auto grid w-full max-w-[1380px] gap-10 px-5 py-[72px] md:px-7 md:py-[120px] lg:grid-cols-12 lg:gap-16 lg:px-12 lg:py-40 xl:px-[72px]">
        <div className="lg:col-span-8">
          <p
            data-pos
            className="mb-6 text-xs tracking-[0.18em] text-muted-foreground uppercase"
          >
            Our point of view
          </p>
          <h2
            data-pos
            className="max-w-[16ch] text-[clamp(2rem,4.6vw,4.25rem)] leading-[1.05] font-medium tracking-tight"
            style={{ letterSpacing: "-0.04em" }}
          >
            Good marketing should feel original—and prove its value.
          </h2>
        </div>
        <div className="flex flex-col justify-end lg:col-span-4">
          <div
            data-pos
            className="mb-6 h-px w-12"
            style={{ background: DIGITAL_MARKETING_ORANGE }}
            aria-hidden
          />
          <p data-pos className="text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
            The strongest digital brands do not separate creative ambition from commercial logic. We
            connect the story people remember with the systems that show what is working, what is not
            and where growth should come from next.
          </p>
        </div>
      </div>
    </section>
  );
}
