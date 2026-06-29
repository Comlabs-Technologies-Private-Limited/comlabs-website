"use client";

import QRCode from "react-qr-code";
import { bookingPassSurprise } from "@/lib/content";

export function BookingPassQr() {
  return (
    <div className="flex flex-col items-center gap-3 border-t border-deco px-4 py-4 text-center sm:flex-row sm:items-center sm:gap-3.5 sm:px-5 sm:text-left">
      <div className="shrink-0 rounded-lg border border-rose-100 bg-white p-2">
        <QRCode
          value={bookingPassSurprise.url}
          size={80}
          level="M"
          fgColor="#222222"
          bgColor="#ffffff"
          aria-label={`QR code linking to ${bookingPassSurprise.scanPrompt}`}
        />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold tracking-tight text-hof">
          {bookingPassSurprise.scanPrompt}
        </p>
        <p className="mt-1 text-xs leading-normal tracking-tight text-foggy">
          {bookingPassSurprise.scanHint}
        </p>
      </div>
    </div>
  );
}
