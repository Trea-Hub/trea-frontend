"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Card } from "@/components/Card";

type TicketStatus = "upcoming" | "past" | "checked-in";
type RegistrationFilter = "upcoming" | "past" | "waitlist";
type PassKind = "qr" | "access" | "poap";
type ActionVariant = "primary" | "secondary";

type PassBlock = {
  kind: PassKind;
  label?: string;
  value: string;
  sideLabel?: string;
  badge?: string;
  badgeIcon?: string;
  wallet?: string;
};

type Registration = {
  id: string;
  title: string;
  status: TicketStatus;
  statusLabel: string;
  date: string;
  dateIcon: string;
  location: string;
  pass: PassBlock;
  image: string;
  actionLabel: string;
  actionIcon: string;
  actionVariant: ActionVariant;
  secondaryAction?: {
    label: string;
    href: string;
  };
  footer?: {
    actionLabel?: string;
    actionIcon?: string;
    note?: string;
  };
  accentClassName?: string;
};

const registrations: Registration[] = [
  {
    id: "meridian-2025",
    title: "Meridian Global Builders Summit 2025",
    status: "upcoming",
    statusLabel: "Confirmed • On-Chain",
    date: "Oct 14-16, 2025",
    dateIcon: "calendar_month",
    location: "Singapore",
    pass: {
      kind: "qr",
      label: "Pass Identifier",
      value: "#TREA-9482",
      badge: "Soroban v22 Validated",
      badgeIcon: "shield",
    },
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDAGSGk_hHT8whBJgDBDUPqWioBqwPaAuQkZzs8g-u_FI_0oFrp8kLzZHz56xncK2Bdym-xfql8KW5wyEtSkTsTHlk5h0DS9LbONv0Obv7pZmKBTmBJ7jwQ_wZ4IL95Wifqt3mw84t-IzMihd_jAjRxZTU88z7WMI2I6zRzEXirZKDMqDV8wVBbnfy9aOFeUwnTAS1xvaSXOGi8PD3-n0KIyTGeFAkgE7F1IXrNkLeqmSKchgAkidtL",
    actionLabel: "View Passcode / Dynamic QR",
    actionIcon: "qr_code_2",
    actionVariant: "primary",
    footer: {
      actionLabel: "Request Self-Refund",
      actionIcon: "undo",
      note: "42h left to refund",
    },
    accentClassName: "from-[#ff5451] via-[#ffb3b6] to-transparent",
  },
  {
    id: "soroban-workshop",
    title: "Smart Contracts with Soroban Workshop",
    status: "upcoming",
    statusLabel: "Confirmed • Free Tier",
    date: "Nov 02, 2025",
    dateIcon: "videocam",
    location: "Virtual Live Session",
    pass: {
      kind: "access",
      label: "Access Link Status",
      value: "Unlocked in Wallet",
      sideLabel: "Pass #TREA-1108",
    },
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbYw3O4o67IQU-Bj2atttmu1wSF7qe6X0e16ujpwBuiX8eFMhaMggra9DN8NAt8c8baG3Wt-4ifWAfuiVx4m5vgl-PM60OHqhO6s4knNKhPVjBnwZC3HN5GsW8m_uVuJpa5wn91JJnO38DYzb8CVVSqyA_0MTRindxlmKb2f2yZdeMkOC00bCs8YNtB1cq7MU-kOzqQ50H3vLHkTeEPmMruVT6l6oN5MMhTeY44GZRL6KQEtbGb3Ev",
    actionLabel: "Join Stream / View Details",
    actionIcon: "play_circle",
    actionVariant: "secondary",
  },
  {
    id: "austin-hacker-house",
    title: "Stellar Hacker House Austin",
    status: "checked-in",
    statusLabel: "Checked-In • Attended",
    date: "Aug 2025",
    dateIcon: "history",
    location: "Austin, TX",
    pass: {
      kind: "poap",
      value: "Austin Hacker PoAP #0441",
      wallet: "Minted to GBLX...78AQ",
    },
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDupdq02pr5hIaWrc5X64zvm_08-AkHGsfEvbseyO_QtRX9APEEYi0x9AC6Os4A6osoUZ9vqUJ808Sdox2aqKPR7MmjwtTGPiWhu4aDaLNI3NO3vm2wRQg0oNd0AXrZVPAjhfw5Y4uXet5ofdAy_Z9zHBMAU65R7xhMYV6NyCAqWxmjyH-BvY3Mrile_E-x_THwT8fNEO4Urr6YH0DxtJlUdVbQ1h9mfyEI2vLcJhGnP7fqtcQlnoOS",
    actionLabel: "View PoAP / NFT Badge",
    actionIcon: "military_tech",
    actionVariant: "secondary",
    secondaryAction: {
      label: "Event Photo Gallery (142 photos)",
      href: "/events/austin-hacker-house/gallery",
    },
  },
];

