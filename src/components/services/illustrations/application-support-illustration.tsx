"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MoreHorizontal } from "lucide-react";

import { CheckGlyph, Chip, Panel } from "./illustration-primitives";
import { IllustrationStage, useIllustrationState } from "./service-illustration-frame";
import {
  illustrationColors,
  illustrationSwap,
  illustrationTextSwapExit,
  illustrationTextSwapHidden,
  illustrationTextSwapShown,
} from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

const TASKS = [
  ["L1", "Validate user impact", "Support · 2m"],
  ["L2", "Inspect application logs", "Platform · 4m"],
  ["L3", "Trace database connection issue", "Engineering · now"],
  ["L4", "Specialist escalation", "Database team"],
] as const;

function TaskIcon({ state, reduce, active }: { state: "done" | "running" | "pending"; reduce: boolean; active: boolean }) {
  if (state === "done") {
    return (
      <motion.span initial={reduce ? false : { scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex h-4 w-4 items-center justify-center rounded-full" style={{ background: illustrationColors.surfaceSunk }}>
        <CheckGlyph size={9} color={illustrationColors.inkMuted} />
      </motion.span>
    );
  }
  if (state === "running") {
    return <motion.span className="h-4 w-4 rounded-full border" style={{ borderColor: illustrationColors.accentLine, borderTopColor: illustrationColors.accent }} animate={!reduce && active ? { rotate: 360 } : undefined} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />;
  }
  return <span className="h-4 w-4 rounded-full border" style={{ borderColor: illustrationColors.borderStrong }} />;
}

export function ApplicationSupportIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({ steps: 6, active, reduce, stepMs: 620 });
  const completed = step >= 5 ? 4 : step >= 3 ? 3 : 2;

  return (
    <IllustrationStage>
      <Panel className="flex h-full flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b px-3 py-2.5 lg:px-4" style={{ borderColor: illustrationColors.border }}>
          <div className="min-w-0">
            <div className="flex items-center gap-2"><span className="text-[8px] font-medium tabular-nums lg:text-[10px]" style={{ color: illustrationColors.ink }}>INC-2481</span><Chip tone="accent" size="compact">P1</Chip></div>
            <p className="mt-1 truncate text-[7px] lg:text-[8px]" style={{ color: illustrationColors.inkFaint }}>Production API failure</p>
          </div>
          <ChevronDown size={11} strokeWidth={1.5} style={{ color: illustrationColors.inkFaint }} />
        </div>

        <div className="flex items-center justify-between px-3 py-2 lg:px-4">
          <span className="text-[7px] lg:text-[8px]" style={{ color: illustrationColors.inkFaint }}>Resolution tasks</span>
          <span className="flex items-baseline gap-0.5 text-[7px] tabular-nums lg:text-[8px]" style={{ color: illustrationColors.inkMuted }}>
            <AnimatePresence mode="popLayout" initial={false}><motion.b key={completed} initial={reduce ? false : illustrationTextSwapHidden} animate={illustrationTextSwapShown} exit={illustrationTextSwapExit} transition={illustrationSwap} className="font-medium">{completed}</motion.b></AnimatePresence>/4 done
          </span>
        </div>

        <div className="min-h-0 flex-1 px-1.5 lg:px-2">
          {TASKS.map(([level, label, meta], index) => {
            const state = index < completed ? "done" : index === completed ? "running" : "pending";
            return <div key={level} className="group flex min-h-[25%] items-center gap-2 rounded-md px-1.5 transition-colors duration-150 hover:bg-stone-50 lg:px-2">
              <TaskIcon state={state} reduce={Boolean(reduce)} active={active} />
              <span className="w-5 shrink-0 text-[7px] font-medium lg:text-[8px]" style={{ color: state === "running" ? illustrationColors.accent : illustrationColors.inkFaint }}>{level}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[8px] lg:text-[9px]" style={{ color: state === "pending" ? illustrationColors.inkMuted : illustrationColors.ink }}>{label}</span>
                <span className="block max-h-0 translate-y-0.5 overflow-hidden text-[6.5px] opacity-0 transition-all duration-150 group-hover:max-h-3 group-hover:translate-y-0 group-hover:opacity-100 lg:text-[7px]" style={{ color: illustrationColors.inkFaint }}>{meta}</span>
              </span>
              <span className="text-[6.5px] lg:text-[7.5px]" style={{ color: state === "running" ? illustrationColors.accent : illustrationColors.inkFaint }}>{state === "done" ? "Completed" : state === "running" ? "Running" : "Pending"}</span>
              <MoreHorizontal size={10} className="-ml-1 w-0 opacity-0 transition-all duration-150 group-hover:ml-0 group-hover:w-2.5 group-hover:opacity-100" style={{ color: illustrationColors.inkFaint }} />
            </div>;
          })}
        </div>

        <motion.div className="grid shrink-0 grid-cols-3 border-t px-3 py-2 lg:px-4" style={{ borderColor: illustrationColors.border }} initial={false} animate={{ opacity: step >= 2 ? 1 : 0.45, y: step >= 2 ? 0 : 3 }} transition={{ duration: reduce ? 0 : 0.26 }}>
          {[["SLA", "Response 08m"], ["Environment", "Production"], ["Owner", "Engineering"]].map(([key, value]) => <span key={key}><span className="block text-[6px] lg:text-[7px]" style={{ color: illustrationColors.inkFaint }}>{key}</span><span className="mt-0.5 block truncate text-[7px] lg:text-[8px]" style={{ color: illustrationColors.inkMuted }}>{value}</span></span>)}
        </motion.div>
      </Panel>
    </IllustrationStage>
  );
}
