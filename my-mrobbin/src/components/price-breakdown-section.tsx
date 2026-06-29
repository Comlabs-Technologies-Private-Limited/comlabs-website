import { priceBreakdown, priceTotal } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem } from "./motion/reveal";
import { SectionHeader } from "./motion/section-header";
import { SectionShell } from "./motion/section-shell";

export function PriceBreakdownSection() {
  return (
    <SectionShell id="pricing" tone="muted" innerClassName="pb-16 md:pb-20">
      <div className="mx-auto max-w-lg">
        <SectionHeader eyebrow="Price breakdown" title="A completely fair price" className="mb-5" />

        <Reveal duration={0.45}>
          <div className="rounded-xl border border-deco bg-blush-surface p-5 sm:p-6 md:p-7">
            <RevealGroup className="space-y-3.5" stagger={0.05} delayChildren={0.08}>
              {priceBreakdown.map(({ label, value }) => (
                <RevealItem key={label}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6 text-sm tracking-tight">
                    <span className="text-foggy underline decoration-deco underline-offset-4">
                      {label}
                    </span>
                    <span className="font-medium text-hof sm:text-right">{value}</span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <div className="mt-5 flex flex-col gap-1 border-t border-deco pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <span className="text-base font-semibold tracking-tight text-hof">
                {priceTotal.label}
              </span>
              <span className="text-base font-semibold tracking-tight text-hof sm:text-right">
                {priceTotal.value}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
