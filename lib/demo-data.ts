import type { EventDetail, EventItem, EventQuery } from "@/lib/events";

export type DemoEventPhoto = {
  id: string;
  title: string;
  author: string;
  image: string;
  alt: string;
  likes: number;
  category: string;
  verified: boolean;
  ipfs: string;
};

export type DemoEventRecord = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  coverImage: string;
  startsAt: string;
  displayDate?: string;
  schedule: string | null;
  location: string;
  format: string | null;
  priceAmount: number;
  currency: "XLM" | "USDC" | null;
  priceNote?: string | null;
  badge: string;
  capacity: number;
  registered: number;
  description: string;
  secondaryDescription: string | null;
  tags: string[];
  listBadge?: string;
  listBadgeClassName?: string;
  speakers: EventDetail["speakers"];
  agenda: EventDetail["agenda"];
  photos: DemoEventPhoto[];
  galleryCount?: number;
};

export type DemoRegistration = {
  id: string;
  eventId: string;
  title: string;
  status: "upcoming" | "past" | "checked-in";
  statusLabel: string;
  date: string;
  location: string;
  pass: {
    kind: "qr" | "access" | "poap";
    label?: string;
    value: string;
    sideLabel?: string;
    badge?: string;
    badgeIcon?: string;
    wallet?: string;
  };
  image: string;
  actionLabel: string;
  actionIcon: string;
  actionVariant: "primary" | "secondary";
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

export type DemoOrganiserStat = {
  label: string;
  value: string;
  suffix: string;
  detail: string;
  icon: string;
  accent?: "primary" | "muted";
  progressClassName?: string;
  progressLabel?: string;
};

export type DemoLiveEvent = {
  kind: "live";
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  statusLabel: string;
  protocolLabel: string;
  claimed: number;
  total: number;
  percentClassName: string;
  percentLabel: string;
  remaining: number;
};

export type DemoDraftEvent = {
  kind: "draft";
  title: string;
  description: string;
  date: string;
  capacity: number;
  updatedAt: string;
  image: string;
};

const IMAGES = {
  meridianCover:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDD3PyOSBsu7GFwail5tFeV3vfXECmRLu1awHhUazLF-OouIE23gjNg3QXw-ValRo3RotD1X55a-iBoavdYZsu0I5kG3T3xLd9bP3kWVqimymnUe9N_h3Y9AdDXP_Yrg0qsPXyzIwi2Ex6riYUGLJQ62lJHOIrbf8OLSbMxd-XTXCEQUeE547s41yViTSfiWkJCFhNplWw5OFp53sTbJyDW75RlpVoec0FDTV0Vt4Wup8vhvpEb4l9c",
  meridianStage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCGtvHYPVDz9WanUeYpLmXfLBIRMMz7467Oswe53z9Dr2o-uqZmizmiMH8QH8ZZfWCQYfwtC1sNEGwppU1Z9gQefKfa-YTRCq4C6omnRKML3geOrHsQ1SF0eHOSF6kx0JXbgWRbUZPXeTp0qRvRaJGDl3LRzz58HpkLyDJ5DgX6c_wXju7oYwloo6Rf-sDqJR7-MLxO3QpeZtxsdUEVQeSUUMV9SpypFVN9a9cwrxipJhZ6n1IEBi8W",
  meridianHackers:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB6gmu9e3tHskMfl8NhIBQ9oHhpixuBJbv9kBm5IipOpBLhLrFi6YtUK-DLaAw4FQTfMr1vdg8grreM192CFmubng1797MwyjYdX134MfVCZ7M2ZRSEJP5oUFFlW6pwfVwyauWtrE_pjtxt68_IuHXPqPtlG7PGUh1LFyvKSU2udUe8G84710fkDeOrjFrdIh3hDVuIdTapMwwdK3_Ljdclz4cwYVuq_tlz3s0p00GpQFCnLyFJnCgH",
  meridianRooftop:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBdPoiOr1d8TxVYK3u-vuDuHOh3oh0ZgxJlPA0HNwXDTmXr4B-vnYd1q9G5ncTatP2ZZ40RdhIMNCh4iQ1OFaT6sDpnK-lklPjzGMD0qsvLD0mwwgDdaaSsk6FYUAEOdiFF9LoeDkPNZotFCI48H1NWi5BtwVzNDzvLJNZLwStiimJDzINHjA-24OY5BwIZ2KFsReea-xinZ8ZoPFZ1DpyRL0an03arpH3QtEbNMZ3yMVvD0h5P9xt5",
  meridianBadge:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuATC13VLuDxnfHXINfYeYIAWjrzmlWASr_pdvg7Il1Mulqsayn2UG9Bir5wjbQC99YKa3EYmjrwe2-91l7RX-lb2C2IwJTABoiOa5EDgBqb2YG01qXhEdEGcdzOY3ZIwykqXqlFNS3fsa8eQFIFMOeGexAae36Lftfqn0ldIb1t97QeY7jziJYTyQPkoPHBcGfqBlqN_OT7SYKVfEfMCOBuAMtwYZYYTjsRCvNn-QvTXYHl5W9-ecEm",
  meridianKeynote:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD6RrOiiaG13JtOw-PzN50RUfChvWkhE1fGavfE6bZRqzIazszdfzVzNFAzDqrf8qssl6PvM0ZuUfv28qeyEuMLZkhmMAXEYDC-psQ9e9r_6g5rSjkFRu4aWbe22g2btm3HzOYuwYhgRIewrVtebwy9_VERa71uiIcCPzhaKV7ZCHLUd_HyjbCz2gm1th8sWrvYzlv5tF2PB5JacSti3q5GgItbFi5puZjEuohQw8CuhzQ6MHqLzxEm",
  meridianDemos:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDhKZiPrZn4l5BYZS3br_kev61_Nxek5v1bA4B_6qRw_I-UMvkwLHgygArT2jA5p7GSCvUBJKUJDW-BhM7Q7VxJw42cY15NgQ422e3f6MY64IBaHafqq3M1vKExRPD0ifpU-i6FoELeInVe4TjX8ZBwQpvXHUCn1G_gnipDX28uR01QWqCFUoHPc2TZivk_cTNyE9mE9eDyc07t0VdAlgqLWxarexcM1_SBUE46Gcxsr9-4CrgmEd-I",
  meridianDrinks:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC807r2iVpjcAFosWppL3VLDlBsIeig1ttRbBfoWZDCeisCy9EfboV9Anrku0Npj34Nl-H_Mth239UgV1KPqfe52SL3Us1Inw172frrIM4fKYgQFp_33fb4GBd_Vy_0YHpoOLwmZcUvi93oQyjf2QPZXIFqEfBzYLQOQf19yMKOEih1GK8EueURdGgTAXzw_FCujj10P8__qvHMHxQGHCx8tw7kcMc9wBLNos3TlBJ6oZim_8lsaWrJ",
  sorobanSpeaker:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD6KuZppa8rsNIVVyGRR_ppfBZ8XPfeZ_90xxctAHbdo-tsHzNkiIwQ15YXdX7hjvXHjN3sVkVf5wNzA5g-2r92yoEZ66kSYa9cNhX8JvagXYkTUvw68Z54qlOWQ0aFtVInaS-AvVrD_9q8lCcD0vX6jsd9DDlsssChFAn6WxGV52z4YVft3mqdPgG3j1I8Fx7BqQ1AEA90wCHK59tVPmiDF-DCHf0V4g9hVybkaGl_RoSW1nY5TumG",
  elena:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBEY82L9JW6ehpWwLChLYJI3MIQlWgGtGgZT53DDtG_pAc75KX9wZli39kjCBDSVHW8IhKGl-1v4uxO1R9didtbp5_fTPv3EpyQkeGs6GrWIMPn-QouJ7Ioec_u9omo95HeOKfZ0OBGmBFARupWTqBDko3VTi8jQKgJ7Nu8aqt33rZbXPM4fWM6NmS1RobLFCzOLzvyHTkBeRwtTgNFX7xnhv_1l4TQKurJAv3R3CM9ttjw6cl4EiC0",
  workshop:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAjRBRZLRcefetia273W4srtIJXJJKsyFdzjOrH7x--dhAnJxrz205L316NzrJBsuuXdG8B6BiYmjnLkUWaWZk1-x0WKPlAj5qufksXIK9ifyqYpdce68sVBlHJc8YONKwLmVwkjMPK-c0rZbxvQzsOBnOO9WwQ7-yHpF_YqQ7tafyzmFxfDkq4ScEKboCZbjDmdI9q0D8s10WeG7S8GXbsiryU0GAK4JQSZ7cguqbPdeGKUvnEC-6j",
  workshopAttendee:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDbYw3O4o67IQU-Bj2atttmu1wSF7qe6X0e16ujpwBuiX8eFMhaMggra9DN8NAt8c8baG3Wt-4ifWAfuiVx4m5vgl-PM60OHqhO6s4knNKhPVjBnwZC3HN5GsW8m_uVuJpa5wn91JJnO38DYzb8CVVSqyA_0MTRindxlmKb2f2yZdeMkOC00bCs8YNtB1cq7MU-kOzqQ50H3vLHkTeEPmMruVT6l6oN5MMhTeY44GZRL6KQEtbGb3Ev",
  panel:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAoGXUnzBrro-23WrT-NlnsozLL25uGqv6qCig3VcDrH-N4yDlam6ANO4MP6ZQFNrypj90WLf3aWKvCPcYfhSMnijG6F_WBJh5YkRfMRw8pv-WdBrTE1NLQMakWzCecXB_vpSe6KIk4FLSPDTuJGn64Dv6pkgYS1wUuRO9o2bypvw6VMyKDIfv--emALqjbaLwhAaPKYsO",
  celebration:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBvy5NRIfVm2xNGQzk6tnqzN94lvwxaO7olyBP1PDZXr5WbEeHfQUssehS5dKam5WH4ycT2hBV11HtgmFBtxxTTUvLrxzaQWSAM-wicHv4S3VfhlKP4pOMjOPeFVt7NB2A20aaUuK8Fl4gCayA4RydAXljKRxT1aoxHJJEuGWhm2XFjPi_AumIlm1Z5Rw7ZmA1aCaTAL7aOaBLiZuL7woe9sN3HV6Db68qebcqsa9VLF23QImpPqKsr",
  rave:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCkXb72YVs5DXpll9LZ-Npyk69jsrh3_YHgRE7bhw7mLCwX7gD7x-C09-G6H0xSC_eoMZedEEBP9AI6nUV4u3N3c0E4FOP3pr4P1pbKtvYhpyU2cW4VIy-U4OgniTiLoX2qBvpSsF11g_ts4mmG-JsI4f1n9uLrV7k_RAOyZmlAhNc3K8NDZgq4uAGqfIwDvs6m5S-swA4SG2HTX440mCLIw_6SGI_81yxI-bFyKfVTtQLjV7P-ps70",
  austin:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDupdq02pr5hIaWrc5X64zvm_08-AkHGsfEvbseyO_QtRX9APEEYi0x9AC6Os4A6osoUZ9vqUJ808Sdox2aqKPR7MmjwtTGPiWhu4aDaLNI3NO3vm2wRQg0oNd0AXrZVPAjhfw5Y4uXet5ofdAy_Z9zHBMAU65R7xhMYV6NyCAqWxmjyH-BvY3Mrile_E-x_THwT8fNEO4Urr6YH0DxtJlUdVbQ1h9mfyEI2vLcJhGnP7fqtcQlnoOS",
  neoKyoto:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBXZXTizrH1hXgxAxv5NzwmvkPwxnKW_vZiuZoHku3TuTuFkkygFTT8ezCpAMqUNSIRIwhg8iTFMOTpXjkDLsH7p3iRbjxFC4Ppol-LXUDLbs_LmoghZIX9ZvELanv9X9DqB2tCPEZZMurlTT2J508z4-ADgq8K-0nwWCZJ1Ix5BtuD5ET1a4MZo7v_gePUCunkqSO_QPThdciqvEJgyGYopb1miNFZw28nxzdjAWtflC4-Y69T3iKb",
  hackNight:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDl_DfmCrmk68q-X52vPEpVL_-52kK1vAo8-q1rLXRQpWwtv1QiLE0h9lENEptVpdIx98LRcAApLnJ17VcsEE8dpiBterHPcsoQ9wl9PFXBpKm1Gvj3iNAPRCgwgRTCqg6UX_KuJ2kwV3NYwuo2xmdSThfZRblM-8H3bMSYjCAUCpM2pItfQa4G0k8_2mfLbwSOtpKasS2brHlsUq5ktuiPJW1UplGISWJfnw_UyYHPQc4pw4YOzGS9",
  liveMeridian:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBrYkxkwgXOcpYmMwQ9or-ChzfhpeCVTAA34R7dpj9gg7Sg31OwJ7CILyqJi3H-2g8hH-HKYipITlCnL4h0kif0KSIey2JHXTt8tljX6ehEFZhReJDXUfFB3py33Bo4YLS8sZSpcYrwcSdS5jHlUlknnO3NM0xThdga7S2Q9_yjzdfuJ0h0mb2ka8yIIAPwupOB0Op2a4TEcZlj1TpojrEEGXziRfCf7t-hWelNkKzSkL08eaJnR6sJ",
  pass:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDxpqMMXq5wsOQxn0XHTLg0U2CxVIIWzLh9kxhDWnLoea2LyX32dt-Ak0oXLvQG5y9pKUCKzPSl6jBPVs5lQQcVmYjrykXiFE7fE1Go1xCpiJFhyslA8ZQOl7h73IYsCysndToZqBDafmSKrSYZK-Ja4C1Et-hMF2XVcqLeJQ-IkX8PdfCnqqdiDmop9s1VbwV-lqDTqS7FPFGQu-QnYghiSRgr",
  meridianDashboard:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDAGSGk_hHT8whBJgDBDUPqWioBqwPaAuQkZzs8g-u_FI_0oFrp8kLzZHz56xncK2Bdym-xfql8KW5wyEtSkTsTHlk5h0DS9LbONv0Obv7pZmKBTmBJ7jwQ_wZ4IL95Wifqt3mw84t-IzMihd_jAjRxZTU88z7WMI2I6zRzEXirZKDMqDV8wVBbnfy9aOFeUwnTAS1xvaSXOGi8PD3-n0KIyTGeFAkgE7F1IXrNkLeqmSKchgAkidtL",
} as const;

function getUpcomingWeekendStart() {
  const now = new Date();
  const day = now.getDay();
  const date = new Date(now);

  if (day === 0 || day === 6) {
    date.setHours(20, 0, 0, 0);
    return date;
  }

  date.setDate(date.getDate() + (6 - day));
  date.setHours(20, 0, 0, 0);
  return date;
}

function getFutureDate(daysFromNow: number, hour: number) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hour, 0, 0, 0);
  return date;
}

