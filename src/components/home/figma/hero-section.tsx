"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import { EnterpriseClientsTrust } from "@/components/home/enterprise-clients-section";
import { ChromaticImage } from "@/components/ui/chromatic-image";
import { HERO_BACKGROUND_PATH, mediaUrl } from "@/lib/cloudinary";
import { canonicalPath } from "@/lib/site";

const HERO_OVERLAY =
  "linear-gradient(180deg, rgba(247,247,244,0.76) 0%, rgba(247,247,244,0.68) 45%, rgba(247,247,244,0.78) 100%)";
const HERO_OVERLAY_MOBILE =
  "linear-gradient(180deg, rgba(247,247,244,0.64) 0%, rgba(247,247,244,0.56) 45%, rgba(247,247,244,0.66) 100%)";

export function FigmaHeroSection() {
  return (
    <section className="relative overflow-hidden bg-background px-6 pt-16 pb-16 md:pt-24 md:pb-20">
      <ChromaticImage
        src={mediaUrl(HERO_BACKGROUND_PATH)}
        alt=""
        trackParent
        backgroundColor="#f7f7f4"
        zoom={0.14}
        displacement={0.035}
        chromaticShift={0.009}
        tilt={0}
        className="pointer-events-none absolute inset-0 z-0 size-full bg-background"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] md:hidden"
        style={{ background: HERO_OVERLAY_MOBILE }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
        style={{ background: HERO_OVERLAY }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-18%] z-[2] h-[24rem] w-[24rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,100,66,0.20) 0%, rgba(201,100,66,0.08) 35%, rgba(201,100,66,0) 70%)",
        }}
        initial={{ opacity: 0.2, scale: 0.95 }}
        animate={{ opacity: [0.2, 0.38, 0.2], scale: [0.95, 1.03, 0.95] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[-8rem] left-[-8rem] z-[2] h-[18rem] w-[18rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,100,66,0.12) 0%, rgba(201,100,66,0.05) 40%, rgba(201,100,66,0) 72%)",
        }}
        initial={{ opacity: 0.16, scale: 0.98 }}
        animate={{ opacity: [0.16, 0.28, 0.16], scale: [0.98, 1.06, 0.98] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-left md:text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 1.35 }}
          className="mb-9 inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium"
          style={{ color: "var(--warm-orange)", background: "var(--warm-orange-light)" }}
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--warm-orange)" }}
          />
          Currently taking new projects
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
          className="mb-7 text-3xl leading-[1.08] font-bold tracking-tight md:text-6xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          We Run the Technology
          <br />
          Your Business{" "}
          <span className="font-bold" style={{ color: "var(--warm-orange)" }}>
            Depends On
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.82, ease: "easeOut" }}
          className="mb-10 max-w-2xl text-md leading-relaxed text-muted-foreground md:mx-auto md:text-lg"
        >
          Comlabs is an engineering and technology operations company supporting production
          applications, AI systems, cloud infrastructure and digital products from build through
          operation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.52, delay: 1.18, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-start gap-3 md:justify-center"
        >
          <a
            href={canonicalPath("/contact")}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            style={{ background: "var(--foreground)" }}
          >
            Talk to us <ArrowRight size={14} />
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
          >
            Explore our capabilities
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 1.48, ease: "easeOut" }}
        className="relative z-10 mx-auto mt-16 max-w-5xl"
        aria-label="Trusted clients"
      >
        <EnterpriseClientsTrust />
      </motion.div>
    </section>
  );
}
