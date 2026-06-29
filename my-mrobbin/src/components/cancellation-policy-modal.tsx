"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cancellationPolicy } from "@/lib/content";

interface CancellationPolicyModalProps {
  open: boolean;
  onClose: () => void;
}

export function CancellationPolicyModal({ open, onClose }: CancellationPolicyModalProps) {
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:items-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="relative max-h-[min(85dvh,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-2rem))] w-full max-w-sm overflow-y-auto overscroll-contain rounded-xl border border-deco bg-blush-surface p-5 shadow-[0_6px_16px_rgba(244,63,94,0.07)] sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-foggy transition-colors hover:bg-neutral-100 hover:text-hof"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="pr-8 text-lg font-semibold tracking-tight text-hof">
              {cancellationPolicy.title}
            </h3>
            <div className="mt-3 space-y-2">
              <p className="text-sm leading-normal tracking-tight text-foggy">
                {cancellationPolicy.lines[0]}
              </p>
              <p className="text-xs font-medium tracking-tight text-hof">
                {cancellationPolicy.lines[1]}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
