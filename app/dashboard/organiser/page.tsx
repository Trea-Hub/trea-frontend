"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button, buttonClassName } from "@/components/Button";

type PayoutState = "idle" | "querying" | "ready";

type Stat = {
  label: string;
  value: string;
  suffix: string;
  detail: string;
  icon: string;
  accent?: "primary" | "muted";
  progressClassName?: string;
  progressLabel?: string;
};

type LiveEvent = {
  kind: "live";
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  statusLabel: string;
  protocolLabel: string;
  claimed: number;
  total: number;
  percentClassName: string;
  percentLabel: string;
  remaining: number;
};

type DraftEvent = {
  kind: "draft";
  title: string;
  description: string;
  date: string;
  capacity: number;
  updatedAt: string;
  image: string;
};

type BottomNavItem = {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
  featured?: boolean;
};

const stats: Stat[] = [
  {
    label: "Total Revenue",
    value: "42,500",
    suffix: "XLM",
    detail: "≈ $16,150.00 USD",
    icon: "account_balance_wallet",
    accent: "primary",
  },
  {
    label: "Tickets Sold",
    value: "785",
    suffix: "/ 1,000",
    detail: "",
    icon: "confirmation_number",
    accent: "primary",
    progressClassName: "w-[78.5%]",
    progressLabel: "78.5%",
  },
  {
    label: "Check-In Rate",
    value: "62%",
    suffix: "active",
    detail: "487 of 785 scanned",
    icon: "how_to_reg",
    accent: "primary",
  },
  {
    label: "Escrow Locked",
    value: "8,200",
    suffix: "XLM",
    detail: "Smart Contract Hold",
    icon: "lock",
    accent: "muted",
  },
];

const liveEvent: LiveEvent = {
  kind: "live",
  title: "Meridian Global Builders Summit 2025",
  description:
    "Official Stellar ecosystem developer assembly and protocol showcase.",
  date: "Oct 24–26, 2025",
  location: "San Francisco, CA",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBrYkxkwgXOcpYmMwQ9or-ChzfhpeCVTAA34R7dpj9gg7Sg31OwJ7CILyqJi3H-2g8hH-HKYipITlCnL4h0kif0KSIey2JHXTt8tljX6ehEFZhReJDXUfFB3py33Bo4YLS8sZSpcYrwcSdS5jHlUlknnO3NM0xThdga7S2Q9_yjzdfuJ0h0mb2ka8yIIAPwupOB0Op2a4TEcZlj1TpojrEEGXziRfCf7t-hWelNkKzSkL08eaJnR6sJ",
  statusLabel: "LIVE PASS ACTIVE",
  protocolLabel: "Soroban v21",
  claimed: 785,
  total: 1000,
  percentClassName: "w-[78.5%]",
  percentLabel: "78.5%",
  remaining: 215,
};

const draftEvent: DraftEvent = {
  kind: "draft",
  title: "Soroban DeFi Hack Night",
  description:
    "Hands-on smart contract audit sprint and cross-chain liquidity workshop.",
  date: "Nov 14, 2025",
  capacity: 150,
  updatedAt: "Modified 2h ago",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDl_DfmCrmk68q-X52vPEpVL_-52kK1vAo8-q1rLXRQpWwtv1QiLE0h9lENEptVpdIx98LRcAApLnJ17VcsEE8dpiBterHPcsoQ9wl9PFXBpKm1Gvj3iNAPRCgwgRTCqg6UX_KuJ2kwV3NYwuo2xmdSThfZRblM-8H3bMSYjCAUCpM2pItfQa4G0k8_2mfLbwSOtpKasS2brHlsUq5ktuiPJW1UplGISWJfnw_UyYHPQc4pw4YOzGS9",
};

const bottomNavItems: BottomNavItem[] = [
  { icon: "explore", label: "Discover", href: "/" },
  {
    icon: "confirmation_number",
    label: "Tickets",
    href: "/dashboard/user",
  },
  { icon: "add", label: "Create", href: "/events/create", featured: true },
  {
    icon: "insights",
    label: "Manage",
    href: "/dashboard/organiser",
    active: true,
  },
  {
    icon: "photo_library",
    label: "Gallery",
    href: "/events/meridian-2025/gallery",
  },
];

