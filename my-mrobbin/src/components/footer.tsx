"use client";

import { useState } from "react";
import { footerLines } from "@/lib/content";
import { CancellationPolicyModal } from "./cancellation-policy-modal";

export function Footer() {
  const [policyOpen, setPolicyOpen] = useState(false);

  return (
    <footer className="safe-bottom border-t border-deco bg-blush py-8 sm:py-10">
      <div className="mx-auto max-w-[1120px] px-4 text-center sm:px-6 md:px-10">
        <p className="text-sm font-semibold tracking-tight text-hof">{footerLines[0]}</p>
        <p className="mt-1 text-xs tracking-tight text-foggy">{footerLines[1]}</p>
        <p className="mt-1 text-xs tracking-tight text-foggy">{footerLines[2]}</p>
        <button
          type="button"
          onClick={() => setPolicyOpen(true)}
          className="mt-3 min-h-10 px-2 text-xs tracking-tight text-foggy underline underline-offset-2 transition-colors hover:text-hof active:text-hof"
        >
          View cancellation policy
        </button>
      </div>

      <CancellationPolicyModal open={policyOpen} onClose={() => setPolicyOpen(false)} />
    </footer>
  );
}
