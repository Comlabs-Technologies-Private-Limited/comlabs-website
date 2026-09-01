"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Database, Mail, Table2, WalletCards } from "lucide-react";

import { Chip, Panel } from "./illustration-primitives";
import { IllustrationStage, useIllustrationState } from "./service-illustration-frame";
import { illustrationColors, illustrationSwap } from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

const TASKS = ["Retrieve account history", "Check renewal conditions", "Prepare renewal action", "Send proposal"] as const;
const TOOLS = [["CRM", Table2], ["Database", Database], ["Email", Mail], ["Billing", WalletCards]] as const;

export function AgenticWorkflowIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({ steps: 7, active, reduce, stepMs: 560 });

  return <IllustrationStage>
    <Panel className="flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b px-3 py-2.5 lg:px-4" style={{ borderColor: illustrationColors.border }}>
        <span><span className="block text-[8px] font-medium lg:text-[10px]" style={{ color: illustrationColors.ink }}>Renewal operator</span><span className="mt-1 block text-[7px] lg:text-[8px]" style={{ color: illustrationColors.inkFaint }}>Acme Corp · supervised run</span></span>
        <AnimatePresence mode="wait" initial={false}><motion.span key={step < 2 ? "thinking" : step < 5 ? "working" : "approval"} initial={reduce ? false : { opacity: 0, y: 2 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -2 }} transition={illustrationSwap}><Chip tone={step >= 5 ? "accent" : "quiet"} size="compact">{step < 2 ? "Thinking…" : step < 5 ? "Working" : "Approval"}</Chip></motion.span></AnimatePresence>
      </div>

      <div className="flex gap-1.5 border-b px-3 py-2 lg:px-4" style={{ borderColor: illustrationColors.border }}>
        {TOOLS.map(([label, Icon], index) => <span key={label} className="flex items-center gap-1 rounded-md border px-1.5 py-1 transition-colors duration-150" style={{ borderColor: index === Math.min(step, 3) ? illustrationColors.accentLine : illustrationColors.border, background: index === Math.min(step, 3) ? illustrationColors.accentSoft : illustrationColors.surface }}><Icon size={8} strokeWidth={1.5} style={{ color: illustrationColors.inkMuted }} /><span className="text-[6.5px] lg:text-[7.5px]" style={{ color: illustrationColors.inkMuted }}>{label}</span></span>)}
      </div>

      <div className="min-h-0 flex-1 px-2 py-1 lg:px-3">
        {TASKS.map((task, index) => {
          const done = step > index + 1;
          const current = !done && step === index + 1;
          return <div key={task} className="flex h-1/4 items-center gap-2 border-b last:border-0" style={{ borderColor: illustrationColors.border }}>
            <span className="flex h-4 w-4 items-center justify-center rounded-full border" style={{ borderColor: done ? illustrationColors.border : current ? illustrationColors.accentLine : illustrationColors.border, background: done ? illustrationColors.surfaceSunk : "transparent" }}>{done ? <Check size={9} strokeWidth={1.7} style={{ color: illustrationColors.inkMuted }} /> : current ? <motion.span className="h-1.5 w-1.5 rounded-full" style={{ background: illustrationColors.accent }} animate={reduce ? undefined : { opacity: [0.35, 1, 0.35] }} transition={{ duration: 1.1, repeat: Infinity }} /> : null}</span>
            <span className="flex-1 truncate text-[7.5px] lg:text-[8.5px]" style={{ color: current || done ? illustrationColors.ink : illustrationColors.inkMuted }}>{task}</span>
            <span className="text-[6.5px] lg:text-[7.5px]" style={{ color: current ? illustrationColors.accent : illustrationColors.inkFaint }}>{done ? "Completed" : current ? "Running" : index === 3 ? "Approval" : "Pending"}</span>
          </div>;
        })}
      </div>

      <motion.div className="mx-3 mb-2 flex items-center justify-between gap-2 rounded-lg border px-2.5 py-2 lg:mx-4" style={{ borderColor: illustrationColors.borderStrong, boxShadow: "0 6px 18px -16px rgba(28,25,23,.3)" }} initial={false} animate={{ opacity: step >= 5 ? 1 : 0, y: step >= 5 ? 0 : 4 }} transition={{ duration: reduce ? 0 : 0.28 }}>
        <span className="min-w-0"><span className="block truncate text-[7.5px] font-medium lg:text-[8.5px]" style={{ color: illustrationColors.ink }}>Apply renewal change?</span><span className="mt-0.5 block truncate text-[6.5px] lg:text-[7px]" style={{ color: illustrationColors.inkFaint }}>CRM record · proposal email</span></span>
        <span className="flex gap-1"><button tabIndex={-1} className="rounded-md border px-2 py-1 text-[6.5px]" style={{ borderColor: illustrationColors.border, color: illustrationColors.inkMuted }}>Review</button><button tabIndex={-1} className="rounded-md px-2 py-1 text-[6.5px] text-white" style={{ background: illustrationColors.ink }}>Approve</button></span>
      </motion.div>
    </Panel>
  </IllustrationStage>;
}
