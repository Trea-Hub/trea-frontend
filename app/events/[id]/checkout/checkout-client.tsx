"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useReducer, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useNotifications } from "@/components/Notifications";
import {
  canSubmitCheckout,
  checkoutReducer,
  createCheckoutFailure,
  getCheckoutView,
  initialCheckoutState,
  isCheckoutBusy,
  type CheckoutFailureCode,
  type CheckoutTone,
} from "@/lib/checkout/machine";

export type CheckoutEvent = {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  date: string;
  venue: string;
  price: number;
  currency: "XLM" | "USDC" | null;
  seat: string;
  tickets: string;
  image: string | null;
};

type PaymentToken = "XLM" | "USDC";

const buttonToneClasses: Record<CheckoutTone, string> = {
  idle: "bg-[#ff5451] text-[#fff] shadow-[0_0_24px_rgba(255,84,81,0.35)] transition-all hover:bg-[#ff6c67]",
  pending: "bg-[#ff5451]/80 text-[#fff] opacity-80 transition-all",
  confirmed:
    "bg-[#ffb3ad] text-[#410004] shadow-[0_0_24px_rgba(255,84,81,0.35)] transition-all",
  failed:
    "bg-[#ff5451] text-[#fff] shadow-[0_0_24px_rgba(255,84,81,0.35)] transition-all hover:bg-[#ff6c67]",
};

const pipelineToneClasses: Record<CheckoutTone, string> = {
  idle: "text-[#ffb3ad]",
  pending: "text-[#ffb3ad]",
  confirmed: "text-[#ffb3ad]",
  failed: "text-[#ffb4ab]",
};

const statusBadgeToneClasses: Record<CheckoutTone, string> = {
  idle: "bg-[#ff5451]/10 text-[#ffb3ad]",
  pending: "bg-[#ff5451]/10 text-[#ffb3ad]",
  confirmed: "bg-[#ffb3ad]/15 text-[#ffb3ad]",
  failed: "bg-[#93000a]/25 text-[#ffb4ab]",
};

const pipelineDotToneClasses: Record<CheckoutTone, string> = {
  idle: "bg-[#ff5451] animate-ping",
  pending: "bg-[#ff5451] animate-ping",
  confirmed: "bg-[#ffb3ad]",
  failed: "bg-[#ffb4ab]",
};

function getSimulatedFailureCode(): CheckoutFailureCode | null {
  if (typeof window === "undefined") return null;

  const result = new URLSearchParams(window.location.search).get("result");
  switch (result) {
    case "rejected":
      return "wallet_rejected";
    case "network":
      return "wrong_network";
    case "balance":
      return "insufficient_balance";
    case "rpc":
      return "rpc_error";
    case "failed":
      return "unknown";
    default:
      return null;
  }
}

