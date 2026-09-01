"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Database, Mail, Table2, WalletCards } from "lucide-react";

import { AnimatedBeam } from "./animated-beam";
import { Chip, Panel } from "./illustration-primitives";
import { IllustrationStage, useIllustrationState } from "./service-illustration-frame";
import {
  illustrationColors,
  illustrationPopHidden,
  illustrationPopShown,
  illustrationShadow,
  illustrationSpring,
  illustrationSwap,
} from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

const CONTEXT_CARDS = [
  { label: "MSA-118", meta: "Pricing band" },
  { label: "Last renewal: 11 months", meta: "Account history" },
  { label: "Risk: Low", meta: "Health" },
] as const;

function agentCopy(step: number): string {
  if (step >= 11) return "Action completed";
  if (step >= 7) return "Preparing action";
  if (step >= 3) return "Retrieving account context";
  if (step >= 2) return "Understanding request";
  return "Idle";
}

export function AgenticWorkflowIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({
    steps: 12,
    active,
    reduce,
    stepMs: [360, 380, 360, 380, 360, 420, 400, 480, 520, 420, 560],
  });

  const canvasRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<HTMLDivElement>(null);
  const agentRef = useRef<HTMLDivElement>(null);
  const crmRef = useRef<HTMLDivElement>(null);
  const dbRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const billingRef = useRef<HTMLDivElement>(null);
  const approvalRef = useRef<HTMLDivElement>(null);

  const approved = step >= 9;
  const completed = step >= 11;

  return (
    <IllustrationStage>
      <Panel className="relative flex h-full flex-col overflow-hidden" radius={12}>
        <div
          className="flex shrink-0 items-center justify-between border-b px-3 py-2 lg:px-3.5"
          style={{ borderColor: illustrationColors.border }}
        >
          <span>
            <span
              className="block text-[8px] font-medium tracking-tight lg:text-[10px]"
              style={{ color: illustrationColors.ink }}
            >
              Renewal Agent
            </span>
            <span
              className="mt-0.5 block text-[6.5px] lg:text-[7.5px]"
              style={{ color: illustrationColors.inkFaint }}
            >
              Request → Context → Tools → Approval
            </span>
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={agentCopy(step)}
              initial={reduce ? false : illustrationPopHidden}
              animate={illustrationPopShown}
              exit={reduce ? undefined : illustrationPopHidden}
              transition={illustrationSwap}
            >
              <Chip
                tone={completed ? "health" : approved ? "accent" : "quiet"}
                size="compact"
              >
                {agentCopy(step)}
              </Chip>
            </motion.span>
          </AnimatePresence>
        </div>

        <div ref={canvasRef} className="relative min-h-0 flex-1">
          <div className="pointer-events-none absolute inset-0 z-0">
            <AnimatedBeam
              containerRef={canvasRef}
              fromRef={requestRef}
              toRef={agentRef}
              curvature={18}
              enabled={step >= 2}
              duration={1.1}
              delay={0}
            />
            <AnimatedBeam
              containerRef={canvasRef}
              fromRef={agentRef}
              toRef={crmRef}
              curvature={-16}
              enabled={step >= 4}
              duration={0.9}
              delay={0.05}
            />
            <AnimatedBeam
              containerRef={canvasRef}
              fromRef={agentRef}
              toRef={dbRef}
              curvature={16}
              enabled={step >= 4}
              duration={0.9}
              delay={0.12}
            />
            <AnimatedBeam
              containerRef={canvasRef}
              fromRef={agentRef}
              toRef={emailRef}
              curvature={-12}
              enabled={step >= 10}
              duration={0.95}
              delay={0}
            />
            <AnimatedBeam
              containerRef={canvasRef}
              fromRef={agentRef}
              toRef={approvalRef}
              curvature={10}
              enabled={step >= 8}
              duration={0.85}
              delay={0}
            />
          </div>

          <div className="relative z-10 grid h-full grid-cols-[minmax(0,0.92fr)_minmax(0,1.15fr)_minmax(0,0.95fr)] gap-1.5 px-2 py-2 lg:gap-2 lg:px-3 lg:py-2.5">
            <div className="flex flex-col justify-center">
              <motion.div
                ref={requestRef}
                initial={reduce ? false : { opacity: 0, x: -8, filter: "blur(2px)" }}
                animate={
                  step >= 1
                    ? { opacity: 1, x: 0, filter: "blur(0px)" }
                    : { opacity: 0, x: -8, filter: "blur(2px)" }
                }
                transition={{ duration: reduce ? 0 : 0.34, ease: [0.25, 0.1, 0, 1] }}
                className="rounded-[10px] border px-2 py-2 lg:px-2.5"
                style={{
                  borderColor: illustrationColors.border,
                  background: illustrationColors.surfaceMuted,
                  boxShadow: illustrationShadow.panel,
                }}
              >
                <span
                  className="block text-[6.5px] lg:text-[7.5px]"
                  style={{ color: illustrationColors.inkFaint }}
                >
                  User request
                </span>
                <span
                  className="mt-1 block text-[7.5px] leading-snug tracking-tight lg:text-[8.5px]"
                  style={{ color: illustrationColors.ink }}
                >
                  Prepare the Q3 renewal for Acme.
                </span>
              </motion.div>
            </div>

            <div className="relative flex flex-col items-center justify-center">
              <motion.div
                ref={crmRef}
                className="mb-2 flex items-center gap-1 rounded-[8px] border px-1.5 py-1"
                animate={{
                  borderColor:
                    step >= 6
                      ? illustrationColors.accentLine
                      : illustrationColors.border,
                  background:
                    step >= 6
                      ? illustrationColors.accentSoft
                      : illustrationColors.surface,
                }}
                transition={{ duration: reduce ? 0 : 0.24 }}
              >
                <Table2 size={8} strokeWidth={1.6} color={illustrationColors.inkMuted} />
                <span
                  className="text-[6.5px] lg:text-[7.5px]"
                  style={{ color: illustrationColors.inkMuted }}
                >
                  CRM
                </span>
              </motion.div>

              <div className="flex w-full items-center justify-between gap-1">
                <motion.div
                  ref={dbRef}
                  className="flex items-center gap-1 rounded-[8px] border px-1.5 py-1"
                  animate={{
                    borderColor:
                      step >= 7
                        ? illustrationColors.accentLine
                        : illustrationColors.border,
                    background:
                      step >= 7
                        ? illustrationColors.accentSoft
                        : illustrationColors.surface,
                  }}
                  transition={{ duration: reduce ? 0 : 0.24 }}
                >
                  <Database size={8} strokeWidth={1.6} color={illustrationColors.inkMuted} />
                  <span
                    className="hidden text-[6.5px] sm:inline lg:text-[7.5px]"
                    style={{ color: illustrationColors.inkMuted }}
                  >
                    Database
                  </span>
                </motion.div>

                <motion.div
                  ref={agentRef}
                  className="flex h-11 w-11 flex-col items-center justify-center rounded-[12px] border lg:h-12 lg:w-12"
                  style={{
                    background: illustrationColors.ink,
                    borderColor: illustrationColors.ink,
                    boxShadow: illustrationShadow.raised,
                  }}
                >
                  <span
                    className="text-[6px] tracking-tight lg:text-[7px]"
                    style={{ color: "rgba(247,247,244,0.7)" }}
                  >
                    Agent
                  </span>
                  <span
                    className="text-[6.5px] font-medium tracking-tight lg:text-[7.5px]"
                    style={{ color: illustrationColors.surface }}
                  >
                    Renewal
                  </span>
                </motion.div>

                <motion.div
                  ref={emailRef}
                  className="flex items-center gap-1 rounded-[8px] border px-1.5 py-1"
                  animate={{
                    borderColor:
                      step >= 7
                        ? illustrationColors.accentLine
                        : illustrationColors.border,
                    background:
                      step >= 7
                        ? illustrationColors.accentSoft
                        : illustrationColors.surface,
                  }}
                  transition={{ duration: reduce ? 0 : 0.24 }}
                >
                  <Mail size={8} strokeWidth={1.6} color={illustrationColors.inkMuted} />
                  <span
                    className="hidden text-[6.5px] sm:inline lg:text-[7.5px]"
                    style={{ color: illustrationColors.inkMuted }}
                  >
                    Email
                  </span>
                </motion.div>
              </div>

              <motion.div
                ref={billingRef}
                className="mt-2 hidden items-center gap-1 rounded-[8px] border px-1.5 py-1 md:flex"
                style={{
                  borderColor: illustrationColors.border,
                  background: illustrationColors.surface,
                }}
              >
                <WalletCards size={8} strokeWidth={1.6} color={illustrationColors.inkMuted} />
                <span
                  className="text-[6.5px] lg:text-[7.5px]"
                  style={{ color: illustrationColors.inkMuted }}
                >
                  Billing / API
                </span>
              </motion.div>

              <AnimatePresence>
                {step >= 6 ? (
                  <motion.div
                    key="context"
                    initial={reduce ? false : { opacity: 0, y: 6, filter: "blur(2px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: reduce ? 0 : 0.32, ease: [0.25, 0.1, 0, 1] }}
                    className="absolute top-1/2 -right-1 z-20 hidden w-[92px] -translate-y-1/2 flex-col gap-1 lg:flex"
                  >
                    {CONTEXT_CARDS.map((card, index) => (
                      <motion.div
                        key={card.label}
                        initial={reduce ? false : { opacity: 0, x: 6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: reduce ? 0 : index * 0.06,
                          duration: 0.28,
                          ease: [0.25, 0.1, 0, 1],
                        }}
                        className="rounded-[8px] border px-1.5 py-1"
                        style={{
                          background: illustrationColors.surface,
                          borderColor: illustrationColors.border,
                          boxShadow: illustrationShadow.panel,
                        }}
                      >
                        <span
                          className="block text-[6.5px] tracking-tight"
                          style={{ color: illustrationColors.ink }}
                        >
                          {card.label}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <div ref={approvalRef} className="flex min-h-[72px] flex-col justify-end pb-1 lg:justify-center">
              <AnimatePresence>
                {step >= 8 ? (
                  <motion.div
                    key="approval"
                    initial={reduce ? false : { opacity: 0, y: 10, filter: "blur(2px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={reduce ? { duration: 0 } : illustrationSpring.panel}
                    className="rounded-[10px] border px-2 py-2 lg:px-2.5"
                    style={{
                      borderColor: illustrationColors.borderStrong,
                      background: illustrationColors.surface,
                      boxShadow: illustrationShadow.raised,
                    }}
                  >
                    <span
                      className="block text-[7.5px] leading-snug tracking-tight lg:text-[8.5px]"
                      style={{ color: illustrationColors.ink }}
                    >
                      Renew at existing pricing?
                    </span>
                    <span className="mt-2 flex gap-1">
                      <span
                        className="rounded-[8px] border px-2 py-1 text-[6.5px]"
                        style={{
                          borderColor: illustrationColors.border,
                          color: illustrationColors.inkMuted,
                        }}
                      >
                        Review
                      </span>
                      <motion.span
                        className="rounded-[8px] px-2 py-1 text-[6.5px]"
                        animate={{
                          background: approved
                            ? illustrationColors.health
                            : illustrationColors.ink,
                          color: illustrationColors.surface,
                          x: step === 8 ? [0, 0] : 0,
                        }}
                        whileHover={reduce ? undefined : { y: -1 }}
                        transition={{ duration: reduce ? 0 : 0.2 }}
                      >
                        {approved ? "Approved" : "Approve"}
                      </motion.span>
                    </span>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Panel>
    </IllustrationStage>
  );
}
