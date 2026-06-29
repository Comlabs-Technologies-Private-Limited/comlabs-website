import Image from "next/image";
import { imageExists } from "@/lib/images";

interface PhotoProps {
  filename: string;
  alt: string;
  title: string;
  caption: string;
  className?: string;
  priority?: boolean;
}

export function Photo({ filename, alt, title, caption, className = "", priority }: PhotoProps) {
  if (!imageExists(filename)) {
    return (
      <div
        className={`group relative flex items-center justify-center overflow-hidden rounded-xl border border-deco bg-blush-muted ${className}`}
      >
        <div className="flex flex-col items-center gap-1 px-4 text-center">
          <span className="text-xs font-medium tracking-tight text-foggy">Add photo</span>
          <span className="text-sm font-medium tracking-tight text-hof">{title}</span>
          <span className="text-xs tracking-tight text-foggy">{caption}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`group relative overflow-hidden rounded-xl ${className}`}>
      <Image
        src={`/images/${filename}`}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-300 ease-out md:group-hover:scale-[1.02]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-100 md:opacity-0 md:transition-opacity md:duration-200 md:group-hover:opacity-100" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-3 opacity-100 md:opacity-0 md:transition-opacity md:duration-200 md:group-hover:opacity-100">
        <p className="text-sm font-medium tracking-tight text-white">{title}</p>
        <p className="text-xs tracking-tight text-white/80">{caption}</p>
      </div>
    </div>
  );
}
