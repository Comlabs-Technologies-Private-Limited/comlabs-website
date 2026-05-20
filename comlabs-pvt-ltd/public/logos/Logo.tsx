type ComlabsLogoProps = {
  className?: string;
  /** Total width in px; height scales with viewBox 720×180 (ratio 4:1). */
  width?: number;
  /** Foreground for mark + wordmark (`currentColor` on SVG). */
  color?: string;
  /** Kept for API compatibility with the previous logo; unused in this mark. */
  accentColor?: string;
  /** Accessible name */
  label?: string;
};

/**
 * ComLabs wordmark + geometric mark (720×180 viewBox).
 * Uses `currentColor` so `color` / parent `text-*` controls fill.
 */
export default function ComlabsLogo({
  className = "",
  width = 280,
  color = "currentColor",
  accentColor: _accentColor,
  label = "ComLabs",
}: ComlabsLogoProps) {
  const height = Math.round(width * (180 / 720));

  return (
    <svg
      viewBox="0 0 720 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      role="img"
      aria-label={label}
      className={className}
      style={{ color, display: "block" }}
    >
      <g transform="translate(20,28)">
        <path
          d="M18 102L92 12C96 7 103 4 110 4H164C170 4 173 12 169 17L92 102C88 107 81 110 74 110H23C17 110 14 106 18 102Z"
          fill="currentColor"
        />
        <path
          d="M132 40L202 102C206 106 203 114 197 114H114C108 114 105 106 109 102L167 44C171 39 127 35 132 40Z"
          fill="currentColor"
        />
      </g>

      <text
        x="250"
        y="92"
        fill="currentColor"
        fontSize="72"
        fontWeight="500"
        fontFamily="Inter, system-ui, sans-serif"
        letterSpacing="-2"
      >
        comlabs
      </text>

      <text
        x="255"
        y="135"
        fill="currentColor"
        fontSize="26"
        fontWeight="400"
        fontFamily="Inter, system-ui, sans-serif"
        letterSpacing="10"
      >
        technologies
      </text>
    </svg>
  );
}