function toIso(date: Date) {
  return date.toISOString();
}

const weekendRave = getUpcomingWeekendStart();
const sorobanWorkshopDate = getFutureDate(10, 10);
const hackNightDate = getFutureDate(18, 18);

function formatEventDate(value: string) {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return { label: "Date TBA", timestamp: null };
  }

  return {
    label: parsed.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    timestamp: parsed.getTime(),
  };
}

export const demoEventRecords: DemoEventRecord[] = [
  {
    id: "meridian-2025",
    title: "Meridian 2025",
    subtitle: "Global Blockchain Summit",
    category: "Live Registration",
    coverImage: IMAGES.meridianCover,
    startsAt: "2025-10-14T09:00:00+08:00",
    displayDate: "Oct 14 – 16, 2025",
    schedule: "09:00 AM – 07:30 PM SGT (Daily Sessions)",
    location: "Suntec Convention Center, Singapore",
    format: "Level 4 Halls & Global Live Soroban Stream",
    priceAmount: 120,
    currency: "XLM",
    priceNote: "(~$45 USD)",
    badge: "Free Tier Live",
    capacity: 1000,
    registered: 785,
    description:
      "Meridian 2025 converges over 1,000 decentralized architects, DeFi engineers, and institutional leaders in Singapore. Over three intensive days, immerse yourself in hands-on Soroban smart contract workshops, high-throughput financial protocol rollouts, and verifiable zero-knowledge identity demonstrations.",
    secondaryDescription:
      "Gain immediate early-bird access to newly deployed Stellar asset anchor frameworks and interact directly with Core Protocol maintainers.",
    tags: ["summit", "stellar", "hackathons", "web3", "tech"],
    listBadge: "LIVE REGISTRATION",
    listBadgeClassName: "bg-[#ff5451]/25 text-[#ffb3ad]",
    speakers: [
      {
        name: "Dr. Elena Rostova",
        role: "Head of Protocols",
        company: "Stellar Dev Foundation",
        image: IMAGES.elena,
      },
      {
        name: "Marcus Vance",
        role: "Lead Soroban Arch",
        company: "Soroban Labs",
        image: IMAGES.sorobanSpeaker,
      },
    ],
    agenda: [
      {
        time: "09:00",
        title: "Opening Keynote",
        detail: "Meridian network layer overview",
      },
      {
        time: "11:30",
        title: "Soroban Breakouts",
        detail: "Smart contract acceleration labs",
      },
      {
        time: "14:00",
        title: "Institutional Roundtable",
        detail: "Asset rails and compliance design",
      },
    ],
    galleryCount: 24,
    photos: [
      {
        id: "meridian-stage",
        title: "Keynote Stage",
        author: "@alex_dev",
        image: IMAGES.meridianStage,
        alt: "Massive illuminated auditorium stage with digital screens displaying Stellar code",
        likes: 48,
        category: "Keynotes",
        verified: true,
        ipfs: "QmX8...3bFa9",
      },
      {
        id: "meridian-hackers",
        title: "Hackers in Action",
        author: "@noah_code",
        image: IMAGES.meridianHackers,
        alt: "Developers coding on laptops during a hackathon sprint",
        likes: 32,
        category: "Hacker Demos",
        verified: true,
        ipfs: "QmTa...2dB8c",
      },
      {
        id: "meridian-rooftop",
        title: "Evening Drinks Reception",
        author: "@sora_j",
        image: IMAGES.meridianRooftop,
        alt: "Rooftop party overlooking the Marina Bay skyline",
        likes: 64,
        category: "Afterparty",
        verified: true,
        ipfs: "QmFc...9eA7d",
      },
      {
        id: "meridian-badge",
        title: "On-Chain VIP Badge",
        author: "@mila_ri",
        image: IMAGES.meridianBadge,
        alt: "Close up of a metallic NFC badge engraved with Stellar symbols",
        likes: 27,
        category: "Keynotes",
        verified: true,
        ipfs: "QmDq...1rL6a",
      },
      {
        id: "meridian-keynote",
        title: "Speaker Panel",
        author: "@mila_ri",
        image: IMAGES.meridianKeynote,
        alt: "Panel discussion on the main keynote stage",
        likes: 27,
        category: "Keynotes",
        verified: true,
        ipfs: "QmDq...1rL6a",
      },
      {
        id: "meridian-demos",
        title: "Hacker Demos",
        author: "@noah_code",
        image: IMAGES.meridianDemos,
        alt: "Teams presenting their projects at demo booths",
        likes: 32,
        category: "Hacker Demos",
        verified: true,
        ipfs: "QmTa...2dB8c",
      },
      {
        id: "meridian-drinks",
        title: "Evening Drinks Reception",
        author: "@sora_j",
        image: IMAGES.meridianDrinks,
        alt: "Guests networking at the evening drinks reception",
        likes: 64,
        category: "Afterparty",
        verified: true,
        ipfs: "QmFc...9eA7d",
      },
      {
        id: "meridian-celebration",
        title: "Group Celebration",
        author: "@founderclub",
        image: IMAGES.celebration,
        alt: "Group photo of summit attendees celebrating",
        likes: 51,
        category: "Community",
        verified: true,
        ipfs: "QmHn...8nP2d",
      },
    ],
  },
  {
    id: "soroban-workshop",
    title: "Smart Contracts with Soroban Workshop",
    subtitle: "Developer Masterclass",
    category: "Workshop",
    coverImage: IMAGES.workshop,
    startsAt: toIso(sorobanWorkshopDate),
    schedule: "10:00 AM – 04:00 PM EST",
    location: "Virtual & NYC In-Person",
    format: "Hybrid · Live Testnet Labs",
    priceAmount: 0,
    currency: null,
    badge: "Free Entry",
    capacity: 200,
    registered: 184,
    description:
      "Hands-on developer masterclass: build, deploy, and audit Rust-based Soroban contracts with live testnet mentorship.",
    secondaryDescription:
      "Bring a laptop and a testnet wallet. Every attendee leaves with a deployed contract and a verification checklist.",
    tags: ["tech", "free", "soroban", "workshop"],
    listBadge: "HYBRID",
    listBadgeClassName: "bg-white/10 text-[#e5e2e1]",
    speakers: [
      {
        name: "Marcus Vance",
        role: "Lead Soroban Arch",
        company: "Soroban Labs",
        image: IMAGES.sorobanSpeaker,
      },
    ],
    agenda: [
      {
        time: "10:00",
        title: "Contract Foundations",
        detail: "Storage, auth, and token interfaces",
      },
      {
        time: "12:30",
        title: "Build Sprint",
        detail: "Deploy a working testnet contract",
      },
      {
        time: "15:00",
        title: "Audit Clinic",
        detail: "Review common Soroban pitfalls",
      },
    ],
    galleryCount: 14,
    photos: [
      {
        id: "workshop-cover",
        title: "Workshop Kickoff",
        author: "@soroban_labs",
        image: IMAGES.workshop,
        alt: "Developer workshop with laptops and testnet dashboards",
        likes: 41,
        category: "Workshops",
        verified: true,
        ipfs: "QmWk...4dE2a",
      },
      {
        id: "workshop-attendee",
        title: "Build Sprint",
        author: "@dev_marcus",
        image: IMAGES.workshopAttendee,
        alt: "Attendees collaborating during a contract build sprint",
        likes: 29,
        category: "Workshops",
        verified: true,
        ipfs: "QmSp...7fL1c",
      },
      {
        id: "workshop-demos",
        title: "Demo Table",
        author: "@noah_code",
        image: IMAGES.meridianDemos,
        alt: "Developers presenting their smart contract demos",
        likes: 22,
        category: "Hacker Demos",
        verified: true,
        ipfs: "QmTa...2dB8c",
      },
      {
        id: "workshop-panel",
        title: "Audit Clinic",
        author: "@mila_ri",
        image: IMAGES.panel,
        alt: "Instructor leading a smart contract audit clinic",
        likes: 18,
        category: "Workshops",
        verified: true,
        ipfs: "QmDq...1rL6a",
      },
    ],
  },
  {
    id: "decentralized-beats",
    title: "Decentralized Beats Rooftop Rave",
    subtitle: "Rooftop Music & Web3 Night",
    category: "Music & Arts",
    coverImage: IMAGES.rave,
    startsAt: toIso(weekendRave),
    schedule: "08:00 PM – 02:00 AM CET",
    location: "Kreuzberg, Berlin",
    format: "Rooftop · 21+",
    priceAmount: 80,
    currency: "USDC",
    badge: "Paid Event",
    capacity: 500,
    registered: 490,
    description:
      "A seamless intersection of sonic modular synths and zero-knowledge badge entry overlooking the Berlin canal.",
    secondaryDescription:
      "On-chain guest credentials unlock the rooftop, the open-ledger bar, and the after-hours listening room.",
    tags: ["music", "weekend", "paid", "vip", "arts"],
    listBadge: "ALMOST FULL",
    listBadgeClassName: "bg-[#ffb4ab] text-[#690005]",
    speakers: [],
    agenda: [
      {
        time: "20:00",
        title: "Doors & Badge Check",
        detail: "Zero-knowledge credential entry",
      },
      {
        time: "22:00",
        title: "Headline Set",
        detail: "Modular synths and live visuals",
      },
      {
        time: "00:30",
        title: "After-Hours Room",
        detail: "Listening session and artist meetup",
      },
    ],
    galleryCount: 42,
    photos: [
      {
        id: "beats-rooftop",
        title: "Rooftop Crowd",
        author: "@sora_j",
        image: IMAGES.rave,
        alt: "Crowd dancing at a rooftop party overlooking the Berlin canal",
        likes: 76,
        category: "Afterparty",
        verified: true,
        ipfs: "QmFc...9eA7d",
      },
      {
        id: "beats-drinks",
        title: "Open Ledger Bar",
        author: "@berlin_beats",
        image: IMAGES.meridianDrinks,
        alt: "Guests holding drinks at the open ledger bar",
        likes: 52,
        category: "Afterparty",
        verified: true,
        ipfs: "QmDr...5kR8b",
      },
      {
        id: "beats-celebration",
        title: "Rooftop Sunset",
        author: "@founderclub",
        image: IMAGES.celebration,
        alt: "Group celebration during sunset on the rooftop",
        likes: 44,
        category: "Community",
        verified: true,
        ipfs: "QmHn...8nP2d",
      },
      {
        id: "beats-badge",
        title: "Guest Credential",
        author: "@mila_ri",
        image: IMAGES.meridianBadge,
        alt: "On-chain guest credential badge glowing under neon lights",
        likes: 31,
        category: "Afterparty",
        verified: true,
        ipfs: "QmDq...1rL6a",
      },
    ],
  },
  {
    id: "austin-hacker-house",
    title: "Stellar Hacker House Austin",
    subtitle: "Builder Residency & Demo Day",
    category: "Hackathon",
    coverImage: IMAGES.austin,
    startsAt: "2025-08-15T18:00:00-05:00",
    displayDate: "Aug 15 – 17, 2025",
    schedule: "All-day build · Demo day 6:00 PM",
    location: "Austin, TX",
    format: "In-person · 48h build",
    priceAmount: 0,
    currency: null,
    badge: "Free Entry",
    capacity: 150,
    registered: 150,
    description:
      "A three-day builder residency for teams shipping on Stellar. Mentors, testnet credits, and a demo day with ecosystem investors.",
    secondaryDescription:
      "Attendance was capped and every accepted builder received a proof-of-attendance badge minted to their wallet.",
    tags: ["hackathons", "tech", "free", "community"],
    listBadge: "PAST EVENT",
    listBadgeClassName: "bg-white/10 text-[#e5e2e1]",
    speakers: [
      {
        name: "Dr. Elena Rostova",
        role: "Head of Protocols",
        company: "Stellar Dev Foundation",
        image: IMAGES.elena,
      },
    ],
    agenda: [
      {
        time: "18:00",
        title: "Team Formation",
        detail: "Pitch ideas and find collaborators",
      },
      {
        time: "10:00",
        title: "Mentor Hours",
        detail: "Protocol and go-to-market feedback",
      },
      {
        time: "18:00",
        title: "Demo Day",
        detail: "Final presentations and awards",
      },
    ],
    galleryCount: 142,
    photos: [
      {
        id: "austin-cover",
        title: "Hacker House",
        author: "@austin_builders",
        image: IMAGES.austin,
        alt: "Builders working together at the Austin hacker house",
        likes: 58,
        category: "Hacker Demos",
        verified: true,
        ipfs: "QmAq...9tY3c",
      },
      {
        id: "austin-hackers",
        title: "Build Sprint",
        author: "@noah_code",
        image: IMAGES.meridianHackers,
        alt: "Developers collaborating during the build sprint",
        likes: 36,
        category: "Hacker Demos",
        verified: true,
        ipfs: "QmTa...2dB8c",
      },
      {
        id: "austin-stage",
        title: "Demo Day Stage",
        author: "@alex_dev",
        image: IMAGES.meridianStage,
        alt: "Demo day presentations on the main stage",
        likes: 41,
        category: "Keynotes",
        verified: true,
        ipfs: "QmX8...3bFa9",
      },
      {
        id: "austin-celebration",
        title: "Closing Celebration",
        author: "@founderclub",
        image: IMAGES.celebration,
        alt: "Builders celebrating at the closing party",
        likes: 63,
        category: "Community",
        verified: true,
        ipfs: "QmHn...8nP2d",
      },
    ],
  },
  {
    id: "neo-kyoto-lumina-2025",
    title: "Neo-Kyoto Lumina 2025",
    subtitle: "Decentralized VIP Pass",
    category: "VIP Experience",
    coverImage: IMAGES.neoKyoto,
    startsAt: "2025-11-18T19:00:00+09:00",
    displayDate: "Nov 18, 2025",
    schedule: "07:00 PM – 01:00 AM JST",
    location: "Shinjuku Neo-Dome",
    format: "Subterranean Hall · 21+",
    priceAmount: 250,
    currency: "XLM",
    badge: "VIP Access",
    capacity: 300,
    registered: 287,
    description:
      "A decentralized VIP experience beneath Shinjuku. Your wallet is your pass: on-chain credentials unlock the hall, the lounge, and the after-hours installation.",
    secondaryDescription:
      "Connect a Stellar wallet to mint the pass, then manage access and transfers directly from your dashboard.",
    tags: ["vip", "music", "paid", "arts"],
    listBadge: "VIP ACCESS",
    listBadgeClassName: "bg-[#ff5451]/25 text-[#ffb3ad]",
    speakers: [],
    agenda: [
      {
        time: "19:00",
        title: "Wallet Check-In",
        detail: "Connect and verify your VIP pass",
      },
      {
        time: "21:00",
        title: "Lumina Showcase",
        detail: "Immersive light and sound installation",
      },
      {
        time: "23:30",
        title: "After-Hours Lounge",
        detail: "Artist meetup and collector drop",
      },
    ],
    galleryCount: 18,
    photos: [
      {
        id: "neo-kyoto-cover",
        title: "Lumina Hall",
        author: "@neo_kyoto",
        image: IMAGES.neoKyoto,
        alt: "Cyberpunk concert hall with crimson lasers and holographic glyphs",
        likes: 91,
        category: "Afterparty",
        verified: true,
        ipfs: "QmNk...2vB7d",
      },
      {
        id: "neo-kyoto-rooftop",
        title: "VIP Reception",
        author: "@sora_j",
        image: IMAGES.meridianRooftop,
        alt: "VIP guests at an evening reception",
        likes: 54,
        category: "Afterparty",
        verified: true,
        ipfs: "QmFc...9eA7d",
      },
      {
        id: "neo-kyoto-badge",
        title: "On-Chain Pass",
        author: "@mila_ri",
        image: IMAGES.meridianBadge,
        alt: "Metallic on-chain VIP pass badge",
        likes: 39,
        category: "Keynotes",
        verified: true,
        ipfs: "QmDq...1rL6a",
      },
      {
        id: "neo-kyoto-panel",
        title: "Lumina Showcase",
        author: "@alex_dev",
        image: IMAGES.meridianKeynote,
        alt: "Immersive light installation on stage",
        likes: 47,
        category: "Keynotes",
        verified: true,
        ipfs: "QmX8...3bFa9",
      },
    ],
  },
  {
    id: "soroban-defi-hack-night",
    title: "Soroban DeFi Hack Night",
    subtitle: "Audit Sprint & Liquidity Lab",
    category: "Hackathon",
    coverImage: IMAGES.hackNight,
    startsAt: toIso(hackNightDate),
    schedule: "06:00 PM – 11:00 PM PST",
    location: "San Francisco, CA",
    format: "In-person · Build sprint",
    priceAmount: 15,
    currency: "USDC",
    badge: "Paid Event",
    capacity: 150,
    registered: 96,
    description:
      "Hands-on smart contract audit sprint and cross-chain liquidity workshop for DeFi builders shipping on Soroban.",
    secondaryDescription:
      "Teams get a short brief, a testnet deployment, and a review from protocol engineers before the final demo round.",
    tags: ["hackathons", "tech", "paid", "defi", "soroban"],
    listBadge: "LIMITED SEATS",
    listBadgeClassName: "bg-white/10 text-[#e5e2e1]",
    speakers: [
      {
        name: "Marcus Vance",
        role: "Lead Soroban Arch",
        company: "Soroban Labs",
        image: IMAGES.sorobanSpeaker,
      },
    ],
    agenda: [
      {
        time: "18:00",
        title: "Brief & Team Up",
        detail: "Pick a protocol challenge",
      },
      {
        time: "19:30",
        title: "Audit Sprint",
        detail: "Review contracts with mentors",
      },
      {
        time: "21:30",
        title: "Demo Round",
        detail: "Present findings and fixes",
      },
    ],
    galleryCount: 9,
    photos: [
      {
        id: "hack-night-cover",
        title: "Hack Night",
        author: "@soroban_labs",
        image: IMAGES.hackNight,
        alt: "Builders collaborating at a DeFi hack night",
        likes: 34,
        category: "Hacker Demos",
        verified: true,
        ipfs: "QmHk...6rT4a",
      },
      {
        id: "hack-night-demos",
        title: "Demo Round",
        author: "@noah_code",
        image: IMAGES.meridianDemos,
        alt: "Teams presenting at the demo round",
        likes: 26,
        category: "Hacker Demos",
        verified: true,
        ipfs: "QmTa...2dB8c",
      },
      {
        id: "hack-night-panel",
        title: "Audit Review",
        author: "@mila_ri",
        image: IMAGES.panel,
        alt: "Mentors reviewing smart contract code",
        likes: 19,
        category: "Workshops",
        verified: true,
        ipfs: "QmDq...1rL6a",
      },
    ],
  },
];

