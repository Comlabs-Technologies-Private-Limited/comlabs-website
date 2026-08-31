"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { GoogleMark } from "./brand-marks";
import { MicroLabel, Panel } from "./illustration-primitives";
import {
  IllustrationStage,
  useIllustrationState,
} from "./service-illustration-frame";
import {
  illustrationBlurHidden,
  illustrationBlurShown,
  illustrationColors,
  illustrationEase,
  illustrationPopHidden,
  illustrationPopShown,
  illustrationTextSwapExit,
  illustrationTextSwapHidden,
  illustrationTextSwapShown,
  illustrationTiming,
} from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

const DOC_SECTIONS = [
  { label: "Service page", schema: "Service" },
  { label: "Process guide", schema: "HowTo" },
  { label: "FAQ block", schema: "FAQ" },
  { label: "Local presence", schema: "LocalBusiness" },
] as const;

const STEPS = 7;

const CHATGPT_PROMPT = "what does comlabs do?";
const CHATGPT_ANSWER =
  "Comlabs Technologies builds custom software for teams in Pune, covering design through deployment.";

/** Types a prompt into the ChatGPT composer, then snaps to complete when the step moves on. */
function useTypedText(text: string, enabled: boolean, reduce: boolean, snap: boolean): string {
  const [count, setCount] = useState(reduce || snap ? text.length : 0);

  useEffect(() => {
    if (reduce || snap) {
      setCount(text.length);
      return;
    }
    if (!enabled) {
      setCount(0);
      return;
    }

    setCount(0);
    const intervalId = window.setInterval(() => {
      setCount((current) => {
        if (current >= text.length) {
          window.clearInterval(intervalId);
          return current;
        }
        return current + 1;
      });
    }, 36);

    return () => window.clearInterval(intervalId);
  }, [enabled, reduce, snap, text]);

  return text.slice(0, count);
}

const fade = {
  duration: illustrationTiming.transitionSec,
  ease: illustrationEase,
};

/** Quicker swap so the answer panel changes state inside its narrative step. */
const swap = {
  duration: illustrationTiming.feedbackSec,
  ease: illustrationEase,
};

/** Google Search Console product icon — identifies the indexing surface. */
function SearchConsoleMark({
  className = "h-[13px] w-[13px] shrink-0 lg:h-[15px] lg:w-[15px]",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 192 192"
      fill="none"
      aria-hidden
    >
      <path
        fill="#FBBC04"
        d="M53.19 146.53l-22.66 22.66c-1.74 1.74-4.57 1.74-6.32 0l-1.4-1.4c-1.74-1.74-1.74-4.57 0-6.32l22.66-22.66c1.74-1.74 4.57-1.74 6.32 0l1.4 1.4c1.75 1.74 1.75 4.57 0 6.32z"
      />
      <path
        fill="#4285F4"
        d="M114 156h29c16.02 0 29-12.98 29-29V49c0-16.02-12.98-29-29-29h0c-16.02 0-29 12.98-29 29V156z"
      />
      <path
        fill="#FBBC04"
        d="M66 156L66 156c16.02 0 29-12.98 29-29v0c0-16.02-12.98-29-29-29h0c-16.02 0-29 12.98-29 29v0C37 143.02 49.98 156 66 156z"
      />
      <path
        fill="#34A853"
        d="M134.26 156H106c-16.02 0-29-12.98-29-29V89c0-16.02 12.98-29 29-29h0c16.02 0 29 12.98 29 29v66.26c0 .41-.33.74-.74.74z"
      />
      <path
        fill="#1967D2"
        d="M135 155.26V89c0-13.24-8.88-24.4-21-27.87V156h20.26c.41 0 .74-.33.74-.74z"
      />
      <path
        fill="#EA4335"
        d="M95 127.56L95 127.56c0-12.12-7.44-22.5-18-26.83v26.83c0 8.26 3.46 15.71 9 20.99 5.54-5.28 9-12.73 9-20.99z"
      />
    </svg>
  );
}

