type FigmaSectionHeaderProps = {
  eyebrow: string;
  title: string;
  titleClassName?: string;
};

export function FigmaSectionHeader({ eyebrow, title, titleClassName }: FigmaSectionHeaderProps) {
  return (
    <div className="mb-12">
      <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        {eyebrow}
      </p>
      <h2
        className={`text-2xl font-bold tracking-tight md:text-4xl ${titleClassName ?? "max-w-lg"}`}
        style={{ letterSpacing: "-0.03em" }}
      >
        {title}
      </h2>
    </div>
  );
}
