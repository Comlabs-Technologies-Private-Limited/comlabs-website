import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  if (variant === "ghost") {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white/60 px-5 py-2 text-[13px] font-normal tracking-tight text-neutral-700  backdrop-blur-sm transition-all duration-150 hover:border-neutral-300 hover:bg-white active:scale-[0.97] dark:border-zinc-600/70 dark:bg-white/[0.08] dark:text-zinc-100 dark:shadow-none dark:backdrop-blur-sm dark:hover:border-zinc-500 dark:hover:bg-white/[0.14] dark:hover:text-white",
          className,
        )}
        {...props}
      />
    );
  }

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-gradient-to-b from-neutral-800 to-neutral-950 px-5 py-2 text-[13px] font-normal tracking-tight text-white shadow-[0px_3.5px_1px_0px_var(--color-neutral-700)_inset,0px_1px_4px_0px_var(--color-neutral-900)] transition-all duration-150 [text-shadow:0_1px_2px_rgba(0,0,0,0.4)] hover:from-neutral-700 hover:to-neutral-900 hover:shadow-[0px_3.5px_3px_0px_var(--color-neutral-600)_inset,0px_1px_6px_0px_var(--color-neutral-900)] active:scale-[0.97] disabled:opacity-50",
        /* Dark mode: light surface so the control reads clearly on dark chrome */
        "dark:from-zinc-100 dark:to-zinc-200 dark:text-zinc-950 dark:[text-shadow:none]",
        "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_1px_2px_rgba(0,0,0,0.18)]",
        "dark:hover:from-white dark:hover:to-zinc-100 dark:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_8px_rgba(0,0,0,0.2)]",
        className,
      )}
      {...props}
    />
  );
}