/** Comlabs mark, standing in as the site favicon in the search result. */
function ComlabsMark() {
  return (
    <svg
      className="h-[11px] w-[11px] shrink-0 lg:h-[13px] lg:w-[13px]"
      viewBox="-3 -1 268 245"
      fill="none"
      aria-hidden
    >
      <path
        fill={illustrationColors.accent}
        d="M92.0 242.0C90.8 241.5 89.7 240.4 88.9 238.9C88.3 237.7 88.3 236.9 88.4 208.2L88.5 178.8L89.4 177.0C90.1 175.4 92.5 172.9 104.3 161.1C121.3 144.2 126.9 138.7 128.1 137.7C128.8 137.2 129.6 137.0 130.7 137.0C132.1 137.0 132.6 137.2 133.8 138.1C134.5 138.7 141.0 144.9 148.1 152.0C155.1 159.1 163.4 167.3 166.5 170.3C169.5 173.3 172.3 176.2 172.6 176.8C173.1 177.8 173.2 180.0 173.3 207.2C173.3 227.5 173.3 236.9 173.0 237.7C172.5 239.4 171.2 240.9 169.6 241.7C168.4 242.3 167.8 242.4 160.8 242.3L153.4 242.2L152.1 241.1C149.5 239.1 149.7 240.8 149.7 213.2L149.7 188.5L143.6 182.5C134.5 173.5 131.4 170.7 130.8 170.7C130.1 170.7 123.3 177.0 116.0 184.2L111.8 188.4L111.7 213.0L111.5 237.6L110.5 239.2C109.8 240.2 109.0 241.0 108.0 241.6C106.6 242.3 106.3 242.3 99.7 242.3C95.9 242.3 92.5 242.1 92.0 242.0ZM33.7 198.2C32.3 197.5 23.4 189.0 22.6 187.5C21.8 185.9 21.8 182.8 22.6 181.6C23.5 180.2 35.0 168.4 53.4 150.0C68.3 135.1 68.9 134.3 68.2 133.9C67.7 133.6 60.4 133.5 35.5 133.3C-0.6 133.1 2.2 133.4 0.5 130.5L-0.4 129.0L-0.3 121.1C-0.1 113.4 -0.1 113.1 0.7 111.8C1.3 110.8 1.9 110.2 3.0 109.7C5.0 108.8 9.2 108.7 35.5 108.6C60.1 108.5 67.8 108.3 68.4 107.7C68.7 107.4 64.3 102.9 46.0 84.6C33.4 72.1 22.9 61.5 22.6 61.0C22.2 60.4 22.0 59.5 22.0 58.1C22.0 56.4 22.1 55.9 23.0 54.8C24.5 52.7 32.1 45.1 33.3 44.4C34.8 43.5 37.3 43.4 38.9 44.2C39.5 44.5 41.9 46.6 44.3 48.8C48.8 53.2 88.1 92.4 95.9 100.4C98.4 103.0 102.8 107.4 105.6 110.2C112.3 116.8 112.5 117.0 112.6 120.7C112.7 123.3 112.6 123.8 112.0 124.9C111.6 125.6 107.9 129.5 103.8 133.7C86.7 151.1 78.3 159.6 75.0 162.8C73.1 164.6 68.1 169.6 63.9 173.8C41.8 195.8 39.9 197.7 38.2 198.2C36.2 198.8 35.1 198.8 33.7 198.2ZM222.7 197.8C221.0 197.0 149.8 125.6 149.1 124.2C148.6 122.8 148.5 119.1 149.0 117.8C149.4 116.8 158.7 107.4 194.0 72.0C214.3 51.7 221.4 44.9 223.2 44.1C224.6 43.5 227.8 43.5 228.9 44.1C230.2 44.8 238.8 53.6 239.5 54.9C240.2 56.5 240.2 59.6 239.3 61.0C238.7 62.1 223.0 77.7 204.7 95.6C200.1 100.1 195.5 104.7 194.6 105.8C193.2 107.3 193.0 107.8 193.3 108.2C193.7 108.6 198.0 108.7 225.5 108.7C255.5 108.7 257.2 108.7 258.5 109.3C261.6 110.7 262.0 111.9 262.0 121.1C262.0 127.2 261.9 128.5 261.5 129.4C260.7 131.0 260.0 131.6 258.5 132.5C257.2 133.2 257.1 133.2 226.5 133.3C209.6 133.3 195.2 133.4 194.5 133.4C193.5 133.5 193.2 133.6 193.2 134.1C193.2 134.4 203.5 145.0 216.4 157.9C239.5 181.1 239.6 181.2 240.0 182.9C240.5 185.3 240.4 185.5 239.6 187.2C238.8 188.9 231.8 195.8 229.5 197.3C228.1 198.2 227.5 198.3 225.9 198.3C224.7 198.3 223.4 198.1 222.7 197.8ZM128.6 104.0C128.0 103.6 123.1 99.1 117.9 93.9C112.7 88.7 107.3 83.5 106.0 82.2C104.6 80.9 100.4 76.8 96.6 73.0C91.2 67.7 89.5 65.8 88.9 64.5L88.2 62.8L88.3 34.0C88.5 8.2 88.6 5.0 89.0 4.0C89.7 2.5 90.7 1.5 92.4 0.6C93.5 0.1 94.4 0.0 99.9 0.0C106.1 0.0 106.2 0.0 108.0 0.9C109.4 1.6 110.0 2.2 110.7 3.3L111.5 4.8L111.7 28.9L111.8 53.0L121.0 62.2C126.0 67.2 130.4 71.3 130.7 71.3C131.2 71.3 146.8 56.1 148.8 53.7C149.5 53.0 149.5 52.2 149.7 28.9C149.8 5.0 149.8 4.8 150.6 3.5C151.4 1.9 151.8 1.5 153.6 0.6C154.7 0.1 155.6 0.0 161.6 0.0L168.4 0.0L170.2 1.1C173.4 3.0 173.2 -0.0 173.2 34.2L173.2 64.2L172.4 65.3C172.0 66.0 166.1 72.0 159.3 78.7C152.5 85.4 144.1 93.7 140.6 97.2C137.1 100.8 133.8 103.9 133.2 104.1C131.7 104.8 130.1 104.8 128.6 104.0Z"
      />
    </svg>
  );
}

