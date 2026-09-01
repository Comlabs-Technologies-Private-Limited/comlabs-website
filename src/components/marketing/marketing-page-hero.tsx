"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

import type { EditorialImage } from "@/lib/editorial-images";
import { HERO_BACKGROUND_PATH, layeredBackgroundImage, mediaUrl } from "@/lib/cloudinary";
import {
  EDITORIAL_HERO_OVERLAY,
  EDITORIAL_HERO_OVERLAY_WARM,
  editorialHeroText,
} from "@/lib/editorial-hero-styles";

const EASE = [0.25, 0.1, 0, 1] as const;

type MarketingPageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
  action?: ReactNode;
  backgroundImage?: EditorialImage;
  /** Use a lighter wash when editorial photos are warm / high-key (service detail pages). */
  editorialOverlay?: "default" | "warm";
  compactSpacing?: boolean;
  proofItems?: string[];
};

export function MarketingPageHero({
  eyebrow,
  title,
  description,
  children,
  action,
  backgroundImage,
  editorialOverlay = "default",
  compactSpacing = false,
  proofItems,
}: MarketingPageHeroProps) {
  const isEditorial = Boolean(backgroundImage);
  const overlayStyle =
    editorialOverlay === "warm" ? EDITORIAL_HERO_OVERLAY_WARM : EDITORIAL_HERO_OVERLAY;
  const eyebrowMargin = compactSpacing ? "mb-3" : "mb-6";
  const titleMargin = compactSpacing ? "mt-0" : "";

  if (isEditorial && backgroundImage) {
    return (
      <section className="relative overflow-hidden px-6 pt-12 pb-20 md:pt-16 md:pb-24">
        <img
          src={mediaUrl(backgroundImage.src)}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: overlayStyle }}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          {children}

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05, ease: EASE }}
            className={`${eyebrowMargin} inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium`}
            style={{
              color: "var(--warm-orange)",
              background: "rgba(247,247,244,0.08)",
              borderColor: "rgba(247,247,244,0.14)",
            }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--warm-orange)" }}
            />
            {eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
            className={`max-w-3xl text-3xl leading-[1.08] font-bold tracking-tight md:text-5xl lg:text-[3.25rem] ${titleMargin}`}
            style={{ color: editorialHeroText.title, letterSpacing: "-0.03em" }}
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
            className={`max-w-2xl space-y-4 text-base leading-[1.7] md:text-lg ${compactSpacing ? "mt-4" : "mt-5 md:mt-6"}`}
            style={{ color: editorialHeroText.description }}
          >
            {description}
          </motion.div>

          {action ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.22, ease: EASE }}
              className={compactSpacing ? "mt-5" : "mt-6"}
            >
              {action}
            </motion.div>
          ) : null}

          {proofItems && proofItems.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.24, ease: EASE }}
              className={`${compactSpacing ? "mt-5" : "mt-6"} flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-0`}
            >
              {proofItems.map((item, index) => (
                <div key={item} className="flex items-center sm:contents">
                  {index > 0 ? (
                    <span
                      className="mx-4 hidden h-3 w-px shrink-0 bg-white/25 sm:inline-block"
                      aria-hidden
                    />
                  ) : null}
                  <span
                    className="font-sans text-[11px] font-light uppercase tracking-[0.16em]"
                    style={{ color: "rgba(247,247,244,0.5)" }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative overflow-hidden px-6 pt-12 pb-12 md:pt-16 md:pb-16"
      style={{
        backgroundImage: layeredBackgroundImage(
          "linear-gradient(180deg, rgba(247,247,244,0.86) 0%, rgba(247,247,244,0.78) 45%, rgba(247,247,244,0.92) 100%)",
          HERO_BACKGROUND_PATH,
        ),
        backgroundSize: "cover",
        backgroundPosition: "center right",
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-[-12%] h-[20rem] w-[20rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,100,66,0.16) 0%, rgba(201,100,66,0.06) 40%, rgba(201,100,66,0) 72%)",
        }}
        initial={{ opacity: 0.15, scale: 0.96 }}
        animate={{ opacity: [0.15, 0.28, 0.15], scale: [0.96, 1.02, 0.96] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-6xl">
        {children}

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease: EASE }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium"
          style={{ color: "var(--warm-orange)", background: "var(--warm-orange-light)" }}
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--warm-orange)" }}
          />
          {eyebrow}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          className="max-w-3xl text-3xl leading-[1.08] font-bold tracking-tight md:text-5xl lg:text-[3.25rem]"
          style={{ letterSpacing: "-0.03em" }}
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
          className="mt-5 max-w-2xl space-y-4 text-base leading-[1.7] text-muted-foreground md:mt-6 md:text-lg"
        >
          {description}
        </motion.div>

        {action ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.22, ease: EASE }}
            className="mt-8"
          >
            {action}
          </motion.div>
        ) : null}

        {proofItems && proofItems.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24, ease: EASE }}
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-0"
          >
            {proofItems.map((item, index) => (
              <div key={item} className="flex items-center sm:contents">
                {index > 0 ? (
                  <span
                    className="mx-4 hidden h-3 w-px shrink-0 bg-foreground/15 sm:inline-block"
                    aria-hidden
                  />
                ) : null}
                <span className="font-sans text-[11px] font-light uppercase tracking-[0.16em] text-muted-foreground">
                  {item}
                </span>
              </div>
            ))}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
