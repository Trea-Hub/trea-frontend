"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { EventCardSkeleton } from "@/components/LoadingSkeleton";
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

export default function Home() {
  const { notify } = useNotifications();
  const fetchErrorShown = useRef(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
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
  const totalPages = Math.max(1, Math.ceil(events.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const visibleEvents = events.slice(pageStart, pageStart + PAGE_SIZE);
  const resultStart = events.length === 0 ? 0 : pageStart + 1;
  const resultEnd = Math.min(pageStart + PAGE_SIZE, events.length);

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
                  placeholder="Search by event title or description..."
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
                className="mt-5 rounded-lg bg-[#ff5451] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#ff6a67]"
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
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {visibleEvents.map((event) => (
                  <Card
                    key={event.id}
                    title={event.title}
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
                        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.12em] text-[#a7a0a0]">
                          <span>Registered</span>
                          <span className="font-medium text-[#f3f0ee]">
                            {event.registeredCount}
                          </span>
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
    </AppShell>
  );
}
