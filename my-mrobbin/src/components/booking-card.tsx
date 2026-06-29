"use client";

import { useState } from "react";
import { bookingDetails, bookingStatus, bookingTotal } from "@/lib/content";
import { CancelButton } from "./cancel-button";
import { ConfirmationModal } from "./confirmation-modal";

export function BookingCard() {
  const [confirmed, setConfirmed] = useState(false);
  const [showPass, setShowPass] = useState(false);

  function handleClose() {
    setConfirmed(false);
    setShowPass(false);
  }

  return (
    <div className="rounded-xl border border-rose-100 bg-blush-surface p-5 shadow-[0_6px_16px_rgba(244,63,94,0.07)] sm:p-6">
      <div className="flex flex-col gap-2 border-b border-deco pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <h3 className="text-base font-semibold tracking-tight text-hof">Your stay</h3>
        <span className="w-fit rounded-full border border-rose-100 bg-rose-50 px-2.5 py-1 text-xs font-medium tracking-tight text-rausch">
          {bookingStatus}
        </span>
      </div>

      <dl className="divide-y divide-deco">
        {bookingDetails.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          >
            <dt className="flex items-center gap-2 text-sm tracking-tight text-foggy">
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              {label}
            </dt>
            <dd className="pl-6 text-sm font-medium tracking-tight text-hof sm:pl-0 sm:text-right">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="flex items-center justify-between border-t border-deco pt-4">
        <span className="text-base font-semibold tracking-tight text-hof">Total</span>
        <span className="text-base font-semibold tracking-tight text-rausch">{bookingTotal}</span>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setConfirmed(true)}
          className="min-h-11 w-full rounded-lg bg-rausch px-5 py-3.5 text-sm font-semibold tracking-tight text-white transition-colors hover:bg-rausch-dark active:bg-rausch-dark"
        >
          Confirm booking
        </button>
        <CancelButton />
      </div>

      <ConfirmationModal
        open={confirmed}
        showPass={showPass}
        onViewPass={() => setShowPass(true)}
        onClose={handleClose}
      />
    </div>
  );
}