function priceLabel(record: DemoEventRecord) {
  if (record.priceAmount <= 0) return "Free";
  return `${record.priceAmount.toLocaleString("en-US")} ${record.currency ?? ""}`.trim();
}

function toDetail(record: DemoEventRecord): EventDetail {
  const date = formatEventDate(record.startsAt);
  const filled =
    record.capacity > 0
      ? Math.min(100, Math.round((record.registered / record.capacity) * 1000) / 10)
      : null;
  const seats =
    record.registered === 0 && record.capacity === 0
      ? null
      : `${record.registered.toLocaleString("en-US")} / ${record.capacity.toLocaleString("en-US")}`;

  return {
    id: record.id,
    title: record.title,
    subtitle: record.subtitle,
    coverImage: record.coverImage,
    category: record.category,
    date: record.displayDate ?? date.label,
    schedule: record.schedule,
    location: record.location,
    format: record.format,
    price: priceLabel(record),
    currency: record.priceNote ?? null,
    badge: record.badge,
    seats,
    filled,
    description: record.description,
    secondaryDescription: record.secondaryDescription,
    speakers: record.speakers,
    agenda: record.agenda,
    galleryCount: record.galleryCount ?? record.photos.length,
    galleryPreview: record.photos.slice(0, 4).map((photo) => ({
      image: photo.image,
      alt: photo.alt,
    })),
    tags: record.tags,
  };
}

