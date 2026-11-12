"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { useNotifications } from "@/components/Notifications";
import { demoRegistrations } from "@/lib/demo-data";

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
  eventId: string;
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

const registrations: Registration[] = demoRegistrations.map((registration) => ({
  ...registration,
  dateIcon:
    registration.pass.kind === "access"
      ? "videocam"
      : registration.status === "checked-in"
        ? "history"
        : "calendar_month",
}));

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
    "bg-[#ff5451] text-[#1b0b0c] shadow-[0_0_24px_rgba(255,84,81,0.28)] hover:bg-[#ff6a64]",
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

export default function UserDashboardPage() {
  const { notify } = useNotifications();
  const [activeFilter, setActiveFilter] =
    useState<RegistrationFilter>("upcoming");
  const [refundableOnly, setRefundableOnly] = useState(false);

  const visibleRegistrations = useMemo(() => {
    const filtered = registrations.filter((registration) => {
      if (activeFilter === "upcoming") {
        return registration.status === "upcoming";
      }

      if (activeFilter === "past") {
        return (
          registration.status === "past" ||
          registration.status === "checked-in"
        );
      }

      return false;
    });

    return refundableOnly
      ? filtered.filter((registration) => Boolean(registration.footer?.actionLabel))
      : filtered;
  }, [activeFilter, refundableOnly]);

  const handleViewPass = (registration: Registration) => {
    notify({
      tone: "success",
      title:
        registration.pass.kind === "poap" ? "PoAP badge ready" : "Pass ready",
      message:
        registration.pass.kind === "poap"
          ? `${registration.pass.value} is available in your Stellar wallet.`
          : `${registration.actionLabel} for ${registration.title} is ready to scan.`,
    });
  };

  const handleToggleRefundable = () => {
    const nextRefundableOnly = !refundableOnly;
    setRefundableOnly(nextRefundableOnly);
    notify({
      tone: "info",
      title: nextRefundableOnly ? "Filter applied" : "Filter cleared",
      message: nextRefundableOnly
        ? "Showing registrations with an active self-refund window."
        : "Showing all registrations in this tab.",
    });
  };

  const handleRefund = (registration: Registration) => {
    const refundFailed =
      new URLSearchParams(window.location.search).get("result") ===
      "refund_failed";

    if (refundFailed) {
      notify({
        tone: "error",
        title: "Refund failed",
        message:
          "The refund transaction was not confirmed. No funds or ticket status changed.",
      });
      return;
    }

    notify({
      tone: "success",
      title: "Refund requested",
      message: `Your self-refund request for ${registration.title} was submitted to the Stellar network.`,
    });
  };

  return (
    <AppShell active="tickets" title="My Tickets" maxWidth="6xl">
      <div className="flex w-full flex-col gap-4 pt-2 lg:gap-6">
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
                aria-label={
                  refundableOnly
                    ? "Show all registrations"
                    : "Show refundable registrations"
                }
                aria-pressed={refundableOnly}
                onClick={handleToggleRefundable}
                className={[
                  "flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition",
                  refundableOnly
                    ? "bg-[#ff5451]/20 text-[#ffd9d5] hover:bg-[#ff5451]/30"
                    : "bg-[#1d1d1d] text-[#d7d2cf] hover:bg-[#242424]",
                ].join(" ")}
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

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
                      onClick={() => handleViewPass(registration)}
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

                    <Link
                      href={`/events/${registration.eventId}`}
                      className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-[#171717] px-4 py-2 text-[11px] text-[#d7d2cf] transition hover:bg-[#242424] hover:text-[#f3f0ee]"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        open_in_new
                      </span>
                      View Event Page
                    </Link>

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
                        onClick={() => handleRefund(registration)}
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

            {visibleRegistrations.length === 0 && activeFilter !== "waitlist" ? (
              <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#1d1d1d] p-8 text-center md:col-span-2 xl:col-span-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2a2a2a] text-[#a7a0a0]">
                  <span className="material-symbols-outlined text-[26px]">
                    filter_alt_off
                  </span>
                </div>
                <span className="text-lg font-semibold text-[#f3f0ee]">
                  No matching registrations
                </span>
                <p className="max-w-[280px] text-[13px] text-[#a7a0a0]">
                  No tickets in this tab match the active refundable filter.
                </p>
                <button
                  type="button"
                  onClick={handleToggleRefundable}
                  className="mt-1 rounded-xl bg-[#2a2a2a] px-4 py-2 text-sm font-medium text-[#f3f0ee] transition hover:bg-[#343434]"
                >
                  Clear filter
                </button>
              </div>
            ) : null}
          </div>
        </div>
    </AppShell>
  );
}
