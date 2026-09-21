"use client";

import { useId, useState } from "react";

import { cn } from "@/lib/utils";

type FaqItem = { question: string; answer: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (items.length === 0) return null;

  return (
    <section aria-label="Frequently asked questions" className="faq-section py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-2xl font-semibold tracking-tight md:text-3xl">
          Frequently asked questions
        </h2>

        <div>
          {items.map((item, index) => {
            const open = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-btn-${index}`;

            return (
              <div
                key={item.question}
                data-open={open}
                className="faq-item border-t border-border last:border-b"
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="faq-item__trigger flex w-full items-start justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-[1.0625rem] font-medium tracking-tight">
                      {item.question}
                    </span>
                    <span
                      aria-hidden
                      className="relative mt-2 block size-3 shrink-0 text-muted-foreground"
                    >
                      <span className="absolute top-1/2 left-0 h-px w-full bg-current" />
                      <span
                        className={cn(
                          "absolute top-1/2 left-0 h-px w-full bg-current transition-transform duration-300",
                          open ? "rotate-0" : "rotate-90",
                        )}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="faq-item__panel"
                >
                  <div>
                    <p className="max-w-2xl pb-6 text-[0.9375rem] leading-[1.75] text-muted-foreground">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
