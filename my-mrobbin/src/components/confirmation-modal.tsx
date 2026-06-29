"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart, X } from "lucide-react";
import { bookingIdReminder, bookingPassStub } from "@/lib/content";
import { BookingPass } from "./booking-pass";
import { HeartPour } from "./heart-pour";

interface ConfirmationModalProps {
  open: boolean;
  showPass: boolean;
  onViewPass: () => void;
  onClose: () => void;
}

const contentVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35 },
  },
};

export function ConfirmationModal({ open, showPass, onViewPass, onClose }: ConfirmationModalProps) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const bookingId = bookingPassStub.find(({ label }) => label === "Booking ID")?.value ?? "";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) setShowReminder(false);
  }, [open]);

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

  function handleDone() {
    setShowReminder(true);
  }

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.99 }}
            transition={
              reduceMotion
                ? { duration: 0.15 }
                : { type: "spring", stiffness: 380, damping: 32 }
            }
            className="relative flex max-h-[min(92dvh,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-2rem))] w-full max-w-md flex-col overflow-hidden rounded-xl border border-deco bg-blush-surface shadow-[0_6px_16px_rgba(244,63,94,0.07)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full text-foggy transition-colors hover:bg-rose-50 hover:text-hof"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-5 pt-12 sm:px-8 sm:pb-8">
              <AnimatePresence mode="wait" initial={false}>
                {showReminder ? (
                  <motion.div
                    key="reminder"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-center"
                  >
                    <motion.div
                      initial={reduceMotion ? false : { scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={
                        reduceMotion
                          ? { duration: 0.15 }
                          : { type: "spring", stiffness: 400, damping: 22 }
                      }
                      className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-50"
                    >
                      <Heart
                        className="h-5 w-5 text-rausch"
                        strokeWidth={2}
                        fill="currentColor"
                        fillOpacity={0.12}
                      />
                    </motion.div>
                    <h3 className="text-[1.25rem] font-semibold tracking-tighter text-hof sm:text-[1.375rem]">
                      {bookingIdReminder.title}
                    </h3>
                    <div className="mt-3 space-y-2">
                      {bookingIdReminder.lines.map((line) => (
                        <p key={line} className="text-sm leading-normal tracking-tight text-foggy">
                          {line}
                        </p>
                      ))}
                    </div>
                    <p className="mt-4 break-all rounded-lg border border-rose-100 bg-rose-50 px-4 py-3 font-mono text-sm font-semibold tracking-tight text-rausch">
                      {bookingId}
                    </p>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-6 min-h-11 w-full rounded-lg bg-rausch px-5 py-3 text-sm font-semibold tracking-tight text-white transition-colors hover:bg-rausch-dark active:bg-rausch-dark"
                    >
                      {bookingIdReminder.cta}
                    </button>
                  </motion.div>
                ) : !showPass ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative flex flex-col items-center text-center"
                  >
                    <HeartPour active />

                    <motion.div
                      className="relative z-[1] mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={
                        reduceMotion
                          ? { duration: 0.15 }
                          : { type: "spring", stiffness: 420, damping: 24, delay: 0.05 }
                      }
                    >
                      <Heart
                        className="h-6 w-6 text-rausch"
                        strokeWidth={2}
                        fill="currentColor"
                        fillOpacity={0.12}
                      />
                    </motion.div>

                    <motion.div
                      variants={contentVariants}
                      initial="hidden"
                      animate="show"
                      className="relative z-[1] flex flex-col items-center"
                    >
                      <motion.h3
                        variants={itemVariants}
                        className="text-[1.25rem] font-semibold tracking-tighter text-hof sm:text-[1.375rem]"
                      >
                        Booking confirmed.
                      </motion.h3>
                      <motion.p
                        variants={itemVariants}
                        className="mt-3 text-sm leading-normal tracking-tight text-foggy"
                      >
                        Your stay at Uttam Airbnb, hosted by Prawn, has been reserved.
                      </motion.p>
                      <motion.p
                        variants={itemVariants}
                        className="mt-2 text-sm leading-normal tracking-tight text-foggy"
                      >
                        Check-in instructions will be shared personally by the host.
                      </motion.p>
                      <motion.button
                        variants={itemVariants}
                        type="button"
                        onClick={onViewPass}
                        className="mt-6 min-h-11 w-full rounded-lg bg-rausch px-6 py-3 text-sm font-semibold tracking-tight text-white transition-colors hover:bg-rausch-dark active:bg-rausch-dark sm:w-auto"
                      >
                        View booking pass
                      </motion.button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="pass"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="mb-4 text-center text-[1.25rem] font-semibold tracking-tighter text-hof sm:text-[1.375rem]">
                      Booking confirmed.
                    </h3>
                    <BookingPass />
                    <button
                      type="button"
                      onClick={handleDone}
                      className="mt-5 min-h-11 w-full rounded-lg border border-hof px-5 py-3 text-sm font-semibold tracking-tight text-hof transition-colors hover:bg-blush-muted active:bg-blush-muted"
                    >
                      Done
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
