"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import { DmVisual } from "@/components/digital-marketing/dm-visual";
import {
  DIGITAL_MARKETING_MOSAIC,
  type MosaicAspect,
  type MosaicTile,
} from "@/lib/digital-marketing";
import { gsapEase, registerGsap } from "@/lib/gsap-client";
import { cn } from "@/lib/utils";

const ASPECT: Record<MosaicAspect, string> = {
  square: "aspect-square",
  "four-three": "aspect-[4/3]",
  "three-two": "aspect-[3/2]",
  portrait: "aspect-[3/4]",
  feature: "aspect-[5/6] min-h-[280px] lg:min-h-[360px]",
};

export function DigitalMarketingMosaic() {
  const rootRef = useRef<HTMLDivElement>(null);
  const gsap = registerGsap();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const columns = root.querySelectorAll<HTMLElement>("[data-mosaic-col]");
      const tiles = root.querySelectorAll<HTMLElement>("[data-mosaic-tile]");

      if (reduce) {
        gsap.set([columns, tiles], { opacity: 1, y: 0, clipPath: "none", clearProps: "transform" });
        return;
      }

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(
          columns,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: gsapEase },
        );
        gsap.fromTo(
          tiles,
          { clipPath: "inset(10% 8% 10% 8%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.05, stagger: 0.035, ease: gsapEase },
        );

        const drifts = [28, -36, 22, -30];
        const tweens = Array.from(columns).map((column, index) =>
          gsap.to(column, {
            y: drifts[index] ?? 24,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.15,
            },
          }),
        );

        const onVisibility = () => {
          tweens.forEach((tween) => {
            if (document.hidden) tween.pause();
            else tween.resume();
          });
        };
        document.addEventListener("visibilitychange", onVisibility);
        return () => document.removeEventListener("visibilitychange", onVisibility);
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          tiles,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.04,
            ease: gsapEase,
            scrollTrigger: { trigger: root, start: "top 85%", once: true },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="grid h-[560px] grid-cols-2 gap-3 overflow-hidden md:h-[640px] md:grid-cols-3 lg:h-[820px] lg:grid-cols-[0.85fr_1fr_1.2fr_0.9fr] lg:gap-4"
    >
      {DIGITAL_MARKETING_MOSAIC.map((column, columnIndex) => (
        <div
          key={columnIndex}
          data-mosaic-col
          className={cn(
            "flex flex-col gap-3 lg:gap-4 motion-safe:lg:opacity-0",
            columnIndex === 0 && "pt-8 lg:pt-16",
            columnIndex === 1 && "pt-0 lg:pt-4",
            columnIndex === 2 && "hidden pt-10 md:flex lg:pt-0",
            columnIndex === 3 && "hidden lg:flex lg:pt-20",
            columnIndex === 0 && "md:pt-6",
            columnIndex === 1 && "md:pt-16",
          )}
        >
          {column.map((tile, tileIndex) => (
            <MosaicTileCard
              key={`${columnIndex}-${tileIndex}`}
              tile={tile}
              columnIndex={columnIndex}
              tileIndex={tileIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function MosaicTileCard({
  tile,
  columnIndex,
  tileIndex,
}: {
  tile: MosaicTile;
  columnIndex: number;
  tileIndex: number;
}) {
  return (
    <div data-mosaic-tile className={cn("w-full overflow-hidden motion-safe:max-lg:opacity-0", ASPECT[tile.aspect])}>
      <DmVisual
        visual={tile.visual}
        size={tile.aspect === "feature" ? "feature" : "tile"}
        priority={tile.priority}
        className="h-full w-full"
        sizes={
          tile.priority
            ? "(max-width: 768px) 50vw, 22vw"
            : "(max-width: 768px) 50vw, 20vw"
        }
      />
      <span className="sr-only">{`Campaign archive tile ${columnIndex + 1}.${tileIndex + 1}`}</span>
    </div>
  );
}
