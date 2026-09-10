import type { StudioFieldVariant } from "./studio-shader-slot";

type Props = {
  variant: StudioFieldVariant;
  tone?: "light" | "dark";
  seed?: number;
};

/**
 * Full-bleed field behind a section, faded to paper at the top and bottom
 * edges so it never hard-cuts against its neighbours. CSS only.
 */
export function StudioShaderBackdrop({
  variant,
  tone = "light",
  seed = 0,
}: Props) {
  return (
    <div
      aria-hidden
      className="studio-backdrop pointer-events-none absolute inset-0 -z-20"
    >
      <span
        className={`studio-field-${variant} absolute inset-0`}
        data-tone={tone}
        style={{ animationDelay: `${seed * -1.7}s` }}
      />
    </div>
  );
}
