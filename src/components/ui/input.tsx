import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-xl bg-white px-4 py-2.5 text-[14px] font-normal text-neutral-900 shadow-md shadow-black/[0.06] outline-none ring-1 ring-black/10 transition-all duration-150 placeholder:text-neutral-400 focus:shadow-lg focus:shadow-black/10 focus:ring-2 focus:ring-black/20",
        className,
      )}
      {...props}
    />
  );
}
