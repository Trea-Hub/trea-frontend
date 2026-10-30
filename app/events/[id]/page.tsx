import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EventTabs, type EventDetail } from "@/components/EventTabs";

const eventCatalog: Record<string, EventDetail> = {
  "meridian-2025": {
    id: "meridian-2025",
    title: "Meridian 2025",
    subtitle: "Global Blockchain Summit",
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDD3PyOSBsu7GFwail5tFeV3vfXECmRLu1awHhUazLF-OouIE23gjNg3QXw-ValRo3RotD1X55a-iBoavdYZsu0I5kG3T3xLd9bP3kWVqimymnUe9N_h3Y9AdDXP_Yrg0qsPXyzIwi2Ex6riYUGLJQ62lJHOIrbf8OLSbMxd-XTXCEQUeE547s41yViTSfiWkJCFhNplWw5OFp53sTbJyDW75RlpVoec0FDTV0Vt4Wup8vhvpEb4l9c",
    category: "Live Registration",
    date: "Oct 14 – 16, 2025",
    schedule: "09:00 AM – 07:30 PM SGT (Daily Sessions)",
    location: "Suntec Convention Center, Singapore",
    format: "Level 4 Halls & Global Live Soroban Stream",
    price: "120 XLM",
    currency: "(~$45 USD)",
    badge: "Free Tier Live",
    seats: "785 / 1,000",
    filled: 78.5,
    filledWidthClassName: "w-[78.5%]",
    description:
      "Meridian 2025 converges over 1,000 decentralized architects, DeFi engineers, and institutional leaders in Singapore. Over three intensive days, immerse yourself in hands-on Soroban smart contract workshops, high-throughput financial protocol rollouts, and verifiable zero-knowledge identity demonstrations.",
    secondaryDescription:
      "Gain immediate early-bird access to newly deployed Stellar asset anchor frameworks and interact directly with Core Protocol maintainers.",
    speakers: [
      {
        name: "Dr. Elena Rostova",
        role: "Head of Protocols",
        company: "Stellar Dev Foundation",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBEY82L9JW6ehpWwLChLYJI3MIQlWgGtGgZT53DDtG_pAc75KX9wZli39kjCBDSVHW8IhKGl-1v4uxO1R9didtbp5_fTPv3EpyQkeGs6GrWIMPn-QouJ7Ioec_u9omo95HeOKfZ0OBGmBFARupWTqBDko3VTi8jQKgJ7Nu8aqt33rZbXPM4fWM6NmS1RobLFCzOLzvyHTkBeRwtTgNFX7xnhv_1l4TQKurJAv3R3CM9ttjw6cl4EiC0",
      },
      {
        name: "Marcus Vance",
        role: "Lead Soroban Arch",
        company: "Soroban Labs",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuD6KuZppa8rsNIVVyGRR_ppfBZ8XPfeZ_90xxctAHbdo-tsHzNkiIwQ15YXdX7hjvXHjN3sVkVf5wNzA5g-2r92yoEZ66kSYa9cNhX8JvagXYkTUvw68Z54qlOWQ0aFtVInaS-AvVrD_9q8lCcD0vX6jsd9DDlsssChFAn6WxGV52z4YVft3mqdPgG3j1I8Fx7BqQ1AEA90wCHK59tVPmiDF-DCHf0V4g9hVybkaGl_RoSW1nY5TumG",
      },
    ],
    agenda: [
      { time: "09:00", title: "Opening Keynote", detail: "Meridian network layer overview" },
      { time: "11:30", title: "Soroban Breakouts", detail: "Smart contract acceleration labs" },
      { time: "14:00", title: "Institutional Roundtable", detail: "Asset rails and compliance design" },
    ],
    galleryCount: 24,
    galleryPreview: [
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCGtvHYPVDz9WanUeYpLmXfLBIRMMz7467Oswe53z9Dr2o-uqZmizmiMH8QH8ZZfWCQYfwtC1sNEGwppU1Z9gQefKfa-YTRCq4C6omnRKML3geOrHsQ1SF0eHOSF6kx0JXbgWRbUZPXeTp0qRvRaJGDl3LRzz58HpkLyDJ5DgX6c_wXju7oYwloo6Rf-sDqJR7-MLxO3QpeZtxsdUEVQeSUUMV9SpypFVN9a9cwrxipJhZ6n1IEBi8W",
        alt: "Massive illuminated auditorium stage with digital screens displaying Stellar code and vivid red backdrop graphics during an international tech keynote",
      },
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuB6gmu9e3tHskMfl8NhIBQ9oHhpixuBJbv9kBm5IipOpBLhLrFi6YtUK-DLaAw4FQTfMr1vdg8grreM192CFmubng1797MwjYdX134MfVCZ7M2ZRSEJP5oUFFlW6pwfVwyauWtrE_pjtxt68_IuHXPqPtlG7PGUh1LFyvKSU2udUe8G84710fkDeOrjFrdIh3hDVuIdTapMwwdK3_Ljdclz4cwYVuq_tlz3s0p00GpQFCnLyFJnCgH",
        alt: "Vibrant tech hackathon table with diverse young developers coding on laptops surrounded by holographic glowing displays and dark architectural lighting",
      },
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBdPoiOr1d8TxVYK3u-vuDuHOh3oh0ZgxJlPA0HNwXDTmXr4B-vnYd1q9G5ncTatP2ZZ40RdhIMNCh4iQ1OFaT6sDpnK-lklPjzGMD0qsvLD0mwwgDdaaSsk6FYUAEOdiFF9LoeDkPNZotFCI48H1NWi5BtwVzNDzvLJNZLwStiimJDzINHjA-24OY5BwIZ2KFsReea-xinZ8ZoPFZ1DpyRL0an03arpH3QtEbNMZ3yMVvD0h5P9xt5",
        alt: "Evening rooftop party overlooking Singapore Marina Bay Sands skyline with crypto summit guests holding glowing crimson badge passes",
      },
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuATC13VLuDxnfHXINfYeYIAWjrzmlWASr_pdvg7Il1Mulqsayn2UG9Bir5wjbQC99YKa3EYmjrwe2-91l7RX-lb2C2IwJTABoiOa5EDgBqb2YG01qXhEdEGcdzOY3ZIwykqXqlFNS3fsa8eQFIFMOeGexAae36Lftfqn0ldIb1t97QeY7jziJYTyQPkoPHBcGfqBlqN_OT7SYKVfEfMCOBuAMtwYZYYTjsRCvNn-QvTXYHl5W9-ecEm",
        alt: "Close up of a physical VIP metallic on-chain NFC badge glowing softly with engraved Stellar network symbols",
      },
    ],
  },
};

