import { cn } from "@/lib/utils";
import { mediaUrl } from "@/lib/cloudinary";

type ComlabsLogoProps = {
  className?: string;
};

export function ComlabsLogo({ className }: ComlabsLogoProps) {
  return (
    // SVG lockup is a static asset; next/image does not optimize SVG.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={mediaUrl("/logo.svg")}
      alt="Comlabs Technologies"
      width={1132}
      height={242}
      className={cn("block h-5 w-auto", className)}
      decoding="async"
    />
  );
}
