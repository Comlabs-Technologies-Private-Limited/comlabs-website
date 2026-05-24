"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { SectionHeader } from "@/components/home/section-header";
import { servicesEyebrow, servicesSubtitle, servicesTitle } from "@/lib/page-styles";
import { cn } from "@/lib/utils";

const ease = [0.25, 0.1, 0, 1] as const;

const GRAIN_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`;

const designs = [
  { src: "/work-done/work-11.png", alt: "Blockmint fintech platform design" },
  { src: "/work-done/work-10.png", alt: "Helix One AI operating layer design" },
  { src: "/work-done/work-3.png", alt: "Luma Devices product experience design" },
  { src: "/work-done/work-4.png", alt: "Careloop healthcare platform design" },
  { src: "/work-done/work-5.png", alt: "VectorDB Cloud infrastructure design" },
  { src: "/work-done/work-6.png", alt: "Terra Grid climate platform design" },
  { src: "/work-done/work-12.png", alt: "Aegis Harbor security platform design" },
  { src: "/work-done/work-1.png", alt: "Auralith Pay payments platform design" },
  { src: "/work-done/work-9.png", alt: "Framecraft website builder design" },
  { src: "/work-done/work-8.png", alt: "Northline product system design" },
  { src: "/work-done/work-2.png", alt: "FluxPay global payments design" },
  { src: "/work-done/work-7.png", alt: "RelayOps workflow automation design" },
] as const;

function DesignTileCard({ src, alt }: (typeof designs)[number]) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-2xl opacity-90 transition-all duration-150 hover:opacity-100">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
      />
    </div>
  );
}

export function DesignsBuiltSection() {
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  return (
    <section id="designs" className="bg-[#161718] px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader>
          <p className={cn(servicesEyebrow, "text-zinc-500")}>Portfolio</p>
          <h2 className={cn(servicesTitle, "text-zinc-50")}>
            Some Designs <br /> we have <br />
            Built.
          </h2>
          <p className={cn(servicesSubtitle, "text-zinc-400")}>
            A selection of startup websites, landing pages, and product interfaces — shaped for
            clarity, credibility, and conversion.
          </p>
        </SectionHeader>

        <div className="relative mt-10 w-full overflow-hidden rounded-2xl border border-zinc-800 p-4 md:p-6 lg:p-8">
          <Image
            src="/card-bg/portfolio-grid-bg.png"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 1152px"
            className="rounded-2xl object-cover object-center mask-b-from-98% mask-t-from-98% mask-l-from-99% mask-r-from-99%"
            aria-hidden
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] opacity-[0.22] mix-blend-soft-light"
            style={{
              backgroundImage: GRAIN_TEXTURE,
              backgroundRepeat: "repeat",
              backgroundSize: "180px 180px",
            }}
          />

          <div
            ref={gridRef}
            className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5"
          >
            {designs.map((design, i) => (
              <motion.div
                key={design.src}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={reduceMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{
                  delay: reduceMotion ? 0 : i * 0.08,
                  duration: 0.45,
                  ease,
                }}
              >
                <DesignTileCard {...design} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
