import { cn } from "@/lib/utils";
import { mediaUrl } from "@/lib/cloudinary";

type ComlabsLogoProps = {
  className?: string;
  /** Hide alt text when a parent already names the brand, e.g. a home link. */
  decorative?: boolean;
};

export function ComlabsLogo({ className, decorative = false }: ComlabsLogoProps) {
  return (
    // SVG lockup is a static asset; next/image does not optimize SVG.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={mediaUrl("/logo.svg")}
      alt={decorative ? "" : "Comlabs Technologies"}
      width={1132}
      height={242}
      className={cn("block h-5 w-auto", className)}
      decoding="async"
    />
  );
}
