"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, ReactNode } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";
import { FieldError } from "@/components/FieldError";
import {
  createEventSchema,
  type CreateEventFormValues,
  type CreateEventPayload,
  type PricingModel,
  type VenueEnvironment,
} from "@/lib/schemas/createEvent";

const TREA_LOGO =
  "https://lh3.googleusercontent.com/aida/AEtjO1Ww40inGHjn46emaG6LBQY79iEHtmTgVhg8v6vqY3WwChhc1qPp14wKDGsNMV36DVrsONIOD119spGawqKWRz6G9ezqfkZG9Na8fLhJHqaSuiuFSzehriQ9wfKuc5IdOV51Mp0ySF0_DLf44uYaZhOiHI1wss09H5bmiTM2-_JuRFmEVeA8jEzQiwh8o5Jde_vxkZ_jg8IK7UjiwA612NzvF_fX6VTEXUqhAXocRyRj6AluZQHM18yF0jw";

const PROFILE_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAFuXodJxvy-va-78PTdiU8ZhKQdHyJwQNqNFdepsOWnUrq659A3aTmf7VBKewRz1Tv6NauE_5vI8gnVfo7SP3O_hkMHlTTrXnfSBuJcS6CoLuhoLo3043VL5ngYQ92abrNW0b_0lKFuIRAJmI3WdBX3fm3vNsEpfMcQmm0A8-1iaJZ9MG-_siQsr6lnhHu3QoLo8urCkVnNInmNoEj4cEtpxrHwmgrhw4RZrejct814COaDYLwlHix";

const DEFAULT_COVER_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBqvfpVhRJRga-5_f3zyWqVZbEwIMDw5eCRlpoZZ7EMAgiX-Bkxiinf8pgXn39Cg1WwXx5N3cKWmFvz7EOAprSx3bDKWdadSR2UGJX6zJ21VCGhtjLS6sua5B8FXeuE4HdltllRcIRHokXTc2Dpyi9Mk2bFJgr6MNaK1rlz_NALGZtzKMvllUK2tm_16rg2UL-n-cI1RAyia_x2j7eWcSw_cfXrF0Eh_lTO-Gp6uus246BwELHBmxrU";

type BottomNavItem = {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
  featured?: boolean;
};

const initialFormState: CreateEventFormValues = {
  title: "Stellar Rust & Soroban Developers Meetup",
  description:
    "Join world-class engineers scaling decentralized finance on Stellar. We will explore WASM bytecode optimization, Soroban SDK v21 patterns, and state archival lifecycles.",
  coverImageName: "soroban_devcon_hero.webp",
  coverImageUrl: DEFAULT_COVER_IMAGE,
  startsAt: "2025-10-24T18:00",
  endsAt: "2025-10-24T22:30",
  venue: "hybrid",
  location:
    "The Vault Cyber Hall, San Francisco, CA & stream.stellar.org",
  capacity: "1000",
  pricing: "paid",
  price: "120",
  currency: "XLM",
  acceptedXlm: true,
  acceptedUsdc: false,
  selfRefund: true,
  refundDeadline: "48h",
};

const steps = ["1. Setup", "2. Schedule", "3. Minting", "4. Escrow"];

const venueOptions: { value: VenueEnvironment; label: string }[] = [
  { value: "in-person", label: "In-Person" },
  { value: "virtual", label: "Virtual" },
  { value: "hybrid", label: "Hybrid" },
];

const pricingOptions: { value: PricingModel; label: string }[] = [
  { value: "free", label: "Free Event" },
  { value: "paid", label: "Paid Event" },
];

const refundOptions = [
  { value: "7d", label: "Up to 7 days before event" },
  { value: "48h", label: "Up to 48 hours before event" },
  { value: "24h", label: "Up to 24 hours before event" },
  { value: "none", label: "No self-service refunds" },
];

const bottomNavItems: BottomNavItem[] = [
  { icon: "explore", label: "Discover", href: "/" },
  { icon: "confirmation_number", label: "Tickets", href: "/dashboard/user" },
  {
    icon: "add",
    label: "Create",
    href: "/events/create",
    active: true,
    featured: true,
  },
  { icon: "insights", label: "Manage", href: "/dashboard/organiser" },
  {
    icon: "photo_library",
    label: "Gallery",
    href: "/events/meridian-2025/gallery",
  },
];

