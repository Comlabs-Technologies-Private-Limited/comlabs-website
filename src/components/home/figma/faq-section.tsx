"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { BlurReveal, BLUR_REVEAL_NORMAL_SPEED } from "@/components/blur-reveal";
import {
  AFTER_TITLE_BODY_DELAY,
  RevealCopy,
  RevealStagger,
  RevealStaggerItem,
  useAfterTitleReveal,
} from "@/components/home/figma/after-title-reveal";
import { HOME_FAQS } from "@/lib/home-faqs";
import { cn } from "@/lib/utils";

const EASE = [0.25, 0.1, 0, 1] as const;

/**
 * Hairline plus/minus. The vertical stroke collapses when the row opens, so
 * the control resolves to a single rule rather than spinning a chevron.
 */
function ToggleGlyph({ open }: { open: boolean }) {
  return (
    <span aria-hidden className="relative mt-1 block size-3 shrink-0">
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-foreground/50" />
      <motion.span
        className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 origin-center bg-foreground/50"
        initial={false}
        animate={{ scaleY: open ? 0 : 1 }}
        transition={{ duration: 0.26, ease: EASE }}
      />
    </span>
  );
}

export function FigmaFaqSection() {
  const { revealed, onTitleComplete } = useAfterTitleReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative border-b border-border py-14 md:py-16">
      <span aria-hidden className="gutter-hatch" />
      <div className="section-layout">
        <div className="mb-12 max-w-2xl px-1 md:px-4 md:mb-16">
          <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            FAQ
          </p>
          <BlurReveal
            as="h2"
            inView
            speedReveal={BLUR_REVEAL_NORMAL_SPEED}
            onAnimationComplete={onTitleComplete}
            className="text-2xl font-bold tracking-tight md:text-4xl"
            style={{ letterSpacing: "-0.03em" }}
            segments={[
              { text: "What teams ask" },
              { text: "before", style: { color: "var(--warm-orange)" } },
              { text: "we start." },
            ]}
          />
          <RevealCopy
            revealed={revealed}
            className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            A few things that come up in most first conversations.
          </RevealCopy>
        </div>
      </div>

      <RevealStagger revealed={revealed} delay={AFTER_TITLE_BODY_DELAY} className="w-full">
        <div className="hatch-aligned-frame border-y border-border px-1 md:px-4 py-1">
          <div className="section-layout">
            <div className="flat-frame">
              {HOME_FAQS.map((faq, index) => {
                const open = openIndex === index;
                const panelId = `faq-panel-${index}`;
                const buttonId = `faq-trigger-${index}`;

                return (
                  <RevealStaggerItem
                    key={faq.question}
                    className={cn(index > 0 && "border-t border-border")}
                  >
                    <h3>
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={() => setOpenIndex(open ? null : index)}
                        className="flex w-full cursor-pointer items-start justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-secondary/40 focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:outline-none lg:px-8 lg:py-6"
                      >
                        <span className="text-[15px] leading-snug font-medium tracking-tight md:text-base">
                          {faq.question}
                        </span>
                        <ToggleGlyph open={open} />
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {open ? (
                        <motion.div
                          key={panelId}
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[68ch] px-6 pb-6 text-sm leading-relaxed text-muted-foreground lg:px-8 lg:pb-7 lg:text-[15px]">
                            {faq.answer}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </RevealStaggerItem>
                );
              })}
            </div>
          </div>
        </div>
      </RevealStagger>
    </section>
  );
}
