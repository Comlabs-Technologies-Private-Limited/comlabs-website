import type { ReactNode } from "react";

type MarketingSectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  className?: string;
};

export function MarketingSectionHeader({
  eyebrow,
  title,
  description,
  className,
}: MarketingSectionHeaderProps) {
  return (
    <div className={className ?? "mb-12 md:mb-14"}>
      <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        {eyebrow}
      </p>
      <h2
        className="max-w-2xl text-2xl font-bold tracking-tight md:text-4xl"
        style={{ letterSpacing: "-0.03em" }}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function MarketingSectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
      {children}
    </p>
  );
}

export function MarketingOrangeHighlight({ children }: { children: ReactNode }) {
  return <span style={{ color: "var(--warm-orange)" }}>{children}</span>;
}
