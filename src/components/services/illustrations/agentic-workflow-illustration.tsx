"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import {
  illustrationColors,
  illustrationEase,
  illustrationShadow,
} from "@/components/services/illustrations/illustration-tokens";
import {
  ClaudeMark,
  DriveMark,
  GmailMark,
  NotionMark,
  SalesforceMark,
  SheetsMark,
  SlackMark,
  StripeMark,
} from "@/components/services/illustrations/brand-marks";
import {
  IllustrationStage,
  useIllustrationState,
} from "@/components/services/illustrations/service-illustration-frame";
import { useIllustrationSequence } from "@/components/services/illustrations/use-illustration-sequence";

type PortSide = "left" | "right" | "top" | "bottom";
type PortShape = "circle" | "diamond";
type PortId =
  | "requestOut"
  | "agentIn"
  | "agentOut"
  | "agentModel"
  | "agentMemory"
  | "agentTools"
  | "modelIn"
  | "memoryIn"
  | "crmIn"
  | "contractIn"
  | "pricingIn"
  | "prepareIn"
  | "prepareOut"
  | "approvalIn"
  | "approvalOut"
  | "sendIn"
  | "sendOut"
  | "doneIn";

type NodeId =
  | "request"
  | "agent"
  | "model"
  | "memory"
  | "crm"
  | "contract"
  | "pricing"
  | "prepare"
  | "approval"
  | "send"
  | "done";

type NodeState = "idle" | "active" | "ready" | "done";
type EdgeKind = "main" | "ai";
type EdgeDir = "h" | "v" | "around";

interface Point {
  x: number;
  y: number;
}

interface EdgeDef {
  id: string;
  from: PortId;
  to: PortId;
  kind: EdgeKind;
  dir: EdgeDir;
}

const EASE = illustrationEase;
const COMPACT_AT = 400;
const TOOLS_WRAP_AT = 620;
const PORT = 7;

const ink = illustrationColors.ink;
const inkMuted = illustrationColors.inkMuted;
const inkFaint = illustrationColors.inkFaint;
const border = illustrationColors.border;
const borderStrong = illustrationColors.borderStrong;
const surface = illustrationColors.surface;
const surfaceMuted = illustrationColors.surfaceMuted;
const surfaceSunk = illustrationColors.surfaceSunk;
const accent = illustrationColors.accent;
const accentSoft = illustrationColors.accentSoft;
const accentLine = illustrationColors.accentLine;
const health = illustrationColors.health;
const healthSoft = illustrationColors.healthSoft;
const connector = "rgba(28, 25, 23, 0.22)";
const connectorAi = "rgba(28, 25, 23, 0.18)";

const S = {
  request: 1,
  pulseToAgent: 2,
  agentGather: 3,
  aiModel: 4,
  aiMemory: 5,
  aiCrm: 6,
  aiRest: 7,
  contextReady: 8,
  pulsePrepare: 9,
  prepareReady: 10,
  approval: 11,
  cursorMove: 12,
  cursorClick: 13,
  approved: 14,
  pulseSend: 15,
  sent: 16,
  complete: 17,
} as const;

const STEP_COUNT = 18;
const DELAYS = [
  640, 720, 840, 520, 560, 560, 620, 780, 760, 840, 1100, 480, 920, 320, 740, 760, 820,
] as const;

const DESKTOP_EDGES: EdgeDef[] = [
  { id: "e-req-agent", from: "requestOut", to: "agentIn", kind: "main", dir: "h" },
  { id: "e-agent-prep", from: "agentOut", to: "prepareIn", kind: "main", dir: "h" },
  { id: "e-prep-appr", from: "prepareOut", to: "approvalIn", kind: "main", dir: "h" },
  { id: "e-appr-send", from: "approvalOut", to: "sendIn", kind: "main", dir: "v" },
  { id: "e-send-done", from: "sendOut", to: "doneIn", kind: "main", dir: "v" },
  { id: "e-agent-model", from: "agentModel", to: "modelIn", kind: "ai", dir: "v" },
  { id: "e-agent-mem", from: "agentMemory", to: "memoryIn", kind: "ai", dir: "v" },
  { id: "e-agent-crm", from: "agentTools", to: "crmIn", kind: "ai", dir: "v" },
  { id: "e-agent-con", from: "agentTools", to: "contractIn", kind: "ai", dir: "v" },
  { id: "e-agent-price", from: "agentTools", to: "pricingIn", kind: "ai", dir: "v" },
];

function edgesFor(
  compact: boolean,
  showModel: boolean,
  showContract: boolean,
  showPricing: boolean,
): EdgeDef[] {
  if (compact) return COMPACT_EDGES;
  return DESKTOP_EDGES.filter((edge) => {
    if (!showModel && edge.id === "e-agent-model") return false;
    if (!showContract && edge.id === "e-agent-con") return false;
    if (!showPricing && edge.id === "e-agent-price") return false;
    return true;
  });
}