function toItem(record: DemoEventRecord): EventItem {
  const date = formatEventDate(record.startsAt);
  const isFree = record.priceAmount <= 0;

  return {
    id: record.id,
    title: record.title,
    date: date.label,
    dateValue: date.timestamp,
    price: priceLabel(record),
    badge: record.listBadge ?? record.category.toUpperCase(),
    badgeClassName: record.listBadgeClassName ?? "bg-white/10 text-[#e5e2e1]",
    location: record.location,
    description: record.description,
    image: record.coverImage,
    registeredCount: record.registered,
    actionLabel: isFree ? "Get Pass" : "View Event",
  };
}

function matchesQuery(record: DemoEventRecord, query: EventQuery) {
  const search = query.q?.trim().toLowerCase();

  if (search) {
    const haystack = [
      record.title,
      record.subtitle,
      record.description,
      record.location,
      record.category,
      ...record.tags,
    ]
      .join(" ")
      .toLowerCase();

    if (!haystack.includes(search)) return false;
  }

  if (query.isFree !== undefined && (record.priceAmount <= 0) !== query.isFree) {
    return false;
  }

  const tags = query.tags?.map((tag) => tag.trim().toLowerCase()).filter(Boolean) ?? [];

  if (
    tags.length > 0 &&
    !tags.some((tag) => record.tags.some((recordTag) => recordTag.toLowerCase() === tag))
  ) {
    return false;
  }

  const start = new Date(record.startsAt).getTime();

  if (Number.isFinite(start)) {
    if (query.dateFrom) {
      const from = new Date(query.dateFrom).getTime();
      if (Number.isFinite(from) && start < from) return false;
    }

    if (query.dateTo) {
      const to = new Date(query.dateTo).getTime();
      if (Number.isFinite(to) && start > to) return false;
    }
  }

  return true;
}

