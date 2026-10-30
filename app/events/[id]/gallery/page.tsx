"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const galleryPhotos = [
  {
    id: 1,
    title: "Keynote Stage",
    author: "@alex_dev",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD6RrOiiaG13JtOw-PzN50RUfChvWkhE1fGavfE6bZRqzIazszdfzVzNFAzDqrf8qssl6PvM0ZuUfv28qeyEuMLZkhmMAXEYDC-psQ9e9r_6g5rSjkFRu4aWbe22g2btm3HzOYuwYhgRIewrVtebwy9_VERa71uiIcCPzhaKV7ZCHLUd_HyjbCz2gm1th8sWrvYzlv5tF2PB5JacSti3q5GgItbFi5puZjEuohQw8CuhzQ6MHqLzxEm",
    likes: 48,
    category: "Keynotes",
    verified: true,
    ipfs: "QmX8...3bFa9",
  },
  {
    id: 2,
    title: "Hackers in Action",
    author: "@noah_code",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDhKZiPrZn4l5BYZS3br_kev61_Nxek5v1bA4B_6qRw_I-UMvkwLHgygArT2jA5p7GSCvUBJKUJDW-BhM7Q7VxJw42cY15NgQ422e3f6MY64IBaHafqq3M1vKExRPD0ifpU-i6FoELeInVe4TjX8ZBwQpvXHUCn1G_gnipDX28uR01QWqCFUoHPc2TZivk_cTNyE9mE9eDyc07t0VdAlgqLWxarexcM1_SBUE46Gcxsr9-4CrgmEd-I",
    likes: 32,
    category: "Hacker Demos",
    verified: true,
    ipfs: "QmTa...2dB8c",
  },
  {
    id: 3,
    title: "Evening Drinks Reception",
    author: "@sora_j",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC807r2iVpjcAFosWppL3VLDlBsIeig1ttRbBfoWZDCeisCy9EfboV9Anrku0Npj34Nl-H_Mth239UgV1KPqfe52SL3Us1Inw172frrIM4fKYgQFp_33fb4GBd_Vy_0YHpoOLwmZcUvi93oQyjf2QPZXIFqEfBzYLQOQf19yMKOEih1GK8EueURdGgTAXzw_FCujj10P8__qvHMHxQGHCx8tw7kcMc9wBLNos3TlBJ6oZim_8lsaWrJ",
    likes: 64,
    category: "Afterparty",
    verified: true,
    ipfs: "QmFc...9eA7d",
  },
  {
    id: 4,
    title: "Speaker Panel",
    author: "@mila_ri",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAoGXUnzBrro-23WrT-NlnsozLL25uGqv6qCig3VcDrH-N4yDlam6ANO4MP6ZQFNrypj90WLf3aWKvCPcYfhSMnijG6F_WBJh5YkRfMRw8pv-WdBrTE1NLQMakWzCecXB_vpSe6KIk4FLSPDTuJGn64Dv6pkgYS1wUuRO9o2bypvw6VMyKDIfv--emALqjbaLwhAaPKYsO",
    likes: 27,
    category: "Keynotes",
    verified: true,
    ipfs: "QmDq...1rL6a",
  },
  {
    id: 5,
    title: "Group Celebration",
    author: "@founderclub",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBvy5NRIfVm2xNGQzk6tnqzN94lvwxaO7olyBP1PDZXr5WbEeHfQUssehS5dKam5WH4ycT2hBV11HtgmFBtxxTTUvLrxzaQWSAM-wicHv4S3VfhlKP4pOMjOPeFVt7NB2A20aaUuK8Fl4gCayA4RydAXljKRxT1aoxHJJEuGWhm2XFjPi_AumIlm1Z5Rw7ZmA1aCaTAL7aOaBLiZuL7woe9sN3HV6Db68qebcqsa9VLF23QImpPqKsr",
    likes: 51,
    category: "Community",
    verified: true,
    ipfs: "QmHn...8nP2d",
  },
];

const filterTabs = ["All (86)", "Keynotes (28)", "Hacker Demos (31)", "Afterparty (19)", "Networking (8)"];

export default function EventGalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof galleryPhotos)[number] | null>(null);
  const [likedIds, setLikedIds] = useState<number[]>([1]);

  const photos = useMemo(() => galleryPhotos, []);

  const toggleLike = (id: number) => {
    setLikedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <main className="min-h-screen bg-[#131313] text-[#e5e2e1]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#131313]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Image
              src="https://lh3.googleusercontent.com/aida/AEtjO1Ww40inGHjn46emaG6LBQY79iEHtmTgVhg8v6vqY3WwChhc1qPp14wKDGsNMV36DVrsONIOD119spGawqKWRz6G9ezqfkZG9Na8fLhJHqaSuiuFSzehriQ9wfKuc5IdOV51Mp0ySF0_DLf44uYaZhOiHI1wss09H5bmiTM2-_JuRFmEVeA8jEzQiwh8o5Jde_vxkZ_jg8IK7UjiwA612NzvF_fX6VTEXUqhAXocRyRj6AluZQHM18yF0jw"
              alt="Trea Logo"
              width={32}
              height={32}
              unoptimized
              className="h-8 w-auto object-contain"
            />
            <span className="text-xl font-semibold tracking-tight text-[#f3f0ee]">Trea</span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#2a2a2a] px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ffb3ad]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#d7d2cf]">
              Stellar Mainnet
            </span>
          </div>

          <div className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-white/10">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFuXodJxvy-va-78PTdiU8ZhKQdHyJwQNqNFdepsOWnUrq659A3aTmf7VBKewRz1Tv6NauE_5vI8gnVfo7SP3O_hkMHlTTrXnfSBuJcS6CoLuhoLo3043VL5ngYQ92abrNW0b_0lKFuIRAJmI3WdBX3fm3vNsEpfMcQmm0A8-1iaJZ9MG-_siQsr6lnhHu3QoLo8urCkVnNInmNoEj4cEtpxrHwmgrhw4RZrejct814COaDYLwlHix"
              alt="Profile"
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-20 sm:px-6 lg:px-8">
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-3">
              <Link
                href="/events/meridian-2025"
                aria-label="Back to event detail"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2a2a2a] text-[#f3f0ee] transition hover:bg-[#323232]"
              >
                ←
              </Link>
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-[#f3f0ee] sm:text-2xl">
                  Meridian Summit 2025
                </h1>
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#a7a0a0]">
                  Community Gallery • 86 Photos
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
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff5451] px-4 py-3 text-base font-semibold text-[#1d0d0d] transition hover:bg-[#ff6e66]"
            >
              <span>📷</span>
              <span>Upload Event Photos</span>
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {filterTabs.map((tab, index) => (
              <button
                key={tab}
                type="button"
                className={[
                  "shrink-0 rounded-full px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.15em] transition",
                  index === 0
                    ? "bg-[#ff5451]/20 text-[#ffd6d1]"
                    : "bg-[#2a2a2a] text-[#a7a0a0] hover:bg-[#323232] hover:text-[#f3f0ee]",
                ].join(" ")}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {photos.map((photo, index) => {
              const isLiked = likedIds.includes(photo.id);

              return (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setSelectedPhoto(photo)}
                  className={[
                    "group relative overflow-hidden rounded-2xl border border-white/10 bg-[#1f1f1f] text-left shadow-[0_16px_30px_rgba(0,0,0,0.18)]",
                    index === 0 ? "sm:col-span-2" : "",
                  ].join(" ")}
                >
                  <div className={`relative ${index === 0 ? "h-60 sm:h-72" : "h-44 sm:h-52"}`}>
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
        </div>
      </main>

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
    </main>
  );
}
