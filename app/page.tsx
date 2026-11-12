"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EventCardSkeleton } from "@/components/LoadingSkeleton";
import { Modal } from "@/components/Modal";
import { useNotifications } from "@/components/Notifications";
import { ApiError, getErrorMessage } from "@/lib/api-error";
import { fetchEvents, type EventItem } from "@/lib/events";

type EventFilter = {
  label: string;
  value: string;
  isFree?: boolean;
  tags?: string[];
  weekend?: boolean;
};

const PAGE_SIZE = 9;

const filters: EventFilter[] = [
  { label: "All", value: "all" },
  { label: "Free", value: "free", isFree: true },
  { label: "Paid (XLM/USDC)", value: "paid", isFree: false },
  { label: "This Weekend", value: "weekend", weekend: true },
  { label: "Tech & Web3", value: "tech", tags: ["tech"] },
  { label: "Music & Arts", value: "music", tags: ["music"] },
  {
    label: "VIP & Hackathons",
    value: "vip",
    tags: ["vip", "hackathons"],
  },
];

function getWeekendRange() {
  const now = new Date();
  const day = now.getDay();
  const start = new Date(now);

  if (day === 0) {
    start.setHours(0, 0, 0, 0);
  } else {
    start.setDate(start.getDate() + (6 - day));
    start.setHours(0, 0, 0, 0);
  }

  const end = new Date(start);

  if (day !== 0) {
    end.setDate(start.getDate() + 1);
  }

  end.setHours(23, 59, 59, 999);

  return {
    dateFrom: start.toISOString(),
    dateTo: end.toISOString(),
  };
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <circle cx="11" cy="11" r="5.5" />
      <path d="M16 16L20 20" strokeLinecap="round" />
    </svg>
  );
}

function ScanIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="4" rx="1.2" />
      <rect x="3" y="14" width="4" height="7" rx="1.2" />
      <path d="M14 10.5h7v3.5h-7M10 14h-7v7h7M14 14h3.5v7H14M20 17.5v3.5" strokeLinecap="round" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path d="M12 21s6-5.5 6-11a6 6 0 1 0-12 0c0 5.5 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`h-4 w-4 ${direction === "previous" ? "rotate-180" : ""}`}
    >
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SpotlightCard({ event }: { event: EventItem }) {
  const filled =
    event.registeredCount !== null && event.capacity && event.capacity > 0
      ? Math.min(
          100,
          Math.round((event.registeredCount / event.capacity) * 1000) / 10,
        )
      : null;

  return (
    <section className="pt-2 pb-6" aria-labelledby="spotlight-heading">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ffb3ad]">
            Spotlight
          </span>
          <span className="h-1 w-1 rounded-full bg-[#ff5451]" />
        </div>
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#a7a0a0]">
          Verified On-Chain
        </span>
      </div>

      <Link
        href={`/events/${encodeURIComponent(event.id)}`}
        className="group block overflow-hidden rounded-2xl border border-white/10 bg-[#1b1b1b] shadow-[0_18px_40px_rgba(0,0,0,0.45)] transition hover:border-[#ff5451]/30"
      >
        <div className="relative h-56 w-full overflow-hidden sm:h-64">
          {event.image ? (
            <Image
              src={event.image}
              alt={event.title}
              fill
              priority
              unoptimized
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#2a1414] via-[#1b1b1b] to-[#131313]" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b1b] via-[#1b1b1b]/30 to-transparent" />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3">
            <span
              className={[
                "rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] backdrop-blur-md",
                event.badgeClassName ?? "bg-white/10 text-[#e5e2e1]",
              ].join(" ")}
            >
              {event.badge ?? "Featured"}
            </span>
            <span className="rounded-md bg-[#131313]/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#ffb3ad] backdrop-blur-md">
              On-Chain Pass
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-3">
            <span className="inline-flex min-w-0 items-center gap-1.5 rounded-full bg-[#131313]/85 px-2.5 py-1 text-[10px] font-medium text-[#e5e2e1] backdrop-blur-md">
              <span className="material-symbols-outlined text-[14px] text-[#ff5451]">
                location_on
              </span>
              <span className="truncate">{event.location}</span>
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em]">
              <span className="rounded bg-[#ff5451]/20 px-2 py-1 text-[#ffb3ad]">
                {event.date}
              </span>
              <span className="text-[#a7a0a0]">{event.price}</span>
            </div>
            {filled !== null ? (
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#ffb3ad]">
                {filled}% Claimed
              </span>
            ) : null}
          </div>

          <h2
            id="spotlight-heading"
            className="mt-2 text-xl font-semibold leading-tight tracking-tight text-[#f3f0ee] transition group-hover:text-[#ffb3ad] sm:text-2xl"
          >
            {event.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#a7a0a0]">
            {event.description}
          </p>

          {filled !== null &&
          event.registeredCount !== null &&
          event.capacity ? (
            <div className="mt-4 space-y-1.5">
              <div className="h-1 overflow-hidden rounded-full bg-[#353534]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#ff5451] to-[#ffb3b6]"
                  style={{ width: `${filled}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.12em] text-[#a7a0a0]">
                <span>
                  {event.registeredCount.toLocaleString("en-US")} /{" "}
                  {event.capacity.toLocaleString("en-US")} Attendees
                </span>
                <span className="text-[#e5e2e1]">On Stellar</span>
              </div>
            </div>
          ) : null}

          <div className="mt-4 flex flex-col gap-3 rounded-xl bg-[#201f1f] p-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#a7a0a0]">
                Access Pass
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-semibold tracking-tight text-[#f3f0ee]">
                  {event.price}
                </span>
                <span className="text-[11px] text-[#a7a0a0]">
                  secured by Soroban
                </span>
              </div>
            </div>

            <span className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ff5451] px-4 py-2.5 text-sm font-semibold text-[#1b0b0c] shadow-[0_0_20px_-4px_rgba(255,84,81,0.5)] transition group-hover:bg-[#e64a47]">
              {event.actionLabel}
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}

export default function Home() {
  const { notify } = useNotifications();
  const fetchErrorShown = useRef(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    async function loadEvents() {
      setIsLoading(true);
      setError(null);

      if (new URLSearchParams(window.location.search).get("demo") === "fetch_error") {
        throw new ApiError(
          "The event service is unavailable. Please retry in a moment.",
        );
      }

      const selectedFilter =
        filters.find((filter) => filter.value === activeFilter) ?? filters[0];
      const weekend = selectedFilter.weekend ? getWeekendRange() : undefined;
      const results = await fetchEvents(
        {
          q: debouncedSearch || undefined,
          isFree: selectedFilter.isFree,
          tags: selectedFilter.tags,
          dateFrom: weekend?.dateFrom,
          dateTo: weekend?.dateTo,
        },
        controller.signal,
      );

      if (!active) return;

      setEvents(results);
      fetchErrorShown.current = false;
    }

    void loadEvents()
      .catch((loadError: unknown) => {
        if (!active) return;

        const message = getErrorMessage(
          loadError,
          "The event service is unavailable. Please retry in a moment.",
        );

        setEvents([]);
        setError(message);

        if (!fetchErrorShown.current) {
          fetchErrorShown.current = true;
          notify({
            tone: "error",
            title: "Could not load events",
            message,
          });
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [activeFilter, debouncedSearch, notify, reloadKey]);

  const hasActiveDiscovery = search.trim().length > 0 || activeFilter !== "all";
  const spotlightEvent =
    !isLoading && !error && !hasActiveDiscovery && events.length > 0
      ? events[0]
      : null;
  const listEvents = spotlightEvent ? events.slice(1) : events;
  const totalPages = Math.max(1, Math.ceil(listEvents.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const visibleEvents = listEvents.slice(pageStart, pageStart + PAGE_SIZE);
  const listOffset = spotlightEvent ? 1 : 0;
  const resultStart =
    listEvents.length === 0 ? 0 : listOffset + pageStart + 1;
  const resultEnd = Math.min(
    listOffset + pageStart + PAGE_SIZE,
    events.length,
  );

  function clearSearch() {
    setSearch("");
    setPage(1);
    searchInputRef.current?.focus();
  }

  function resetDiscovery() {
    setSearch("");
    setActiveFilter("all");
    setPage(1);
  }

  function retryEvents() {
    setPage(1);
    setReloadKey((key) => key + 1);
  }

  function changePage(nextPage: number) {
    setPage(Math.min(Math.max(1, nextPage), totalPages));
  }

  return (
    <AppShell active="discover" showFooter>
      <div className="flex w-full flex-1 flex-col pt-4">
        <section className="w-full pb-6 pt-2">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 overflow-hidden rounded-xl border border-white/10 bg-[#1d1d1d] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all focus-within:shadow-[0_0_0_1px_rgba(255,84,81,0.4),0_0_24px_rgba(255,84,81,0.15)]">
              <div className="flex items-center gap-2 px-4 py-3 text-[#a7a0a0]">
                <SearchIcon />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  aria-label="Search events"
                  aria-controls="event-results"
                  enterKeyHint="search"
                  placeholder="Search events or cities..."
                  className="min-w-0 flex-1 bg-transparent text-sm text-[#e5e2e1] placeholder:text-[#8f8a89] outline-none"
                />
                {search ? (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={clearSearch}
                    className="rounded-full p-1 text-[#a7a0a0] transition hover:text-[#e5e2e1]"
                  >
                    ×
                  </button>
                ) : null}
              </div>
            </div>

            <button
              type="button"
              aria-label="Quick scan"
              onClick={() => setIsScannerOpen(true)}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#1f1f1f] text-[#ffb3ad] shadow-[0_10px_20px_rgba(0,0,0,0.22)] transition hover:bg-[#2a2a2a]"
            >
              <ScanIcon />
            </button>
          </div>
        </section>

        <section className="pb-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {filters.map((filter) => {
              const active = filter.value === activeFilter;

              return (
                <button
                  key={filter.value}
                  type="button"
                  aria-pressed={active}
                  aria-controls="event-results"
                  onClick={() => {
                    setActiveFilter(filter.value);
                    setPage(1);
                  }}
                  className={[
                    "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.12em] transition",
                    active
                      ? "bg-[#ff5451]/20 text-[#ffd6d1] shadow-[0_0_16px_rgba(255,84,81,0.2)]"
                      : "bg-[#242424] text-[#a7a0a0] hover:bg-[#2c2c2c]",
                  ].join(" ")}
                >
                  {active ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ffb3ad]" />
                  ) : null}
                  {filter.label}
                </button>
              );
            })}
          </div>
        </section>

        {spotlightEvent ? <SpotlightCard event={spotlightEvent} /> : null}

        <section id="event-results" className="pt-4" aria-busy={isLoading}>
          <p className="sr-only" aria-live="polite">
            {isLoading && events.length === 0
              ? "Loading events."
              : `${events.length} events match the current search and filters.`}
          </p>

          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-[#f3f0ee] sm:text-3xl">
                Upcoming Experiences
              </h1>
              <p className="mt-1 text-sm text-[#a7a0a0]">
                {isLoading && events.length > 0
                  ? "Updating results..."
                  : events.length > 0
                    ? `${resultStart}-${resultEnd} of ${events.length} events`
                    : "Cryptographically backed by Soroban state proofs"}
              </p>
            </div>

            <button
              type="button"
              onClick={resetDiscovery}
              className="inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[#ffb3ad] transition hover:text-[#ffd6d1]"
            >
              View All
              <ChevronIcon />
            </button>
          </div>

          {error ? (
            <div
              role="alert"
              className="rounded-2xl border border-[#93000a] bg-[#231314] p-8 text-center"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#ffb4ab]">
                Could not load events
              </p>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#ffdad6]">
                {error}
              </p>
              <button
                type="button"
                onClick={retryEvents}
                className="mt-5 rounded-lg bg-[#ff5451] px-4 py-2 text-sm font-semibold text-[#1b0b0c] transition hover:bg-[#ff6a67]"
              >
                Try again
              </button>
            </div>
          ) : isLoading && events.length === 0 ? (
            <div
              className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
              aria-label="Loading events"
            >
              {Array.from({ length: 6 }, (_, index) => (
                <EventCardSkeleton key={index} />
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-[#1b1b1b] p-10 text-center text-[#a7a0a0]">
              <p className="text-sm">
                {hasActiveDiscovery
                  ? "No events match your search and filters."
                  : "No events are live yet. Check back soon."}
              </p>
              <button
                type="button"
                onClick={hasActiveDiscovery ? resetDiscovery : retryEvents}
                className="mt-4 rounded-lg bg-[#2a2a2a] px-4 py-2 text-sm font-medium text-[#f3f0ee] transition hover:bg-[#343434]"
              >
                {hasActiveDiscovery ? "Clear filters" : "Refresh"}
              </button>
            </div>
          ) : listEvents.length === 0 ? null : (
            <>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {visibleEvents.map((event) => (
                  <Card
                    key={event.id}
                    title={event.title}
                    imageSrc={event.image}
                    imageAlt={event.title}
                    className="h-full bg-[#1e1d1d]"
                    metadata={
                      <div className="flex flex-wrap items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[#d7d2cf]">
                        <span className="rounded-md bg-[#2a2a2a] px-2 py-1 text-[#f3f0ee]">
                          {event.date}
                        </span>
                        {event.badge ? (
                          <span
                            className={[
                              "rounded-md px-2 py-1",
                              event.badgeClassName,
                            ].join(" ")}
                          >
                            {event.badge}
                          </span>
                        ) : null}
                      </div>
                    }
                    action={
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.14em] text-[#8f8a89]">
                            Price
                          </p>
                          <p className="mt-1 text-2xl font-semibold text-[#ffb3ad]">
                            {event.price}
                          </p>
                        </div>

                        <Link
                          href={`/events/${encodeURIComponent(event.id)}`}
                          className="rounded-lg bg-[#2a2a2a] px-4 py-2 text-sm font-medium text-[#f3f0ee] transition hover:bg-[#343434]"
                        >
                          {event.actionLabel}
                        </Link>
                      </div>
                    }
                  >
                    <div className="space-y-3">
                      <p className="leading-6 text-[#cfc9c8]">{event.description}</p>

                      {event.registeredCount !== null ? (
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.12em] text-[#a7a0a0]">
                            <span>Capacity</span>
                            <span className="font-medium text-[#f3f0ee]">
                              {event.registeredCount.toLocaleString("en-US")}
                              {event.capacity
                                ? ` / ${event.capacity.toLocaleString("en-US")}`
                                : ""}{" "}
                              Registered
                            </span>
                          </div>
                          {event.capacity && event.capacity > 0 ? (
                            <div className="h-1 overflow-hidden rounded-full bg-[#353534]">
                              <div
                                className="h-full rounded-full bg-[#ff5451]"
                                style={{
                                  width: `${Math.min(
                                    100,
                                    Math.round(
                                      (event.registeredCount / event.capacity) *
                                        100,
                                    ),
                                  )}%`,
                                }}
                              />
                            </div>
                          ) : null}
                        </div>
                      ) : null}

                      <div className="flex items-center gap-1.5 pt-1 text-xs text-[#bcb5b3]">
                        <MapPinIcon />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {totalPages > 1 ? (
                <nav
                  aria-label="Event results pagination"
                  className="mt-8 flex flex-col items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#1b1b1b] px-4 py-3 sm:flex-row"
                >
                  <p className="text-xs uppercase tracking-[0.12em] text-[#a7a0a0]">
                    Page {currentPage} of {totalPages}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => changePage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-[#242424] px-3 py-2 text-xs font-medium text-[#f3f0ee] transition hover:bg-[#2f2f2f] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ArrowIcon direction="previous" />
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={() => changePage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-[#242424] px-3 py-2 text-xs font-medium text-[#f3f0ee] transition hover:bg-[#2f2f2f] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                      <ArrowIcon direction="next" />
                    </button>
                  </div>
                </nav>
              ) : null}
            </>
          )}
        </section>
      </div>

      <Modal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        title="Ticket Validator"
        description="Point your camera at a Stellar dynamic pass to verify entry credentials on-chain."
      >
        <div className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-[#0e0e0e] p-6">
          <span className="absolute inset-x-4 top-4 h-0.5 animate-bounce bg-[#ff5451] shadow-[0_0_8px_#ff5451]" />
          <span className="material-symbols-outlined text-[72px] text-[#909192]">
            center_focus_weak
          </span>
          <span className="mt-2 text-xs uppercase tracking-[0.14em] text-[#a7a0a0]">
            Awaiting QR stream...
          </span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#ffb3ad]">
            Demo mode
          </span>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Button
            variant="secondary"
            fullWidth
            onClick={() => setIsScannerOpen(false)}
          >
            Cancel scan
          </Button>
          <Button
            fullWidth
            onClick={() => {
              setIsScannerOpen(false);
              notify({
                tone: "success",
                title: "Pass verified",
                message:
                  "Dynamic QR credential validated against Stellar state.",
              });
            }}
          >
            Simulate scan
          </Button>
        </div>
      </Modal>
    </AppShell>
  );
}
