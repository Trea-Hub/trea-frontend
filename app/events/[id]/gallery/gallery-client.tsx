"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useNotifications } from "@/components/Notifications";
import type { DemoEventPhoto } from "@/lib/demo-data";

type GalleryClientProps = {
  eventId: string;
  eventTitle: string;
  galleryCount: number;
  photos: DemoEventPhoto[];
};

export function GalleryClient({
  eventId,
  eventTitle,
  galleryCount,
  photos: allPhotos,
}: GalleryClientProps) {
  const { notify } = useNotifications();
  const [selectedPhoto, setSelectedPhoto] = useState<DemoEventPhoto | null>(null);
  const [likedIds, setLikedIds] = useState<string[]>(
    allPhotos.length > 0 ? [allPhotos[0].id] : [],
  );
  const [activeFilter, setActiveFilter] = useState("All");
  const categories = useMemo(
    () => Array.from(new Set(allPhotos.map((photo) => photo.category))),
    [allPhotos],
  );
  const photos = useMemo(
    () =>
      activeFilter === "All"
        ? allPhotos
        : allPhotos.filter((photo) => photo.category === activeFilter),
    [activeFilter, allPhotos],
  );
  const filterTabs = useMemo(
    () => [
      { label: `All (${allPhotos.length})`, value: "All" },
      ...categories.map((category) => ({
        label: `${category} (${allPhotos.filter((photo) => photo.category === category).length})`,
        value: category,
      })),
    ],
    [allPhotos, categories],
  );

  const toggleLike = (id: string) => {
    setLikedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <AppShell
      active="gallery"
      backHref={`/events/${eventId}`}
      backLabel="Back to event detail"
      maxWidth="6xl"
    >
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-[#f3f0ee] sm:text-2xl">
                  {eventTitle}
                </h1>
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#a7a0a0]">
                  Community Gallery • {galleryCount} Photos
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#272727] px-3 py-1.5">
              <span className="text-sm text-[#ffb3ad]">✓</span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#f3f0ee]">Verified</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#1f1f1f] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2a2a2a] text-[#ffb3ad]">
                ✦
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-[#f3f0ee]">
                    Attendee Badge #TREA-9482 Active
                  </p>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff5451]" />
                </div>
                <p className="text-sm text-[#a7a0a0]">Your photos are linked to your attendance NFT.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#1f1f1f] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.18)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-[#f3f0ee]">
                  Contribute Your Highlights
                </h2>
                <p className="mt-1 text-sm text-[#a7a0a0]">
                  Immutably anchored to IPFS and linked to your attendance NFT
                </p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2a2a2a] text-[#a7a0a0]">
                ⤴
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                notify({
                  tone: "success",
                  title: "Upload ready",
                  message:
                    "Demo mode: photo uploads will be pinned to IPFS once the backend is connected.",
                })
              }
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff5451] px-4 py-3 text-base font-semibold text-[#1d0d0d] transition hover:bg-[#ff6e66]"
            >
              <span>📷</span>
              <span>Upload Event Photos</span>
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveFilter(tab.value)}
                className={[
                  "shrink-0 rounded-full px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.15em] transition",
                  activeFilter === tab.value
                    ? "bg-[#ff5451]/20 text-[#ffd6d1]"
                    : "bg-[#2a2a2a] text-[#a7a0a0] hover:bg-[#323232] hover:text-[#f3f0ee]",
                ].join(" ")}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {photos.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#1f1f1f] p-8 text-center">
              <p className="text-sm text-[#a7a0a0]">
                No photos in this gallery yet.
              </p>
            </div>
          ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo, index) => {
              const isLiked = likedIds.includes(photo.id);

              return (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setSelectedPhoto(photo)}
                  className={[
                    "group relative overflow-hidden rounded-2xl border border-white/10 bg-[#1f1f1f] text-left shadow-[0_16px_30px_rgba(0,0,0,0.18)]",
                    index === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : "",
                  ].join(" ")}
                >
                  <div
                    className={`relative ${
                      index === 0
                        ? "h-60 sm:h-72 lg:h-[35rem]"
                        : "h-44 sm:h-52 lg:h-[17rem]"
                    }`}
                  >
                    <Image
                      src={photo.image}
                      alt={photo.title}
                      fill
                      sizes={index === 0 ? "(max-width: 640px) 100vw, 768px" : "(max-width: 640px) 50vw, 384px"}
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/90 via-transparent to-transparent" />
                  </div>

                  {index === 0 ? (
                    <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-[#111111]/75 px-2.5 py-1 backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#ff5451]" />
                      <span className="text-[10px] uppercase tracking-[0.14em] text-[#f3f0ee]">
                        {photo.category}
                      </span>
                    </div>
                  ) : null}

                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2a2a2a] text-[10px] font-medium text-[#f3f0ee]">
                        {photo.author.slice(1, 3).toUpperCase()}
                      </div>
                      <span className="text-[11px] font-medium text-[#f3f0ee]">{photo.author}</span>
                    </div>

                    <div className="inline-flex items-center gap-1 rounded-md bg-[#111111]/70 px-2 py-1 text-[11px] font-medium text-[#ffb3ad]">
                      <span>{isLiked ? "♥" : "♡"}</span>
                      <span>{photo.likes + (isLiked ? 1 : 0)}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          )}
        </div>

      {selectedPhoto ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0e0e0e]/90 p-4 backdrop-blur-md"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#1f1f1f] shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#2a2a2a] p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff5451]/20 text-[10px] font-medium uppercase tracking-[0.12em] text-[#ffd6d1]">
                  AD
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#f3f0ee]">{selectedPhoto.author}</p>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[#a7a0a0]">
                    2 hours ago • Verified Ticket Holder
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close lightbox"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1d1d1d] text-[#d7d2cf] transition hover:bg-[#2d2d2d]"
              >
                ×
              </button>
            </div>

            <div className="relative h-72 sm:h-80">
              <Image
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                fill
                sizes="(max-width: 640px) 100vw, 896px"
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 rounded-full bg-[#111111]/80 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-[#d7d2cf]">
                IPFS: {selectedPhoto.ipfs}
              </div>
            </div>

            <div className="space-y-4 p-4">
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => toggleLike(selectedPhoto.id)}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#2a2a2a] px-3 py-2 text-sm font-medium text-[#ffb3ad]"
                >
                  <span>{likedIds.includes(selectedPhoto.id) ? "♥" : "♡"}</span>
                  <span>{(selectedPhoto.likes + (likedIds.includes(selectedPhoto.id) ? 1 : 0))} likes</span>
                </button>

                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#2a2a2a] px-3 py-2 text-sm font-medium text-[#f3f0ee]"
                >
                  <span>𝕏</span>
                  <span>Share on X</span>
                </a>
              </div>

              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-[#a7a0a0]">
                <span>Trea Proof ID: 0x9482...e71c</span>
                <span className="inline-flex items-center gap-2 text-[#ffb3ad]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff5451]" />
                  Stellar L1 Finalized
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </AppShell>
  );
}
