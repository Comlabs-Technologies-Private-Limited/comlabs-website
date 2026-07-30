"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef, type ReactNode } from "react";

import { SectionHeader } from "@/components/home/section-header";
import { SectionContainer } from "@/components/layout/section-container";
import {
  ActionCard,
  FeatureListCard,
  MetricsCard,
  SHOWCASE_CARD_HEIGHT,
} from "@/components/home/designs-showcase-cards";
import { cn } from "@/lib/utils";

const ease = [0.25, 0.1, 0, 1] as const;
const SHARED_GRID_RADIUS = "rounded-sm";

const showcaseComponents = {
  metrics: MetricsCard,
  action: ActionCard,
  features: FeatureListCard,
} as const;

type ShowcaseId = keyof typeof showcaseComponents;

type BoardItem =
  | { kind: "work"; id: string; workIndex: number }
  | { kind: "showcase"; id: string; showcaseId: ShowcaseId };

const workDesigns = [
  { src: "/work-done/work-3.png", alt: "Luma Devices product experience design", label: "Product marketing site" },
  { src: "/work-done/work-6.png", alt: "Terra Grid climate platform design", label: "SaaS landing page" },
  { src: "/work-done/work-9.png", alt: "Framecraft website builder design", label: "Website builder" },
  { src: "/work-done/work-10.png", alt: "Northline product system design", label: "Product system" },
  { src: "/work-done/work-11.png", alt: "FluxPay global payments design", label: "Global payments" },
] as const;

/** Design screenshots interleaved with live UI component cards */
const boardItems: BoardItem[] = [
  { kind: "work", id: "work-3", workIndex: 0 },
  { kind: "showcase", id: "metrics", showcaseId: "metrics" },
  { kind: "work", id: "work-6", workIndex: 1 },
  { kind: "work", id: "work-9", workIndex: 2 },
  { kind: "showcase", id: "action", showcaseId: "action" },
  { kind: "showcase", id: "features", showcaseId: "features" },
  { kind: "work", id: "work-10", workIndex: 3 },
  { kind: "work", id: "work-11", workIndex: 4 },
];

function CardShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-[#14171c]",
        SHARED_GRID_RADIUS,
        "ring-1 ring-inset ring-white/[0.07]",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_20px_56px_-20px_rgba(0,0,0,0.6)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
      />
      {children}
    </div>
  );
}

function WorkScreenshotCard({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label: string;
}) {
  return (
    <CardShell className="p-2">
      <div
        className={cn(
          "relative aspect-[16/9] w-full overflow-hidden bg-[#0c0e12] ring-1 ring-inset ring-white/[0.5]",
          SHARED_GRID_RADIUS,
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={1000}
          height={1000}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="h-full w-full object-cover object-center scale-100"
        />
      </div>
      <p className="px-1 pb-0.5 pt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
        {label}
      </p>
    </CardShell>
  );
}

function BoardCellContent({
  item,
  active,
}: {
  item: BoardItem;
  active: boolean;
}) {
  if (item.kind === "showcase") {
    const Component = showcaseComponents[item.showcaseId];
    return <Component active={active} />;
  }

  const work = workDesigns[item.workIndex];
  if (!work) return null;
  return <WorkScreenshotCard {...work} />;
}

function BoardCell({
  item,
  index,
  inView,
  reduceMotion,
}: {
  item: BoardItem;
  index: number;
  inView: boolean;
  reduceMotion: boolean;
}) {
  const isShowcase = item.kind === "showcase";

  return (
    <motion.div
      className="flex min-w-0 self-stretch"
      style={isShowcase ? { height: SHOWCASE_CARD_HEIGHT } : undefined}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{
        delay: reduceMotion ? 0 : 0.04 + index * 0.03,
        duration: 0.5,
        ease,
      }}
    >
      <div className={cn("h-full w-full", isShowcase ? "min-h-0" : "min-h-[inherit]")}>
        <BoardCellContent item={item} active={inView} />
      </div>
    </motion.div>
  );
}

export function DesignsBuiltSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.08 });
  const reduceMotion = !!useReducedMotion();

  return (
    <section
      id="designs"
      ref={sectionRef}
      className="relative overflow-x-clip bg-[#111111] py-14 md:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.08),transparent)]"
      />

      <SectionContainer className="relative px-3 md:px-8">
        <SectionHeader>
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500 md:text-[11px]">
            Designs we&apos;ve built
          </p>
          <h2 className="mt-2.5 text-[clamp(1.5rem,3.2vw,2.375rem)] font-medium leading-[1.14] tracking-tighter text-zinc-50 md:mt-3 md:leading-[1.12]">
            Interfaces that make <br/>Companies feel<br/> premium.
          </h2>
          <p className="mt-3 text-[0.875rem] font-normal leading-relaxed text-zinc-400 md:mt-4 md:text-[0.9375rem]">
            Startup websites, launch pages, and product surfaces — composed like a design board,
            not a template grid.
          </p>
        </SectionHeader>

        <div className="mt-12 md:mt-16">
          <div className="grid grid-cols-1 items-stretch gap-3 md:grid-cols-2 md:gap-4">
            {boardItems.map((item, index) => (
              <BoardCell
                key={item.id}
                item={item}
                index={index}
                inView={inView}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
