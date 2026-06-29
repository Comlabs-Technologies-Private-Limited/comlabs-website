"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const dodgeOffsets = [
  { x: -14, y: -3 },
  { x: 16, y: 4 },
];

export function CancelButton() {
  const [dodgeIndex, setDodgeIndex] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [showMessage, setShowMessage] = useState(false);

  function handleHover() {
    if (dodgeIndex < dodgeOffsets.length) {
      setOffset(dodgeOffsets[dodgeIndex]);
      setDodgeIndex((index) => index + 1);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.button
        type="button"
        onMouseEnter={handleHover}
        onClick={() => setShowMessage(true)}
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="min-h-11 w-full rounded-lg border border-hof bg-blush-surface px-5 py-3.5 text-sm font-semibold tracking-tight text-hof transition-colors hover:bg-blush-muted active:bg-blush-muted"
      >
        Cancel booking
      </motion.button>
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="w-full rounded-lg border border-deco bg-blush-muted px-4 py-3 text-center"
          >
            <p className="text-sm font-medium tracking-tight text-hof">
              Cancellation unavailable. Host has emotionally prepared for this booking.
            </p>
            <p className="mt-1 text-xs tracking-tight text-foggy">
              You may appeal directly to Prawn, but success rate is currently 0%.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