const filterTabs: Array<{ value: RegistrationFilter; label: string }> = [
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
  { value: "waitlist", label: "Waitlist" },
];

const tabCounts: Record<RegistrationFilter, number> = {
  upcoming: registrations.filter(
    (registration) => registration.status === "upcoming",
  ).length,
  past: registrations.filter(
    (registration) =>
      registration.status === "past" || registration.status === "checked-in",
  ).length,
  waitlist: 0,
};

const statusStyles: Record<TicketStatus, { chip: string; dot: string }> = {
  upcoming: {
    chip: "bg-[#2a2a2a] text-[#ffb3ad]",
    dot: "bg-[#ff5451] animate-ping",
  },
  past: {
    chip: "bg-[#2a2a2a] text-[#d7d2cf]",
    dot: "bg-[#8f8a89]",
  },
  "checked-in": {
    chip: "bg-[#2a2a2a] text-[#b9d2c7]",
    dot: "bg-[#b9d2c7]",
  },
};

const actionStyles: Record<ActionVariant, string> = {
  primary:
    "bg-[#ff5451] text-white shadow-[0_0_24px_rgba(255,84,81,0.28)] hover:bg-[#ff6a64]",
  secondary: "bg-[#2a2a2a] text-[#f3f0ee] hover:bg-[#343434]",
};

