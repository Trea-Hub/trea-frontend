"use client";

import { AppShell } from "@/components/AppShell";
import { Modal } from "@/components/Modal";
import { WalletConnect } from "@/components/WalletConnect";
import { useState } from "react";

export default function WalletConnectPage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AppShell
      active="wallet"
      title="Wallet"
      backHref="/"
      backLabel="Back to discover"
      maxWidth="4xl"
      showBottomNav={false}
    >
      <div className="rounded-2xl border border-white/10 bg-[#1b1b1b] p-6">
        <h1 className="text-2xl font-semibold">Connect your Stellar wallet</h1>
        <p className="mt-2 text-sm text-[#d7d2cf]">
          Sign on-chain registrations, hold cryptographic event tickets, and
          unlock attendee perks.
        </p>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#ff5451] px-4 py-2.5 text-sm font-semibold text-[#1b0b0c] transition hover:bg-[#ff6c67]"
        >
          <span className="material-symbols-outlined text-[18px]">
            account_balance_wallet
          </span>
          Open wallet connection
        </button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Connect Stellar Wallet"
        description="Connect your wallet to sign on-chain registrations, hold cryptographic event tickets, and unlock attendee perks."
      >
        <WalletConnect />
      </Modal>
    </AppShell>
  );
}
