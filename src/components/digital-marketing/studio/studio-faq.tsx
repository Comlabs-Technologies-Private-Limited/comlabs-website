"use client";

import { useId, useState } from "react";

import { DIGITAL_MARKETING_FAQS } from "@/lib/digital-marketing";
import { DIGITAL_STUDIO_SECTIONS } from "@/lib/digital-marketing-studio";
import { cn } from "@/lib/utils";

/**
 * FAQ accordion. Built from buttons with `aria-expanded`/`aria-controls`, so
 * Tab reaches every question and Enter or Space toggles it; the panel content
 * is always in the DOM for crawlers and is hidden with the `hidden` attribute
 * rather than being removed.
 */
export function StudioFaq() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id={DIGITAL_STUDIO_SECTIONS.faq}
      aria-labelledby="studio-faq-heading"
      className="scroll-mt-16 border-b border-[var(--studio-line)] bg-[var(--studio-white)] py-20 md:scroll-mt-20 md:py-28"
    >
      <div className="studio-shell grid gap-12 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:gap-20">
        <div>
          <p className="studio-eyebrow">Questions</p>
          <h2
            id="studio-faq-heading"
            className="studio-display mt-5 text-[clamp(1.75rem,3vw,2.5rem)]"
          >
            What people ask before we start.
          </h2>
        </div>

        <div>
          {DIGITAL_MARKETING_FAQS.map((faq, index) => {
            const open = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;

            return (
              <div key={faq.question} className="border-t border-[var(--studio-line)] last:border-b">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="text-[1.0625rem] font-medium tracking-tight md:text-[1.125rem]">
                      {faq.question}
                    </span>
                    <span
                      aria-hidden
                      className="relative mt-2 block size-3 shrink-0 text-[var(--studio-blue)]"
                    >
                      <span className="absolute top-1/2 left-0 h-px w-full bg-current" />
                      <span
                        className={cn(
                          "absolute top-1/2 left-0 h-px w-full bg-current transition-transform duration-400",
                          open ? "rotate-0" : "rotate-90",
                        )}
                      />
                    </span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}>
                  <p className="max-w-2xl pb-7 text-[0.9375rem] leading-[1.75] text-[#4a4e51]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
