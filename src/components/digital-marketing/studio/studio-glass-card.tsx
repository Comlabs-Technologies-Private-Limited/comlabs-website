import { cn } from "@/lib/utils";

/**
 * Glass UI illustration layered over a shader slot.
 *
 * A small window — chrome dots, title, a short list of rows — rendered in
 * frosted glass and anchored to the bottom-right so it bleeds past the frame,
 * leaving the shader visible in the top-left. Rows carry real page content
 * (process stages, capability names, engagement models) so nothing on screen
 * is invented.
 *
 * Micro-interactions live in `globals.css` under `.studio-glass`: rows stagger
 * in on reveal, an "active" highlight walks the rows on a slow loop, and the
 * whole card lifts with a light sweep when its slot is hovered. All of it is
 * still under reduced motion.
 */

export type StudioGlassRow = {
  label: string;
  /** Optional trailing detail, e.g. an index or state word. */
  meta?: string;
};

type Props = {
  title: string;
  rows: readonly StudioGlassRow[];
  tone?: "light" | "dark";
  /** Renders the rows as a numbered option list instead of a log. */
  numbered?: boolean;
  className?: string;
};

export function StudioGlassCard({
  title,
  rows,
  tone = "light",
  numbered = false,
  className,
}: Props) {
  return (
    <div
      aria-hidden
      data-tone={tone}
      className={cn(
        "studio-glass pointer-events-none absolute top-[18%] left-[14%] flex w-[104%] flex-col",
        className,
      )}
      style={{ "--studio-glass-rows": rows.length } as React.CSSProperties}
    >
      <div className="studio-glass__chrome flex items-center gap-1.5 px-3 py-2.5">
        <span className="studio-glass__dot" />
        <span className="studio-glass__dot" />
        <span className="studio-glass__dot" />
      </div>

      <div className="px-3.5 pt-3 pb-4">
        <p className="studio-glass__title text-[0.8125rem] font-medium tracking-tight">
          {title}
        </p>

        <ul className="mt-3 flex flex-col gap-1">
          {rows.map((row, index) => (
            <li
              key={row.label}
              className="studio-glass__row flex items-center gap-2.5 px-2 py-1.5 text-[0.75rem] leading-tight"
              style={{ "--studio-glass-i": index } as React.CSSProperties}
            >
              {numbered ? (
                <span className="studio-glass__num flex size-4 shrink-0 items-center justify-center border font-mono text-[0.5625rem]">
                  {index + 1}
                </span>
              ) : (
                <span className="studio-glass__tick block size-1 shrink-0" />
              )}
              <span className="studio-glass__label truncate">{row.label}</span>
              {row.meta ? (
                <span className="studio-glass__meta ml-auto shrink-0 font-mono text-[0.5625rem] tracking-widest">
                  {row.meta}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
