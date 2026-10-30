"use client";

import { useMemo, useRef, useState } from "react";
import { Card } from "@/components/Card";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

type EventItem = {
  title: string;
  date: string;
  tags: string[];
  price: string;
  badge?: string;
  badgeClassName?: string;
  location: string;
  description: string;
  image: string;
  capacity: string;
  progressWidthClassName: string;
  accentClassName?: string;
  priceLabel: string;
  actionLabel: string;
};

type EventFilter = {
  label: string;
  value: string;
  tags?: string[];
};

const filters: EventFilter[] = [
  { label: "All", value: "all" },
  { label: "Free", value: "free", tags: ["free"] },
  { label: "Paid (XLM/USDC)", value: "paid", tags: ["paid"] },
  { label: "This Weekend", value: "weekend", tags: ["weekend"] },
  { label: "Tech & Web3", value: "tech", tags: ["tech"] },
  { label: "Music & Arts", value: "music", tags: ["music"] },
  {
    label: "VIP & Hackathons",
    value: "vip",
    tags: ["vip", "hackathons"],
  },
];

const events: EventItem[] = [
  {
    title: "Stellar Meridian Night Afterparty",
    date: "Oct 13, 2025",
    tags: ["music", "weekend", "paid", "vip"],
    price: "25 XLM",
    badge: "VIP ACCESS",
    badgeClassName: "bg-[#ff5451]/25 text-[#ffb3ad]",
    location: "Marina Bay, Singapore",
    description:
      "A high-fidelity bass experience with international headline DJs, open ledger bar, and NFT guest credentials.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAx_i3H4XkedRxS4t3UKmMjiq8Ir7UhgCqxF9g-8ByZXz1WERh85Lk79422StBtI7cxt_Ox3Rzbk_hVQVMnoQOC4pb0-qC9HMc40Z3d3hEBzaJw1jemur83PZyh0I7SxpINdmbEqtz3F1r0FGwRTZNHpOIMv-nHpDNBh43cxrOXy8uoZLOzCO0sZuEZfT8R2sQd1RyJ_IVOEm2nblFR8xzSj-y33YjHM2eWYSCf6LcDXBQqZCGShDPg",
    capacity: "320 / 400 Registered",
    progressWidthClassName: "w-[80%]",
    accentClassName: "from-[#ff5451] to-[#ff8a80]",
    priceLabel: "Ticket Price",
    actionLabel: "Get Pass",
  },
  {
    title: "Smart Contracts with Soroban Workshop",
    date: "Nov 02, 2025",
    tags: ["tech", "free"],
    price: "Free",
    badge: "Hybrid",
    badgeClassName: "bg-white/10 text-[#e5e2e1]",
    location: "Virtual & NYC In-Person",
    description:
      "Hands-on developer masterclass: build, deploy, and audit Rust-based Soroban contracts with live testnet mentorship.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAjRBRZLRcefetia273W4srtIJXJJKsyFdzjOrH7x--dhAnJxrz205L316NzrJBsuuXdG8B6BiYmjnLkUWaWZk1-x0WKPlAj5qufksXIK9ifyqYpdce68sVBlHJc8YONKwLmVwkjMPK-c0rZbxvQzsOBnOO9WwQ7-yHpF_YqQ7tafyzmFxfDkq4ScEKboCZbjDmdI9q0D8s10WeG7S8GXbsiryU0GAK4JQSZ7cguqbPdeGKUvnEC-6j",
    capacity: "184 / 200 Registered",
    progressWidthClassName: "w-[92%]",
    accentClassName: "from-[#ffb3ad] to-[#ffb3b6]",
    priceLabel: "Admission",
    actionLabel: "Register",
  },
  {
    title: "Decentralized Beats Rooftop Rave",
    date: "Nov 18, 2025",
    tags: ["music", "weekend", "paid"],
    price: "80 USDC",
    badge: "ALMOST FULL",
    badgeClassName: "bg-[#ffb4ab] text-[#690005]",
    location: "Kreuzberg, Berlin",
    description:
      "A seamless intersection of sonic modular synths and zero-knowledge badge entry overlooking the Berlin canal.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCkXb72YVs5DXpll9LZ-Npyk69jsrh3_YHgRE7bhw7mLCwX7gD7x-C09-G6H0xSC_eoMZedEEBP9AI6nUV4u3N3c0E4FOP3pr4P1pbKtvYhpyU2cW4VIy-U4OgniTiLoX2qBvpSsF11g_ts4mmG-JsI4f1n9uLrV7k_RAOyZmlAhNc3K8NDZgq4uAGqfIwDvs6m5S-swA4SG2HTX440mCLIw_6SGI_81yxI-bFyKfVTtQLjV7P-ps70",
    capacity: "490 / 500 Registered",
    progressWidthClassName: "w-[98%]",
    accentClassName: "from-[#ffb3b6] to-[#ff5451]",
    priceLabel: "Direct XLM/USDC",
    actionLabel: "Quick Pass",
  },
];

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

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredEvents = useMemo(() => {
    const normalizedQuery = search.trim().toLowerCase();
    const selectedFilter = filters.find(
      (filter) => filter.value === activeFilter,
    );
    const selectedTags = selectedFilter?.tags ?? [];

    return events.filter((event) => {
      const matchesFilter =
        activeFilter === "all" ||
        selectedTags.some((tag) => event.tags.includes(tag));

      if (!matchesFilter) return false;
      if (!normalizedQuery) return true;

      const haystack = [
        event.title,
        event.date,
        event.description,
        event.location,
        event.price,
        event.badge ?? "",
        event.capacity,
        ...event.tags,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [activeFilter, search]);

  function clearSearch() {
    setSearch("");
    searchInputRef.current?.focus();
  }

  function resetDiscovery() {
    setSearch("");
    setActiveFilter("all");
  }

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1]">
      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-12 pt-24 sm:px-6 lg:px-8">
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
                  placeholder="Search by artist, venue, or Soroban tag..."
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
                  onClick={() => setActiveFilter(filter.value)}
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

        <section id="event-results" className="pt-4">
          <p className="sr-only" aria-live="polite">
            {filteredEvents.length} events match the current search and filters.
          </p>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-[#f3f0ee] sm:text-3xl">
                Upcoming Experiences
              </h1>
              <p className="mt-1 text-sm text-[#a7a0a0]">
                Cryptographically backed by Soroban state proofs
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

          {filteredEvents.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-[#1b1b1b] p-10 text-center text-[#a7a0a0]">
              No events match your search and filters.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredEvents.map((event) => (
                <Card
                  key={event.title}
                  imageSrc={event.image}
                  imageAlt={event.title}
                  title={event.title}
                  className="h-full bg-[#1e1d1d]"
                  metadata={
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[#d7d2cf]">
                      <span className="rounded-md bg-[#2a2a2a] px-2 py-1 text-[#f3f0ee]">
                        {event.date}
                      </span>
                      {event.badge ? (
                        <span className={['rounded-md px-2 py-1', event.badgeClassName].join(" ")}>
                          {event.badge}
                        </span>
                      ) : null}
                    </div>
                  }
                  action={
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.14em] text-[#8f8a89]">
                          {event.priceLabel}
                        </p>
                        <p className="mt-1 text-2xl font-semibold text-[#ffb3ad]">{event.price}</p>
                      </div>

                      <button
                        type="button"
                        className="rounded-lg bg-[#2a2a2a] px-4 py-2 text-sm font-medium text-[#f3f0ee] transition hover:bg-[#343434]"
                      >
                        {event.actionLabel}
                      </button>
                    </div>
                  }
                >
                  <div className="space-y-3">
                    <p className="leading-6 text-[#cfc9c8]">{event.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.12em] text-[#a7a0a0]">
                        <span>Capacity</span>
                        <span className="font-medium text-[#f3f0ee]">{event.capacity}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-[#2e2d2d]">
                        <div
                          className={[
                            "h-full rounded-full bg-gradient-to-r",
                            event.accentClassName,
                            event.progressWidthClassName,
                          ].join(" ")}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1 text-xs text-[#bcb5b3]">
                      <MapPinIcon />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