function IconButton({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2a2a2a]/80 text-[#e5e2e1] backdrop-blur-md transition hover:bg-[#343434]"
    >
      {children}
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#a7a0a0]">
      {children}
    </span>
  );
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = eventCatalog[id as keyof typeof eventCatalog];

  if (!event) {
    notFound();
  }

  const checkoutHref = `/events/${event.id}/checkout`;
  const galleryHref = `/events/${event.id}/gallery`;

  return (
    <main className="min-h-screen bg-[#131313] text-[#e5e2e1]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#131313]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              aria-label="Go back to home"
              className="flex h-11 w-11 items-center justify-center rounded-full text-[#e5e2e1] transition hover:bg-white/5"
            >
              <span className="text-xl">←</span>
            </Link>
            <Image
              src="https://lh3.googleusercontent.com/aida/AEtjO1Ww40inGHjn46emaG6LBQY79iEHtmTgVhg8v6vqY3WwChhc1qPp14wKDGsNMV36DVrsONIOD119spGawqKWRz6G9ezqfkZG9Na8fLhJHqaSuiuFSzehriQ9wfKuc5IdOV51Mp0ySF0_DLf44uYaZhOiHI1wss09H5bmiTM2-_JuRFmEVeA8jEzQiwh8o5Jde_vxkZ_jg8IK7UjiwA612NzvF_fX6VTEXUqhAXocRyRj6AluZQHM18yF0jw"
              alt="Trea Logo"
              width={28}
              height={28}
              unoptimized
              className="h-7 w-auto object-contain"
            />
          </div>

          <h1 className="flex-1 truncate px-2 text-center text-base font-semibold tracking-tight text-[#f3f0ee] sm:text-lg">
            Event Detail
          </h1>

          <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full ring-1 ring-white/10">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFuXodJxvy-va-78PTdiU8ZhKQdHyJwQNqNFdepsOWnUrq659A3aTmf7VBKewRz1Tv6NauE_5vI8gnVfo7SP3O_hkMHlTTrXnfSBuJcS6CoLuhoLo3043VL5ngYQ92abrNW0b_0lKFuIRAJmI3WdBX3fm3vNsEpfMcQmm0A8-1iaJZ9MG-_siQsr6lnhHu3QoLo8urCkVnNInmNoEj4cEtpxrHwmgrhw4RZrejct814COaDYLwlHix"
              alt="Profile"
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-20 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[28px] border border-white/10 bg-[#1b1b1b] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
          <div className="relative h-[280px] sm:h-[350px] md:h-[420px]">
            <Image
              src={event.coverImage}
              alt={event.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1152px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/40 to-transparent" />
            <div className="absolute inset-x-4 top-4 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#232323]/80 px-3 py-1.5 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-[#ff5451] shadow-[0_0_12px_rgba(255,84,81,0.9)]" />
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#f3f0ee]">
                  {event.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <IconButton label="Share event">↗</IconButton>
                <IconButton label="Bookmark event">★</IconButton>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-4 sm:p-5 lg:grid-cols-[1.5fr_0.9fr] lg:p-6">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[#d7d2cf]">
                <span className="rounded-md bg-[#2a2a2a] px-2 py-1.5 text-[#f3f0ee]">{event.date}</span>
                <span className="rounded-md bg-[#ff5451]/20 px-2 py-1.5 text-[#ffb3ad]">
                  {event.subtitle}
                </span>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl font-semibold tracking-tight text-[#f3f0ee] sm:text-4xl">
                  {event.title}
                </h2>
                <p className="max-w-2xl text-base leading-7 text-[#d7d2cf]">
                  {event.description}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-[#1f1f1f] p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2a2a2a] text-[#ffb3ad]">
                      📅
                    </div>
                    <div className="min-w-0">
                      <SectionLabel>Date & Schedule</SectionLabel>
                      <p className="mt-1 text-sm font-medium text-[#f3f0ee]">{event.date}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#a7a0a0]">{event.schedule}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#1f1f1f] p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2a2a2a] text-[#ffb3ad]">
                      📍
                    </div>
                    <div className="min-w-0">
                      <SectionLabel>Venue & Format</SectionLabel>
                      <p className="mt-1 truncate text-sm font-medium text-[#f3f0ee]">
                        {event.location}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-[#a7a0a0]">{event.format}</p>
                </div>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-[#1f1f1f] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2a2a2a] text-[#ffb3ad]">
                      🎫
                    </div>
                    <div>
                      <SectionLabel>Tier Pass</SectionLabel>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-2xl font-semibold text-[#f3f0ee]">{event.price}</span>
                        <span className="text-sm text-[#a7a0a0]">{event.currency}</span>
                      </div>
                    </div>
                  </div>

                  <span className="rounded-full border border-white/10 bg-[#2a2a2a] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-[#ffb3ad]">
                    {event.badge}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#1f1f1f] p-4">
                <div className="mb-3 flex items-center justify-between text-sm text-[#e5e2e1]">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5451]" />
                    <span>Spots Claimed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[#ffb3ad]">{event.seats}</span>
                  </div>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-[#2f2f2f]">
                  <div
                    className={[
                      "h-full rounded-full bg-gradient-to-r from-[#ff5451] to-[#ffb3ad]",
                      event.filledWidthClassName,
                    ].join(" ")}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.12em] text-[#a7a0a0]">
                  <span className="inline-flex items-center gap-1 text-[#ffb3ad]">🔥 High Demand</span>
                  <span>{event.filled}% Filled</span>
                </div>
              </div>

              <div className="space-y-3 rounded-2xl border border-white/10 bg-[#1f1f1f] p-4">
                <Link
                  href={checkoutHref}
                  className="flex w-full items-center justify-center rounded-xl bg-[#ff5451] px-4 py-3 text-center text-base font-semibold text-[#1b0b0c] transition hover:bg-[#ff6b63]"
                >
                  Register Now
                </Link>
                <Link
                  href={galleryHref}
                  className="flex w-full items-center justify-center rounded-xl border border-white/10 bg-[#232323] px-4 py-3 text-base font-medium text-[#f3f0ee] transition hover:bg-[#2a2a2a]"
                >
                  View Gallery ({event.galleryCount})
                </Link>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-6 rounded-[24px] border border-white/10 bg-[#1b1b1b] p-4 sm:p-5 lg:p-6">
          <EventTabs event={event} galleryHref={galleryHref} />
        </section>
      </main>
    </main>
  );
}
