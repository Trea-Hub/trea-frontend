"use client";

import Link from "next/link";

export default function EventError({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#131313] px-4 text-[#e5e2e1]">
      <div className="w-full max-w-lg rounded-[24px] border border-white/10 bg-[#1b1b1b] p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#ffb3ad]">
          Event unavailable
        </span>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#f3f0ee]">
          We could not load this event
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-base leading-7 text-[#a7a0a0]">
          The event service may be temporarily unavailable. Try again or return to the event list.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-xl bg-[#ff5451] px-5 py-3 text-base font-semibold text-[#1b0b0c] transition hover:bg-[#ff6b63]"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-[#232323] px-5 py-3 text-base font-medium text-[#f3f0ee] transition hover:bg-[#2a2a2a]"
          >
            Back to events
          </Link>
        </div>
      </div>
    </main>
  );
}
