import type { ReactNode } from "react";

type SectionTone = "plain" | "muted";

interface SectionShellProps {
  id?: string;
  tone?: SectionTone;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}

const toneStyles: Record<SectionTone, string> = {
  plain: "bg-blush",
  muted: "bg-blush-muted",
};

export function SectionShell({
  id,
  tone = "plain",
  children,
  className = "",
  innerClassName = "",
}: SectionShellProps) {
  return (
    <section id={id} className={`scroll-mt-20 md:scroll-mt-24 ${toneStyles[tone]} ${className}`}>
      <div
        className={`mx-auto max-w-[1120px] px-4 py-10 sm:px-6 md:px-10 md:py-16 ${innerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}
