import type { TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "min-h-[120px] w-full resize-y rounded-xl bg-white px-4 py-2.5 text-[14px] font-normal text-neutral-900 shadow-md shadow-black/[0.06] outline-none ring-1 ring-black/10 transition-all duration-150 placeholder:text-neutral-400 focus:shadow-lg focus:shadow-black/10 focus:ring-2 focus:ring-black/20 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-600 dark:ring-white/10 dark:focus:ring-white/20 dark:focus:shadow-black/20",
        className,
      )}
      {...props}
    />
  );
}
