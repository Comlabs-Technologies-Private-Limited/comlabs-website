import { homeFaqs } from "@/lib/faq-data";
import { bodyText, eyebrow, sectionTitle } from "@/lib/page-styles";
import { cn } from "@/lib/utils";

export function FaqSection() {
  return (
    <section id="faq" className="bg-[var(--bg-primary)] px-4 py-24 md:px-8">
      <div className="mx-auto max-w-3xl">
        <p className={eyebrow}>FAQ</p>
        <h2 className={cn(sectionTitle, "mt-4")}>Straight answers.</h2>
        <p className={cn(bodyText, "mt-4")}>
          Common questions before we work together.
        </p>

        <div className="mt-10 divide-y divide-[var(--border)] border-t border-[var(--border)]">
          {homeFaqs.map((item) => (
            <details
              key={item.question}
              className="group border-b border-[var(--border)] py-4 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left text-[15px] font-medium text-[var(--fg-primary)]">
                <span>{item.question}</span>
                <span
                  className="mt-0.5 shrink-0 text-[var(--fg-tertiary)] transition-transform group-open:rotate-180"
                  aria-hidden
                >
                  ↓
                </span>
              </summary>
              <p className={cn(bodyText, "mt-3 text-[13px] pr-8")}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
