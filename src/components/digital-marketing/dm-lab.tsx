"use client";

import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";

import { DmVisual } from "@/components/digital-marketing/dm-visual";
import { DIGITAL_MARKETING_LAB } from "@/lib/digital-marketing";
import { DM, DM_EASE } from "@/lib/digital-marketing-media";
import { gsapEase, registerGsap } from "@/lib/gsap-client";

export function DigitalMarketingLab() {
  const rootRef = useRef<HTMLElement>(null);
  const gsap = registerGsap();
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const tiles = root.querySelectorAll("[data-lab-tile]");
      const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduce) {
        gsap.set(tiles, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        tiles,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.04,
          ease: gsapEase,
          scrollTrigger: { trigger: root, start: "top 80%", once: true },
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-6 lg:px-12 xl:px-16">
        <h2
          className="max-w-[14ch] text-[clamp(2rem,3.6vw,3.5rem)] leading-[1.06] font-medium tracking-tight"
          style={{ color: DM.text, letterSpacing: "-0.035em" }}
        >
          Inside the marketing lab.
        </h2>
        <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed" style={{ color: DM.muted }}>
          Campaign concepts, search studies, content systems and conversion experiments from the
          work behind the work.
        </p>

        <div className="mt-12 grid grid-cols-6 gap-3 md:grid-cols-12 md:gap-4">
          {DIGITAL_MARKETING_LAB.map((item) => (
            <div key={item.id} data-lab-tile className={item.span}>
              <motion.article
                className="group relative min-h-[180px] overflow-hidden"
                style={{ borderRadius: 12, background: DM.elevated }}
                whileHover={reduce ? undefined : { scale: 1.01 }}
                transition={{ duration: 0.35, ease: DM_EASE }}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    className="h-full w-full"
                    whileHover={reduce ? undefined : { scale: 1.025 }}
                    transition={{ duration: 0.45, ease: DM_EASE }}
                  >
                    <DmVisual visual={item.visual} size="tile" className="h-full min-h-[180px] w-full" />
                  </motion.div>
                </div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[72%]"
                  style={{
                    background: "rgba(20, 20, 20, 0.38)",
                    backdropFilter: "blur(18px) saturate(1.2)",
                    WebkitBackdropFilter: "blur(18px) saturate(1.2)",
                    maskImage: "linear-gradient(to top, #000 42%, transparent)",
                    WebkitMaskImage: "linear-gradient(to top, #000 42%, transparent)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between p-4">
                  <p
                    className="text-[10px] tracking-[0.14em] uppercase transition-opacity duration-200 group-hover:opacity-100"
                    style={{ color: DM.warm, opacity: 0.86 }}
                  >
                    {item.label}
                  </p>
                  <ArrowUpRight
                    size={12}
                    aria-hidden
                    className="translate-x-0 opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: DM.warm }}
                  />
                </div>
              </motion.article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
