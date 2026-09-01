"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Info } from "lucide-react";

import { Chip, Panel } from "./illustration-primitives";
import { IllustrationStage, useIllustrationState } from "./service-illustration-frame";
import { illustrationColors, illustrationSwap, illustrationTextSwapExit, illustrationTextSwapHidden, illustrationTextSwapShown } from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

const SERVICES = [["API", "Public gateway · 3 replicas", "124 ms", "99.99% uptime"], ["Database", "Aurora primary · 1 replica", "38 connections", "4 ms query p95"], ["Workers", "Autoscaling · queue clear", "12 active", "0 queued jobs"]] as const;

export function CloudScalingIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({ steps: 5, active, reduce, stepMs: 720 });
  const tab = step >= 2 && step < 4 ? 1 : 0;
  const deployed = step >= 4;

  return <IllustrationStage>
    <Panel className="flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b px-3 py-2.5 lg:px-4" style={{ borderColor: illustrationColors.border }}>
        <span><span className="block text-[8px] font-medium lg:text-[10px]" style={{ color: illustrationColors.ink }}>Production</span><span className="mt-1 block text-[7px] lg:text-[8px]" style={{ color: illustrationColors.inkFaint }}>ap-south-1 · prod-api</span></span>
        <Chip tone="health" size="compact">Healthy</Chip>
      </div>
      <div className="relative flex gap-4 border-b px-3 lg:px-4" style={{ borderColor: illustrationColors.border }}>
        {["Overview", "Deployments", "Logs"].map((label, index) => <span key={label} className="relative py-2 text-[7px] lg:text-[8px]" style={{ color: tab === index ? illustrationColors.ink : illustrationColors.inkFaint }}>{label}{tab === index ? <motion.span layoutId="cloud-tab" className="absolute inset-x-0 bottom-0 h-px" style={{ background: illustrationColors.ink }} transition={{ duration: reduce ? 0 : 0.22 }} /> : null}</span>)}
      </div>
      <div className="flex items-center justify-between px-3 pt-2.5 pb-1 lg:px-4"><span className="text-[7px] lg:text-[8px]" style={{ color: illustrationColors.inkFaint }}>Services</span><span className="text-[6.5px] tabular-nums lg:text-[7.5px]" style={{ color: illustrationColors.inkFaint }}>3 of 3 healthy</span></div>
      <div className="min-h-0 flex-1 px-2 lg:px-3">
        {SERVICES.map(([label, detail, metric, tooltip]) => <div key={label} className="group flex h-1/3 items-center gap-2 rounded-md px-1.5 transition-colors duration-150 hover:bg-stone-50 lg:px-2">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: illustrationColors.health }} />
          <span className="min-w-0 flex-1"><span className="block text-[8px] lg:text-[9px]" style={{ color: illustrationColors.ink }}>{label}</span><span className="mt-1 block truncate text-[6.5px] lg:text-[7.5px]" style={{ color: illustrationColors.inkFaint }}>{detail}</span></span>
          <span className="relative flex items-center gap-1 text-[7px] tabular-nums lg:text-[8px]" style={{ color: illustrationColors.inkMuted }}>{metric}<Info size={8} style={{ color: illustrationColors.inkFaint }} /><span className="pointer-events-none absolute right-0 bottom-full z-10 mb-1 translate-y-1 rounded-md border bg-white px-2 py-1 text-[6.5px] whitespace-nowrap opacity-0 shadow-sm transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100" style={{ borderColor: illustrationColors.border, color: illustrationColors.inkMuted }}>{tooltip}</span></span>
          <span className="text-[6.5px] lg:text-[7.5px]" style={{ color: illustrationColors.health }}>Healthy</span>
        </div>)}
      </div>
      <div className="grid grid-cols-2 border-t px-3 py-2.5 lg:px-4" style={{ borderColor: illustrationColors.border }}>
        <span><span className="block text-[6.5px] lg:text-[7.5px]" style={{ color: illustrationColors.inkFaint }}>Latest deployment</span><span className="mt-1 flex items-center gap-1.5 text-[7.5px] lg:text-[8.5px]" style={{ color: illustrationColors.ink }}><AnimatePresence mode="wait" initial={false}><motion.span key={deployed ? "done" : "spin"} initial={reduce ? false : { opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={illustrationSwap}>{deployed ? <Check size={9} /> : <motion.span className="block h-2 w-2 rounded-full border" style={{ borderColor: illustrationColors.borderStrong, borderTopColor: illustrationColors.inkMuted }} animate={!reduce && active ? { rotate: 360 } : undefined} transition={{ repeat: Infinity, duration: .8, ease: "linear" }} />}</motion.span></AnimatePresence>v2.8.4 · <AnimatePresence mode="wait" initial={false}><motion.b key={deployed ? "Healthy" : "Deploying"} initial={reduce ? false : illustrationTextSwapHidden} animate={illustrationTextSwapShown} exit={illustrationTextSwapExit} transition={illustrationSwap} className="font-normal">{deployed ? "Healthy" : "Deploying"}</motion.b></AnimatePresence></span></span>
        <span><span className="block text-[6.5px] lg:text-[7.5px]" style={{ color: illustrationColors.inkFaint }}>Backup</span><span className="mt-1 block text-[7.5px] lg:text-[8.5px]" style={{ color: illustrationColors.ink }}>Successful · 12 min ago</span></span>
      </div>
    </Panel>
  </IllustrationStage>;
}