export function getDemoEventRecord(id: string) {
  return demoEventRecords.find((record) => record.id === id) ?? null;
}

export function getDemoEvents(query: EventQuery = {}): EventItem[] {
  return demoEventRecords
    .filter((record) => matchesQuery(record, query))
    .map(toItem)
    .sort((left, right) => {
      if (left.dateValue === null && right.dateValue === null) {
        return left.title.localeCompare(right.title);
      }
      if (left.dateValue === null) return 1;
      if (right.dateValue === null) return -1;
      return left.dateValue - right.dateValue;
    });
}

export function getDemoEventById(id: string): EventDetail | null {
  const record = getDemoEventRecord(id);
  return record ? toDetail(record) : null;
}

export function getDemoGalleryPhotos(eventId: string) {
  return getDemoEventRecord(eventId)?.photos ?? [];
}

export const demoRegistrations: DemoRegistration[] = [
  {
    id: "meridian-2025",
    eventId: "meridian-2025",
    title: "Meridian Global Builders Summit 2025",
    status: "upcoming",
    statusLabel: "Confirmed • On-Chain",
    date: "Oct 14-16, 2025",
    location: "Singapore",
    pass: {
      kind: "qr",
      label: "Pass Identifier",
      value: "#TREA-9482",
      badge: "Soroban v22 Validated",
      badgeIcon: "shield",
    },
    image: IMAGES.meridianDashboard,
    actionLabel: "View Passcode / Dynamic QR",
    actionIcon: "qr_code_2",
    actionVariant: "primary",
    footer: {
      actionLabel: "Request Self-Refund",
      actionIcon: "undo",
      note: "42h left to refund",
    },
    accentClassName: "from-[#ff5451] via-[#ffb3b6] to-transparent",
  },
  {
    id: "soroban-workshop",
    eventId: "soroban-workshop",
    title: "Smart Contracts with Soroban Workshop",
    status: "upcoming",
    statusLabel: "Confirmed • Free Tier",
    date: formatEventDate(toIso(sorobanWorkshopDate)).label,
    location: "Virtual Live Session",
    pass: {
      kind: "access",
      label: "Access Link Status",
      value: "Unlocked in Wallet",
      sideLabel: "Pass #TREA-1108",
    },
    image: IMAGES.workshopAttendee,
    actionLabel: "Join Stream / View Details",
    actionIcon: "play_circle",
    actionVariant: "secondary",
  },
  {
    id: "austin-hacker-house",
    eventId: "austin-hacker-house",
    title: "Stellar Hacker House Austin",
    status: "checked-in",
    statusLabel: "Checked-In • Attended",
    date: "Aug 2025",
    location: "Austin, TX",
    pass: {
      kind: "poap",
      value: "Austin Hacker PoAP #0441",
      wallet: "Minted to GBLX...78AQ",
    },
    image: IMAGES.austin,
    actionLabel: "View PoAP / NFT Badge",
    actionIcon: "military_tech",
    actionVariant: "secondary",
    secondaryAction: {
      label: "Event Photo Gallery (142 photos)",
      href: "/events/austin-hacker-house/gallery",
    },
  },
];