const COMPACT_EDGES: EdgeDef[] = [
  { id: "e-req-agent", from: "requestOut", to: "agentIn", kind: "main", dir: "v" },
  { id: "e-agent-appr", from: "agentOut", to: "approvalIn", kind: "main", dir: "v" },
  { id: "e-appr-done", from: "approvalOut", to: "doneIn", kind: "main", dir: "v" },
  { id: "e-agent-model", from: "agentModel", to: "modelIn", kind: "ai", dir: "h" },
  { id: "e-agent-mem", from: "agentMemory", to: "memoryIn", kind: "ai", dir: "h" },
  { id: "e-agent-crm", from: "agentTools", to: "crmIn", kind: "ai", dir: "h" },
];

const NODE_PORTS: Record<NodeId, PortId[]> = {
  request: ["requestOut"],
  agent: ["agentIn", "agentOut", "agentModel", "agentMemory", "agentTools"],
  model: ["modelIn"],
  memory: ["memoryIn"],
  crm: ["crmIn"],
  contract: ["contractIn"],
  pricing: ["pricingIn"],
  prepare: ["prepareIn", "prepareOut"],
  approval: ["approvalIn", "approvalOut"],
  send: ["sendIn", "sendOut"],
  done: ["doneIn"],
};

function cubic(from: Point, to: Point, dir: EdgeDir, canvasWidth = 1000): string {
  if (dir === "around") {
    const bulge = Math.min(canvasWidth - 14, Math.max(from.x, to.x) + 22);
    return `M ${from.x.toFixed(2)} ${from.y.toFixed(2)} C ${bulge.toFixed(2)} ${from.y.toFixed(2)}, ${bulge.toFixed(2)} ${to.y.toFixed(2)}, ${to.x.toFixed(2)} ${to.y.toFixed(2)}`;
  }
  if (dir === "v") {
    const dy = Math.max(16, Math.abs(to.y - from.y) * 0.46);
    const sign = to.y >= from.y ? 1 : -1;
    return `M ${from.x.toFixed(2)} ${from.y.toFixed(2)} C ${from.x.toFixed(2)} ${(from.y + sign * dy).toFixed(2)}, ${to.x.toFixed(2)} ${(to.y - sign * dy).toFixed(2)}, ${to.x.toFixed(2)} ${to.y.toFixed(2)}`;
  }
  const dx = Math.max(20, Math.abs(to.x - from.x) * 0.42);
  const sign = to.x >= from.x ? 1 : -1;
  return `M ${from.x.toFixed(2)} ${from.y.toFixed(2)} C ${(from.x + sign * dx).toFixed(2)} ${from.y.toFixed(2)}, ${(to.x - sign * dx).toFixed(2)} ${to.y.toFixed(2)}, ${to.x.toFixed(2)} ${to.y.toFixed(2)}`;
}

function Port({
  id,
  register,
  side,
  shape = "circle",
  offset = 50,
  lit = false,
}: {
  id: PortId;
  register: (id: PortId, el: HTMLSpanElement | null) => void;
  side: PortSide;
  shape?: PortShape;
  offset?: number;
  lit?: boolean;
}) {
  const place: CSSProperties =
    side === "left"
      ? { left: 0, top: `${offset}%`, transform: "translate(-50%, -50%)" }
      : side === "right"
        ? { right: 0, top: `${offset}%`, transform: "translate(50%, -50%)" }
        : side === "top"
          ? { top: 0, left: `${offset}%`, transform: "translate(-50%, -50%)" }
          : { bottom: 0, left: `${offset}%`, transform: "translate(-50%, 50%)" };

  return (
    <span
      ref={(el) => register(id, el)}
      data-port={id}
      aria-hidden
      className="pointer-events-none absolute z-20 block"
      style={{
        width: PORT,
        height: PORT,
        ...place,
      }}
    >
      <span
        className="block size-full"
        style={{
          borderRadius: shape === "diamond" ? 1.5 : 999,
          transform: shape === "diamond" ? "rotate(45deg)" : undefined,
          background: lit ? accent : surface,
          border: `1px solid ${lit ? accent : borderStrong}`,
          boxShadow: lit ? `0 0 0 2px ${accentSoft}` : "none",
        }}
      />
    </span>
  );
}

function NodeIcon({ children, brand = false }: { children: ReactNode; brand?: boolean }) {
  return (
    <span
      className="flex size-6 shrink-0 items-center justify-center rounded-[6px]"
      style={{
        background: brand ? surface : surfaceSunk,
        color: ink,
        border: `1px solid ${border}`,
      }}
    >
      {children}
    </span>
  );
}

