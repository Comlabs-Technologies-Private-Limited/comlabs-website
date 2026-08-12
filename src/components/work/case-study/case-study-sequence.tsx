import { ArrowRight } from "lucide-react";

type CaseStudySequenceProps = {
  steps: string[];
};

/**
 * Ordered journey steps. Reads as a horizontal run on desktop and a numbered
 * vertical list on small screens, so it never becomes a scrolling flowchart.
 */
export function CaseStudySequence({ steps }: CaseStudySequenceProps) {
  return (
    <ol className="mt-8 flex flex-col gap-3 border-t border-border pt-8 md:flex-row md:flex-wrap md:items-center md:gap-2">
      {steps.map((step, index) => (
        <li key={step} className="flex items-center gap-3 md:gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-foreground">
            <span className="text-xs text-muted-foreground tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            {step}
          </span>
          {index < steps.length - 1 ? (
            <ArrowRight
              size={14}
              aria-hidden="true"
              className="shrink-0 rotate-90 text-muted-foreground md:rotate-0"
            />
          ) : null}
        </li>
      ))}
    </ol>
  );
}
