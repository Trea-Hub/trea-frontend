"use client";

import { useState } from "react";

const wallets = [
  {
    name: "Freighter Wallet",
    shortName: "Freighter",
    badge: "Recommended",
    type: "browser extension & mobile",
    icon: "⬡",
    active: true,
  },
  {
    name: "Albedo",
    shortName: "Albedo",
    badge: null,
    type: "web-based Stellar signing",
    icon: "◈",
    active: false,
  },
  {
    name: "xBull Wallet",
    shortName: "xBull",
    badge: null,
    type: "cross-platform Stellar wallet",
    icon: "◉",
    active: false,
  },
  {
    name: "Lobstr",
    shortName: "Lobstr",
    badge: null,
    type: "mobile wallet with QR connect",
    icon: "◌",
    active: false,
  },
];

type WalletConnectProps = {
  initialWallet?: string;
  onSelect?: (wallet: string) => void;
  onConnect?: (wallet: string) => void;
};

export function WalletConnect({
  initialWallet = "Freighter Wallet",
  onSelect,
  onConnect,
}: WalletConnectProps) {
  const [selectedWallet, setSelectedWallet] = useState(initialWallet);

  const handleSelect = (walletName: string) => {
    setSelectedWallet(walletName);
    onSelect?.(walletName);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3" role="radiogroup" aria-label="Stellar wallet providers">
        {wallets.map((wallet) => {
          const active = wallet.name === selectedWallet;

          return (
            <button
              key={wallet.name}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => handleSelect(wallet.name)}
              className={[
                "flex w-full items-center justify-between gap-3 rounded-xl border p-3 text-left transition-all",
                active
                  ? "border-white/10 bg-[#2b2b2b] shadow-[0_0_0_1px_rgba(255,84,81,0.2)]"
                  : "border-transparent bg-[#2a2a2a] hover:bg-[#303030]",
              ].join(" ")}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#101010] text-lg text-[#ffb3ad]">
                  {wallet.icon}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-lg font-semibold text-white">{wallet.name}</span>
                    {wallet.badge ? (
                      <span className="rounded-full bg-[#ff5451]/15 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.12em] text-[#ffb3ad]">
                        {wallet.badge}
                      </span>
                    ) : null}
                  </div>
                  <span className="block truncate text-sm text-zinc-400">{wallet.type}</span>
                </div>
              </div>

              <span
                className={[
                  "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                  active ? "border-[#ff5451] bg-[#ff5451]" : "border-zinc-500 bg-transparent",
                ].join(" ")}
              >
                <span className="h-2 w-2 rounded-full bg-[#1b1b1b]" />
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-[#121212] p-3 text-sm text-zinc-300">
        <span className="text-base text-[#ffb3ad]">i</span>
        <p>
          By connecting, you agree to Trea&apos;s Terms and Stellar network gas fees (~0.00001 XLM).
        </p>
      </div>

      <button
        type="button"
        onClick={() => onConnect?.(selectedWallet)}
        className="flex w-full items-center justify-center rounded-xl bg-[#ff5451] px-4 py-3 text-base font-semibold text-[#1b0b0c] transition hover:bg-[#ff6a66]"
      >
        Connect {selectedWallet}
      </button>

      <div className="flex items-center justify-center pt-1 text-sm text-zinc-400">
        <a
          href="https://freighter.app"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 hover:text-[#ffb3ad]"
        >
          <span>New to Stellar? Create a Freighter wallet</span>
          <span className="material-symbols-outlined text-[16px]">
            open_in_new
          </span>
        </a>
      </div>
    </div>
  );
}
