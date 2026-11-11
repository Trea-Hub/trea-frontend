"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button, buttonClassName } from "@/components/Button";
import { useNotifications } from "@/components/Notifications";
import {
  demoDraftEvent,
  demoLiveEvent,
  demoOrganiserStats,
  type DemoDraftEvent,
  type DemoLiveEvent,
  type DemoOrganiserStat,
} from "@/lib/demo-data";

type PayoutState = "idle" | "querying" | "ready";

type Stat = DemoOrganiserStat;
type LiveEvent = DemoLiveEvent;
type DraftEvent = DemoDraftEvent;

const stats = demoOrganiserStats;
const liveEvent = demoLiveEvent;
const draftEvent = demoDraftEvent;

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
  const { notify } = useNotifications();
  const [controlsOpen, setControlsOpen] = useState(false);
  const [payoutState, setPayoutState] = useState<PayoutState>("idle");

  const getDemoResult = () =>
    new URLSearchParams(window.location.search).get("result");

  const handlePayout = () => {
    if (payoutState !== "idle") return;

    setPayoutState("querying");
    window.setTimeout(() => {
      if (getDemoResult() === "payout_failed") {
        setPayoutState("idle");
        notify({
          tone: "error",
          title: "Payout failed",
          message:
            "The payout transaction was not confirmed. Escrow funds remain locked.",
        });
        return;
      }

      setPayoutState("ready");
      notify({
        tone: "success",
        title: "Payout released",
        message: "Escrow funds were released to your Stellar wallet.",
      });
      window.setTimeout(() => setPayoutState("idle"), 2200);
    }, 1000);
  };

  const handleBatchRefund = () => {
    const failed = getDemoResult() === "refund_failed";

    notify({
      tone: failed ? "error" : "success",
      title: failed ? "Batch refund failed" : "Batch refund started",
      message: failed
        ? "The refund transaction was not confirmed. No attendee balances changed."
        : "Refund transactions were submitted to the Stellar network.",
    });
  };

  const handleCancelEvent = () => {
    const failed = getDemoResult() === "cancel_failed";

    notify({
      tone: failed ? "error" : "success",
      title: failed ? "Cancel event failed" : "Event cancellation started",
      message: failed
        ? "The cancellation transaction was not confirmed. Escrow remains active."
        : "The cancellation transaction was submitted to the Stellar network.",
    });
  };

  const handleScan = () => {
    notify({
      tone: "success",
      title: "Scanner ready",
      message: "Demo mode: attendee QR scanning opens on the live backend.",
    });
  };

  const handleGuests = () => {
    notify({
      tone: "success",
      title: "Guest list loaded",
      message: `${event.claimed} attendees are confirmed for ${event.title}.`,
    });
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
          <Link
            href={`/events/${event.eventId}`}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-[#ffb3ad] transition hover:text-[#ffd6d1]"
          >
            View public event page
            <span className="material-symbols-outlined text-[14px]">
              north_east
            </span>
          </Link>
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
            onClick={handleScan}
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
            onClick={handleGuests}
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
            <Link
              href="/events/create"
              className={buttonClassName({
                variant: "ghost",
                fullWidth: true,
                className: "justify-start",
              })}
            >
              <span className="material-symbols-outlined text-[18px]">
                edit
              </span>
              Edit Event Details &amp; Tiers
            </Link>
            <Button
              variant="ghost"
              fullWidth
              className="justify-start"
              onClick={handleBatchRefund}
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
              onClick={handleCancelEvent}
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
  const { notify } = useNotifications();

  const handleDelete = () => {
    notify({
      tone: "success",
      title: "Draft deleted",
      message: `${event.title} was removed from your local drafts.`,
    });
  };

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
            <Link
              href={`/events/${event.eventId}`}
              className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-[#ffb3ad] transition hover:text-[#ffd6d1]"
            >
              Preview event page
              <span className="material-symbols-outlined text-[14px]">
                north_east
              </span>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Link
            href="/events/create"
            className={buttonClassName({
              variant: "secondary",
              className: "flex-1",
            })}
          >
            <span className="material-symbols-outlined text-[18px] text-[#ffb3ad]">
              edit_note
            </span>
            Continue Editing
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            aria-label="Delete draft"
          >
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
    <AppShell active="manage" title="Organizer Studio" maxWidth="6xl">
      <div className="flex w-full flex-col gap-6 pt-2">
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

          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
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

            <div className="grid gap-4 lg:grid-cols-2">
              <LiveEventCard event={liveEvent} />
              <DraftEventCard event={draftEvent} />
            </div>
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

          <div className="sticky bottom-2 z-30 w-full pt-2 lg:static lg:max-w-sm lg:self-end">
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
    </AppShell>
  );
}