function WorkflowNode({
  children,
  state,
  selected = false,
  hovered = false,
  onHover,
  wide = false,
  iconOnly = false,
  tall = false,
}: {
  children: ReactNode;
  state: NodeState;
  selected?: boolean;
  hovered?: boolean;
  onHover?: (value: boolean) => void;
  wide?: boolean;
  iconOnly?: boolean;
  tall?: boolean;
}) {
  const active = state === "active";
  const complete = state === "done" || state === "ready";

  return (
    <motion.div
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      onPointerEnter={() => onHover?.(true)}
      onPointerLeave={() => onHover?.(false)}
      animate={{ y: hovered ? -1 : 0 }}
      transition={{ duration: 0.18, ease: EASE }}
      className={wide ? "relative min-w-0" : "relative shrink-0"}
      style={{
        width: wide ? "100%" : "max-content",
        maxWidth: wide ? "100%" : undefined,
        borderRadius: iconOnly ? 8 : 10,
        background: hovered ? surfaceMuted : surface,
        border: `1px solid ${
          selected || active ? borderStrong : hovered ? borderStrong : complete ? borderStrong : border
        }`,
        boxShadow:
          selected || active
            ? `0 0 0 1px ${accentLine}, ${illustrationShadow.panel}`
            : illustrationShadow.panel,
        padding: iconOnly ? (tall ? "14px 8px" : 6) : "7px 10px 7px 8px",
        color: ink,
        pointerEvents: "auto",
        cursor: "default",
      }}
    >
      {children}
    </motion.div>
  );
}

function Title({ children }: { children: ReactNode }) {
  return (
    <p
      className="truncate font-medium leading-none tracking-tight"
      style={{ fontSize: 11, color: ink }}
    >
      {children}
    </p>
  );
}

function Meta({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: "muted" | "accent" | "ok";
}) {
  const color = tone === "accent" ? accent : tone === "ok" ? health : inkMuted;
  return (
    <p className="mt-0.5 whitespace-nowrap leading-none tracking-tight" style={{ fontSize: 10, color }}>
      {children}
    </p>
  );
}

function StrokeIcon({ d, extra }: { d: string; extra?: ReactNode }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d={d} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      {extra}
    </svg>
  );
}

function EdgePulse({ d, run }: { d: string; run: boolean }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [point, setPoint] = useState<Point | null>(null);

  useEffect(() => {
    if (!run) return;
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    if (length < 1) return;
    const started = performance.now();
    const duration = 720;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / duration);
      const p = path.getPointAtLength(t * length);
      setPoint({ x: p.x, y: p.y });
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [d, run]);

  return (
    <>
      <path ref={pathRef} d={d} fill="none" stroke="none" />
      {run && point ? <circle cx={point.x} cy={point.y} r={2.5} fill={accent} /> : null}
    </>
  );
}

