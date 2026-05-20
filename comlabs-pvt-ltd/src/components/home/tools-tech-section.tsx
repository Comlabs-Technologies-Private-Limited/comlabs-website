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
  { icon: siNodedotjs, position: "left-[15%] top-[5%]", tile: "bg-[#e6fcf5] dark:bg-emerald-950/40" },
  { icon: siPython, position: "left-[35%] top-[10%]", tile: "bg-[#fff4e6] dark:bg-orange-950/35" },
  { icon: siTypescript, position: "left-[50%] top-[15%]", tile: "bg-[#fff0f6] dark:bg-rose-950/35" },
  { icon: siPhp, position: "left-[65%] top-[8%]", tile: "bg-[#f3f0ff] dark:bg-violet-950/40" },
  { icon: siGo, position: "left-[85%] top-[3%]", tile: "bg-[#e7f5ff] dark:bg-sky-950/40" },
  { icon: siDocker, position: "left-[5%] top-[25%]", tile: "bg-[#e7f5ff] dark:bg-sky-950/40" },
  { icon: siRuby, position: "left-[18%] top-[20%]", tile: "bg-[#fff5f5] dark:bg-red-950/30" },
  { icon: siRust, position: "left-[78%] top-[22%]", tile: "bg-[#fff5f5] dark:bg-red-950/30" },
  { icon: siKubernetes, position: "left-[10%] top-[48%]", tile: "bg-[#fff4e6] dark:bg-orange-950/35" },
  { icon: siDjango, position: "left-[88%] top-[45%]", tile: "bg-[#ebfbee] dark:bg-emerald-950/40" },
  { icon: siVuedotjs, position: "left-[12%] top-[75%]", tile: "bg-[#ebfbee] dark:bg-emerald-950/40" },
  { icon: siBun, position: "left-[27%] top-[72%]", tile: "bg-[#fff0f6] dark:bg-rose-950/35" },
  { icon: siNextdotjs, position: "left-[52%] top-[70%]", tile: "bg-[#fff4e6] dark:bg-orange-950/35" },
  { icon: siPostgresql, position: "left-[64%] top-[78%]", tile: "bg-[#e7f5ff] dark:bg-sky-950/40" },
  { icon: siAngular, position: "left-[80%] top-[65%]", tile: "bg-[#fff0f6] dark:bg-rose-950/35" },
  { icon: siReact, position: "left-[40%] top-[85%]", tile: "bg-[#e7f5ff] dark:bg-sky-950/40" },
  { icon: siMongodb, position: "left-[85%] top-[82%]", tile: "bg-[#ebfbee] dark:bg-emerald-950/40" },
];

function iconFgClass(icon: SimpleIcon): string {
  const fg: Record<string, string> = {
    nodedotjs: "text-[#099268] dark:text-emerald-400",
    python: "text-[#d9480f] dark:text-orange-400",
    typescript: "text-[#d6336c] dark:text-rose-400",
    php: "text-[#6741d9] dark:text-violet-400",
    go: "text-[#1971c2] dark:text-sky-400",
    docker: "text-[#1971c2] dark:text-sky-400",
    ruby: "text-[#c92a2a] dark:text-red-400",
    rust: "text-[#c92a2a] dark:text-red-400",
    kubernetes: "text-[#d9480f] dark:text-orange-400",
    django: "text-[#2b8a3e] dark:text-emerald-400",
    vuedotjs: "text-[#2b8a3e] dark:text-emerald-400",
    bun: "text-[#d6336c] dark:text-rose-400",
    nextdotjs: "text-[#d9480f] dark:text-orange-400",
    postgresql: "text-[#1971c2] dark:text-sky-400",
    angular: "text-[#d6336c] dark:text-rose-400",
    react: "text-[#1971c2] dark:text-sky-400",
    mongodb: "text-[#2b8a3e] dark:text-emerald-400",
  };
  return fg[icon.slug] ?? "text-neutral-700 dark:text-neutral-200";
}

const primaryCta = cn(
  "inline-flex items-center justify-center rounded-full bg-gradient-to-b from-neutral-800 to-neutral-950 px-6 py-2.5 text-[13px] font-normal tracking-tight text-white shadow-[0px_3.5px_1px_0px_var(--color-neutral-700)_inset,0px_1px_4px_0px_var(--color-neutral-900)] transition-all duration-150 [text-shadow:0_1px_2px_rgba(0,0,0,0.4)] hover:from-neutral-700 hover:to-neutral-900 hover:shadow-[0px_3.5px_3px_0px_var(--color-neutral-600)_inset,0px_1px_6px_0px_var(--color-neutral-900)] active:scale-[0.97]",
  "dark:from-zinc-100 dark:to-zinc-200 dark:text-zinc-950 dark:[text-shadow:none]",
  "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_1px_2px_rgba(0,0,0,0.18)]",
  "dark:hover:from-white dark:hover:to-zinc-100 dark:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_8px_rgba(0,0,0,0.2)]",
);

const blueprintLines =
  "bg-[repeating-linear-gradient(90deg,transparent_0px,transparent_31px,rgb(0_0_0/0.06)_31px,rgb(0_0_0/0.06)_32px)] dark:bg-[repeating-linear-gradient(90deg,transparent_0px,transparent_31px,rgb(255_255_255/0.06)_31px,rgb(255_255_255/0.06)_32px)]";

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
        "absolute z-[1] flex h-16 w-16 cursor-default pointer-events-auto items-center justify-center rounded-md border border-black/[0.04] shadow-[0_1px_0_rgba(255,255,255,0.65)_inset,0_6px_18px_-10px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-in-out hover:-translate-y-[5px] dark:border-white/[0.06] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_20px_-10px_rgba(0,0,0,0.45)]",
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
          <p className="flex items-center gap-2 text-[12px] font-normal uppercase leading-none tracking-widest text-neutral-500 dark:text-neutral-400">
            <span className="h-3 w-px rounded-full bg-blue-600/70 dark:bg-blue-400/80" aria-hidden />
            <span className="text-blue-600 dark:text-blue-400">Tools & stack</span>
          </p>
          <h2 className={cn(sectionTitle, "mt-4 max-w-[22ch] text-neutral-950 dark:text-neutral-50")}>
            The stack behind{" "}
            <span className="text-blue-600 dark:text-blue-400">fast, reliable launches</span>.
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
            "dark:border-white/[0.08] dark:bg-neutral-950 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_12px_40px_-12px_rgba(0,0,0,0.55)]",
            "md:bg-[#fafafa] md:dark:bg-neutral-950",
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
                "md:dark:border-white/[0.1] md:dark:bg-zinc-900 md:dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)]",
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
