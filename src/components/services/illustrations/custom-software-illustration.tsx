"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Inbox, LayoutGrid, MoreHorizontal, Users } from "lucide-react";

import { CheckGlyph, Chip, Panel } from "./illustration-primitives";
import { IllustrationStage, useIllustrationState } from "./service-illustration-frame";
import {
  illustrationColors,
  illustrationHover,
  illustrationPopHidden,
  illustrationPopShown,
  illustrationRadius,
  illustrationShadow,
  illustrationSpring,
  illustrationSwap,
  illustrationTextSwapExit,
  illustrationTextSwapHidden,
  illustrationTextSwapShown,
} from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

const NAV = [
  { label: "Requests", Icon: Inbox, active: true },
  { label: "Workspaces", Icon: LayoutGrid, active: false },
  { label: "Teams", Icon: Users, active: false },
] as const;

type RequestRow = {
  id: string;
  company: string;
  plan: string;
  owner: string;
  incoming?: boolean;
};

const BASE_REQUESTS: readonly RequestRow[] = [
  { id: "helio", company: "Helio", plan: "Growth", owner: "Arjun" },
  { id: "vithub", company: "Vithub", plan: "Studio", owner: "Meera" },
  { id: "formial", company: "Formial", plan: "Scale", owner: "Jeet" },
];

const ACME: RequestRow = {
  id: "acme",
  company: "Acme Corp",
  plan: "Enterprise",
  owner: "Priya",
  incoming: true,
};

const TASKS = [
  { label: "Workspace created", hint: "atlas.app/acme", at: 5 },
  { label: "CRM record", hint: "Salesforce · AC-4421", at: 6 },
  { label: "Admin seats", hint: "12 seats assigned", at: 7 },
  { label: "Calendar invite", hint: "Outlook · kickoff", at: 8 },
] as const;