export const demoOrganiserStats: DemoOrganiserStat[] = [
  {
    label: "Total Revenue",
    value: "42,500",
    suffix: "XLM",
    detail: "≈ $16,150.00 USD",
    icon: "account_balance_wallet",
    accent: "primary",
  },
  {
    label: "Tickets Sold",
    value: "785",
    suffix: "/ 1,000",
    detail: "",
    icon: "confirmation_number",
    accent: "primary",
    progressClassName: "w-[78.5%]",
    progressLabel: "78.5%",
  },
  {
    label: "Check-In Rate",
    value: "62%",
    suffix: "active",
    detail: "487 of 785 scanned",
    icon: "how_to_reg",
    accent: "primary",
  },
  {
    label: "Escrow Locked",
    value: "8,200",
    suffix: "XLM",
    detail: "Smart Contract Hold",
    icon: "lock",
    accent: "muted",
  },
];

export const demoLiveEvent: DemoLiveEvent = {
  kind: "live",
  title: "Meridian Global Builders Summit 2025",
  description:
    "Official Stellar ecosystem developer assembly and protocol showcase.",
  date: "Oct 24–26, 2025",
  location: "San Francisco, CA",
  image: IMAGES.liveMeridian,
  statusLabel: "LIVE PASS ACTIVE",
  protocolLabel: "Soroban v21",
  claimed: 785,
  total: 1000,
  percentClassName: "w-[78.5%]",
  percentLabel: "78.5%",
  remaining: 215,
};

export const demoDraftEvent: DemoDraftEvent = {
  kind: "draft",
  title: "Soroban DeFi Hack Night",
  description:
    "Hands-on smart contract audit sprint and cross-chain liquidity workshop.",
  date: formatEventDate(toIso(hackNightDate)).label,
  capacity: 150,
  updatedAt: "Modified 2h ago",
  image: IMAGES.hackNight,
};

export const demoPassImage = IMAGES.pass;
