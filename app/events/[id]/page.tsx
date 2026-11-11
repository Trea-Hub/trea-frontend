import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { EventTabs } from "@/components/EventTabs";
import { fetchEventById } from "@/lib/events";

function IconButton({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2a2a2a]/80 text-[#e5e2e1] backdrop-blur-md transition hover:bg-[#343434]"
    >
      {children}
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#a7a0a0]">
      {children}
    </span>
  );
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await fetchEventById(id);

  if (!event) {
    notFound();
  }

  const checkoutHref = `/events/${event.id}/checkout`;
  const galleryHref = `/events/${event.id}/gallery`;

  return (
    <AppShell
      active="discover"
      title="Event Detail"
      backHref="/"
      backLabel="Go back to home"
      maxWidth="6xl"
    >
      <div className="w-full">
        <section className="overflow-hidden rounded-[28px] border border-white/10 bg-[#1b1b1b] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
          <div className="relative h-[280px] sm:h-[350px] md:h-[420px]">
            {event.coverImage ? (
              <Image
                src={event.coverImage}
                alt={event.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1152px"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,84,81,0.32),transparent_45%),linear-gradient(135deg,#2a2a2a_0%,#1b1b1b_55%,#131313_100%)]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/40 to-transparent" />
            <div className="absolute inset-x-4 top-4 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#232323]/80 px-3 py-1.5 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-[#ff5451] shadow-[0_0_12px_rgba(255,84,81,0.9)]" />
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#f3f0ee]">
                  {event.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <IconButton label="Share event">↗</IconButton>
                <IconButton label="Bookmark event">★</IconButton>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-4 sm:p-5 lg:grid-cols-[1.5fr_0.9fr] lg:p-6">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[#d7d2cf]">
                <span className="rounded-md bg-[#2a2a2a] px-2 py-1.5 text-[#f3f0ee]">{event.date}</span>
                <span className="rounded-md bg-[#ff5451]/20 px-2 py-1.5 text-[#ffb3ad]">
                  {event.subtitle}
                </span>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl font-semibold tracking-tight text-[#f3f0ee] sm:text-4xl">
                  {event.title}
                </h2>
                <p className="max-w-2xl text-base leading-7 text-[#d7d2cf]">
                  {event.description}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-[#1f1f1f] p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2a2a2a] text-[#ffb3ad]">
                      📅
                    </div>
                    <div className="min-w-0">
                      <SectionLabel>Date & Schedule</SectionLabel>
                      <p className="mt-1 text-sm font-medium text-[#f3f0ee]">{event.date}</p>
                    </div>
                  </div>
                  {event.schedule ? (
                    <p className="text-sm text-[#a7a0a0]">{event.schedule}</p>
                  ) : null}
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#1f1f1f] p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2a2a2a] text-[#ffb3ad]">
                      📍
                    </div>
                    <div className="min-w-0">
                      <SectionLabel>Venue & Format</SectionLabel>
                      <p className="mt-1 truncate text-sm font-medium text-[#f3f0ee]">
                        {event.location}
                      </p>
                    </div>
                  </div>
                  {event.format ? (
                    <p className="text-sm text-[#a7a0a0]">{event.format}</p>
                  ) : null}
                </div>
              </div>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-white/10 bg-[#1f1f1f] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2a2a2a] text-[#ffb3ad]">
                      🎫
                    </div>
                    <div>
                      <SectionLabel>Tier Pass</SectionLabel>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-2xl font-semibold text-[#f3f0ee]">{event.price}</span>
                        {event.currency ? (
                          <span className="text-sm text-[#a7a0a0]">{event.currency}</span>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <span className="rounded-full border border-white/10 bg-[#2a2a2a] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-[#ffb3ad]">
                    {event.badge}
                  </span>
                </div>
              </div>

              {event.seats ? (
                <div className="rounded-2xl border border-white/10 bg-[#1f1f1f] p-4">
                  <div className="mb-3 flex items-center justify-between text-sm text-[#e5e2e1]">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5451]" />
                      <span>Spots Claimed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[#ffb3ad]">{event.seats}</span>
                    </div>
                  </div>

                  {event.filled !== null ? (
                    <div className="h-2.5 overflow-hidden rounded-full bg-[#2f2f2f]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#ff5451] to-[#ffb3ad]"
                        style={{ width: `${Math.max(0, Math.min(100, event.filled))}%` }}
                      />
                    </div>
                  ) : null}

                  <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.12em] text-[#a7a0a0]">
                    <span className="inline-flex items-center gap-1 text-[#ffb3ad]">
                      {event.filled !== null && event.filled >= 80
                        ? "Filling Fast"
                        : "Registration Open"}
                    </span>
                    {event.filled !== null ? <span>{event.filled}% Filled</span> : null}
                  </div>
                </div>
              ) : null}

              <div className="space-y-3 rounded-2xl border border-white/10 bg-[#1f1f1f] p-4">
                <Link
                  href={checkoutHref}
                  className="flex w-full items-center justify-center rounded-xl bg-[#ff5451] px-4 py-3 text-center text-base font-semibold text-[#1b0b0c] transition hover:bg-[#ff6b63]"
                >
                  Register Now
                </Link>
                {event.galleryCount > 0 ? (
                  <Link
                    href={galleryHref}
                    className="flex w-full items-center justify-center rounded-xl border border-white/10 bg-[#232323] px-4 py-3 text-base font-medium text-[#f3f0ee] transition hover:bg-[#2a2a2a]"
                  >
                    View Gallery ({event.galleryCount})
                  </Link>
                ) : null}
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-6 rounded-[24px] border border-white/10 bg-[#1b1b1b] p-4 sm:p-5 lg:p-6">
          <EventTabs event={event} galleryHref={galleryHref} />
        </section>
      </div>
    </AppShell>
  );
}