/**
 * OpenAI logomark. Drawn as the bare knot rather than the circular app icon —
 * at this size the silhouette stays recognisable where a badge reads as a dot.
 */
function ChatGptMark() {
  return (
    <span className="flex shrink-0 items-center justify-center">
      <svg
        className="h-[10px] w-[10px] lg:h-[11px] lg:w-[11px]"
        viewBox="0 0 24 24"
        fill={illustrationColors.ink}
        fillRule="evenodd"
        aria-hidden
      >
        <path d="M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z" />
      </svg>
    </span>
  );
}

/** ChatGPT-style thinking dots while a response is generating. */
function AnswerLoading() {
  return (
    <div className="flex items-center gap-[3px]">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="h-[4px] w-[4px] rounded-full"
          style={{ background: illustrationColors.ink }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 0.9,
            ease: "easeInOut",
            repeat: Infinity,
            delay: index * 0.14,
          }}
        />
      ))}
    </div>
  );
}

/** Branch connector linking the source document to both discovery surfaces. */
function Connectors({ activated }: { activated: boolean }) {
  const stroke = activated ? illustrationColors.accentLine : illustrationColors.border;
  return (
    <svg
      viewBox="0 0 20 100"
      preserveAspectRatio="none"
      className="h-full w-full"
      aria-hidden
    >
      {["M0,50 H8", "M8,50 V22 H20", "M8,50 V78 H20"].map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          vectorEffect="non-scaling-stroke"
          strokeWidth="1"
          strokeLinecap="round"
          stroke={stroke}
          style={{ transition: "stroke 400ms ease" }}
        />
      ))}
      {[22, 78].map((cy) => (
        <circle
          key={cy}
          cx="20"
          cy={cy}
          r="1.5"
          fill={activated ? illustrationColors.accent : illustrationColors.wire}
          style={{ transition: "fill 400ms ease" }}
        />
      ))}
    </svg>
  );
}

