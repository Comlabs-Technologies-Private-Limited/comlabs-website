import { cn } from "@/lib/utils";

export const navPrimaryCtaClass = cn(
  "group inline-flex items-center gap-3 rounded-full border border-gray-400/20 py-1 pl-5 pr-1.5",
  "text-[13px] font-medium tracking-tight text-black",
  "bg-gray-100/80 shadow-[0_3px_4px_rgba(37,99,235,0.38)]",
  "transition-[background-color,box-shadow,transform] duration-150",
  "active:scale-[0.98]",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600/60",
);

export const navPrimaryCtaIconClass =
  "flex size-8 shrink-0 items-center justify-center rounded-full bg-white transition-transform duration-150 group-hover:translate-x-0.5";
