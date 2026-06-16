"use client";

import { motion } from "motion/react";

import { TESTIMONIALS } from "@/components/home/figma/home-data";

export function FigmaTestimonialsSection() {
  return (
    <section className="bg-[#f2f2ef] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-2xl font-medium tracking-tight text-[#1f1f1f] md:mb-12 md:text-5xl">
          The new way to build software.
        </h2>

        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.article
              key={t.author}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex min-h-[182px] flex-col border border-[#ecece8] bg-[#f5f5f2] px-4 py-4 md:min-h-[190px]"
            >
              <p className="text-[14px] leading-[1.45] text-[#2c2c2c]">&ldquo;{t.quote}&rdquo;</p>

              <div className="mt-auto flex items-center gap-2.5 pt-5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d8d8d3] text-[10px] font-semibold text-[#4a4a4a]">
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium leading-none text-[#2b2b2b]">
                    {t.author}
                  </p>
                  <p className="mt-1 truncate text-[12px] leading-none text-[#777771]">{t.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
