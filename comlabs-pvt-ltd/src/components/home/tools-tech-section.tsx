"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { SimpleIcon } from "simple-icons";
import {
  siAngular,
  siBun,
  siDocker,
  siDjango,
  siGo,
  siKubernetes,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siRuby,
  siRust,
  siTypescript,
  siVuedotjs,
} from "simple-icons";

import { SectionHeader } from "@/components/home/section-header";
import { SectionContainer } from "@/components/layout/section-container";
import { cn } from "@/lib/utils";

const ease = [0.25, 0.1, 0, 1] as const;

const scatterTiles: {
  icon: SimpleIcon;
  position: string;
  tile: string;
}[] = [
  { icon: siNodedotjs, position: "left-[15%] top-[5%]", tile: "bg-[#e6fcf5]" },
  { icon: siPython, position: "left-[35%] top-[10%]", tile: "bg-[#fff4e6]" },
  { icon: siTypescript, position: "left-[50%] top-[15%]", tile: "bg-[#fff0f6]" },
  { icon: siPhp, position: "left-[65%] top-[8%]", tile: "bg-[#f3f0ff]" },
  { icon: siGo, position: "left-[85%] top-[3%]", tile: "bg-[#e7f5ff]" },
  { icon: siDocker, position: "left-[5%] top-[25%]", tile: "bg-[#e7f5ff]" },
  { icon: siRuby, position: "left-[18%] top-[20%]", tile: "bg-[#fff5f5]" },
  { icon: siRust, position: "left-[78%] top-[22%]", tile: "bg-[#fff5f5]" },
  { icon: siKubernetes, position: "left-[10%] top-[48%]", tile: "bg-[#fff4e6]" },
  { icon: siDjango, position: "left-[88%] top-[45%]", tile: "bg-[#ebfbee]" },
  { icon: siVuedotjs, position: "left-[12%] top-[75%]", tile: "bg-[#ebfbee]" },
  { icon: siBun, position: "left-[27%] top-[72%]", tile: "bg-[#fff0f6]" },
  { icon: siNextdotjs, position: "left-[52%] top-[70%]", tile: "bg-[#fff4e6]" },
  { icon: siPostgresql, position: "left-[64%] top-[78%]", tile: "bg-[#e7f5ff]" },
  { icon: siAngular, position: "left-[80%] top-[65%]", tile: "bg-[#fff0f6]" },
  { icon: siReact, position: "left-[40%] top-[85%]", tile: "bg-[#e7f5ff]" },
  { icon: siMongodb, position: "left-[85%] top-[82%]", tile: "bg-[#ebfbee]" },
];

function iconFgClass(icon: SimpleIcon): string {
  const fg: Record<string, string> = {
    nodedotjs: "text-[#099268]",
    python: "text-[#d9480f]",
    typescript: "text-[#d6336c]",
    php: "text-[#6741d9]",
    go: "text-[#1971c2]",
    docker: "text-[#1971c2]",
    ruby: "text-[#c92a2a]",
    rust: "text-[#c92a2a]",
    kubernetes: "text-[#d9480f]",
    django: "text-[#2b8a3e]",
    vuedotjs: "text-[#2b8a3e]",
    bun: "text-[#d6336c]",
    nextdotjs: "text-[#d9480f]",
    postgresql: "text-[#1971c2]",
    angular: "text-[#d6336c]",
    react: "text-[#1971c2]",
    mongodb: "text-[#2b8a3e]",
  };
  return fg[icon.slug] ?? "text-neutral-700";
}

function ScatterIconTile({
  icon,
  position,
  tileClass,
}: {
  icon: SimpleIcon;
  position: string;
  tileClass: string;
}) {
  const fg = iconFgClass(icon);

  return (
    <div
      className={cn(
        "absolute z-[1] flex h-14 w-14 items-center justify-center rounded-sm border border-black/[0.04] shadow-[0_1px_0_rgba(255,255,255,0.65)_inset,0_6px_18px_-10px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out hover:-translate-y-1 md:h-16 md:w-16",
        position,
        tileClass,
      )}
      title={icon.title}
    >
      <svg viewBox="0 0 24 24" role="img" className={cn("h-6 w-6 md:h-7 md:w-7", fg)} aria-hidden>
        <path fill="currentColor" d={icon.path} />
      </svg>
    </div>
  );
}

export function ToolsTechSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  const reduceMotion = !!useReducedMotion();

  return (
    <section id="tools" ref={ref} className="bg-white px-3 py-14 md:px-8 md:py-24">
      <SectionContainer>
        <SectionHeader>
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-400 md:text-[11px]">
            Tools & stack
          </p>
          <h2 className="mt-2.5 text-[clamp(1.5rem,3.2vw,2.375rem)] font-medium leading-[1.14] tracking-tighter text-[var(--fg-primary)] md:mt-3 md:leading-[1.12]">
            The stack behind fast, reliable launches.
          </h2>
          <p className="mt-3 text-[0.875rem] font-normal leading-relaxed text-[var(--fg-secondary)] md:mt-4 md:text-[0.9375rem]">
            We use a focused modern stack to design, build, launch, and iterate quickly — without
            slowing your team down.
          </p>
        </SectionHeader>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: reduceMotion ? 0 : 0.06, duration: 0.5, ease }}
          className="relative mt-10 overflow-hidden rounded-sm p-2.5 md:mt-12 md:p-3"
        >
          <Image
            src="/card-bg/process-extras-bg.png"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 1152px"
            className="object-cover object-center saturate-180"
            aria-hidden
          />

          <div className="relative overflow-hidden rounded-sm border border-white/30 bg-white/40 backdrop-blur-[2px] md:rounded-xl">
            <div className="relative flex min-h-[min(72svh,640px)] flex-col items-center justify-center overflow-hidden px-4 py-16 md:min-h-[min(80svh,720px)]">
              <div className="pointer-events-none absolute inset-0 hidden md:block">
                {scatterTiles.map(({ icon, position, tile }) => (
                  <ScatterIconTile key={icon.slug} icon={icon} position={position} tileClass={tile} />
                ))}
              </div>

              <div className="relative z-10 w-full max-w-xl text-center">
                <h3 className="text-[clamp(1.375rem,3.5vw,2rem)] font-medium leading-[1.14] tracking-tighter text-[var(--fg-primary)]">
                  Tools we trust.
                </h3>
                <p className="mx-auto mt-3 max-w-md text-[0.875rem] font-normal leading-relaxed text-[var(--fg-secondary)]">
                  Design, development, automation, analytics, and deployment tools selected for
                  speed and reliability.
                </p>
                <Link
                  href="#tools"
                  className="mt-8 inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-2 text-[13px] font-normal tracking-tight text-[var(--fg-primary)] shadow-sm transition-all duration-150 hover:border-zinc-300 hover:bg-zinc-50 active:scale-[0.97]"
                >
                  See the stack
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </SectionContainer>
    </section>
  );
}
