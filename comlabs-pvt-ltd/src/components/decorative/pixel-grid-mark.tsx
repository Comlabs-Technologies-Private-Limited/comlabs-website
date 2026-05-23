import { cn } from "@/lib/utils";

export type PixelGridMarkProps = {
  className?: string;
  /** `footer` = mark on dark footer bar; `light` = page sections */
  surface?: "light" | "footer";
};

const ROWS = 8;
const COLS = 4;

/**
 * Small violet / neutral checker — same algorithm as the original footer mark,
 * reusable for section headers and premium accents.
 */
export function PixelGridMark({ className, surface = "light" }: PixelGridMarkProps) {
  const cells: boolean[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      cells.push((r + c * 2) % 3 !== 0);
    }
  }

  const isFooterSurface = surface === "footer";

  return (
    <div
      className={cn("grid w-[4.25rem] shrink-0 grid-cols-4 gap-px opacity-[0.88]", className)}
      aria-hidden
    >
      {cells.map((on, i) => (
        <div
          key={i}
          className={cn(
            "aspect-square rounded-[1px]",
            on
              ? isFooterSurface
                ? "bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.35)]"
                : "bg-violet-600/95 shadow-[0_0_14px_rgba(124,58,237,0.24)]"
              : isFooterSurface
                ? "bg-zinc-100/[0.12]"
                : "bg-neutral-300/50",
          )}
        />
      ))}
    </div>
  );
}