/** Skeleton lines while the Google result is indexing. */
function SearchResultLoader() {
  return (
    <div className="flex flex-col gap-[5px]">
      <div className="flex items-center gap-1">
        <span
          className="block h-[12px] w-[12px] shrink-0 rounded-full lg:h-[14px] lg:w-[14px]"
          style={{ background: illustrationColors.surfaceSunk }}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
          <span
            className="block h-[4px] w-[52%] rounded-full"
            style={{ background: illustrationColors.wire }}
          />
          <span
            className="block h-[3px] w-[68%] rounded-full"
            style={{ background: illustrationColors.surfaceSunk }}
          />
        </div>
      </div>
      <span
        className="block h-[4px] w-[74%] rounded-full"
        style={{ background: illustrationColors.wire }}
      />
      {["100%", "88%", "72%"].map((width) => (
        <span
          key={width}
          className="block h-[3px] rounded-full"
          style={{ width, background: illustrationColors.surfaceSunk }}
        />
      ))}
    </div>
  );
}

/** ChatGPT-style mic — outline microphone for the search bar. */
function MicIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0">
      <rect
        x="5.5"
        y="2.5"
        width="5"
        height="7"
        rx="2.5"
        stroke={illustrationColors.inkMuted}
        strokeWidth="1.2"
      />
      <path
        d="M3.5 8a4.5 4.5 0 0 0 9 0"
        stroke={illustrationColors.inkMuted}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M8 12.5v2"
        stroke={illustrationColors.inkMuted}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** ChatGPT voice mode — equalizer bars inside the blue action button. */
function VoiceModeIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 16 16" fill="none" aria-hidden>
      {[3.5, 6, 4.5, 7.5].map((height, index) => (
        <rect
          key={index}
          x={3 + index * 2.8}
          y={(16 - height) / 2}
          width="1.6"
          height={height}
          rx="0.8"
          fill="#fff"
        />
      ))}
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="7" height="7" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M6 9.5V2.5M3.2 5.2 6 2.5 8.8 5.2"
        stroke="#fff"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ComposerCaret() {
  return (
    <motion.span
      className="ml-px inline-block h-[8px] w-[1px] shrink-0 align-middle"
      style={{ background: illustrationColors.ink }}
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.55, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
    />
  );
}

type ComposerMode = "compose" | "citation";

/** ChatGPT composer — types a prompt, then becomes a citation chip after the answer. */
function CitationSearchBar({
  text,
  caret = false,
  mode = "compose",
}: {
  text: string;
  caret?: boolean;
  mode?: ComposerMode;
}) {
  const isCitation = mode === "citation";
  const hasPrompt = !isCitation && text.length > 0;

  return (
    <div
      className="flex items-center gap-1 px-1.5 py-[4px] lg:gap-1.5 lg:px-2 lg:py-[5px]"
      style={{
        borderRadius: 999,
        background: illustrationColors.surface,
        border: `1px solid ${illustrationColors.border}`,
      }}
    >
      <svg width="7" height="7" viewBox="0 0 12 12" fill="none" aria-hidden className="shrink-0">
        <path
          d="M6 2.5v7M2.5 6h7"
          stroke={illustrationColors.inkMuted}
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
      <span
        className="flex min-w-0 flex-1 items-center text-[6.5px] leading-none lg:text-[7.5px]"
        style={{ color: hasPrompt || isCitation ? illustrationColors.ink : illustrationColors.inkFaint }}
      >
        <span className="truncate">{text || (isCitation ? "" : "Ask anything")}</span>
        {caret ? <ComposerCaret /> : null}
      </span>
      <MicIcon />
      <span
        className="flex h-[14px] w-[14px] shrink-0 items-center justify-center lg:h-[15px] lg:w-[15px]"
        style={{
          borderRadius: 999,
          background: hasPrompt ? illustrationColors.ink : "#0084FF",
        }}
      >
        {hasPrompt ? <SendIcon /> : <VoiceModeIcon />}
      </span>
    </div>
  );
}

