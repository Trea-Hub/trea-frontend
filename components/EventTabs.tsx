"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { EventDetail } from "@/lib/events";

type TabId = "overview" | "gallery";

export function EventTabs({
  event,
  galleryHref,
}: {
  event: EventDetail;
  galleryHref: string;
}) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const hasGallery = event.galleryCount > 0 && event.galleryPreview.length > 0;
  const tabs: { id: TabId; label: string }[] = [
    { id: "overview", label: "Overview" },
    ...(hasGallery
      ? [{ id: "gallery" as const, label: `Gallery (${event.galleryCount})` }]
      : []),
  ];

  return (
    <div>
      {tabs.length > 1 ? (
        <div
          className={`grid ${tabs.length === 2 ? "grid-cols-2" : "grid-cols-1"} gap-1 rounded-xl bg-[#111111] p-1`}
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
      ) : null}

      <div
        id="panel-overview"
        role="tabpanel"
        aria-labelledby="tab-overview"
        className={
          activeTab === "overview"
            ? tabs.length > 1
              ? "mt-6 flex flex-col gap-6"
              : "flex flex-col gap-6"
            : "hidden"
        }
      >
        <div className="rounded-2xl border border-white/10 bg-[#1f1f1f] p-4">
          <h3 className="mb-3 text-xl font-semibold tracking-tight text-[#f3f0ee]">
            About This Event
          </h3>
          <p className="text-base leading-7 text-[#d7d2cf]">
            {event.description}
          </p>
          {event.secondaryDescription ? (
            <p className="mt-4 text-base leading-7 text-[#d7d2cf]">
              {event.secondaryDescription}
            </p>
          ) : null}
        </div>

        {event.tags.length > 0 ? (
          <div>
            <h3 className="mb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[#a7a0a0]">
              Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-[#1f1f1f] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[#ffb3ad]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {event.speakers.length > 0 ? (
          <div>
            <h3 className="mb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[#a7a0a0]">
              Keynote Speakers
            </h3>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
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
        ) : null}

        {event.agenda.length > 0 ? (
          <div>
            <h3 className="mb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[#a7a0a0]">
              Curated Track Agenda
            </h3>

            <div className="grid gap-3 lg:grid-cols-2">
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
        ) : null}
      </div>

      {hasGallery ? (
        <div
          id="panel-gallery"
          role="tabpanel"
          aria-labelledby="tab-gallery"
          className={activeTab === "gallery" ? "mt-6 flex flex-col gap-3" : "hidden"}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[15px] font-medium text-[#f3f0ee]">
              Event Gallery
            </span>
            <span className="font-mono text-[11px] text-[#a7a0a0]">
              {event.galleryCount} High-Res Frames
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
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
      ) : null}
    </div>
  );
}
