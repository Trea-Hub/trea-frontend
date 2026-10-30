"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type EventDetail = {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  category: string;
  date: string;
  schedule: string;
  location: string;
  format: string;
  price: string;
  currency: string;
  badge: string;
  seats: string;
  filled: number;
  filledWidthClassName: string;
  description: string;
  secondaryDescription: string;
  speakers: {
    name: string;
    role: string;
    company: string;
    image: string;
  }[];
  agenda: { time: string; title: string; detail: string }[];
  galleryCount: number;
  galleryPreview: { image: string; alt: string }[];
};

type TabId = "overview" | "gallery" | "perks";

const perks = [
  {
    icon: "badge",
    title: "On-chain SBT VIP Badge",
    description: "Verifiable soulbound credential minted on Stellar",
  },
  {
    icon: "restaurant",
    title: "Gourmet Catering & Rooftop Bar",
    description: "Full dining, coffee bars, and summit party access",
  },
  {
    icon: "terminal",
    title: "Soroban Hack Arena Access",
    description: "$100k Bounty Pool participation eligibility",
  },
];

export function EventTabs({
  event,
  galleryHref,
}: {
  event: EventDetail;
  galleryHref: string;
}) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const tabs: { id: TabId; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "gallery", label: `Gallery (${event.galleryCount})` },
    { id: "perks", label: "Perks & Map" },
  ];

  return (
    <div>
      <div
        className="grid grid-cols-3 gap-1 rounded-xl bg-[#111111] p-1"
        role="tablist"
        aria-label="Event sections"
      >
        {tabs.map((tab) => {
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={[
                "rounded-lg px-3 py-2 text-center text-[11px] font-medium uppercase tracking-[0.15em] transition",
                active
                  ? "bg-[#2a2a2a] text-[#f3f0ee] shadow-sm"
                  : "text-[#a7a0a0] hover:bg-[#1f1f1f] hover:text-[#f3f0ee]",
              ].join(" ")}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id="panel-overview"
        role="tabpanel"
        aria-labelledby="tab-overview"
        className={
          activeTab === "overview" ? "mt-6 flex flex-col gap-6" : "hidden"
        }
      >
        <div className="rounded-2xl border border-white/10 bg-[#1f1f1f] p-4">
          <h3 className="mb-3 text-xl font-semibold tracking-tight text-[#f3f0ee]">
            About the Summit
          </h3>
          <p className="text-base leading-7 text-[#d7d2cf]">
            {event.description}
          </p>
          <p className="mt-4 text-base leading-7 text-[#d7d2cf]">
            {event.secondaryDescription}
          </p>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#a7a0a0]">
              Keynote Speakers
            </h3>
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#ffb3ad]">
              View All (18)
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {event.speakers.map((speaker) => (
              <div
                key={speaker.name}
                className="rounded-2xl border border-white/10 bg-[#1f1f1f] p-3 text-center"
              >
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  width={64}
                  height={64}
                  className="mx-auto h-16 w-16 rounded-full object-cover ring-2 ring-[#2a2a2a]"
                />
                <div className="mt-3">
                  <p className="text-base font-semibold text-[#f3f0ee]">
                    {speaker.name}
                  </p>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[#ffb3ad]">
                    {speaker.role}
                  </p>
                  <p className="mt-1 text-sm text-[#a7a0a0]">
                    {speaker.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[#a7a0a0]">
            Curated Track Agenda
          </h3>

          <div className="space-y-3">
            {event.agenda.map((item) => (
              <div
                key={`${item.time}-${item.title}`}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#1f1f1f] p-3"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2a2a2a] text-sm font-medium text-[#ffb3ad]">
                  {item.time}
                </div>
                <div className="min-w-0">
                  <p className="text-base font-medium text-[#f3f0ee]">
                    {item.title}
                  </p>
                  <p className="text-sm text-[#a7a0a0]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        id="panel-gallery"
        role="tabpanel"
        aria-labelledby="tab-gallery"
        className={activeTab === "gallery" ? "mt-6 flex flex-col gap-3" : "hidden"}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="text-[15px] font-medium text-[#f3f0ee]">
            Past Summit Impressions
          </span>
          <span className="font-mono text-[11px] text-[#a7a0a0]">
            {event.galleryCount} High-Res Frames
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {event.galleryPreview.map((photo, index) => {
            const isLast = index === event.galleryPreview.length - 1;

            return (
              <div
                key={photo.image}
                className="relative aspect-square overflow-hidden rounded-xl bg-[#2a2a2a]"
              >
                <Image
                  src={photo.image}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover"
                />

                {isLast ? (
                  <Link
                    href={galleryHref}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-[#131313]/70 backdrop-blur-sm transition hover:bg-[#131313]/80"
                  >
                    <span className="text-xl font-bold text-[#f3f0ee]">
                      +{event.galleryCount - event.galleryPreview.length}
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#ffb3ad]">
                      Explore Gallery
                    </span>
                  </Link>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div
        id="panel-perks"
        role="tabpanel"
        aria-labelledby="tab-perks"
        className={activeTab === "perks" ? "mt-6 flex flex-col gap-4" : "hidden"}
      >
        <div className="relative h-44 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#1f1f1f] via-[#1a2020] to-[#131313] shadow-md">
          <div className="absolute -top-10 -right-10 h-36 w-36 rounded-full border border-[#ff5451]/20 bg-[#ff5451]/10" />
          <div className="absolute -bottom-14 -left-10 h-40 w-40 rounded-full border border-white/10 bg-white/5" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
            <span className="material-symbols-outlined text-[32px] text-[#ffb3ad]">
              location_on
            </span>
            <span className="text-sm font-medium text-[#f3f0ee]">
              Suntec Singapore Convention Centre
            </span>
            <span className="font-mono text-[11px] text-[#a7a0a0]">
              1 Raffles Blvd, Singapore 039593
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-xl bg-[#1f1f1f] p-3.5">
          <span className="text-[15px] font-semibold text-[#f3f0ee]">
            Suntec Singapore Convention Centre
          </span>
          <span className="text-[13px] text-[#a7a0a0]">
            1 Raffles Blvd, Singapore 039593
          </span>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="rounded bg-[#2a2a2a] px-2 py-0.5 font-mono text-[11px] text-[#f3f0ee]">
              MRT: Promenade (CC4/DT15)
            </span>
            <span className="rounded bg-[#2a2a2a] px-2 py-0.5 font-mono text-[11px] text-[#ffb3ad]">
              Hall 401-404
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#a7a0a0]">
            Pass Inclusions
          </h3>

          <div className="grid gap-2">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="flex items-center gap-3 rounded-xl bg-[#1f1f1f] p-3"
              >
                <span className="material-symbols-outlined text-[#ffb3ad]">
                  {perk.icon}
                </span>
                <div className="flex flex-col">
                  <span className="text-[15px] font-medium text-[#f3f0ee]">
                    {perk.title}
                  </span>
                  <span className="text-[13px] text-[#a7a0a0]">
                    {perk.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