function StatCard({ stat }: { stat: Stat }) {
  const accentClass =
    stat.accent === "muted" ? "text-[#8f8a89]" : "text-[#ffb3ad]";

  return (
    <div className="relative flex flex-col overflow-hidden rounded-xl bg-[#1f1f1f] p-4 shadow-md">
      <div className="mb-1 flex items-center justify-between gap-2 text-[#a7a0a0]">
        <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#d7d2cf]">
          {stat.label}
        </span>
        <span
          className={["material-symbols-outlined text-[18px]", accentClass].join(
            " ",
          )}
        >
          {stat.icon}
        </span>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-semibold text-[#f3f0ee]">
          {stat.value}
        </span>
        <span
          className={[
            "text-[11px]",
            stat.accent === "muted"
              ? "text-[#a7a0a0]"
              : "font-bold text-[#ffb3ad]",
          ].join(" ")}
        >
          {stat.suffix}
        </span>
      </div>

      {stat.progressClassName ? (
        <div className="mt-1 flex items-center gap-1.5">
          <div className="h-1 w-full overflow-hidden rounded-full bg-[#353534]">
            <div
              className={[
                "h-full rounded-full bg-[#ff5451]",
                stat.progressClassName,
              ].join(" ")}
            />
          </div>
          <span className="text-[10px] text-[#d7d2cf]">
            {stat.progressLabel}
          </span>
        </div>
      ) : (
        <span className="mt-0.5 text-[11px] text-[#a7a0a0]">
          {stat.detail}
        </span>
      )}
    </div>
  );
}

function LiveEventCard({ event }: { event: LiveEvent }) {
  const [controlsOpen, setControlsOpen] = useState(false);
  const [payoutState, setPayoutState] = useState<PayoutState>("idle");

  const handlePayout = () => {
    if (payoutState !== "idle") return;

    setPayoutState("querying");
    window.setTimeout(() => setPayoutState("ready"), 1000);
    window.setTimeout(() => setPayoutState("idle"), 3200);
  };

  const payoutIcon =
    payoutState === "querying"
      ? "refresh"
      : payoutState === "ready"
        ? "check_circle"
        : "payments";

  const payoutLabel =
    payoutState === "querying"
      ? "Querying..."
      : payoutState === "ready"
        ? "Escrow Ready"
        : "Release Payout";

  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-[#1f1f1f] shadow-xl">
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f1f] via-[#1f1f1f]/60 to-transparent" />

        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-1.5">
          <span className="flex items-center gap-1.5 rounded-full bg-[#0e0e0e]/90 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#ffb3ad] shadow-md backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#ff5451]" />
            {event.statusLabel}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-[#0e0e0e]/90 px-2 py-1 text-[10px] text-[#d7d2cf] shadow-md backdrop-blur-md">
            <span className="material-symbols-outlined text-[13px] text-[#ffb3ad]">
              verified_user
            </span>
            {event.protocolLabel}
          </span>
        </div>

        <div className="absolute right-4 bottom-2 left-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#ffb3ad]">
              calendar_today
            </span>
            <span className="text-[11px] text-[#f3f0ee]">{event.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#ffb3ad]">
              pin_drop
            </span>
            <span className="text-[11px] text-[#f3f0ee]">{event.location}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold leading-tight text-[#f3f0ee]">
            {event.title}
          </h3>
          <p className="line-clamp-1 text-[13px] text-[#cfc9c8]">
            {event.description}
          </p>
        </div>

        <div className="flex flex-col gap-1.5 rounded-lg bg-[#171717] p-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#a7a0a0]">
              Ticket Allocation Capacity
            </span>
            <span className="text-[11px] font-semibold text-[#f3f0ee]">
              {event.claimed} / {event.total} Claimed
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#353534]">
            <div
              className={[
                "h-full rounded-full bg-gradient-to-r from-[#cc003c] via-[#ff5451] to-[#ffb3ad] shadow-[0_0_12px_rgba(255,84,81,0.5)]",
                event.percentClassName,
              ].join(" ")}
            />
          </div>
          <div className="flex items-center justify-between gap-2 text-[11px] text-[#a7a0a0]">
            <span>{event.remaining} Tier Passes Remaining</span>
            <span className="font-medium text-[#ffb3ad]">
              {event.percentLabel} Filled
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <Button
            fullWidth
            className="col-span-2"
            aria-label="Scan and check in attendees"
          >
            <span className="material-symbols-outlined text-[20px]">
              qr_code_scanner
            </span>
            Scan &amp; Check-In
          </Button>

          <Button
            variant="secondary"
            fullWidth
            aria-label="View attendees"
          >
            <span className="material-symbols-outlined text-[18px] text-[#ffb3ad]">
              group
            </span>
            Guests ({event.claimed})
          </Button>

          <Button
            variant="secondary"
            fullWidth
            onClick={handlePayout}
            disabled={payoutState === "querying"}
            aria-label="Release payout"
          >
            <span
              className={[
                "material-symbols-outlined text-[18px] text-[#ffb3ad]",
                payoutState === "querying" ? "animate-spin" : "",
              ].join(" ")}
            >
              {payoutIcon}
            </span>
            {payoutLabel}
          </Button>
        </div>

        <div className="relative pt-1">
          <Button
            variant="subtle"
            fullWidth
            onClick={() => setControlsOpen((isOpen) => !isOpen)}
            aria-expanded={controlsOpen}
            aria-controls="contract-controls"
            className="justify-between"
          >
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">
                tune
              </span>
              Smart Contract Controls
            </span>
            <span
              className={[
                "material-symbols-outlined text-[18px] transition-transform duration-200",
                controlsOpen ? "rotate-180" : "",
              ].join(" ")}
            >
              expand_more
            </span>
          </Button>

          <div
            id="contract-controls"
            className={
              controlsOpen
                ? "mt-2 flex flex-col gap-1 rounded-lg bg-[#171717] p-1 shadow-lg"
                : "hidden"
            }
          >
            <Button
              variant="ghost"
              fullWidth
              className="justify-start"
            >
              <span className="material-symbols-outlined text-[18px]">
                edit
              </span>
              Edit Event Details &amp; Tiers
            </Button>
            <Button
              variant="ghost"
              fullWidth
              className="justify-start"
            >
              <span className="material-symbols-outlined text-[18px]">
                history
              </span>
              Batch Refund Attendees
            </Button>
            <Button
              variant="danger"
              fullWidth
              className="justify-start"
              aria-label="Cancel event"
            >
              <span className="material-symbols-outlined text-[18px]">
                cancel
              </span>
              Halt Escrow &amp; Cancel Event
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

function DraftEventCard({ event }: { event: DraftEvent }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-[#1f1f1f] shadow-md">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#353534] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#d7d2cf]">
              DRAFT STAGE
            </span>
            <span className="text-[11px] text-[#8f8a89]">Unpublished</span>
          </div>
          <span className="text-[11px] text-[#a7a0a0]">
            {event.updatedAt}
          </span>
        </div>

        <div className="flex items-start gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
            <Image
              src={event.image}
              alt={event.title}
              fill
              sizes="80px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#353534]/30" />
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="truncate text-lg font-semibold text-[#f3f0ee]">
              {event.title}
            </h4>
            <p className="mt-0.5 line-clamp-1 text-[13px] text-[#a7a0a0]">
              {event.description}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#a7a0a0]">
              <span className="material-symbols-outlined text-[15px] text-[#8f8a89]">
                schedule
              </span>
              <span>
                {event.date} · Cap: {event.capacity}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Button variant="secondary" className="flex-1">
            <span className="material-symbols-outlined text-[18px] text-[#ffb3ad]">
              edit_note
            </span>
            Continue Editing
          </Button>
          <Button variant="ghost" size="icon" aria-label="Delete draft">
            <span className="material-symbols-outlined text-[18px]">
              delete
            </span>
          </Button>
        </div>
      </div>
    </article>
  );
}

export default function OrganiserDashboardPage() {
  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1]">
      <header className="pt-safe fixed inset-x-0 top-0 z-50 bg-[#131313]/80 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Image
              alt="Trea Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1Ww40inGHjn46emaG6LBQY79iEHtmTgVhg8v6vqY3WwChhc1qPp14wKDGsNMV36DVrsONIOD119spGawqKWRz6G9ezqfkZG9Na8fLhJHqaSuiuFSzehriQ9wfKuc5IdOV51Mp0ySF0_DLf44uYaZhOiHI1wss09H5bmiTM2-_JuRFmEVeA8jEzQiwh8o5Jde_vxkZ_jg8IK7UjiwA612NzvF_fX6VTEXUqhAXocRyRj6AluZQHM18yF0jw"
              width={32}
              height={32}
              unoptimized
            />
            <span className="text-[16px] font-semibold tracking-tight text-[#e5e2e1]">
              Trea
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-[#1f1f1f] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#d7d2cf]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ffb3ad]" />
            Stellar Mainnet
          </div>

          <div className="flex items-center justify-end">
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full ring-1 ring-white/10">
              <Image
                alt="Profile"
                className="object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFuXodJxvy-va-78PTdiU8ZhKQdHyJwQNqNFdepsOWnUrq659A3aTmf7VBKewRz1Tv6NauE_5vI8gnVfo7SP3O_hkMHlTTrXnfSBuJcS6CoLuhoLo3043VL5ngYQ92abrNW0b_0lKFuIRAJmI3WdBX3fm3vNsEpfMcQmm0A8-1iaJZ9MG-_siQsr6lnhHu3QoLo8urCkVnNInmNoEj4cEtpxrHwmgrhw4RZrejct814COaDYLwlHix"
                fill
                sizes="32px"
              />
              <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#131313] bg-[#ff5451]" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-col bg-[#131313] pt-16 pb-24">
        <div className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-4 pb-28 pt-4 sm:px-6">
          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="flex min-w-0 flex-col">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-ping rounded-full bg-[#ff5451]" />
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#ffb3ad]">
                  Live Control Center
                </span>
              </div>
              <h1 className="mt-0.5 text-3xl font-semibold tracking-tight text-[#f3f0ee]">
                Organizer Studio
              </h1>
            </div>

            <Link
              href="/dashboard/user"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#2a2a2a] px-3 py-1.5 text-[11px] text-[#d7d2cf] shadow-sm transition hover:bg-[#353534] hover:text-[#f3f0ee]"
            >
              <span className="material-symbols-outlined text-[18px]">
                swap_horiz
              </span>
              Attendee View
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-tight text-[#f3f0ee]">
                Managed Events
              </h2>
              <span className="rounded bg-[#2a2a2a] px-2 py-0.5 text-[11px] text-[#a7a0a0]">
                2 Total
              </span>
            </div>

            <LiveEventCard event={liveEvent} />
            <DraftEventCard event={draftEvent} />
          </div>

          <div className="flex items-center gap-4 rounded-xl bg-[#171717] p-4 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff5451]/20 text-[#ffb3ad]">
              <span className="material-symbols-outlined text-[22px]">
                bolt
              </span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="text-[15px] font-medium leading-snug text-[#f3f0ee]">
                Instant Soroban Settlement
              </span>
              <span className="line-clamp-1 text-[13px] text-[#a7a0a0]">
                Ticket receipts settle directly to your verified Stellar
                non-custodial signer.
              </span>
            </div>
          </div>

          <div className="sticky bottom-2 z-30 w-full pt-2">
            <Link
              href="/events/create"
              className={buttonClassName({
                variant: "primary",
                size: "lg",
                fullWidth: true,
                className:
                  "rounded-xl shadow-[0_8px_30px_rgba(255,84,81,0.4)]",
              })}
            >
              <span className="material-symbols-outlined text-[24px]">
                add_circle
              </span>
              Create New Event
            </Link>
          </div>
        </div>
      </main>

      <nav className="pb-safe fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#1a1a1a]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[480px] items-center justify-around px-3 py-2 sm:px-6">
          {bottomNavItems.map((item) =>
            item.featured ? (
              <Link
                key={item.label}
                href={item.href}
                className="-mt-5 flex flex-col items-center justify-center gap-1"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff5451] text-white shadow-[0_0_24px_-4px_rgba(239,68,68,0.35)] transition hover:bg-[#e64a47]">
                  <span className="material-symbols-outlined text-[26px]">
                    {item.icon}
                  </span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.08em] text-[#a7a0a0]">
                  {item.label}
                </span>
              </Link>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                className={[
                  "flex flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 py-1.5 text-[10px] uppercase tracking-[0.08em]",
                  item.active
                    ? "text-[#ffb3ad]"
                    : "text-[#a7a0a0] hover:text-[#f3f0ee]",
                ].join(" ")}
              >
                <span className="material-symbols-outlined text-[22px]">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            ),
          )}
        </div>
      </nav>
    </div>
  );
}
