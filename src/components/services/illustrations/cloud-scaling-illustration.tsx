"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { AnimatedBeam } from "./animated-beam";
import {
  ActivitySpinner,
  Chip,
  DrawnCheck,
  Panel,
} from "./illustration-primitives";
import { IllustrationStage, useIllustrationState } from "./service-illustration-frame";
import {
  illustrationColors,
  illustrationHover,
  illustrationRadius,
  illustrationShadow,
  illustrationSpring,
  illustrationSwap,
  illustrationTextSwapExit,
  illustrationTextSwapHidden,
  illustrationTextSwapShown,
} from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

const NODES = [
  { id: "cf", label: "CloudFront", hint: "Edge cache · HIT 94%" },
  { id: "alb", label: "ALB", hint: "3/3 targets in service" },
  { id: "ecs", label: "ECS", hint: "prod-api · 4 tasks" },
  { id: "rds", label: "RDS", hint: "Primary · 12ms" },
] as const;

const LOGS = [
  "deploying service…",
  "health check passed",
  "3/3 targets healthy",
] as const;

function deployLabel(step: number): string {
  if (step >= 8) return "Healthy";
  if (step >= 7) return "Health check";
  if (step >= 6) return "Deploying";
  return "Queued";
}

export function CloudScalingIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({
    steps: 9,
    active,
    reduce,
    stepMs: [380, 420, 420, 420, 480, 520, 520, 560],
  });
  const [deployOpen, setDeployOpen] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<HTMLDivElement>(null);
  const cfRef = useRef<HTMLDivElement>(null);
  const albRef = useRef<HTMLDivElement>(null);
  const ecsRef = useRef<HTMLDivElement>(null);
  const rdsRef = useRef<HTMLDivElement>(null);

  const requests = step >= 5 ? 1240 : 1184;
  const healthy = step >= 8;
  const logCount = step >= 8 ? 3 : step >= 7 ? 2 : step >= 6 ? 1 : 0;

  return (
    <IllustrationStage>
      <Panel className="flex h-full flex-col overflow-hidden" radius={12}>
        <div
          className="flex items-center justify-between border-b px-3 py-2 lg:px-3.5"
          style={{ borderColor: illustrationColors.border }}
        >
          <span>
            <span
              className="block text-[8px] font-medium tracking-tight lg:text-[10px]"
              style={{ color: illustrationColors.ink }}
            >
              Production
            </span>
            <span
              className="mt-0.5 block text-[6.5px] lg:text-[7.5px]"
              style={{ color: illustrationColors.inkFaint }}
            >
              ap-south-1
            </span>
          </span>
          <Chip tone="health" size="compact">
            {healthy ? "Healthy" : "Live"}
          </Chip>
        </div>

        <div ref={canvasRef} className="relative border-b px-2 py-3 lg:px-3" style={{ borderColor: illustrationColors.border }}>
          <div className="pointer-events-none absolute inset-0 z-0">
            <AnimatedBeam
              containerRef={canvasRef}
              fromRef={requestRef}
              toRef={cfRef}
              curvature={-8}
              enabled={step >= 1}
              loop={step >= 8}
              duration={1.1}
            />
            <AnimatedBeam
              containerRef={canvasRef}
              fromRef={cfRef}
              toRef={albRef}
              curvature={10}
              enabled={step >= 2}
              duration={1}
              delay={0.08}
            />
            <AnimatedBeam
              containerRef={canvasRef}
              fromRef={albRef}
              toRef={ecsRef}
              curvature={-8}
              enabled={step >= 3}
              duration={1}
              delay={0.12}
            />
            <AnimatedBeam
              containerRef={canvasRef}
              fromRef={ecsRef}
              toRef={rdsRef}
              curvature={8}
              enabled={step >= 4}
              duration={1}
              delay={0.16}
            />
          </div>

          <div className="relative z-10 flex items-center justify-between gap-1">
            <motion.div
              ref={requestRef}
              className="hidden flex-col items-center sm:flex"
              animate={
                !reduce && step >= 1 && step < 8
                  ? { opacity: [0.45, 1, 0.45] }
                  : { opacity: 1 }
              }
              transition={{ duration: 1.2, repeat: step >= 1 && step < 8 ? Infinity : 0 }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: illustrationColors.accent }}
              />
              <span
                className="mt-1 text-[6px] lg:text-[7px]"
                style={{ color: illustrationColors.inkFaint }}
              >
                Request
              </span>
            </motion.div>

            {NODES.map((node, index) => {
              const lit = step >= index + 2;
              const nodeRef =
                node.id === "cf" ? cfRef : node.id === "alb" ? albRef : node.id === "ecs" ? ecsRef : rdsRef;
              return (
                <motion.div
                  key={node.id}
                  ref={nodeRef}
                  className="group relative flex min-w-0 flex-1 flex-col items-center"
                  whileHover={reduce ? undefined : { y: -2 }}
                  transition={illustrationHover}
                >
                  <span
                    className="flex h-8 w-full max-w-[72px] items-center justify-center rounded-[8px] border text-[7px] tracking-tight lg:h-9 lg:text-[8px]"
                    style={{
                      borderColor: lit
                        ? illustrationColors.accentLine
                        : illustrationColors.border,
                      background: lit
                        ? illustrationColors.accentSoft
                        : illustrationColors.surfaceMuted,
                      color: illustrationColors.ink,
                      boxShadow: illustrationShadow.panel,
                    }}
                  >
                    {node.label}
                  </span>
                  <span
                    className="pointer-events-none absolute top-full z-20 mt-1 hidden rounded-[8px] border bg-white px-1.5 py-1 text-[6px] whitespace-nowrap opacity-0 shadow-sm group-hover:opacity-100 lg:block lg:text-[6.5px]"
                    style={{
                      borderColor: illustrationColors.border,
                      color: illustrationColors.inkMuted,
                    }}
                  >
                    {node.hint}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="grid shrink-0 grid-cols-4 gap-1 border-b px-2 py-2 lg:px-3" style={{ borderColor: illustrationColors.border }}>
          {[
            ["Requests", `${requests.toLocaleString()}/min`],
            ["p95", "128ms"],
            ["Deploy", "v2.8.4"],
            ["Backup", "Successful"],
          ].map(([label, value]) => (
            <button
              key={label}
              type="button"
              tabIndex={-1}
              onClick={() => {
                if (label === "Deploy") setDeployOpen((open) => !open);
              }}
              onPointerEnter={() => {
                if (label === "Deploy") setDeployOpen(true);
              }}
              onPointerLeave={() => {
                if (label === "Deploy") setDeployOpen(false);
              }}
              className="relative rounded-[8px] px-1 py-1 text-left"
            >
              <span
                className="block text-[6px] lg:text-[7px]"
                style={{ color: illustrationColors.inkFaint }}
              >
                {label}
              </span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={value}
                  initial={reduce ? false : illustrationTextSwapHidden}
                  animate={illustrationTextSwapShown}
                  exit={reduce ? undefined : illustrationTextSwapExit}
                  transition={illustrationSwap}
                  className="mt-0.5 block truncate text-[7px] tabular-nums lg:text-[8px]"
                  style={{ color: illustrationColors.ink }}
                >
                  {value}
                </motion.span>
              </AnimatePresence>
              <AnimatePresence>
                {label === "Deploy" && deployOpen ? (
                  <motion.span
                    initial={reduce ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: 4 }}
                    transition={illustrationSpring.micro}
                    className="absolute top-full left-0 z-30 mt-1 w-[108px] rounded-[8px] border px-2 py-1.5"
                    style={{
                      background: illustrationColors.surface,
                      borderColor: illustrationColors.border,
                      boxShadow: illustrationShadow.raised,
                      borderRadius: illustrationRadius.control,
                    }}
                  >
                    <span
                      className="block text-[6.5px]"
                      style={{ color: illustrationColors.ink }}
                    >
                      {deployLabel(step)}
                    </span>
                    <span
                      className="mt-0.5 block text-[6px]"
                      style={{ color: illustrationColors.inkFaint }}
                    >
                      prod-api · 4 tasks
                    </span>
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </button>
          ))}
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-between px-3 py-2 lg:px-3.5">
          <div
            className="rounded-[8px] px-2 py-1.5 font-mono"
            style={{ background: illustrationColors.surfaceSunk }}
          >
            {LOGS.map((line, index) => (
              <motion.p
                key={line}
                initial={false}
                animate={{
                  opacity: index < logCount ? 1 : 0.2,
                  x: index < logCount ? 0 : 4,
                }}
                transition={{ duration: reduce ? 0 : 0.28, ease: [0.25, 0.1, 0, 1] }}
                className="truncate text-[6.5px] lg:text-[7.5px]"
                style={{ color: illustrationColors.inkMuted }}
              >
                {line}
              </motion.p>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            {healthy ? (
              <DrawnCheck show reduce={Boolean(reduce)} size={11} />
            ) : (
              <ActivitySpinner size={11} active={active && step >= 6} reduce={Boolean(reduce)} />
            )}
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={healthy ? "ok" : deployLabel(step)}
                initial={reduce ? false : illustrationTextSwapHidden}
                animate={illustrationTextSwapShown}
                exit={reduce ? undefined : illustrationTextSwapExit}
                transition={illustrationSwap}
                className="text-[7.5px] tracking-tight lg:text-[8.5px]"
                style={{
                  color: healthy ? illustrationColors.health : illustrationColors.inkMuted,
                }}
              >
                {healthy ? "Production healthy" : deployLabel(step)}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </Panel>
    </IllustrationStage>
  );
}
