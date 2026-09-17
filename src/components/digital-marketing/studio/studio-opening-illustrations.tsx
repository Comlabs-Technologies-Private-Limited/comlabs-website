import { DIGITAL_MARKETING_CAPABILITIES } from "@/lib/digital-marketing";

/**
 * Two small illustrations under the opening points. Pure markup and CSS —
 * no canvas — and every label is existing page content.
 *
 * `SystemDiagram` draws the six capabilities as nodes on a line that
 * pulses along it, so "one connected system" is literal.
 *
 * `JudgmentEvidence` sets the two halves of the second point against each
 * other: the creative decisions on one side, the evidence they rest on
 * from the analytics deliverables on the other, alternating in.
 */

export function SystemDiagram() {
  return (
    <div
      aria-hidden
      className="studio-diagram mt-8 border-t border-[var(--studio-line)] pt-7"
    >
      <div className="relative">
        <span className="studio-diagram__line absolute top-[9px] right-2 left-2 h-px bg-[var(--studio-line)]" />
        <span className="studio-diagram__pulse absolute top-[9px] left-2 h-px w-10" />
        <ol className="relative flex justify-between">
          {DIGITAL_MARKETING_CAPABILITIES.map((capability, index) => (
            <li
              key={capability.id}
              className="studio-diagram__node flex w-12 flex-col items-center gap-3"
              style={{ "--studio-node": index } as React.CSSProperties}
            >
              <span className="studio-diagram__dot block size-[9px] border border-[var(--studio-ink)] bg-[var(--studio-paper)]" />
              <span className="font-mono text-[0.5625rem] tracking-widest text-[var(--studio-grey)]">
                {capability.index}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-4 text-[0.6875rem] font-medium tracking-[0.16em] text-[var(--studio-grey)] uppercase">
        Six disciplines · one brief
      </p>
    </div>
  );
}

const JUDGMENT = ["Positioning", "Creative direction", "Messaging"] as const;

export function JudgmentEvidence() {
  const evidence =
    DIGITAL_MARKETING_CAPABILITIES.find(
      (capability) => capability.id === "analytics",
    )?.deliverables.slice(0, 3) ?? [];

  return (
    <div
      aria-hidden
      className="studio-pair mt-8 grid grid-cols-2 gap-px border-t border-[var(--studio-line)] bg-[var(--studio-line)] pt-px"
    >
      {[
        { heading: "Judgment", items: JUDGMENT },
        { heading: "Evidence", items: evidence },
      ].map((column, columnIndex) => (
        <div
          key={column.heading}
          className="bg-[var(--studio-paper)] pt-6 pr-4"
        >
          <p className="text-[0.6875rem] font-medium tracking-[0.16em] text-[var(--studio-grey)] uppercase">
            {column.heading}
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {column.items.map((item, index) => (
              <li
                key={item}
                className="studio-pair__item flex items-center gap-2.5 text-[0.8125rem] text-[var(--studio-ink)]"
                style={
                  {
                    "--studio-pair-i": index * 2 + columnIndex,
                  } as React.CSSProperties
                }
              >
                <span className="studio-pair__mark block size-1 shrink-0 bg-[var(--studio-grey)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
