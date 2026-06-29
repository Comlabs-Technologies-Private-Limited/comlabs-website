import { Reveal } from "./reveal";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className = "mb-6",
  align = "left",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <Reveal className={`${alignClass} ${className}`} duration={0.5}>
      {eyebrow && (
        <p className="text-sm font-medium tracking-tight text-foggy">{eyebrow}</p>
      )}
      <h2
        className={`${eyebrow ? "mt-1" : ""} text-[1.25rem] font-semibold leading-snug tracking-tighter text-hof sm:text-[1.375rem] md:text-[1.625rem]`}
      >
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-2 max-w-lg text-sm leading-normal tracking-tight text-foggy md:text-base">
          {description}
        </p>
      )}
    </Reveal>
  );
}