const markdownActions = [
  {
    icon: "format_bold",
    label: "Bold",
    prefix: "**",
    suffix: "**",
    placeholder: "bold text",
  },
  {
    icon: "format_italic",
    label: "Italic",
    prefix: "_",
    suffix: "_",
    placeholder: "italic text",
  },
  {
    icon: "format_list_bulleted",
    label: "Bullet list",
    prefix: "- ",
    suffix: "",
    placeholder: "List item",
  },
  {
    icon: "code",
    label: "Inline code",
    prefix: "`",
    suffix: "`",
    placeholder: "code",
  },
  {
    icon: "link",
    label: "Insert link",
    prefix: "[",
    suffix: "](https://)",
    placeholder: "link text",
  },
];

function FormSection({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 rounded-xl bg-[#1c1b1b] p-4 shadow-md">
      <div className="flex items-center gap-2 text-[#ff5451]">
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
        <h2 className="text-[19px] font-semibold tracking-tight text-[#f3f0ee]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function SegmentedControl<T extends string>({
  name,
  value,
  options,
  columns,
  onChange,
}: {
  name: string;
  value: T;
  options: { value: T; label: string }[];
  columns: 2 | 3;
  onChange: (value: T) => void;
}) {
  return (
    <div
      className={[
        "grid gap-1 rounded-xl bg-[#0e0e0e] p-1",
        columns === 3 ? "grid-cols-3" : "grid-cols-2",
      ].join(" ")}
    >
      {options.map((option) => (
        <label key={option.value} className="cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="peer sr-only"
          />
          <span className="block rounded-lg py-2 text-center text-[10px] font-semibold uppercase tracking-[0.08em] text-[#c6c6c7] transition-colors hover:text-[#f3f0ee] peer-checked:bg-[#cc003c] peer-checked:text-[#ffdcdc] peer-checked:shadow-sm peer-focus-visible:ring-2 peer-focus-visible:ring-[#ff5451] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#0e0e0e]">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}

function BottomNav() {
  return (
    <nav className="pb-safe fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#1a1a1a]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[560px] items-center justify-around px-3 py-2 sm:px-6">
        {bottomNavItems.map((item) =>
          item.featured ? (
            <Link
              key={item.label}
              href={item.href}
              aria-current="page"
              className="-mt-5 flex flex-col items-center justify-center gap-1"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff5451] text-white shadow-[0_0_24px_-4px_rgba(239,68,68,0.35)] transition hover:bg-[#e64a47]">
                <span className="material-symbols-outlined text-[26px]">
                  {item.icon}
                </span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.08em] text-[#a7a0a0]">
                {item.label}
              </span>
            </Link>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 py-1.5 text-[10px] uppercase tracking-[0.08em] text-[#a7a0a0] transition-colors hover:text-[#f3f0ee]"
            >
              <span className="material-symbols-outlined text-[22px]">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          ),
        )}
      </div>
    </nav>
  );
}

export default function CreateEventPage() {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateEventFormValues, unknown, CreateEventPayload>({
    resolver: zodResolver(createEventSchema),
    defaultValues: initialFormState,
    mode: "onTouched",
  });
  const [notice, setNotice] = useState<string | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);
  const descriptionField = register("description");
  const pricing = useWatch({ control, name: "pricing" });
  const coverImageUrl = useWatch({ control, name: "coverImageUrl" });
  const coverImageName = useWatch({ control, name: "coverImageName" });

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (pricing === "free") {
      setValue("price", "0", { shouldValidate: true });
    }
  }, [pricing, setValue]);

  function insertMarkdown(prefix: string, suffix: string, placeholder: string) {
    const textarea = descriptionRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.slice(start, end) || placeholder;
    const nextValue = [
      textarea.value.slice(0, start),
      prefix,
      selected,
      suffix,
      textarea.value.slice(end),
    ].join("");

    setValue("description", nextValue, {
      shouldDirty: true,
      shouldValidate: true,
    });

    const selectionStart = start + prefix.length;
    window.requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(selectionStart, selectionStart + selected.length);
    });
  }

  function handleCoverImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;

    setValue("coverImageName", file.name, { shouldDirty: true });
    setValue("coverImageUrl", objectUrl, {
      shouldDirty: true,
      shouldValidate: true,
    });
    event.target.value = "";
  }

  function handleSaveDraft() {
    setNotice("Draft saved locally. On-chain publishing is not connected yet.");
  }

  function onValid() {
    setNotice("Event details captured. On-chain publishing is not connected yet.");
  }

  function onInvalid() {
    setNotice("Please fix the highlighted fields before publishing.");
  }

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1]">
      <header className="pt-safe fixed inset-x-0 top-0 z-50 bg-[#131313]/80 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[560px] items-center justify-between gap-2 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Image
              alt="Trea Logo"
              className="h-8 w-auto object-contain"
              src={TREA_LOGO}
              width={32}
              height={32}
              unoptimized
            />
            <span className="text-[16px] font-semibold tracking-tight text-[#e5e2e1]">
              Trea
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-[#1f1f1f] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#d7d2cf]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ffb3ad]" />
            Stellar Mainnet
          </div>

          <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full ring-1 ring-white/10">
            <Image
              alt="Profile"
              className="object-cover"
              src={PROFILE_IMAGE}
              fill
              sizes="32px"
            />
            <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#131313] bg-[#ff5451]" />
          </div>
        </div>
      </header>

      <main className="relative flex min-h-screen flex-col bg-[#131313] pt-16 pb-24">
        <form
          noValidate
          onSubmit={handleSubmit(onValid, onInvalid)}
          className="mx-auto flex w-full max-w-[560px] flex-col gap-5 px-4 pb-32 pt-4 sm:px-6"
        >
          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="flex min-w-0 items-center gap-3">
              <Link
                href="/dashboard/organiser"
                aria-label="Back to organizer dashboard"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2a2a2a] text-[#c6c6c7] transition-colors hover:bg-[#353534] hover:text-[#f3f0ee]"
              >
                <span className="material-symbols-outlined text-[20px]">
                  arrow_back
                </span>
              </Link>
              <div className="min-w-0">
                <span className="block truncate text-[18px] font-semibold leading-tight text-[#f3f0ee]">
                  Create Event
                </span>
                <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-[#c6c6c7]">
                  Soroban Contract Deploy
                </span>
              </div>
            </div>

            <Button
              variant="secondary"
              size="sm"
              className="shrink-0 rounded-full"
              onClick={handleSaveDraft}
            >
              Save Draft
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-1 rounded-xl bg-[#0e0e0e] p-1">
            {steps.map((step, index) => (
              <div
                key={step}
                className={[
                  "rounded-lg py-1.5 text-center text-[9px] font-semibold uppercase tracking-[0.06em] sm:text-[10px]",
                  index === 0
                    ? "bg-[#cc003c] text-[#ffdcdc]"
                    : "bg-[#2a2a2a] text-[#c6c6c7]",
                ].join(" ")}
              >
                {step}
              </div>
            ))}
          </div>

          <FormSection icon="auto_stories" title="1. Event Details">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="event-title"
                className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#c6c6c7]"
              >
                Event Title *
              </label>
              <div
                className={[
                  "flex items-center rounded-lg bg-[#0e0e0e] p-2 focus-within:ring-1",
                  errors.title
                    ? "ring-1 ring-[#93000a] focus-within:ring-[#93000a]"
                    : "focus-within:ring-[#ff5451]",
                ].join(" ")}
              >
                <input
                  id="event-title"
                  type="text"
                  {...register("title")}
                  aria-invalid={Boolean(errors.title)}
                  aria-describedby={errors.title ? "event-title-error" : undefined}
                  placeholder="e.g. Stellar Rust & Soroban Developers Meetup"
                  className="w-full bg-transparent text-[15px] text-[#f3f0ee] placeholder:text-[#3a3939] focus:outline-none"
                />
              </div>
              <FieldError id="event-title-error" message={errors.title?.message} />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="event-description"
                  className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#c6c6c7]"
                >
                  Description & Agenda
                </label>
                <span className="font-mono text-[11px] text-[#a7a0a0]">
                  Markdown active
                </span>
              </div>
              <div className="overflow-hidden rounded-lg bg-[#0e0e0e]">
                <div className="flex items-center gap-1 bg-[#2a2a2a] px-2 py-2 text-[#c6c6c7]">
                  {markdownActions.map((action) => (
                    <button
                      key={action.icon}
                      type="button"
                      aria-label={action.label}
                      title={action.label}
                      onClick={() =>
                        insertMarkdown(
                          action.prefix,
                          action.suffix,
                          action.placeholder,
                        )
                      }
                      className="flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-[#353534] hover:text-[#f3f0ee]"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {action.icon}
                      </span>
                    </button>
                  ))}
                </div>
                <textarea
                  id="event-description"
                  {...descriptionField}
                  ref={(element) => {
                    descriptionField.ref(element);
                    descriptionRef.current = element;
                  }}
                  rows={4}
                  aria-invalid={Boolean(errors.description)}
                  aria-describedby={
                    errors.description ? "event-description-error" : undefined
                  }
                  placeholder="Provide event schedule, speaker lineups, prerequisites, and workshop goals..."
                  className="w-full resize-none bg-transparent p-2 text-[15px] text-[#f3f0ee] placeholder:text-[#3a3939] focus:outline-none"
                />
              </div>
              <FieldError
                id="event-description-error"
                message={errors.description?.message}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#c6c6c7]">
                Cover Image Asset
              </span>
              <div className="group relative h-36 w-full overflow-hidden rounded-xl bg-[#0e0e0e]">
                <Image
                  src={coverImageUrl || DEFAULT_COVER_IMAGE}
                  alt="Event cover preview"
                  fill
                  sizes="(max-width: 640px) 100vw, 560px"
                  unoptimized
                  className="object-cover opacity-80 transition-opacity group-hover:opacity-95"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent" />
                <div className="absolute inset-x-2 bottom-2 flex items-center justify-between gap-2 rounded-lg bg-[#201f1f]/90 p-2 backdrop-blur-md">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#ffb3ad]">
                      image
                    </span>
                    <span className="truncate font-mono text-[11px] text-[#f3f0ee]">
                      {coverImageName}
                    </span>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="shrink-0 rounded bg-[#3a3939]"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Replace
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  id="cover-image"
                  type="file"
                  accept="image/*"
                  aria-label="Upload cover image"
                  onChange={handleCoverImageChange}
                  className="sr-only"
                />
              </div>
              <label
                htmlFor="cover-image-url"
                className="mt-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a7a0a0]"
              >
                Cover Image URL
              </label>
              <input
                id="cover-image-url"
                type="text"
                inputMode="url"
                {...register("coverImageUrl")}
                aria-invalid={Boolean(errors.coverImageUrl)}
                aria-describedby={
                  errors.coverImageUrl ? "cover-image-url-error" : undefined
                }
                placeholder="https://example.com/cover.jpg"
                className={[
                  "w-full rounded-lg bg-[#0e0e0e] p-2 text-[12px] text-[#e5e2e1] placeholder:text-[#3a3939] focus:outline-none focus:ring-1",
                  errors.coverImageUrl
                    ? "ring-1 ring-[#93000a] focus:ring-[#93000a]"
                    : "focus:ring-[#ff5451]",
                ].join(" ")}
              />
              <FieldError
                id="cover-image-url-error"
                message={errors.coverImageUrl?.message}
              />
            </div>
          </FormSection>

          <FormSection icon="calendar_month" title="2. Date & Location">
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="starts-at"
                  className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#c6c6c7]"
                >
                  Starts On
                </label>
                <div
                  className={[
                    "flex items-center gap-2 rounded-lg bg-[#0e0e0e] p-2",
                    errors.startsAt ? "ring-1 ring-[#93000a]" : "",
                  ].join(" ")}
                >
                  <span className="material-symbols-outlined text-[18px] text-[#c6c6c7]">
                    event
                  </span>
                  <input
                    id="starts-at"
                    type="datetime-local"
                    {...register("startsAt")}
                    aria-invalid={Boolean(errors.startsAt)}
                    aria-describedby={
                      errors.startsAt ? "starts-at-error" : undefined
                    }
                    className="min-w-0 w-full bg-transparent font-mono text-[12px] text-[#f3f0ee] [color-scheme:dark] focus:outline-none"
                  />
                  <span className="shrink-0 font-mono text-[10px] text-[#a7a0a0]">
                    UTC
                  </span>
                </div>
                <FieldError id="starts-at-error" message={errors.startsAt?.message} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="ends-at"
                  className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#c6c6c7]"
                >
                  Ends On
                </label>
                <div
                  className={[
                    "flex items-center gap-2 rounded-lg bg-[#0e0e0e] p-2",
                    errors.endsAt ? "ring-1 ring-[#93000a]" : "",
                  ].join(" ")}
                >
                  <span className="material-symbols-outlined text-[18px] text-[#c6c6c7]">
                    event_available
                  </span>
                  <input
                    id="ends-at"
                    type="datetime-local"
                    {...register("endsAt")}
                    aria-invalid={Boolean(errors.endsAt)}
                    aria-describedby={errors.endsAt ? "ends-at-error" : undefined}
                    className="min-w-0 w-full bg-transparent font-mono text-[12px] text-[#f3f0ee] [color-scheme:dark] focus:outline-none"
                  />
                  <span className="shrink-0 font-mono text-[10px] text-[#a7a0a0]">
                    UTC
                  </span>
                </div>
                <FieldError id="ends-at-error" message={errors.endsAt?.message} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#c6c6c7]">
                Venue Environment
              </span>
              <Controller
                control={control}
                name="venue"
                render={({ field }) => (
                  <SegmentedControl
                    name="venue"
                    value={field.value}
                    options={venueOptions}
                    columns={3}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
              <FieldError id="venue-error" message={errors.venue?.message} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="location"
                className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#c6c6c7]"
              >
                Physical Hub & Live Stream URL
              </label>
              <div
                className={[
                  "flex items-center gap-2 rounded-lg bg-[#0e0e0e] p-2",
                  errors.location ? "ring-1 ring-[#93000a]" : "",
                ].join(" ")}
              >
                <span className="material-symbols-outlined text-[18px] text-[#c6c6c7]">
                  pin_drop
                </span>
                <input
                  id="location"
                  type="text"
                  {...register("location")}
                  aria-invalid={Boolean(errors.location)}
                  aria-describedby={
                    errors.location ? "location-error" : undefined
                  }
                  placeholder="Venue address or stream URL"
                  className="w-full bg-transparent text-[13px] text-[#f3f0ee] placeholder:text-[#3a3939] focus:outline-none"
                />
              </div>
              <FieldError id="location-error" message={errors.location?.message} />
            </div>
          </FormSection>

          <FormSection icon="token" title="3. Ticketing & Blockchain">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#c6c6c7]">
                Pricing Model
              </span>
              <Controller
                control={control}
                name="pricing"
                render={({ field }) => (
                  <SegmentedControl
                    name="pricing"
                    value={field.value}
                    options={pricingOptions}
                    columns={2}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
              <FieldError id="pricing-error" message={errors.pricing?.message} />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="ticket-price"
                  className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#c6c6c7]"
                >
                  Ticket Price
                </label>
                <div
                  className={[
                    "flex items-center rounded-lg bg-[#0e0e0e] p-2",
                    pricing === "free" ? "opacity-50" : "",
                    errors.price ? "ring-1 ring-[#93000a]" : "",
                  ].join(" ")}
                >
                  <input
                    id="ticket-price"
                    type="number"
                    min="0"
                    step="0.01"
                    {...register("price")}
                    readOnly={pricing === "free"}
                    aria-invalid={Boolean(errors.price)}
                    aria-describedby={
                      errors.price ? "ticket-price-error" : undefined
                    }
                    className="w-full bg-transparent text-[18px] font-semibold text-[#f3f0ee] focus:outline-none read-only:cursor-not-allowed"
                  />
                </div>
                <FieldError
                  id="ticket-price-error"
                  message={errors.price?.message}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="token-currency"
                  className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#c6c6c7]"
                >
                  Token Currency
                </label>
                <div
                  className={[
                    "flex items-center gap-2 rounded-lg bg-[#0e0e0e] p-2",
                    errors.currency ? "ring-1 ring-[#93000a]" : "",
                  ].join(" ")}
                >
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#ff5451]" />
                  <select
                    id="token-currency"
                    {...register("currency")}
                    aria-invalid={Boolean(errors.currency)}
                    aria-describedby={
                      errors.currency ? "token-currency-error" : undefined
                    }
                    className="w-full appearance-none bg-transparent font-mono text-[12px] text-[#f3f0ee] focus:outline-none"
                  >
                    <option value="XLM" className="bg-[#171717] text-[#f3f0ee]">
                      XLM
                    </option>
                    <option value="USDC" className="bg-[#171717] text-[#f3f0ee]">
                      USDC
                    </option>
                  </select>
                  <span className="material-symbols-outlined text-[18px] text-[#c6c6c7]">
                    expand_more
                  </span>
                </div>
                <FieldError
                  id="token-currency-error"
                  message={errors.currency?.message}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="capacity"
                  className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#c6c6c7]"
                >
                  Total Mint Capacity
                </label>
                <span className="font-mono text-[11px] text-[#a7a0a0]">
                  Max Cap
                </span>
              </div>
              <div
                className={[
                  "flex items-center gap-2 rounded-lg bg-[#0e0e0e] p-2",
                  errors.capacity ? "ring-1 ring-[#93000a]" : "",
                ].join(" ")}
              >
                <span className="material-symbols-outlined text-[18px] text-[#c6c6c7]">
                  confirmation_number
                </span>
                <input
                  id="capacity"
                  type="number"
                  min="1"
                  {...register("capacity")}
                  aria-invalid={Boolean(errors.capacity)}
                  aria-describedby={
                    errors.capacity ? "capacity-error" : undefined
                  }
                  className="min-w-0 w-full bg-transparent text-[15px] text-[#f3f0ee] focus:outline-none"
                />
                <span className="shrink-0 text-[12px] text-[#a7a0a0]">
                  tickets
                </span>
              </div>
              <FieldError id="capacity-error" message={errors.capacity?.message} />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#c6c6c7]">
                Accepted Stellar Assets
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                <Controller
                  control={control}
                  name="acceptedXlm"
                  render={({ field }) => (
                    <label className="cursor-pointer">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(event) =>
                          field.onChange(event.target.checked)
                        }
                        aria-invalid={Boolean(errors.acceptedXlm)}
                        aria-describedby={
                          errors.acceptedXlm ? "accepted-assets-error" : undefined
                        }
                        className="peer sr-only"
                      />
                      <span
                        className={[
                          "flex items-center justify-between gap-2 rounded-lg p-2.5 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#ff5451]",
                          field.value
                            ? "bg-[#353534] text-[#f3f0ee]"
                            : "bg-[#201f1f] text-[#c6c6c7]",
                          errors.acceptedXlm ? "ring-1 ring-[#93000a]" : "",
                        ].join(" ")}
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <span
                            className={[
                              "material-symbols-outlined text-[18px]",
                              field.value ? "text-[#ff5451]" : "text-[#c6c6c7]",
                            ].join(" ")}
                          >
                            verified
                          </span>
                          <span className="truncate font-mono text-[11px]">
                            XLM (Native)
                          </span>
                        </span>
                        <span
                          className={[
                            "material-symbols-outlined text-[18px]",
                            field.value ? "text-[#ffb3ad]" : "text-[#3a3939]",
                          ].join(" ")}
                        >
                          {field.value ? "check_circle" : "radio_button_unchecked"}
                        </span>
                      </span>
                    </label>
                  )}
                />

                <Controller
                  control={control}
                  name="acceptedUsdc"
                  render={({ field }) => (
                    <label className="cursor-pointer">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(event) =>
                          field.onChange(event.target.checked)
                        }
                        aria-invalid={Boolean(errors.acceptedXlm)}
                        aria-describedby={
                          errors.acceptedXlm ? "accepted-assets-error" : undefined
                        }
                        className="peer sr-only"
                      />
                      <span
                        className={[
                          "flex items-center justify-between gap-2 rounded-lg p-2.5 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#ff5451]",
                          field.value
                            ? "bg-[#353534] text-[#f3f0ee]"
                            : "bg-[#201f1f] text-[#c6c6c7]",
                          errors.acceptedXlm ? "ring-1 ring-[#93000a]" : "",
                        ].join(" ")}
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <span
                            className={[
                              "material-symbols-outlined text-[18px]",
                              field.value ? "text-[#ff5451]" : "text-[#c6c6c7]",
                            ].join(" ")}
                          >
                            attach_money
                          </span>
                          <span className="truncate font-mono text-[11px]">
                            USDC
                          </span>
                        </span>
                        <span
                          className={[
                            "material-symbols-outlined text-[18px]",
                            field.value ? "text-[#ffb3ad]" : "text-[#3a3939]",
                          ].join(" ")}
                        >
                          {field.value
                            ? "check_circle"
                            : "radio_button_unchecked"}
                        </span>
                      </span>
                    </label>
                  )}
                />
              </div>
              <FieldError
                id="accepted-assets-error"
                message={errors.acceptedXlm?.message}
              />
            </div>
          </FormSection>

          <FormSection icon="gavel" title="4. Escrow Smart Contract">
            <div className="flex items-center justify-between gap-3 rounded-xl bg-[#0e0e0e] p-3">
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#f3f0ee]">
                  Attendee Self-Refund
                </span>
                <span className="text-[12px] text-[#a7a0a0]">
                  Allow automated wallet claim
                </span>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <Controller
                  control={control}
                  name="selfRefund"
                  render={({ field }) => (
                    <>
                      <input
                        id="self-refund"
                        type="checkbox"
                        role="switch"
                        checked={field.value}
                        onChange={(event) =>
                          field.onChange(event.target.checked)
                        }
                        className="peer sr-only"
                      />
                      <span
                        className={[
                          "flex h-6 w-12 items-center rounded-full p-0.5 transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-[#ff5451] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#0e0e0e]",
                          field.value
                            ? "justify-end bg-[#ff5451] shadow-[0_0_12px_rgba(239,68,68,0.4)]"
                            : "justify-start bg-[#353534]",
                        ].join(" ")}
                      >
                        <span className="h-5 w-5 rounded-full bg-[#e5e2e1] shadow-sm" />
                      </span>
                    </>
                  )}
                />
              </label>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="refund-deadline"
                className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#c6c6c7]"
              >
                Refund Deadline Threshold
              </label>
              <div
                className={[
                  "flex items-center gap-2 rounded-lg bg-[#0e0e0e] p-2",
                  errors.refundDeadline ? "ring-1 ring-[#93000a]" : "",
                ].join(" ")}
              >
                <span className="material-symbols-outlined text-[18px] text-[#ffb3ad]">
                  timer
                </span>
                <select
                  id="refund-deadline"
                  {...register("refundDeadline")}
                  aria-invalid={Boolean(errors.refundDeadline)}
                  aria-describedby={
                    errors.refundDeadline ? "refund-deadline-error" : undefined
                  }
                  className="w-full appearance-none bg-transparent font-mono text-[12px] text-[#f3f0ee] focus:outline-none"
                >
                  {refundOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-[#171717] text-[#f3f0ee]"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined text-[18px] text-[#c6c6c7]">
                  expand_more
                </span>
              </div>
              <FieldError
                id="refund-deadline-error"
                message={errors.refundDeadline?.message}
              />
            </div>

            <div className="flex items-start gap-2 rounded-lg bg-[#0e0e0e] p-3">
              <span className="material-symbols-outlined mt-0.5 text-[18px] text-[#ffb3ad]">
                verified_user
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#f3f0ee]">
                  Protocol Fee: 0%
                </span>
                <span className="text-[12px] text-[#a7a0a0]">
                  Sponsored on Stellar testnet/mainnet via Soroban smart
                  contract subsidies.
                </span>
              </div>
            </div>
          </FormSection>

          <div className="sticky bottom-16 z-40 w-full bg-[#131313]/90 py-2 backdrop-blur-xl">
            <Button
              type="submit"
              size="lg"
              fullWidth
              className="rounded-xl shadow-[0_0_24px_-4px_rgba(239,68,68,0.45)]"
            >
              <span className="material-symbols-outlined text-[24px]">
                deployed_code_history
              </span>
              Publish Event On-Chain
            </Button>
            <p
              aria-live="polite"
              className="mt-1 text-center font-mono text-[11px] text-[#a7a0a0]"
            >
              {notice ?? "Est. Contract Fee: ~0.00012 XLM"}
            </p>
          </div>
        </form>
      </main>

      <BottomNav />
    </div>
  );
}
