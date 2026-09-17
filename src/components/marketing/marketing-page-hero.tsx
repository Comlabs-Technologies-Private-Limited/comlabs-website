"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion } from "motion/react";

import type { EditorialImage } from "@/lib/editorial-images";
import { HERO_BACKGROUND_PATH, layeredBackgroundImage } from "@/lib/cloudinary";
import {
  EDITORIAL_HERO_OVERLAY,
  EDITORIAL_HERO_OVERLAY_WARM,
  editorialHeroText,
} from "@/lib/editorial-hero-styles";

/**
 * Measured with headless Chromium against a production build: the LCP element
 * is the hero description on /case-studies and the excerpt on /blog. Chrome
 * does not count an element as contentful while it sits at opacity 0, so
 * fading these in from 0 held LCP back until hydration. The headline and
 * description therefore move without fading. The eyebrow and buttons keep the
 * fade — neither can be the LCP element.
 */
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
    editorialOverlay === "warm"
      ? EDITORIAL_HERO_OVERLAY_WARM
      : EDITORIAL_HERO_OVERLAY;
  const eyebrowMargin = compactSpacing ? "mb-3" : "mb-6";
  const titleMargin = compactSpacing ? "mt-0" : "";

  if (isEditorial && backgroundImage) {
    return (
      <section className="relative overflow-hidden border-b border-white/10 pt-12 pb-20 md:pt-16 md:pb-24">
        {/* `fill` + `sizes` so the loader delivers a width-appropriate file;
            the raw <img> shipped the full-resolution original to phones, and
            without `priority` the browser deprioritised the largest element
            on the page. */}
        <Image
          src={backgroundImage.src}
          alt={backgroundImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: overlayStyle }}
        />
        <span aria-hidden className="gutter-hatch gutter-hatch-on-dark z-[1]" />

        <div className="section-layout relative z-10 px-1 md:px-4">
          {children}

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05, ease: EASE }}
            className={`${eyebrowMargin} flex items-center gap-2 text-xs font-semibold tracking-widest uppercase`}
            style={{ color: "var(--warm-orange)" }}
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 shrink-0 border"
              style={{ borderColor: "var(--warm-orange)" }}
            />
            {eyebrow}
          </motion.div>

          <motion.h1
            initial={{ y: 14 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.45, delay: 0.06, ease: EASE }}
            className={`max-w-3xl text-3xl leading-[1.08] font-bold tracking-tight md:text-5xl lg:text-[3.25rem] ${titleMargin}`}
            style={{ color: editorialHeroText.title, letterSpacing: "-0.03em" }}
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.45, delay: 0.12, ease: EASE }}
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
      className="relative overflow-hidden border-b border-border pt-12 pb-12 md:pt-16 md:pb-16"
      style={{
        backgroundImage: layeredBackgroundImage(
          "linear-gradient(180deg, rgba(247,247,244,0.86) 0%, rgba(247,247,244,0.78) 45%, rgba(247,247,244,0.92) 100%)",
          HERO_BACKGROUND_PATH,
        ),
        backgroundSize: "cover",
        backgroundPosition: "center right",
      }}
    >
      {/* Static. This ran an infinite opacity/scale loop on every page using
          this hero, so it never stopped costing frames. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-[-12%] h-[20rem] w-[20rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,100,66,0.16) 0%, rgba(201,100,66,0.06) 40%, rgba(201,100,66,0) 72%)",
          opacity: 0.2,
        }}
      />
      <span aria-hidden className="gutter-hatch z-[1]" />

      <div className="section-layout relative px-1 md:px-4">
        {children}

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease: EASE }}
          className="mb-6 flex items-center gap-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase"
        >
          <span
            aria-hidden
            className="h-1.5 w-1.5 shrink-0 border"
            style={{ borderColor: "var(--warm-orange)" }}
          />
          <span style={{ color: "var(--warm-orange)" }}>{eyebrow}</span>
        </motion.div>

        <motion.h1
          initial={{ y: 14 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.45, delay: 0.06, ease: EASE }}
          className="max-w-3xl text-3xl leading-[1.08] font-bold tracking-tight md:text-5xl lg:text-[3.25rem]"
          style={{ letterSpacing: "-0.03em" }}
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.45, delay: 0.12, ease: EASE }}
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
