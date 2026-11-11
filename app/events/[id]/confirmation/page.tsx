import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { fetchEventById } from "@/lib/events";

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await fetchEventById(id);

  if (!event) {
    notFound();
  }

  const seat = event.id === "meridian-2025" ? "A12 · Upper Hall" : "General Admission";
  const ticket = "1x General Pass";
  const hash = "#4928103";

  return (
    <AppShell
      active="tickets"
      title="Registration Confirmed"
      maxWidth="4xl"
      showBottomNav={false}
    >
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#1b1b1b] px-4 pb-6 pt-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:px-6">
          <div className="pointer-events-none absolute -top-14 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[#ff5451]/15 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="relative mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#2a2a2a] shadow-[0_0_30px_rgba(255,84,81,0.25)]">
              <div className="absolute inset-0 rounded-full bg-[#ff5451]/15 blur-xl" />
              <span className="material-symbols-outlined material-symbols-filled relative text-[34px] text-[#ffb3ad]">
                check_circle
              </span>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#1f1f1f] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#ffb3ad]">
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#ff5451]" />
              Cryptographic Proof Minted
            </span>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#f3f0ee] sm:text-4xl">
              You are going to {event.title}!
            </h1>

            <p className="mt-3 max-w-md text-sm text-[#d7d2cf]">
              Transaction confirmed on Stellar ledger <span className="font-medium text-[#ffb3ad]">{hash}</span>
            </p>
          </div>

          <div className="relative z-10 mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#1f1f1f]">
            <div className="relative h-32 w-full overflow-hidden bg-[#2a2a2a]">
              {event.coverImage ? (
                <Image
                  src={event.coverImage}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 896px"
                  className="object-cover opacity-40"
                />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,84,81,0.3),transparent_60%),linear-gradient(135deg,#2a2a2a,#131313)]" />
              )}
            </div>

            <div className="grid gap-4 p-4 sm:grid-cols-[1.2fr_0.8fr] sm:p-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#a7a0a0]">
                      Event
                    </p>
                    <h2 className="mt-1 text-xl font-semibold text-[#f3f0ee]">{event.title}</h2>
                  </div>
                  <span className="rounded-full bg-[#2a2a2a] px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[#ffb3ad]">
                    Live Access
                  </span>
                </div>

                <div className="space-y-2 rounded-xl border border-white/10 bg-[#181818] p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#d7d2cf]">Date</span>
                    <span className="text-sm font-medium text-[#f3f0ee]">{event.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#d7d2cf]">Venue</span>
                    <span className="text-right text-sm font-medium text-[#f3f0ee]">{event.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#d7d2cf]">Seat</span>
                    <span className="text-sm font-medium text-[#f3f0ee]">{seat}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#d7d2cf]">Ticket</span>
                    <span className="text-sm font-medium text-[#f3f0ee]">{ticket}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#181818] p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2a2a2a] text-[#ffb3ad]">
                    <span className="material-symbols-outlined text-[20px]">currency_exchange</span>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-[#f3f0ee]">Self-Refund Eligible</h3>
                    <span className="rounded bg-[#2a2a2a] px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.16em] text-[#ffb3ad]">
                      Smart Contract
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[#d7d2cf]">
                  You can initiate a 100% automated refund via your wallet until
                  <span className="font-medium text-[#f3f0ee]"> Oct 12, 2025, 09:00 AM</span>.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-6 space-y-3">
            <Link
              href="/dashboard/user"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#ff5451] text-base font-semibold text-[#fff] shadow-[0_0_24px_rgba(255,84,81,0.35)] transition hover:bg-[#ff6c67]"
            >
              <span className="material-symbols-outlined text-[20px]">confirmation_number</span>
              <span>View My Registrations</span>
            </Link>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1f1f1f] text-sm font-medium text-[#f3f0ee] shadow-sm transition hover:bg-[#2a2a2a]"
              >
                <span className="material-symbols-outlined text-[18px] text-[#ffb3ad]">event</span>
                <span>Add to Calendar</span>
              </button>

              <button
                type="button"
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1f1f1f] text-sm font-medium text-[#f3f0ee] shadow-sm transition hover:bg-[#2a2a2a]"
              >
                <span className="material-symbols-outlined text-[18px] text-[#ffb3ad]">share</span>
                <span>Share Ticket</span>
              </button>
            </div>

            <div className="flex justify-center pt-2">
              <a
                href="https://stellar.expert"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#ffb3ad] transition hover:text-[#ffdad7]"
              >
                <span>View on StellarExpert</span>
                <span className="material-symbols-outlined text-[14px]">north_east</span>
              </a>
            </div>
          </div>
        </div>
    </AppShell>
  );
}