/** Search Console sidebar icons, drawn to read at 8px. */
function GscIcon({
  name,
}: {
  name: "vitals" | "lock" | "layers" | "links";
}) {
  const stroke = illustrationColors.inkMuted;
  const props = {
    width: 8,
    height: 8,
    viewBox: "0 0 12 12",
    fill: "none" as const,
    className: "shrink-0",
    "aria-hidden": true as const,
  };

  if (name === "vitals") {
    return (
      <svg {...props}>
        <path
          d="M2.8 8.6a3.8 3.8 0 1 1 6.4 0"
          stroke={stroke}
          strokeWidth="1.15"
          strokeLinecap="round"
        />
        <path
          d="M6 7.4 7.8 5.2"
          stroke={stroke}
          strokeWidth="1.15"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "lock") {
    return (
      <svg {...props}>
        <rect
          x="3"
          y="5.4"
          width="6"
          height="4.4"
          rx="1"
          stroke={stroke}
          strokeWidth="1.15"
        />
        <path
          d="M4.4 5.4V4.2a1.6 1.6 0 0 1 3.2 0v1.2"
          stroke={stroke}
          strokeWidth="1.15"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "layers") {
    return (
      <svg {...props}>
        <path
          d="M6 1.6 10.2 4 6 6.4 1.8 4Z"
          stroke={stroke}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <path
          d="M2.2 5.8 6 8 9.8 5.8"
          stroke={stroke}
          strokeWidth="1.05"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.2 7.6 6 9.8 9.8 7.6"
          stroke={stroke}
          strokeWidth="1.05"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path
        d="M4.8 7.4 3.6 8.6a1.6 1.6 0 1 1-2.2-2.2L2.6 5.2"
        stroke={stroke}
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M7.2 4.6 8.4 3.4a1.6 1.6 0 1 1 2.2 2.2L9.4 6.8"
        stroke={stroke}
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M5 7 7 5"
        stroke={stroke}
        strokeWidth="1.15"
        strokeLinecap="round"
      />
    </svg>
  );
}

function NavChevron({ expanded }: { expanded: boolean }) {
  return (
    <svg width="6" height="6" viewBox="0 0 12 12" fill="none" aria-hidden className="shrink-0">
      <path
        d={expanded ? "M2.5 8 6 4.5 9.5 8" : "M2.5 4.5 6 8 9.5 4.5"}
        stroke={illustrationColors.inkFaint}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const GSC_GROUPS = [
  {
    label: "Experience",
    expanded: true,
    items: [
      { label: "Core Web Vitals", icon: "vitals" as const },
      { label: "HTTPS", icon: "lock" as const },
    ],
  },
  {
    label: "Enhancements",
    expanded: true,
    items: [{ label: "Breadcrumbs", icon: "layers" as const }],
  },
  {
    label: "Security & Manual Actions",
    expanded: false,
    items: [] as { label: string; icon: "vitals" | "lock" | "layers" | "links" }[],
  },
] as const;

/** Search Console sidebar — Experience, Enhancements, Security, Links. */
function SearchConsoleNav() {
  return (
    <div
      className="flex min-h-0 flex-1 flex-col overflow-hidden border-t pt-1"
      style={{ borderColor: illustrationColors.border }}
    >
      {GSC_GROUPS.map((group) => (
        <div
          key={group.label}
          className="border-b"
          style={{ borderColor: illustrationColors.border }}
        >
          <div className="flex items-center justify-between gap-1.5 px-2 py-1.5 lg:px-2.5">
            <span
              className="min-w-0 truncate text-[6.5px] leading-none lg:text-[7.5px]"
              style={{ color: illustrationColors.inkMuted }}
            >
              {group.label}
            </span>
            <NavChevron expanded={group.expanded} />
          </div>
          {group.expanded ? (
            <div className="flex flex-col gap-1 pb-1.5">
              {group.items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-1.5 py-1 pr-2 pl-4 lg:pr-2.5 lg:pl-5"
                >
                  <span className="flex h-2 w-2 shrink-0 items-center justify-center">
                    <GscIcon name={item.icon} />
                  </span>
                  <span
                    className="min-w-0 truncate text-[6.5px] leading-none lg:text-[7.5px]"
                    style={{ color: illustrationColors.ink }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ))}
      <div className="flex items-center gap-1.5 px-2 py-1.5 lg:px-2.5">
        <span className="flex h-2 w-2 shrink-0 items-center justify-center">
          <GscIcon name="links" />
        </span>
        <span
          className="min-w-0 truncate text-[6.5px] leading-none lg:text-[7.5px]"
          style={{ color: illustrationColors.ink }}
        >
          Links
        </span>
      </div>
    </div>
  );
}

export function SeoAeoIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({
    steps: STEPS,
    active,
    reduce,
    stepMs: 800,
  });

  // 0–1 type prompt · 2–3 responding · 4 answer · 5 citation · 6 confirmed
  const optimised = step >= 1;
  const indexed = step >= 1;
  const composing = step < 2;
  const answerLoading = step === 2 || step === 3;
  const answerVisible = step >= 4;
  const citationVisible = step >= 5;
  const complete = step >= 6;

  const typedPrompt = useTypedText(
    CHATGPT_PROMPT,
    active && composing,
    reduce,
    !composing,
  );
  const composerText = citationVisible
    ? "comlabstechnologies.com"
    : composing
      ? typedPrompt
      : "";
  const showCaret = composing && !reduce && typedPrompt.length < CHATGPT_PROMPT.length;

  return (
    <IllustrationStage>
      <div className="flex h-full flex-col gap-2">
        {/* Search query */}
        <div
          className="flex shrink-0 items-center gap-1.5 px-2.5 py-[6px]"
          style={{
            borderRadius: 999,
            background: illustrationColors.surface,
            border: `1px solid ${illustrationColors.border}`,
          }}
        >
          <svg width="8" height="8" viewBox="0 0 12 12" fill="none" aria-hidden>
            <circle
              cx="5.2"
              cy="5.2"
              r="3.4"
              stroke={illustrationColors.inkFaint}
              strokeWidth="1.2"
            />
            <path
              d="M7.8 7.8 10 10"
              stroke={illustrationColors.inkFaint}
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          <span
            className="truncate text-[7.5px] leading-none lg:text-[9px]"
            style={{ color: illustrationColors.ink }}
          >
            custom software development company in Pune
          </span>
        </div>

        <div className="flex min-h-0 flex-1 items-stretch gap-0">
          {/* Source document */}
          <Panel className="flex w-[40%] shrink-0 flex-col overflow-hidden" elevation="panel">
            <div
              className="flex shrink-0 items-center justify-between gap-1.5 border-b px-2 py-[7px] lg:px-2.5"
              style={{
                borderColor: illustrationColors.border,
                background: illustrationColors.surfaceMuted,
              }}
            >
              <span className="flex min-w-0 items-center gap-1">
                <SearchConsoleMark className="h-[10px] w-[10px] lg:h-[11px] lg:w-[11px]" />
                <span
                  className="truncate text-[7px] leading-none font-medium lg:text-[8.5px]"
                  style={{ color: illustrationColors.ink }}
                >
                  Search Console
                </span>
              </span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={indexed ? "indexed" : "crawled"}
                  initial={reduce ? false : illustrationTextSwapHidden}
                  animate={illustrationTextSwapShown}
                  exit={reduce ? undefined : illustrationTextSwapExit}
                  transition={{ duration: 0.2, ease: illustrationEase }}
                  className="shrink-0 text-[7px] leading-none lg:text-[8.5px]"
                  style={{
                    color: indexed ? illustrationColors.accent : illustrationColors.inkMuted,
                  }}
                >
                  {indexed ? "Indexed" : "Crawled"}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <div className="flex shrink-0 flex-col p-2 pb-2.5 lg:p-2.5 lg:pb-3">
                <MicroLabel tone="faint" className="mb-1.5 leading-none">
                  Structured coverage
                </MicroLabel>
                <div className="flex flex-col gap-1">
                {DOC_SECTIONS.map((section, index) => (
                  <div
                    key={section.label}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2"
                  >
                    <span
                      className="min-w-0 truncate text-[7.5px] leading-none lg:text-[9px]"
                      style={{ color: illustrationColors.ink }}
                    >
                      {section.label}
                    </span>
                    <span className="flex h-4 shrink-0 items-center justify-end">
                      <AnimatePresence>
                        {optimised ? (
                          <motion.span
                            initial={reduce ? false : illustrationPopHidden}
                            animate={illustrationPopShown}
                            transition={{
                              ...fade,
                              delay: reduce ? 0 : index * illustrationTiming.staggerSec,
                            }}
                            className="shrink-0 text-[7px] leading-none lg:text-[8.5px]"
                            style={{ color: illustrationColors.inkMuted }}
                          >
                            {section.schema}
                          </motion.span>
                        ) : (
                          <span
                            className="block h-[3px] w-6 rounded-full"
                            style={{ background: illustrationColors.wire }}
                          />
                        )}
                      </AnimatePresence>
                    </span>
                  </div>
                ))}
                </div>
              </div>
              <SearchConsoleNav />
            </div>
          </Panel>

          {/* Connectors */}
          <div className="w-2.5 shrink-0 lg:w-4">
            <Connectors activated={answerLoading || answerVisible} />
          </div>

          {/* Discovery surfaces */}
          <div className="flex min-w-0 flex-1 flex-col justify-between gap-1.5">
            {/* Search result — fixed height locked to completed state */}
            <Panel
              className="flex h-[96px] shrink-0 flex-col overflow-hidden lg:h-[104px]"
              elevation="panel"
            >
              <div
                className="flex shrink-0 items-center justify-between gap-1.5 border-b px-2 py-[7px] lg:px-2.5"
                style={{
                  borderColor: illustrationColors.border,
                  background: illustrationColors.surfaceMuted,
                }}
              >
                <span className="flex min-w-0 items-center gap-1">
                  <GoogleMark className="h-[10px] w-[10px] lg:h-[11px] lg:w-[11px]" />
                  <span
                    className="truncate text-[7px] leading-none font-medium lg:text-[8.5px]"
                    style={{ color: illustrationColors.ink }}
                  >
                    Google
                  </span>
                </span>
                <span
                  className="shrink-0 text-[6px] leading-none lg:text-[7px]"
                  style={{
                    color: illustrationColors.accent,
                    opacity: complete ? 1 : 0,
                    transition: "opacity 400ms ease",
                  }}
                >
                  Position 1
                </span>
              </div>
              <div className="relative min-h-0 flex-1 overflow-hidden p-2 lg:p-2.5">
                <AnimatePresence mode="wait" initial={false}>
                  {optimised ? (
                    <motion.div
                      key="result"
                      initial={reduce ? false : illustrationBlurHidden}
                      animate={illustrationBlurShown}
                      exit={reduce ? undefined : illustrationBlurHidden}
                      transition={fade}
                      className="absolute inset-2 lg:inset-2.5"
                    >
                      <div className="mb-1 flex items-center gap-1">
                        <span
                          className="flex h-[14px] w-[14px] shrink-0 items-center justify-center lg:h-[16px] lg:w-[16px]"
                          style={{
                            borderRadius: 999,
                            background: illustrationColors.surfaceMuted,
                            border: `1px solid ${illustrationColors.border}`,
                          }}
                        >
                          <ComlabsMark />
                        </span>
                        <span className="flex min-w-0 flex-col gap-[1px]">
                          <span
                            className="truncate text-[6.5px] leading-none font-medium lg:text-[8px]"
                            style={{ color: illustrationColors.ink }}
                          >
                            Comlabs Technologies
                          </span>
                          <span
                            className="truncate text-[6px] leading-none lg:text-[7px]"
                            style={{ color: illustrationColors.inkFaint }}
                          >
                            comlabstechnologies.com › services
                          </span>
                        </span>
                      </div>
                      <span
                        className="mb-1 block truncate text-[8px] leading-none font-medium lg:text-[9.5px]"
                        style={{ color: illustrationColors.accent }}
                      >
                        Custom Software Development
                      </span>
                      <span
                        className="block text-[6.5px] leading-[1.4] lg:text-[7.5px]"
                        style={{ color: illustrationColors.inkMuted }}
                      >
                        Web applications, SaaS products and internal systems built around
                        how your business actually works.
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="loader"
                      initial={false}
                      exit={reduce ? undefined : illustrationBlurHidden}
                      transition={swap}
                      className="absolute inset-2 flex items-center lg:inset-2.5"
                    >
                      <SearchResultLoader />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Panel>

            {/* ChatGPT answer — fixed height locked to completed state */}
            <Panel
              className="flex h-[100px] shrink-0 flex-col overflow-hidden lg:h-[108px]"
              elevation="panel"
            >
              <div
                className="flex shrink-0 items-center gap-1 border-b px-2 py-[7px] lg:px-2.5"
                style={{
                  borderColor: illustrationColors.border,
                  background: illustrationColors.surfaceMuted,
                }}
              >
                <ChatGptMark />
                <span
                  className="text-[7px] leading-none font-medium lg:text-[8.5px]"
                  style={{ color: illustrationColors.ink }}
                >
                  ChatGPT
                </span>
                {answerLoading && !reduce ? (
                  <motion.span
                    className="ml-auto text-[6px] leading-none lg:text-[7.5px]"
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${illustrationColors.inkFaint} 0%, ${illustrationColors.ink} 50%, ${illustrationColors.inkFaint} 100%)`,
                      backgroundSize: "200% 100%",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                    animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
                  >
                    Responding…
                  </motion.span>
                ) : (
                  <span
                    className="ml-auto text-[6px] leading-none lg:text-[7.5px]"
                    style={{
                      color: illustrationColors.inkFaint,
                      opacity: answerLoading ? 1 : 0,
                    }}
                  >
                    Responding…
                  </span>
                )}
              </div>
              <div className="flex min-h-0 flex-1 flex-col gap-1 p-2 lg:gap-1.5 lg:p-2.5">
                <div className="relative min-h-0 flex-1 overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    {answerVisible ? (
                      <motion.span
                        key="answer"
                        initial={reduce ? false : illustrationBlurHidden}
                        animate={illustrationBlurShown}
                        exit={reduce ? undefined : illustrationBlurHidden}
                        transition={fade}
                        className="absolute inset-0 block text-[6.5px] leading-[1.4] lg:text-[7.5px]"
                        style={{ color: illustrationColors.inkMuted }}
                      >
                        {CHATGPT_ANSWER}
                      </motion.span>
                    ) : answerLoading ? (
                      <motion.div
                        key="answer-loading"
                        initial={reduce ? false : illustrationBlurHidden}
                        animate={illustrationBlurShown}
                        exit={reduce ? undefined : illustrationBlurHidden}
                        transition={swap}
                        className="absolute inset-0 flex items-center"
                      >
                        <AnswerLoading />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
                <CitationSearchBar
                  text={composerText}
                  caret={showCaret}
                  mode={citationVisible ? "citation" : "compose"}
                />
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </IllustrationStage>
  );
}