export function CustomSoftwareIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({
    steps: 10,
    active,
    reduce,
    stepMs: [420, 380, 420, 480, 420, 420, 420, 480, 560],
  });
  const [menuOpen, setMenuOpen] = useState(false);

  const showAcme = step >= 1;
  const selectedId = step >= 2 ? "acme" : "helio";
  const rows = showAcme ? [ACME, ...BASE_REQUESTS] : [...BASE_REQUESTS];
  const count = showAcme ? 4 : 3;
  const ready = step >= 9;

  return (
    <IllustrationStage>
      <Panel className="flex h-full overflow-hidden" radius={12}>
        <div
          className="hidden w-[22%] shrink-0 flex-col border-r lg:flex"
          style={{
            borderColor: illustrationColors.border,
            background: illustrationColors.surfaceMuted,
          }}
        >
          <div className="flex flex-col gap-0.5 px-1.5 pt-3">
            {NAV.map((item) => (
              <span
                key={item.label}
                className="flex items-center gap-2 px-2 py-[7px]"
                style={{
                  borderRadius: illustrationRadius.control,
                  background: item.active ? illustrationColors.surface : "transparent",
                }}
              >
                <item.Icon
                  size={10}
                  strokeWidth={1.5}
                  color={item.active ? illustrationColors.ink : illustrationColors.inkFaint}
                />
                <span
                  className="text-[8px] tracking-tight"
                  style={{
                    color: item.active ? illustrationColors.ink : illustrationColors.inkMuted,
                  }}
                >
                  {item.label}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div
            className="flex items-center justify-between border-b px-3 py-2 lg:px-3.5"
            style={{ borderColor: illustrationColors.border }}
          >
            <span
              className="text-[8px] font-medium tracking-tight lg:text-[9.5px]"
              style={{ color: illustrationColors.ink }}
            >
              Requests
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={count}
                initial={reduce ? false : illustrationTextSwapHidden}
                animate={illustrationTextSwapShown}
                exit={reduce ? undefined : illustrationTextSwapExit}
                transition={illustrationSwap}
                className="text-[7px] tabular-nums lg:text-[8px]"
                style={{ color: illustrationColors.inkFaint }}
              >
                {count}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="min-h-0 flex-1 overflow-hidden">
            <AnimatePresence initial={false}>
              {rows.map((row) => {
                const selected = row.id === selectedId;
                return (
                  <motion.div
                    layout
                    key={row.id}
                    initial={
                      row.incoming && !reduce
                        ? { opacity: 0, y: -10, filter: "blur(2px)" }
                        : false
                    }
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: reduce ? 0 : 0.32, ease: [0.25, 0.1, 0, 1] }}
                    className="group relative flex items-center gap-2 border-b px-3 py-2 lg:px-3.5"
                    style={{
                      borderColor: illustrationColors.border,
                      background: selected
                        ? illustrationColors.surfaceMuted
                        : "transparent",
                      boxShadow: selected ? `inset 2px 0 0 ${illustrationColors.ink}` : undefined,
                    }}
                    whileHover={reduce ? undefined : { backgroundColor: "rgba(28,25,23,0.03)" }}
                  >
                    <span className="min-w-0 flex-1">
                      <span
                        className="block truncate text-[8px] tracking-tight lg:text-[9px]"
                        style={{ color: illustrationColors.ink }}
                      >
                        {row.company}
                      </span>
                      <span
                        className="mt-0.5 block truncate text-[6.5px] lg:text-[7.5px]"
                        style={{ color: illustrationColors.inkFaint }}
                      >
                        {row.plan} · {row.owner}
                      </span>
                    </span>
                    <span className="hidden items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:flex group-hover:opacity-100">
                      <span
                        className="rounded-[6px] border px-1.5 py-0.5 text-[6px]"
                        style={{
                          borderColor: illustrationColors.border,
                          color: illustrationColors.inkMuted,
                        }}
                      >
                        Open
                      </span>
                      <button
                        type="button"
                        tabIndex={-1}
                        className="relative"
                        onPointerEnter={() => {
                          if (selected) setMenuOpen(true);
                        }}
                        onPointerLeave={() => setMenuOpen(false)}
                      >
                        <MoreHorizontal size={10} color={illustrationColors.inkFaint} />
                        <AnimatePresence>
                          {selected && menuOpen ? (
                            <motion.span
                              initial={reduce ? false : { opacity: 0, scale: 0.96, y: -4 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={reduce ? undefined : { opacity: 0, scale: 0.96, y: -4 }}
                              transition={illustrationSpring.micro}
                              style={{
                                transformOrigin: "top right",
                                background: illustrationColors.surface,
                                borderColor: illustrationColors.border,
                                boxShadow: illustrationShadow.raised,
                                borderRadius: illustrationRadius.control,
                              }}
                              className="absolute top-full right-0 z-20 mt-1 w-[78px] border px-1.5 py-1"
                            >
                              {["Assign", "Archive"].map((action) => (
                                <span
                                  key={action}
                                  className="block px-1 py-1 text-[6.5px]"
                                  style={{ color: illustrationColors.inkMuted }}
                                >
                                  {action}
                                </span>
                              ))}
                            </motion.span>
                          ) : null}
                        </AnimatePresence>
                      </button>
                    </span>
                    {row.id === "acme" && selected ? (
                      <Chip tone={ready ? "health" : "quiet"} size="compact">
                        {ready ? "Ready" : "New"}
                      </Chip>
                    ) : null}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <div
          className="flex w-[44%] shrink-0 flex-col border-l md:w-[38%]"
          style={{ borderColor: illustrationColors.border }}
        >
          <div className="px-3 py-2.5 lg:px-3.5">
            <span
              className="block text-[8.5px] tracking-tight lg:text-[10px]"
              style={{ color: illustrationColors.ink }}
            >
              {selectedId === "acme" ? "Acme Corp" : "Helio"}
            </span>
            <span
              className="mt-1 block text-[7px]"
              style={{ color: illustrationColors.inkFaint }}
            >
              Workspace onboarding
            </span>
          </div>

          <motion.div
            className="flex flex-col gap-1.5 px-3 lg:px-3.5"
            initial={false}
            animate={{ opacity: step >= 3 ? 1 : 0.35 }}
          >
            {[
              ["Owner", selectedId === "acme" ? "Priya" : "Arjun"],
              ["Region", "ap-south-1"],
              ["Plan", selectedId === "acme" ? "Enterprise" : "Growth"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-2">
                <span className="text-[7px]" style={{ color: illustrationColors.inkFaint }}>
                  {label}
                </span>
                <span className="truncate text-[7.5px]" style={{ color: illustrationColors.ink }}>
                  {value}
                </span>
              </div>
            ))}
          </motion.div>

          <div
            className="mt-2 min-h-0 flex-1 border-t px-3 pt-2 lg:px-3.5"
            style={{ borderColor: illustrationColors.border }}
          >
            <span
              className="mb-1 block text-[7px]"
              style={{ color: illustrationColors.inkFaint }}
            >
              Provisioning
            </span>
            {TASKS.map((task) => {
              const done = step >= task.at;
              return (
                <div key={task.label} className="flex items-center gap-1.5 py-[5px]">
                  <span className="flex h-3 w-3 items-center justify-center">
                    {done ? (
                      <CheckGlyph size={8} color={illustrationColors.health} />
                    ) : (
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: illustrationColors.wire }}
                      />
                    )}
                  </span>
                  <span
                    className="truncate text-[7.5px] lg:text-[8.5px]"
                    style={{
                      color: done ? illustrationColors.ink : illustrationColors.inkFaint,
                    }}
                  >
                    {task.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="px-3 pb-2.5 lg:px-3.5">
            <AnimatePresence>
              {ready ? (
                <motion.div
                  key="toast"
                  initial={reduce ? false : illustrationPopHidden}
                  animate={illustrationPopShown}
                  transition={illustrationHover}
                  className="flex items-center gap-1.5 rounded-[8px] border px-2 py-1.5"
                  style={{
                    borderColor: "rgba(63,122,90,0.18)",
                    background: illustrationColors.healthSoft,
                  }}
                >
                  <CheckGlyph size={8} color={illustrationColors.health} />
                  <span
                    className="text-[7.5px] tracking-tight lg:text-[8.5px]"
                    style={{ color: illustrationColors.health }}
                  >
                    Workspace ready
                  </span>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </Panel>
    </IllustrationStage>
  );
}
