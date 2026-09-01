"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { mediaUrl } from "@/lib/cloudinary";

import { WindowDots } from "./illustration-primitives";
import { IllustrationStage, useIllustrationState } from "./service-illustration-frame";
import {
  illustrationColors,
  illustrationHover,
  illustrationRadius,
  illustrationShadow,
} from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

type ProjectPreview = {
  id: string;
  name: string;
  domain: string;
  src: string;
};

const PROJECTS: readonly ProjectPreview[] = [
  {
    id: "radiant",
    name: "Radiant",
    domain: "radiant.comlabstechnologies.com",
    src: "/work/radiant/radiant-homepage.webp",
  },
  {
    id: "formial",
    name: "Formial Labs",
    domain: "formial.in",
    src: "/work/formial-labs/formial-marketing.webp",
  },
  {
    id: "global",
    name: "Global Services",
    domain: "global-services-website.vercel.app",
    src: "/work/global-services/global-services-case-study-hero.webp",
  },
];

function workPreviewSrc(localPath: string, width = 900): string {
  const resolved = mediaUrl(localPath, { width });
  if (resolved.startsWith("http")) return resolved;
  const publicId = localPath.replace(/^\//, "").replace(/\.[a-z0-9]+$/i, "");
  return `https://res.cloudinary.com/p8osc4y4/image/upload/f_auto,q_auto,c_limit,w_${width}/comlabs-website/${publicId}`;
}

function BrowserChrome({
  domain,
  children,
}: {
  domain: string;
  children: ReactNode;
}) {
  return (
    <div
      className="flex h-full flex-col overflow-hidden"
      style={{
        borderRadius: illustrationRadius.panel,
        background: illustrationColors.surface,
        border: `1px solid ${illustrationColors.border}`,
        boxShadow: illustrationShadow.raised,
      }}
    >
      <div
        className="flex shrink-0 items-center gap-2 border-b px-2 py-[6px]"
        style={{
          borderColor: illustrationColors.border,
          background: illustrationColors.surfaceMuted,
        }}
      >
        <WindowDots />
        <span
          className="min-w-0 flex-1 truncate rounded-full px-2 py-[3px] text-[6.5px] lg:text-[7.5px]"
          style={{
            background: illustrationColors.surface,
            color: illustrationColors.inkFaint,
            border: `1px solid ${illustrationColors.border}`,
          }}
        >
          {domain}
        </span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#111]">
        {children}
      </div>
    </div>
  );
}

export function WebsiteDesignIllustration() {
  const { active, reduce, pointer } = useIllustrationState();
  const step = useIllustrationSequence({
    steps: 3,
    active,
    reduce,
    stepMs: [480, 720],
  });
  const [focused, setFocused] = useState<string | null>(null);

  const settled = step >= 1;
  const primary = PROJECTS[0];
  const rearLeft = PROJECTS[1];
  const rearRight = PROJECTS[2];

  return (
    <IllustrationStage className="p-3 lg:p-4">
      <div
        className="relative h-full"
        style={{ perspective: "1100px" }}
      >
        <motion.div
          className="absolute top-[4%] left-0 hidden h-[70%] w-[48%] sm:block"
          animate={{
            x: settled ? pointer.x * 3 - 6 : -8,
            y: settled ? pointer.y * 2 : 4,
            rotate: -1.1,
            filter:
              focused && focused !== rearLeft.id ? "blur(2px)" : "blur(0px)",
            opacity: focused && focused !== rearLeft.id ? 0.55 : 1,
          }}
          transition={illustrationHover}
          onPointerEnter={() => setFocused(rearLeft.id)}
          onPointerLeave={() => setFocused(null)}
        >
          <BrowserChrome domain={rearLeft.domain}>
            <Image
              src={workPreviewSrc(rearLeft.src, 640)}
              alt=""
              fill
              sizes="240px"
              className="object-cover object-top"
            />
          </BrowserChrome>
          <AnimatePresence>
            {focused === rearLeft.id ? (
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="absolute -bottom-5 left-2 text-[7px] tracking-tight"
                style={{ color: illustrationColors.inkMuted }}
              >
                {rearLeft.name}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="absolute top-[2%] right-0 hidden h-[66%] w-[46%] sm:block"
          animate={{
            x: settled ? pointer.x * 2 + 8 : 8,
            y: settled ? pointer.y * 1.5 : 2,
            rotate: 1.2,
            filter:
              focused && focused !== rearRight.id ? "blur(2px)" : "blur(0px)",
            opacity: focused && focused !== rearRight.id ? 0.55 : 1,
          }}
          transition={illustrationHover}
          onPointerEnter={() => setFocused(rearRight.id)}
          onPointerLeave={() => setFocused(null)}
        >
          <BrowserChrome domain={rearRight.domain}>
            <Image
              src={workPreviewSrc(rearRight.src, 640)}
              alt=""
              fill
              sizes="240px"
              className="object-cover object-top"
            />
          </BrowserChrome>
          <AnimatePresence>
            {focused === rearRight.id ? (
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="absolute -bottom-5 right-2 text-[7px] tracking-tight"
                style={{ color: illustrationColors.inkMuted }}
              >
                {rearRight.name}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="absolute inset-x-[8%] top-[20%] bottom-[4%] z-10 sm:inset-x-[14%] sm:top-[16%]"
          animate={{
            x: settled ? pointer.x * 5 : 0,
            y: settled ? pointer.y * 4 : 8,
            filter:
              focused && focused !== primary.id ? "blur(1.5px)" : "blur(0px)",
            opacity: 1,
          }}
          transition={illustrationHover}
          onPointerEnter={() => setFocused(primary.id)}
          onPointerLeave={() => setFocused(null)}
        >
          <BrowserChrome domain={primary.domain}>
            <Image
              src={workPreviewSrc(primary.src, 960)}
              alt=""
              fill
              sizes="420px"
              className="object-cover object-top"
            />
            <AnimatePresence>
              {focused === primary.id ? (
                <motion.span
                  initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute top-[42%] left-[58%] z-10 h-3 w-3 rounded-full border"
                  style={{
                    borderColor: "rgba(255,255,255,0.9)",
                    background: "rgba(255,255,255,0.35)",
                    boxShadow: "0 2px 8px rgba(28,25,23,0.2)",
                  }}
                />
              ) : null}
            </AnimatePresence>
          </BrowserChrome>
          <AnimatePresence>
            {focused === primary.id || step >= 2 ? (
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -bottom-5 left-1 text-[7.5px] tracking-tight lg:text-[8.5px]"
                style={{ color: illustrationColors.ink }}
              >
                {primary.name} · {primary.domain}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </IllustrationStage>
  );
}