export function CheckoutClient({ event }: { event: CheckoutEvent }) {
  const { notify } = useNotifications();
  const router = useRouter();

  const [token, setToken] = useState<PaymentToken>("XLM");
  const [checkoutState, dispatch] = useReducer(
    checkoutReducer,
    initialCheckoutState,
  );
  const timeoutRef = useRef<number | null>(null);
  const redirectRef = useRef<number | null>(null);
  const lastNotifiedFailureRef = useRef<string | null>(null);

  const view = getCheckoutView(checkoutState);
  const busy = isCheckoutBusy(checkoutState);
  const sourceCurrency = event.currency ?? "XLM";
  const xlmAmount =
    sourceCurrency === "XLM" ? event.price : event.price / 0.38;
  const usdcAmount =
    sourceCurrency === "USDC" ? event.price : event.price * 0.38;

  const totalLabel = (
    token === "XLM" ? xlmAmount : usdcAmount
  ).toFixed(2);
  const tokenUnit = token === "XLM" ? "XLM" : "USDC";
  const feeLabel = token === "XLM" ? "~0.00001 XLM" : "~0.00001 USDC";
  const fiatText =
    token === "XLM"
      ? `Estimated value ~$${usdcAmount.toFixed(2)} USD`
      : "Fixed pegged rate: 1.00 USDC = $1.00";

  useEffect(() => {
    if (checkoutState.status !== "failed") {
      lastNotifiedFailureRef.current = null;
      return;
    }

    const failureSignature = `${checkoutState.error.code}:${checkoutState.error.message}`;
    if (lastNotifiedFailureRef.current === failureSignature) return;

    lastNotifiedFailureRef.current = failureSignature;
    notify({
      tone: "error",
      title: "Transaction failed",
      message: checkoutState.error.message,
    });
  }, [checkoutState, notify]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      if (redirectRef.current) {
        window.clearTimeout(redirectRef.current);
      }
    };
  }, []);

  const handleConfirm = () => {
    if (!canSubmitCheckout(checkoutState)) return;

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    if (redirectRef.current) {
      window.clearTimeout(redirectRef.current);
    }

    dispatch({ type: "SUBMIT" });

    const failureCode = getSimulatedFailureCode();

    timeoutRef.current = window.setTimeout(() => {
      if (failureCode) {
        dispatch({ type: "FAILED", error: createCheckoutFailure(failureCode) });
        return;
      }

      dispatch({ type: "SIGNATURE_APPROVED" });

      timeoutRef.current = window.setTimeout(() => {
        dispatch({ type: "CONFIRMED" });
        redirectRef.current = window.setTimeout(() => {
          router.push(`/events/${event.id}/confirmation`);
        }, 500);
      }, 1400);
    }, 1200);
  };

  return (
    <AppShell
      title="Checkout"
      backHref={`/events/${event.id}`}
      backLabel="Back to event detail"
      maxWidth="5xl"
      showBottomNav={false}
      contentClassName="overflow-x-hidden"
    >
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#ffb3ad]">
                  Step 2 of 2
                </span>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a7a0a0]">
                  On-Chain Checkout
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#1f1f1f] px-3 py-1.5">
              <span className="material-symbols-outlined text-[14px] text-[#ffb3ad]">security</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#f3f0ee]">
                Soroban Escrow
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-[#f3f0ee] sm:text-4xl">
              Complete Registration
            </h1>
            <span className="rounded-full border border-[#ff5451]/30 bg-[#ff5451]/10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#ffb3ad]">
              04:59 Left
            </span>
          </div>

          <div className="h-1 w-full overflow-hidden rounded-full bg-[#2a2a2a]">
            <div className="h-full w-full rounded-full bg-[#ff5451] shadow-[0_0_12px_rgba(255,84,81,0.6)]" />
          </div>

          <div className="grid min-w-0 gap-6 lg:grid-cols-[1.3fr_0.95fr]">
            <div className="min-w-0 space-y-4">
              <div className="min-w-0 rounded-2xl border border-white/10 bg-[#1b1b1b] p-4 shadow-[0_24px_64px_rgba(0,0,0,0.28)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2a2a2a] text-[#ffb3ad]">
                      <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a7a0a0]">
                        Connected Wallet
                      </p>
                      <p className="mt-1 text-sm font-medium text-[#f3f0ee]">GDX7...4K9L</p>
                    </div>
                  </div>
                  <div className="rounded-full border border-[#ff5451]/20 bg-[#ff5451]/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ffb3ad]">
                    Secure
                  </div>
                </div>
              </div>

              <div className="min-w-0 rounded-2xl border border-white/10 bg-[#1b1b1b] p-4">
                <div className="flex min-w-0 items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#a7a0a0]">
                      Event
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#f3f0ee]">
                      {event.title}
                    </h2>
                    <p className="mt-2 text-sm text-[#d7d2cf]">{event.summary}</p>
                  </div>
                  {event.image ? (
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={80}
                      height={80}
                      className="h-20 w-20 rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="h-20 w-20 shrink-0 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,84,81,0.35),transparent_60%),linear-gradient(135deg,#2a2a2a,#131313)]" />
                  )}
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-[#1f1f1f] p-3">
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#a7a0a0]">
                      Date
                    </p>
                    <p className="mt-2 text-sm text-[#f3f0ee]">{event.date}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#1f1f1f] p-3">
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#a7a0a0]">
                      Seat
                    </p>
                    <p className="mt-2 text-sm text-[#f3f0ee]">{event.seat}</p>
                  </div>
                </div>

                <div className="mt-5 space-y-3 rounded-xl border border-white/10 bg-[#1f1f1f] p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#d7d2cf]">Venue</span>
                    <span className="text-sm font-medium text-[#f3f0ee]">{event.venue}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#d7d2cf]">Pass Type</span>
                    <span className="text-sm font-medium text-[#f3f0ee]">{event.tickets}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-[#1b1b1b] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-[#f3f0ee]">Payment Method</span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#a7a0a0]">
                    Quote Validated
                  </span>
                </div>

                <div className="mt-4 grid min-w-0 grid-cols-2 gap-2 rounded-xl bg-[#0f0f0f] p-1">
                  <button
                    type="button"
                    onClick={() => setToken("XLM")}
                    disabled={busy}
                    className={
                      token === "XLM"
                        ? "flex items-center justify-between rounded-lg bg-[#2a2a2a] p-3 text-left text-[#f3f0ee] shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
                        : "flex items-center justify-between rounded-lg bg-[#0f0f0f] p-3 text-left text-[#a7a0a0] disabled:cursor-not-allowed disabled:opacity-60"
                    }
                    aria-pressed={token === "XLM"}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff5451]/15 text-[#ffb3ad]">
                        ✦
                      </div>
                      <div>
                        <p className="text-sm font-medium">XLM</p>
                        <p className="text-[11px] text-[#a7a0a0]">Stellar Lumens</p>
                      </div>
                    </div>
                    <div
                      className={
                        token === "XLM"
                          ? "flex h-5 w-5 items-center justify-center rounded-full bg-[#ff5451] text-[10px] text-[#fff]"
                          : "flex h-5 w-5 items-center justify-center rounded-full bg-[#2a2a2a]"
                      }
                    >
                      {token === "XLM" ? "✓" : null}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setToken("USDC")}
                    disabled={busy}
                    className={
                      token === "USDC"
                        ? "flex items-center justify-between rounded-lg bg-[#2a2a2a] p-3 text-left text-[#f3f0ee] shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
                        : "flex items-center justify-between rounded-lg bg-[#0f0f0f] p-3 text-left text-[#a7a0a0] disabled:cursor-not-allowed disabled:opacity-60"
                    }
                    aria-pressed={token === "USDC"}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2a2a2a] font-semibold text-[#f3f0ee]">
                        $
                      </div>
                      <div>
                        <p className="text-sm font-medium">USDC</p>
                        <p className="text-[11px] text-[#a7a0a0]">Native Stable</p>
                      </div>
                    </div>
                    <div
                      className={
                        token === "USDC"
                          ? "flex h-5 w-5 items-center justify-center rounded-full bg-[#ff5451] text-[10px] text-[#fff]"
                          : "flex h-5 w-5 items-center justify-center rounded-full bg-[#2a2a2a]"
                      }
                    >
                      {token === "USDC" ? "✓" : null}
                    </div>
                  </button>
                </div>

                <div className="mt-5 rounded-xl border border-white/10 bg-[#1f1f1f] p-4">
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-base font-medium text-[#f3f0ee]">Order Summary</span>
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#a7a0a0]">
                      Auto-Calculated
                    </span>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#f3f0ee]">Base Ticket (1x General Pass)</span>
                      <span className="text-[12px] font-medium text-[#f3f0ee]">
                        {totalLabel} {tokenUnit}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[#a7a0a0]">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">Stellar Network Fee</span>
                        <span className="material-symbols-outlined text-[14px]">help_outline</span>
                      </div>
                      <span className="text-[12px]">{feeLabel}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#a7a0a0]">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Protocol Platform Fee</span>
                        <span className="rounded bg-[#2a2a2a] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#ffb3ad]">
                          Sponsored
                        </span>
                      </div>
                      <span className="text-[12px] text-[#ffb3ad]">0.00 {tokenUnit}</span>
                    </div>
                  </div>

                  <div className="my-4 h-px w-full bg-[#2a2a2a]" />

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#a7a0a0]">
                        Total Amount Due
                      </p>
                      <p className="mt-1 text-[11px] text-[#a7a0a0]">{fiatText}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold text-[#ffb3ad]">{totalLabel}</span>
                      <span className="ml-1 text-base font-medium text-[#ffb3ad]">{tokenUnit}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-white/10 bg-[#181818] p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={[
                          "h-2 w-2 rounded-full",
                          pipelineDotToneClasses[view.tone],
                        ].join(" ")}
                      />
                      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#f3f0ee]">
                        Contract Execution Pipeline
                      </span>
                    </div>
                    <span
                      className={[
                        "rounded px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em]",
                        statusBadgeToneClasses[view.tone],
                      ].join(" ")}
                    >
                      {view.statusLabel}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between rounded-lg border border-white/10 bg-[#111111] p-3">
                    <div className="flex items-center gap-3 truncate">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2a2a2a] text-[#ffb3ad]">
                        <span className="material-symbols-outlined text-[15px]">code</span>
                      </div>
                      <div className="truncate">
                        <p className="truncate text-[11px] font-medium text-[#f3f0ee]">
                          Soroban::trea_escrow_v2
                        </p>
                        <p className="text-[10px] text-[#a7a0a0]">Function: mint_ticket_auth()</p>
                      </div>
                    </div>
                    <div
                      className={[
                        "flex items-center gap-1",
                        pipelineToneClasses[view.tone],
                      ].join(" ")}
                    >
                      <span className="material-symbols-outlined text-[15px]">
                        {view.pipelineIcon}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.14em]">
                        {view.secondaryStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {view.showError && checkoutState.status === "failed" ? (
                  <div
                    role="alert"
                    className="mt-5 flex items-start gap-3 rounded-xl border border-[#93000a] bg-[#93000a]/15 p-3"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#93000a]/40 text-[#ffb4ab]">
                      <span className="material-symbols-outlined text-[18px]">
                        error
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#ffb4ab]">
                        Transaction Failed
                      </p>
                      <p className="mt-1 text-sm leading-snug text-[#ffdad6]">
                        {checkoutState.error.message}
                      </p>
                      <p className="mt-1 text-[11px] leading-snug text-[#ffb4ab]">
                        No funds were moved. You can safely retry.
                      </p>
                    </div>
                  </div>
                ) : null}

                <div className="mt-5 flex items-start gap-3 rounded-xl border border-white/10 bg-[#1f1f1f] p-3">
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#2a2a2a] text-[#ffb3ad]">
                    <span className="material-symbols-outlined text-[18px]">currency_exchange</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#f3f0ee]">
                      Automated Guarantee
                    </p>
                    <p className="mt-1 text-sm leading-snug text-[#a7a0a0]">
                      Eligible for instant self-refund up to 48 hrs before event starts. Claimable directly from your tickets drawer.
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <button
                    type="button"
                    onClick={handleConfirm}
                    disabled={view.disabled}
                    className={[
                      "flex h-14 w-full items-center justify-center gap-2 rounded-xl disabled:cursor-not-allowed",
                      buttonToneClasses[view.tone],
                    ].join(" ")}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {view.buttonIcon}
                    </span>
                    <span className="text-base font-semibold">{view.buttonLabel}</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[#a7a0a0]">
                    <span className="material-symbols-outlined text-[14px]">bolt</span>
                    <span className="text-[10px] font-medium uppercase tracking-[0.14em]">
                      Sub-second Stellar consensus finality (~3.8s)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </AppShell>
  );
}
