"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";

import { DIGITAL_MARKETING_FAQS } from "@/lib/digital-marketing";

const EASE = [0.25, 0.1, 0, 1] as const;

export function DigitalMarketingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();
  const reduce = useReducedMotion();

  return (
    <section className="border-b border-border">
      <div className="mx-auto w-full max-w-[1380px] px-5 py-[72px] md:px-7 md:py-[120px] lg:grid lg:grid-cols-12 lg:gap-16 lg:px-12 lg:py-40 xl:px-[72px]">
        <div className="lg:col-span-4">
          <p className="mb-5 text-xs tracking-[0.18em] text-muted-foreground uppercase">FAQ</p>
          <h2
            className="max-w-[12ch] text-[clamp(1.85rem,3.2vw,3rem)] leading-[1.08] font-medium tracking-tight"
            style={{ letterSpacing: "-0.035em" }}
          >
            Direct answers.
          </h2>
        </div>

        <div className="mt-10 border-t border-border lg:col-span-8 lg:mt-0">
          {DIGITAL_MARKETING_FAQS.map((faq, index) => {
            const open = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;
            return (
              <div key={faq.question} className="border-b border-border">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2"
                  >
                    {faq.question}
                    <ChevronDown
                      size={16}
                      className={`shrink-0 text-muted-foreground transition-transform duration-[220ms] ${open ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0.2 : 0.28, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
