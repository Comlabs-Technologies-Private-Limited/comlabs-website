"use client";

import { motion, useReducedMotion } from "framer-motion";
import { aprilMemory, heroTagline, trustBadges } from "@/lib/content";
import { BookingCard } from "./booking-card";
import { FadeIn } from "./motion/reveal";

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-b border-deco bg-blush">
      <div className="mx-auto max-w-[1120px] px-4 pb-10 pt-6 sm:px-6 sm:pb-12 sm:pt-8 md:px-10 md:pb-16 md:pt-10">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="min-w-0"
          >
            <p className="text-sm font-medium tracking-tight text-foggy">
              Private stay · Uttam Society
            </p>
            <h1 className="mt-2 text-[1.625rem] font-semibold leading-[1.15] tracking-tighter text-hof sm:text-[2rem] md:text-[2.125rem]">
              Your stay at Uttam Airbnb
            </h1>
            <p className="mt-2 text-xs font-medium tracking-tight text-rausch sm:text-sm">
              {heroTagline}
            </p>
            <p className="mt-3 max-w-xl text-[0.9375rem] leading-normal text-foggy sm:text-base">
              A carefully hosted stay, 10 km away from home, managed with unreasonable attention by
              Prawn.
            </p>

            <ul className="mt-5 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-2">
              {trustBadges.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-sm tracking-tight text-hof"
                >
                  <Icon className="h-4 w-4 shrink-0 text-foggy" strokeWidth={1.75} />
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border border-rose-100 bg-rose-50/70 p-4 sm:mt-8 sm:max-w-xl md:p-5">
              <p className="text-xs font-semibold tracking-tight text-rausch">{aprilMemory.label}</p>
              <p className="mt-1.5 text-sm leading-normal tracking-tight text-hof">
                {aprilMemory.quote}
              </p>
            </div>
          </motion.div>

          <FadeIn delay={0.1} duration={0.45} className="min-w-0 lg:sticky lg:top-[4.5rem] xl:top-28">
            <BookingCard />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