function PassDetails({ pass }: { pass: PassBlock }) {
  if (pass.kind === "poap") {
    return (
      <div className="flex items-center gap-2 rounded-xl bg-[#171717] p-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2a2a2a] text-[#ffb3ad] shadow-sm">
          <span className="material-symbols-outlined text-[24px]">
            verified
          </span>
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-[13px] font-medium text-[#f3f0ee]">
            {pass.value}
          </span>
          {pass.wallet ? (
            <span className="text-[11px] text-[#a7a0a0]">{pass.wallet}</span>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-[#171717] p-3">
      <div className="flex min-w-0 flex-col">
        <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#a7a0a0]">
          {pass.label}
        </span>
        <span
          className={[
            "mt-1 flex items-center gap-1 text-[13px] font-medium",
            pass.kind === "access" ? "text-[#ffb3ad]" : "text-[#f3f0ee]",
          ].join(" ")}
        >
          {pass.kind === "access" ? (
            <span className="h-1.5 w-1.5 rounded-full bg-[#ffb3ad]" />
          ) : null}
          {pass.value}
        </span>
      </div>

      {pass.sideLabel ? (
        <span className="shrink-0 text-[11px] text-[#a7a0a0]">
          {pass.sideLabel}
        </span>
      ) : null}

      {pass.badge ? (
        <div className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-[#1f1f1f] px-2 py-1 text-[11px] font-medium text-[#ffb3ad]">
          <span className="material-symbols-outlined text-[13px]">
            {pass.badgeIcon ?? "shield"}
          </span>
          {pass.badge}
        </div>
      ) : null}
    </div>
  );
}

function WaitlistEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#1d1d1d] p-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2a2a2a] text-[#a7a0a0]">
        <span className="material-symbols-outlined text-[28px]">
          hourglass_empty
        </span>
      </div>
      <span className="text-xl font-semibold text-[#f3f0ee]">
        No Waitlisted Events
      </span>
      <p className="max-w-[240px] text-[13px] text-[#a7a0a0]">
        You are not currently in any queues. Explore hot drops to get early
        access tickets.
      </p>
    </div>
  );
}

type BottomNavItem = {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
  featured?: boolean;
};

const bottomNavItems: BottomNavItem[] = [
  { icon: "explore", label: "Discover", href: "/" },
  {
    icon: "confirmation_number",
    label: "Tickets",
    href: "/dashboard/user",
    active: true,
  },
  { icon: "add", label: "Create", href: "/events/create", featured: true },
  { icon: "insights", label: "Manage", href: "/dashboard/organiser" },
  {
    icon: "photo_library",
    label: "Gallery",
    href: "/events/meridian-2025/gallery",
  },
];

export default function UserDashboardPage() {
  const [activeFilter, setActiveFilter] =
    useState<RegistrationFilter>("upcoming");

  const visibleRegistrations = useMemo(() => {
    if (activeFilter === "upcoming") {
      return registrations.filter(
        (registration) => registration.status === "upcoming",
      );
    }

    if (activeFilter === "past") {
      return registrations.filter(
        (registration) =>
          registration.status === "past" ||
          registration.status === "checked-in",
      );
    }

    return [];
  }, [activeFilter]);

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
        <div className="mx-auto flex w-full max-w-[480px] flex-col gap-4 px-4 pb-24 pt-4 sm:px-6">
          <div className="mt-2 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[30px] font-semibold tracking-tight text-[#f3f0ee]">
                  My Tickets
                </span>
                <span className="rounded-full bg-[#1f1f1f] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#ffb3ad]">
                  {registrations.length} Total
                </span>
              </div>

              <button
                type="button"
                aria-label="Filter registrations"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1d1d1d] text-[#d7d2cf] shadow-sm transition hover:bg-[#242424]"
              >
                <span className="material-symbols-outlined text-[20px]">
                  tune
                </span>
              </button>
            </div>

            <p className="text-[13px] text-[#a7a0a0]">
              Cryptographic event credentials and verifiable check-in passes
              synced with Stellar.
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-xl bg-[#121212] p-1 shadow-inner shadow-[#000000]/20">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.value;

              return (
                <button
                  key={tab.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(tab.value)}
                  className={[
                    "flex-1 rounded-lg px-2 py-2 text-center text-[11px] font-medium uppercase tracking-[0.12em] transition-all",
                    isActive
                      ? "bg-[#ff5451]/20 text-[#ffd9d5] shadow-[0_0_16px_rgba(255,84,81,0.15)]"
                      : "text-[#a7a0a0] hover:text-[#f3f0ee]",
                  ].join(" ")}
                >
                  {tab.label} ({tabCounts[tab.value]})
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-4">
            {visibleRegistrations.map((registration) => (
              <Card
                key={registration.id}
                variant="compact"
                imageSrc={registration.image}
                imageAlt={registration.title}
                title={registration.title}
                topAccentClassName={registration.accentClassName}
                metadata={
                  <div className="flex items-center gap-2">
                    <span
                      className={[
                        "h-2 w-2 rounded-full",
                        statusStyles[registration.status].dot,
                      ].join(" ")}
                    />
                    <span
                      className={[
                        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em]",
                        statusStyles[registration.status].chip,
                      ].join(" ")}
                    >
                      {registration.statusLabel}
                    </span>
                  </div>
                }
                action={
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      className={[
                        "flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[15px] font-semibold transition",
                        actionStyles[registration.actionVariant],
                      ].join(" ")}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {registration.actionIcon}
                      </span>
                      {registration.actionLabel}
                    </button>

                    {registration.secondaryAction ? (
                      <Link
                        href={registration.secondaryAction.href}
                        className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#171717] px-4 py-2 text-[11px] text-[#ffb3ad] transition hover:bg-[#242424]"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          photo_library
                        </span>
                        {registration.secondaryAction.label}
                      </Link>
                    ) : null}
                  </div>
                }
              >
                <div className="flex items-center gap-1 text-[13px] text-[#a7a0a0]">
                  <span className="material-symbols-outlined text-[16px] text-[#ffb3ad]">
                    {registration.dateIcon}
                  </span>
                  <span>{registration.date}</span>
                  <span className="mx-1 text-[#6f6b6a]">•</span>
                  <span className="material-symbols-outlined text-[16px] text-[#ffb3ad]">
                    location_on
                  </span>
                  <span>{registration.location}</span>
                </div>

                <PassDetails pass={registration.pass} />

                {registration.footer ? (
                  <div className="flex items-center justify-between gap-2 pt-1">
                    {registration.footer.actionLabel ? (
                      <button
                        type="button"
                        className="flex items-center gap-1 text-[11px] text-[#a7a0a0] transition hover:text-[#ffb3ad]"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {registration.footer.actionIcon ?? "undo"}
                        </span>
                        <span>{registration.footer.actionLabel}</span>
                      </button>
                    ) : (
                      <span />
                    )}

                    {registration.footer.note ? (
                      <span className="flex items-center gap-1 text-[11px] text-[#8f8a89]">
                        <span className="material-symbols-outlined text-[13px] text-[#ffb3ad]">
                          schedule
                        </span>
                        {registration.footer.note}
                      </span>
                    ) : null}
                  </div>
                ) : null}
              </Card>
            ))}

            {activeFilter === "waitlist" ? <WaitlistEmptyState /> : null}
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
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff5451] text-white shadow-[0_0_24px_-4px_rgba(239,68,68,0.35)] transition hover:bg-[#ff6a64]">
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
