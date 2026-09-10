import { cn } from "@/lib/utils";

/**
 * Three distinct conceptual visuals for the Why Comlabs rows.
 *
 * Each states its principle rather than decorating it, and each behaves
 * differently — the section previously repeated one browser-window card three
 * times, which read as a dashboard widget rather than an argument.
 *
 * All three are DOM and CSS. Their idle motion and their hover response live
 * in `globals.css` under `.studio-viz`, keyed off the parent `.studio-row`, so
 * title, divider, copy and visual all answer the same hover.
 */

/** Signal before channels: scattered marks converge onto one clear line. */
export function SignalConverge() {
  // Fixed scatter — deterministic so server and client agree.
  const marks = [
    { x: 8, y: 18 },
    { x: 22, y: 62 },
    { x: 31, y: 30 },
    { x: 44, y: 74 },
    { x: 52, y: 22 },
    { x: 63, y: 58 },
    { x: 71, y: 34 },
    { x: 82, y: 68 },
    { x: 90, y: 26 },
    { x: 16, y: 44 },
    { x: 37, y: 12 },
    { x: 76, y: 12 },
  ];

  return (
    <div className="studio-viz studio-viz--signal relative h-full w-full overflow-hidden">
      <span className="studio-viz__baseline absolute top-1/2 right-0 left-0 h-px" />
      {marks.map((mark, index) => (
        <span
          key={`${mark.x}-${mark.y}`}
          className="studio-viz__mark absolute block size-[3px]"
          style={
            {
              left: `${mark.x}%`,
              top: `${mark.y}%`,
              "--viz-i": index,
              "--viz-dy": `${50 - mark.y}%`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

/** Creative that earns its place: frames are judged, one becomes dominant. */
export function CreativeSelect() {
  return (
    <div className="studio-viz studio-viz--creative relative flex h-full w-full items-center justify-center gap-2 overflow-hidden">
      {[0, 1, 2, 3].map((index) => (
        <span
          key={index}
          className={cn(
            "studio-viz__frame block h-[62%] flex-1 border",
            index === 1 && "studio-viz__frame--chosen",
          )}
          style={{ "--viz-i": index } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/** Systems that compound: nodes link up and the structure keeps extending. */
export function SystemCompound() {
  const nodes = [
    { x: 14, y: 70 },
    { x: 32, y: 40 },
    { x: 50, y: 66 },
    { x: 68, y: 32 },
    { x: 86, y: 56 },
  ];

  return (
    <div className="studio-viz studio-viz--system relative h-full w-full overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {nodes.slice(0, -1).map((node, index) => {
          const next = nodes[index + 1]!;
          return (
            <line
              key={`edge-${index}`}
              className="studio-viz__edge"
              x1={node.x}
              y1={node.y}
              x2={next.x}
              y2={next.y}
              style={{ "--viz-i": index } as React.CSSProperties}
            />
          );
        })}
      </svg>
      {nodes.map((node, index) => (
        <span
          key={`node-${index}`}
          className="studio-viz__node absolute block size-[7px] border"
          style={
            {
              left: `${node.x}%`,
              top: `${node.y}%`,
              "--viz-i": index,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export const PRINCIPLE_VISUALS = [
  SignalConverge,
  CreativeSelect,
  SystemCompound,
] as const;
