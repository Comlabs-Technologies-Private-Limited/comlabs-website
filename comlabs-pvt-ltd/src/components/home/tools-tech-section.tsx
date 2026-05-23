"use client";

import Link from "next/link";
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

import { TextFade } from "@/components/motion/text-fade";
import { bodyText, sectionTitle } from "@/lib/page-styles";
import { cn } from "@/lib/utils";

/** Fixed scatter (Render-style): `top` / `left` match the original layout; one icon per slot. */
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

const primaryCta =
  "inline-flex items-center justify-center rounded-full bg-gradient-to-b from-neutral-800 to-neutral-950 px-6 py-2.5 text-[13px] font-normal tracking-tight text-white shadow-[0px_3.5px_1px_0px_var(--color-neutral-700)_inset,0px_1px_4px_0px_var(--color-neutral-900)] transition-all duration-150 [text-shadow:0_1px_2px_rgba(0,0,0,0.4)] hover:from-neutral-700 hover:to-neutral-900 hover:shadow-[0px_3.5px_3px_0px_var(--color-neutral-600)_inset,0px_1px_6px_0px_var(--color-neutral-900)] active:scale-[0.97]";

const blueprintLines =
  "bg-[repeating-linear-gradient(90deg,transparent_0px,transparent_31px,rgb(0_0_0/0.06)_31px,rgb(0_0_0/0.06)_32px)]";

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
        "absolute z-[1] flex h-16 w-16 cursor-default pointer-events-auto items-center justify-center rounded-md border border-black/[0.04] shadow-[0_1px_0_rgba(255,255,255,0.65)_inset,0_6px_18px_-10px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-in-out hover:-translate-y-[5px]",
        position,
        tileClass,
      )}
      title={icon.title}
    >
      <svg viewBox="0 0 24 24" role="img" className={cn("h-7 w-7", fg)} aria-hidden>
        <path fill="currentColor" d={icon.path} />
      </svg>
    </div>
  );
}

/**
 * Tools & stack: marketing header + Render-style fixed scatter (pastel tiles, simple-icons),
 * blueprint grid, centered trust card.
 */
export function ToolsTechSection() {
  return (
    <section id="tools" className="bg-[var(--bg-primary)] px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <TextFade mode="inview" staggerChildren={0.08} viewport={{ amount: 0.25, once: true }}>
          <p className="flex items-center gap-2 text-[12px] font-normal uppercase leading-none tracking-widest text-neutral-500">
            <span className="h-3 w-px rounded-full bg-blue-600/70" aria-hidden />
            <span className="text-blue-600">Tools & stack</span>
          </p>
          <h2 className={cn(sectionTitle, "mt-4 max-w-[22ch] text-neutral-950")}>
            The stack behind{" "}
            <span className="text-blue-600">fast, reliable launches</span>.
          </h2>
          <p className={cn(bodyText, "mt-4 max-w-2xl text-[var(--fg-secondary)]")}>
            We use a focused modern stack to design, build, launch, and iterate quickly — without
            slowing your team down.
          </p>
        </TextFade>

        <div
          className={cn(
            "relative mt-12 flex min-h-[52svh] flex-col items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] md:mt-14 md:min-h-[min(85svh,760px)]",
            "bg-[var(--bg-surface)] shadow-[0_1px_0_rgba(0,0,0,0.03)_inset,0_8px_30px_-12px_rgba(0,0,0,0.08)]",
            "md:bg-[#fafafa]",
          )}
        >
          <div className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden rounded-2xl md:block">
            {scatterTiles.map(({ icon, position, tile }) => (
              <ScatterIconTile key={icon.slug} icon={icon} position={position} tileClass={tile} />
            ))}
          </div>

          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 rounded-b-2xl opacity-80 [mask-image:linear-gradient(to_top,black_40%,transparent)] md:h-32 md:opacity-60",
              blueprintLines,
            )}
            aria-hidden
          />

          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 top-0 z-[1] h-28 rounded-t-2xl opacity-80 [mask-image:linear-gradient(to_bottom,black_40%,transparent)] md:h-32 md:opacity-60",
              blueprintLines,
            )}
            aria-hidden
          />

          <main className="relative z-10 w-full max-w-2xl px-5 pb-20 pt-10 md:px-6 md:pb-12 md:pt-12">
            <div
              className={cn(
                "flex flex-col items-center text-center",
                "md:rounded-xl md:border md:border-[var(--border)] md:bg-white md:p-14 md:shadow-[0_20px_50px_rgba(0,0,0,0.06)]",
              )}
            >
              <h3 className="max-w-[20ch] text-[clamp(1.625rem,4.5vw,2.75rem)] font-medium leading-[1.12] tracking-tighter text-[var(--fg-primary)] md:max-w-[22ch]">
                Tools we trust.
              </h3>
              <p className={cn(bodyText, "mx-auto mt-4 max-w-xl text-[var(--fg-secondary)]")}>
                Design, development, automation, analytics, and deployment tools selected for speed
                and reliability.
              </p>
              <Link href="#tools" className={cn(primaryCta, "mt-9")}>
                See the stack
              </Link>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