function ApprovalCursor({
  target,
  phase,
}: {
  target: Point | null;
  phase: "hidden" | "travel" | "press";
}) {
  if (!target || phase === "hidden") return null;

  const start = { x: target.x + 54, y: target.y - 42 };
  const end = { x: target.x + 5, y: target.y + 4 };

  return (
    <motion.div
      className="pointer-events-none absolute z-30"
      initial={{ left: start.x, top: start.y, opacity: 0, scale: 1 }}
      animate={{
        left: end.x,
        top: end.y,
        opacity: 1,
        scale: phase === "press" ? 0.88 : 1,
      }}
      transition={{
        left: { duration: 0.88, ease: EASE },
        top: { duration: 0.88, ease: EASE },
        opacity: { duration: 0.18, ease: EASE },
        scale: { duration: 0.12, ease: EASE },
      }}
      aria-hidden
    >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path
          d="M2.5 1.75 2.5 11.2 5.35 8.35 8.15 13.25 10.1 12.15 7.3 7.25 11.35 7.25 2.5 1.75Z"
          fill="#fff"
          stroke={ink}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

function ToolNode({
  id,
  title,
  idleMeta,
  hoverMeta,
  icon,
  portId,
  state,
  hovered,
  setHovered,
  register,
  portSide = "top",
  iconOnly = false,
}: {
  id: NodeId;
  title: string;
  idleMeta: string;
  hoverMeta: string;
  icon: ReactNode;
  portId: PortId;
  state: NodeState;
  hovered: NodeId | null;
  setHovered: (id: NodeId | null) => void;
  register: (id: PortId, el: HTMLSpanElement | null) => void;
  portSide?: PortSide;
  iconOnly?: boolean;
}) {
  const isHovered = hovered === id;
  return (
    <WorkflowNode
      state={state}
      hovered={isHovered}
      onHover={(v) => setHovered(v ? id : null)}
      iconOnly={iconOnly}
    >
      <Port id={portId} register={register} side={portSide} lit={state === "active"} />
      {iconOnly ? (
        icon
      ) : (
        <div className="flex items-center gap-1.5 pr-0.5">
          <NodeIcon brand>{icon}</NodeIcon>
          <div>
            <Title>{title}</Title>
            <Meta tone={state === "done" ? "ok" : state === "active" ? "accent" : "muted"}>
              {isHovered ? hoverMeta : state === "done" ? "Ready" : idleMeta}
            </Meta>
          </div>
        </div>
      )}
    </WorkflowNode>
  );
}

const AGENTIC_MOBILE_STILL = "/illustrations/agentic-infra-mobile.png";

function AgenticMobileStill() {
  return (
    <div className="absolute inset-0 overflow-hidden md:hidden">
      <Image
        src={AGENTIC_MOBILE_STILL}
        alt=""
        width={640}
        height={306}
        unoptimized
        draggable={false}
        className="absolute top-0 left-0 h-full w-auto max-w-none"
      />
    </div>
  );
}

export function AgenticWorkflowIllustration() {
  const { active, reduce, hovered: frameHovered } = useIllustrationState();

  const step = useIllustrationSequence({
    steps: STEP_COUNT,
    active: active || frameHovered,
    reduce,
    stepMs: DELAYS,
    startDelayMs: 480,
  });

  return (
    <IllustrationStage className="p-0 lg:p-0">
      <AgenticMobileStill />
      <div className="hidden h-full md:block">
        <WorkflowCanvas step={step} reduce={reduce} />
      </div>
    </IllustrationStage>
  );
}

function WorkflowCanvas({ step, reduce }: { step: number; reduce: boolean }) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const approveButtonRef = useRef<HTMLSpanElement>(null);
  const portsRef = useRef<Partial<Record<PortId, HTMLSpanElement | null>>>({});
  const [size, setSize] = useState({ w: 1000, h: 560 });
  const [compact, setCompact] = useState(false);
  const [cozy, setCozy] = useState(true);
  const [toolsWrap, setToolsWrap] = useState(false);
  const [showModel, setShowModel] = useState(true);
  const [showContract, setShowContract] = useState(true);
  const [showPricing, setShowPricing] = useState(true);
  const [points, setPoints] = useState<Partial<Record<PortId, Point>>>({});
  const [approveCursorTarget, setApproveCursorTarget] = useState<Point | null>(null);
  const [hovered, setHovered] = useState<NodeId | null>(null);

  const finished = step >= S.complete;
  const settled = reduce || finished;

  const register = useCallback((id: PortId, el: HTMLSpanElement | null) => {
    portsRef.current[id] = el;
  }, []);

  const measure = useCallback(() => {
    const root = canvasRef.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    if (rect.width < 8 || rect.height < 8) return;
    const nextCompact = rect.width < COMPACT_AT;
    const nextCozy = rect.height >= 300;
    const nextToolsWrap = rect.width < TOOLS_WRAP_AT;
    const nextModel = rect.width >= 500;
    const nextContract = rect.width >= 660;
    const nextPricing = rect.width >= 740;
    setSize((prev) => (prev.w === rect.width && prev.h === rect.height ? prev : { w: rect.width, h: rect.height }));
    setCompact((prev) => (prev === nextCompact ? prev : nextCompact));
    setCozy((prev) => (prev === nextCozy ? prev : nextCozy));
    setToolsWrap((prev) => (prev === nextToolsWrap ? prev : nextToolsWrap));
    setShowModel((prev) => (prev === nextModel ? prev : nextModel));
    setShowContract((prev) => (prev === nextContract ? prev : nextContract));
    setShowPricing((prev) => (prev === nextPricing ? prev : nextPricing));
    const next: Partial<Record<PortId, Point>> = {};
    for (const [id, el] of Object.entries(portsRef.current) as [PortId, HTMLSpanElement | null][]) {
      if (!el) continue;
      const r = el.getBoundingClientRect();
      next[id] = {
        x: r.left - rect.left + r.width / 2,
        y: r.top - rect.top + r.height / 2,
      };
    }
    setPoints((prev) => {
      const keys = Object.keys(next) as PortId[];
      if (keys.length === Object.keys(prev).length) {
        let same = true;
        for (const key of keys) {
          const a = prev[key];
          const b = next[key];
          if (!a || !b || Math.abs(a.x - b.x) > 0.4 || Math.abs(a.y - b.y) > 0.4) {
            same = false;
            break;
          }
        }
        if (same) return prev;
      }
      return next;
    });

    const approveEl = approveButtonRef.current;
    if (approveEl) {
      const approveRect = approveEl.getBoundingClientRect();
      const nextTarget = {
        x: approveRect.left - rect.left + approveRect.width / 2,
        y: approveRect.top - rect.top + approveRect.height / 2,
      };
      setApproveCursorTarget((prev) =>
        prev && Math.abs(prev.x - nextTarget.x) < 0.4 && Math.abs(prev.y - nextTarget.y) < 0.4
          ? prev
          : nextTarget,
      );
    }
  }, []);

  useLayoutEffect(() => {
    measure();
    const root = canvasRef.current;
    if (!root) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(root);
    const frame = requestAnimationFrame(() => measure());
    return () => {
      ro.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [measure, compact, cozy, showModel, showContract, showPricing, step, hovered]);

  const edges = edgesFor(compact, showModel, showContract, showPricing);

  const nodeState = (id: NodeId): NodeState => {
    if (settled) {
      return id === "agent" ? "ready" : "done";
    }
    switch (id) {
      case "request":
        return step >= S.request ? "active" : "idle";
      case "agent":
        if (step >= S.contextReady) return "ready";
        if (step >= S.agentGather) return "active";
        return "idle";
      case "model":
        return step >= S.aiModel ? (step >= S.aiMemory ? "done" : "active") : "idle";
      case "memory":
        return step >= S.aiMemory ? (step >= S.aiCrm ? "done" : "active") : "idle";
      case "crm":
        return step >= S.aiCrm ? (step >= S.aiRest ? "done" : "active") : "idle";
      case "contract":
      case "pricing":
        return step >= S.aiRest ? (step >= S.contextReady ? "done" : "active") : "idle";
      case "prepare":
        if (step >= S.prepareReady) return "ready";
        if (step >= S.pulsePrepare) return "active";
        return "idle";
      case "approval":
        if (step >= S.approved) return "done";
        if (step >= S.approval) return "active";
        return "idle";
      case "send":
        if (step >= S.sent) return "done";
        if (step >= S.pulseSend) return "active";
        return "idle";
      case "done":
        return step >= S.complete ? "done" : "idle";
      default:
        return "idle";
    }
  };

  const pulseOn = (id: string) => {
    if (reduce || finished) return false;
    if (id === "e-req-agent") return step === S.pulseToAgent;
    if (id === "e-agent-model") return step === S.aiModel;
    if (id === "e-agent-mem") return step === S.aiMemory;
    if (id === "e-agent-crm") return step === S.aiCrm;
    if (id === "e-agent-con" || id === "e-agent-price") return step === S.aiRest;
    if (id === "e-agent-prep") return step === S.pulsePrepare;
    if (id === "e-prep-appr" || id === "e-agent-appr") return step === S.prepareReady;
    if (id === "e-appr-send") return step === S.pulseSend;
    if (id === "e-send-done" || id === "e-appr-done") return step === S.sent;
    return false;
  };

  const related = (edge: EdgeDef) => {
    if (!hovered || !settled) return false;
    const ports = NODE_PORTS[hovered];
    return ports.includes(edge.from) || ports.includes(edge.to);
  };

  const agentMeta =
    nodeState("agent") === "ready" || settled
      ? "Context ready"
      : nodeState("agent") === "active"
        ? "Gathering context"
        : "AI Agent";
  const prepareMeta =
    nodeState("prepare") === "ready" || settled
      ? "Ready"
      : nodeState("prepare") === "active"
        ? "Preparing"
        : "Queued";
  const sendMeta =
    nodeState("send") === "done" || settled
      ? "Sent"
      : nodeState("send") === "active"
        ? "Sending…"
        : "Waiting";

  const statusLabel = settled
    ? "Action completed"
    : step >= S.approval && step < S.approved
      ? "Awaiting approval"
      : "Orchestrating";
  const stepsDone = settled ? 6 : Math.min(6, Math.max(0, Math.round((step / S.complete) * 6)));

  const showApprovalActions = !compact && !settled && step >= S.approval && step < S.approved;
  const approvePressed = !settled && step >= S.cursorClick && step < S.approved;
  const cursorPhase: "hidden" | "travel" | "press" =
    compact || settled || step < S.cursorMove || step >= S.approved
      ? "hidden"
      : step === S.cursorClick
        ? "press"
        : "travel";

  return (
    <div
      ref={canvasRef}
      className="relative h-full min-h-0 w-full overflow-hidden"
      style={{
        backgroundColor: surfaceMuted,
        backgroundImage: `radial-gradient(circle, rgba(28, 25, 23, 0.20) 0.7px, transparent 0.8px)`,
        backgroundSize: "18px 18px",
      }}
    >
      <div className="pointer-events-none absolute inset-x-4 top-2.5 z-10 flex items-center justify-between gap-3">
        <p className="truncate font-medium tracking-tight" style={{ fontSize: 10, color: inkFaint }}>
          Prepare the Q3 renewal for Acme
        </p>
        <span
          className="shrink-0 rounded px-1.5 py-0.5 font-medium tracking-tight"
          style={{
            fontSize: 10,
            color: settled ? health : inkMuted,
            border: `1px solid ${border}`,
            background: surface,
          }}
        >
          {statusLabel}
        </span>
      </div>

      <svg
        className="pointer-events-none absolute inset-0 z-[1]"
        width={size.w}
        height={size.h}
        viewBox={`0 0 ${size.w} ${size.h}`}
        fill="none"
        aria-hidden
      >
        {edges.map((edge) => {
          const from = points[edge.from];
          const to = points[edge.to];
          if (!from || !to) return null;
          const d = cubic(from, to, edge.dir, size.w);
          const highlight = related(edge);
          const pulsing = pulseOn(edge.id);
          const activeStroke = highlight || pulsing;
          return (
            <g key={edge.id}>
              <path
                d={d}
                stroke={activeStroke ? accent : edge.kind === "ai" ? connectorAi : connector}
                strokeWidth={highlight ? 1.25 : 1.1}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={edge.kind === "ai" ? "4 5" : undefined}
                opacity={edge.kind === "ai" ? (activeStroke ? 0.8 : 0.5) : activeStroke ? 1 : 0.88}
              />
              <EdgePulse d={d} run={pulsing} />
            </g>
          );
        })}
      </svg>

      <ApprovalCursor target={approveCursorTarget} phase={cursorPhase} />

      <div
        className="relative z-[2] grid h-full w-full"
        style={{
          padding: compact
            ? "36px 8px 28px 16px"
            : cozy
              ? "46px 28px 44px"
              : "40px 22px 36px",
          gridTemplateColumns: compact
            ? "auto auto minmax(0, 1fr)"
            : "minmax(0, 0.9fr) minmax(0, 1.15fr) minmax(0, 0.95fr) minmax(0, 1fr)",
          gridTemplateRows: compact ? "auto auto auto auto" : "auto auto auto",
          columnGap: compact ? 12 : cozy ? 20 : 14,
          rowGap: compact ? 18 : cozy ? 28 : 22,
          alignItems: "start",
          alignContent: compact ? "start" : "center",
          justifyItems: compact ? "start" : undefined,
        }}
      >
        <div
          style={{
            gridColumn: "1",
            gridRow: "1",
            display: "flex",
            justifyContent: compact ? "flex-start" : "center",
            justifySelf: compact ? "start" : undefined,
          }}
        >
          <WorkflowNode
            state={nodeState("request")}
            hovered={hovered === "request"}
            onHover={(v) => setHovered(v ? "request" : null)}
            iconOnly={compact}
          >
            <Port
              id="requestOut"
              register={register}
              side={compact ? "bottom" : "right"}
              lit={nodeState("request") === "active"}
            />
            {compact ? (
              <GmailMark />
            ) : (
              <div className="flex items-center gap-2 pr-1">
                <NodeIcon brand>
                  <GmailMark />
                </NodeIcon>
                <div className="min-w-0">
                  <Title>Gmail</Title>
                  <Meta>{hovered === "request" ? "Q3 renewal" : "Acme Corp"}</Meta>
                </div>
              </div>
            )}
          </WorkflowNode>
        </div>

        <div
          style={{
            gridColumn: compact ? "1" : "2",
            gridRow: compact ? "2" : "1",
            display: "flex",
            justifyContent: compact ? "flex-start" : "center",
            justifySelf: compact ? "start" : undefined,
          }}
        >
          <WorkflowNode
            state={nodeState("agent")}
            selected={nodeState("agent") === "active"}
            hovered={hovered === "agent"}
            onHover={(v) => setHovered(v ? "agent" : null)}
            wide={!compact}
            iconOnly={compact}
            tall={compact}
          >
            <Port
              id="agentIn"
              register={register}
              side={compact ? "top" : "left"}
              lit={nodeState("agent") === "active"}
            />
            <Port
              id="agentOut"
              register={register}
              side={compact ? "bottom" : "right"}
              lit={nodeState("agent") === "active"}
            />
            <Port
              id="agentModel"
              register={register}
              side={compact ? "right" : "bottom"}
              shape="diamond"
              offset={compact ? 28 : 28}
              lit={nodeState("model") === "active"}
            />
            <Port
              id="agentMemory"
              register={register}
              side={compact ? "right" : "bottom"}
              shape="diamond"
              offset={50}
              lit={nodeState("memory") === "active"}
            />
            <Port
              id="agentTools"
              register={register}
              side={compact ? "right" : "bottom"}
              shape="diamond"
              offset={compact ? 72 : 72}
              lit={nodeState("crm") === "active"}
            />
            {compact ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <circle cx="6" cy="6" r="4.15" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="6" cy="6" r="1.15" fill="currentColor" />
              </svg>
            ) : (
              <div className="flex items-center gap-2">
                <NodeIcon>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <circle cx="6" cy="6" r="4.15" stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="6" cy="6" r="1.15" fill="currentColor" />
                  </svg>
                </NodeIcon>
                <div className="min-w-0">
                  <Title>Renewal Agent</Title>
                  <Meta tone={nodeState("agent") === "active" ? "accent" : nodeState("agent") === "ready" ? "ok" : "muted"}>
                    {agentMeta}
                  </Meta>
                </div>
              </div>
            )}
          </WorkflowNode>
        </div>

        {!compact ? (
          <div style={{ gridColumn: "3", gridRow: "1", display: "flex", justifyContent: "center" }}>
            <WorkflowNode
              state={nodeState("prepare")}
              hovered={hovered === "prepare"}
              onHover={(v) => setHovered(v ? "prepare" : null)}
            >
              <Port id="prepareIn" register={register} side="left" lit={nodeState("prepare") === "active"} />
              <Port
                id="prepareOut"
                register={register}
                side="right"
                lit={nodeState("prepare") === "active"}
              />
              <div className="flex items-center gap-2 pr-1">
                <NodeIcon brand>
                  <SheetsMark />
                </NodeIcon>
                <div className="min-w-0">
                  <Title>Sheets</Title>
                  <Meta
                    tone={
                      nodeState("prepare") === "active" ? "accent" : nodeState("prepare") === "ready" ? "ok" : "muted"
                    }
                  >
                    {hovered === "prepare" ? "Q3 quote" : prepareMeta}
                  </Meta>
                </div>
              </div>
            </WorkflowNode>
          </div>
        ) : null}

        <div
          style={{
            gridColumn: compact ? "1" : "4",
            gridRow: compact ? "3" : "1",
            position: "relative",
            display: "flex",
            justifyContent: compact ? "flex-start" : "center",
            justifySelf: compact ? "start" : undefined,
          }}
        >
          <WorkflowNode
            state={nodeState("approval")}
            selected={nodeState("approval") === "active"}
            hovered={hovered === "approval"}
            onHover={(v) => setHovered(v ? "approval" : null)}
            iconOnly={compact}
          >
            <Port
              id="approvalIn"
              register={register}
              side={compact ? "top" : "left"}
              lit={nodeState("approval") === "active"}
            />
            <Port
              id="approvalOut"
              register={register}
              side={compact ? "bottom" : "bottom"}
              lit={nodeState("approval") === "active"}
            />
            {compact ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <circle cx="6" cy="6" r="4.2" stroke="currentColor" strokeWidth="1.2" />
                <path
                  d="M4.1 6.15 5.4 7.5 8 4.7"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <div className="flex items-center gap-2">
                <NodeIcon>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <circle cx="6" cy="6" r="4.2" stroke="currentColor" strokeWidth="1.2" />
                    <path
                      d="M4.1 6.15 5.4 7.5 8 4.7"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </NodeIcon>
                <div className="min-w-0">
                  <Title>Human approval</Title>
                  <Meta
                    tone={
                      nodeState("approval") === "done" ? "ok" : nodeState("approval") === "active" ? "accent" : "muted"
                    }
                  >
                    {nodeState("approval") === "done" || settled
                      ? "Approved ✓"
                      : "Renew at existing pricing?"}
                  </Meta>
                </div>
              </div>
            )}
          </WorkflowNode>
          <div
            className="absolute top-full left-1/2 z-20 mt-1 flex -translate-x-1/2 gap-1 whitespace-nowrap"
            aria-hidden={!showApprovalActions}
            style={{
              opacity: showApprovalActions ? 1 : 0,
              pointerEvents: showApprovalActions ? "auto" : "none",
            }}
          >
            <span
              className="rounded px-1.5 py-0.5 tracking-tight"
              style={{
                fontSize: 10,
                color: inkMuted,
                border: `1px solid ${border}`,
                background: surface,
              }}
            >
              Review
            </span>
            <motion.span
              ref={approveButtonRef}
              className="rounded px-1.5 py-0.5 font-medium tracking-tight"
              animate={{ scale: approvePressed ? 0.94 : 1 }}
              transition={{ duration: 0.12, ease: EASE }}
              style={{
                fontSize: 10,
                color: "#fff",
                background: approvePressed ? "#B85638" : accent,
                boxShadow: approvePressed ? "inset 0 1px 2px rgba(0,0,0,0.12)" : "none",
              }}
            >
              Approve
            </motion.span>
          </div>
        </div>

        {compact ? (
          <div
            className="flex flex-col gap-2 overflow-visible"
            style={{
              gridColumn: "2",
              gridRow: "2 / 4",
              justifySelf: "start",
              alignSelf: "center",
            }}
          >
            <ToolNode
              id="model"
              title="Claude"
              idleMeta="Sonnet"
              hoverMeta="Sonnet"
              icon={<ClaudeMark className="h-3.5 w-3.5" />}
              portId="modelIn"
              portSide="left"
              state={nodeState("model")}
              hovered={hovered}
              setHovered={setHovered}
              register={register}
              iconOnly
            />
            <ToolNode
              id="memory"
              title="Notion"
              idleMeta="Wiki"
              hoverMeta="Acme context"
              icon={<NotionMark />}
              portId="memoryIn"
              portSide="left"
              state={nodeState("memory")}
              hovered={hovered}
              setHovered={setHovered}
              register={register}
              iconOnly
            />
            <ToolNode
              id="crm"
              title="Salesforce"
              idleMeta="CRM"
              hoverMeta="AC-4421"
              icon={<SalesforceMark className="h-3.5 w-3.5" />}
              portId="crmIn"
              portSide="left"
              state={nodeState("crm")}
              hovered={hovered}
              setHovered={setHovered}
              register={register}
              iconOnly
            />
          </div>
        ) : (
        <div
          className="flex items-start justify-center"
          style={{
            gridColumn: "2",
            gridRow: "2",
            gap: toolsWrap ? 8 : 10,
            paddingTop: 4,
            flexWrap: toolsWrap ? "wrap" : "nowrap",
            maxWidth: "100%",
            justifySelf: "center",
          }}
        >
          {showModel ? (
            <ToolNode
              id="model"
              title="Claude"
              idleMeta="Sonnet"
              hoverMeta="Sonnet"
              icon={<ClaudeMark className="h-3.5 w-3.5" />}
              portId="modelIn"
              state={nodeState("model")}
              hovered={hovered}
              setHovered={setHovered}
              register={register}
            />
          ) : null}
          <ToolNode
            id="memory"
            title="Notion"
            idleMeta="Wiki"
            hoverMeta="Acme context"
            icon={<NotionMark />}
            portId="memoryIn"
            state={nodeState("memory")}
            hovered={hovered}
            setHovered={setHovered}
            register={register}
          />
          <ToolNode
            id="crm"
            title="Salesforce"
            idleMeta="CRM"
            hoverMeta="AC-4421"
            icon={<SalesforceMark className="h-3.5 w-3.5" />}
            portId="crmIn"
            state={nodeState("crm")}
            hovered={hovered}
            setHovered={setHovered}
            register={register}
          />
          {showContract ? (
            <ToolNode
              id="contract"
              title="Drive"
              idleMeta="MSA"
              hoverMeta="MSA-118"
              icon={<DriveMark />}
              portId="contractIn"
              state={nodeState("contract")}
              hovered={hovered}
              setHovered={setHovered}
              register={register}
            />
          ) : null}
          {showPricing ? (
            <ToolNode
              id="pricing"
              title="Stripe"
              idleMeta="Pricing"
              hoverMeta="Enterprise band"
              icon={<StripeMark />}
              portId="pricingIn"
              state={nodeState("pricing")}
              hovered={hovered}
              setHovered={setHovered}
              register={register}
            />
          ) : null}
        </div>
        )}

        {!compact ? (
          <>
            <div
              style={{
                gridColumn: "4",
                gridRow: "2",
                display: "flex",
                justifyContent: "center",
                alignSelf: "start",
                paddingTop: 4,
              }}
            >
              <WorkflowNode
                state={nodeState("send")}
                hovered={hovered === "send"}
                onHover={(v) => setHovered(v ? "send" : null)}
                wide
              >
                <Port id="sendIn" register={register} side="top" lit={nodeState("send") === "active"} />
                <Port id="sendOut" register={register} side="bottom" lit={nodeState("send") === "active"} />
                <div className="flex items-center gap-2 pr-1">
                  <NodeIcon brand>
                    <SlackMark className="h-3.5 w-3.5" />
                  </NodeIcon>
                  <div className="min-w-0">
                    <Title>Slack</Title>
                    <Meta tone={nodeState("send") === "active" ? "accent" : nodeState("send") === "done" ? "ok" : "muted"}>
                      {hovered === "send" ? "#acme-renewal" : sendMeta}
                    </Meta>
                  </div>
                </div>
              </WorkflowNode>
            </div>
            <div
              style={{
                gridColumn: "4",
                gridRow: "3",
                display: "flex",
                justifyContent: "center",
                alignSelf: "start",
              }}
            >
              <WorkflowNode
                state={nodeState("done")}
                hovered={hovered === "done"}
                onHover={(v) => setHovered(v ? "done" : null)}
                wide
              >
                <Port id="doneIn" register={register} side="top" lit={false} />
                <div className="flex items-center gap-2">
                  <span
                    className="flex size-6 items-center justify-center rounded-[6px]"
                    style={{
                      background: nodeState("done") === "done" || settled ? healthSoft : surfaceSunk,
                      color: nodeState("done") === "done" || settled ? health : ink,
                      border: `1px solid ${border}`,
                    }}
                  >
                    <StrokeIcon d="M2.6 6.2 5 8.6 9.5 3.6" />
                  </span>
                  <div>
                    <Title>Completed</Title>
                    <Meta tone="ok">{settled ? "Done" : "Pending"}</Meta>
                  </div>
                </div>
              </WorkflowNode>
            </div>
          </>
        ) : (
          <div
            style={{
              gridColumn: "1",
              gridRow: "4",
              display: "flex",
              justifyContent: "flex-start",
              justifySelf: "start",
            }}
          >
            <WorkflowNode
              state={nodeState("done")}
              hovered={hovered === "done"}
              onHover={(v) => setHovered(v ? "done" : null)}
              iconOnly
            >
              <Port id="doneIn" register={register} side="top" lit={false} />
              <span
                className="flex size-3.5 items-center justify-center"
                style={{
                  color: nodeState("done") === "done" || settled ? health : ink,
                }}
              >
                <StrokeIcon d="M2.6 6.2 5 8.6 9.5 3.6" />
              </span>
            </WorkflowNode>
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute bottom-2.5 left-4 z-10 flex items-center gap-2">
        <span className="font-medium tracking-tight" style={{ fontSize: 10, color: inkFaint }}>
          Run #184
        </span>
        <span aria-hidden style={{ fontSize: 10, color: inkFaint }}>
          ·
        </span>
        <span style={{ fontSize: 10, color: inkFaint }}>1.8s</span>
        <span aria-hidden style={{ fontSize: 10, color: inkFaint }}>
          ·
        </span>
        <span style={{ fontSize: 10, color: inkFaint }}>
          {stepsDone} / 6 complete
        </span>
      </div>
    </div>
  );
}
