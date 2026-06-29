"use client";

import Image from "next/image";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useState } from "react";
import { GUEST_AVATAR, GUEST_NAME } from "@/lib/content";

function AirbnbMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className="h-7 w-7 shrink-0 text-rausch md:h-8 md:w-8">
      <path
        fill="currentColor"
        d="M16 28c-2.2-3.4-4.6-6.4-6.8-9.2-2.4-3-4.4-5.6-4.4-8.8 0-3.8 3.1-6.9 6.9-6.9 1.8 0 3.5.7 4.8 2 1.3-1.3 3-2 4.8-2 3.8 0 6.9 3.1 6.9 6.9 0 3.2-2 5.8-4.4 8.8-2.2 2.8-4.6 5.8-6.8 9.2z"
      />
    </svg>
  );
}

export function Navbar() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
  });

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className={`safe-top sticky top-0 z-40 border-b bg-blush/90 backdrop-blur-sm transition-shadow duration-200 ${
        scrolled ? "border-deco shadow-[0_1px_0_rgba(244,63,94,0.05)]" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-3 px-4 sm:px-6 md:h-20 md:px-10">
        <div className="flex min-w-0 items-center gap-2">
          <AirbnbMark />
          <span className="truncate text-base font-semibold tracking-tight text-hof md:text-lg">
            Uttam Airbnb
          </span>
        </div>

        <div className="flex max-w-[55%] shrink-0 items-center gap-2 rounded-full border border-rose-100 bg-rose-50/80 py-1 pl-1 pr-2.5 sm:max-w-none sm:pr-3">
          <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full md:h-8 md:w-8">
            <Image
              src={GUEST_AVATAR}
              alt={`${GUEST_NAME}'s profile photo`}
              fill
              sizes="(max-width: 768px) 28px, 32px"
              className="object-cover object-top"
              priority
            />
          </span>
          <span className="truncate text-xs font-medium tracking-tight text-hof sm:text-sm">
            <span className="sm:hidden">{GUEST_NAME} · pending</span>
            <span className="hidden sm:inline">Hi {GUEST_NAME} · booking pending</span>
          </span>
        </div>
      </div>
    </motion.header>
  );
}
