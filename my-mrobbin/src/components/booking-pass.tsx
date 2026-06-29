import { Heart } from "lucide-react";
import { bookingPassDetails, bookingPassStub } from "@/lib/content";
import { BookingPassQr } from "./booking-pass-qr";

export function BookingPass() {
  return (
    <div className="rounded-xl border border-deco bg-blush-surface">
      <div className="flex items-center justify-between border-b border-deco px-4 py-3 sm:px-5">
        <span className="text-xs font-semibold tracking-tight text-hof">Booking pass</span>
        <Heart className="h-4 w-4 shrink-0 text-rausch" fill="currentColor" fillOpacity={0.15} />
      </div>

      <div className="space-y-3 px-4 py-4 sm:px-5 sm:py-5">
        {bookingPassDetails.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
          >
            <span className="shrink-0 text-sm tracking-tight text-foggy">{label}</span>
            <span className="text-sm font-medium tracking-tight text-hof sm:max-w-[60%] sm:text-right">
              {value}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-3 border-t border-deco px-4 py-4 sm:px-5">
        {bookingPassStub.map(({ label, value }) => (
          <div key={label} className="min-w-0">
            <p className="text-[10px] font-medium tracking-tight text-foggy">{label}</p>
            <p
              className={`mt-1 text-xs font-medium tracking-tight text-hof ${
                label === "Booking ID" ? "break-all font-mono" : ""
              }`}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      <BookingPassQr />
    </div>
  );
}
