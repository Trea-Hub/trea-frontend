import { ApiError, fetchJson } from "@/lib/api-error";
import { getDemoEventById, getDemoEvents } from "@/lib/demo-data";

export type BackendEvent = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  date: string | null;
  is_free: boolean | null;
  tags: string[] | null;
  organizer?: string | null;
  registered_count?: number | null;
  created_at?: string | null;
};

export type BackendEventDetail = BackendEvent & {
  price?: string | number | null;
  currency?: string | null;
  capacity?: number | null;
  registered?: number | null;
};

export type EventItem = {
  id: string;
  title: string;
  date: string;
  dateValue: number | null;
  price: string;
  badge?: string;
  badgeClassName?: string;
  location: string;
  description: string;
  image?: string;
  registeredCount: number | null;
  actionLabel: string;
};

export type EventDetail = {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string | null;
  category: string;
  date: string;
  schedule: string | null;
  location: string;
  format: string | null;
  price: string;
  currency: string | null;
  badge: string;
  seats: string | null;
  filled: number | null;
  description: string;
  secondaryDescription: string | null;
  speakers: {
    name: string;
    role: string;
    company: string;
    image: string;
  }[];
  agenda: { time: string; title: string; detail: string }[];
  galleryCount: number;
  galleryPreview: { image: string; alt: string }[];
  tags: string[];
};

export type EventQuery = {
  q?: string;
  isFree?: boolean;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
};

const DEFAULT_BACKEND_URL = "http://localhost:4000";

export function isDemoMode() {
  const flag = process.env.NEXT_PUBLIC_DEMO_MODE?.trim().toLowerCase();

  if (flag === "false" || flag === "0" || flag === "off") return false;
  if (flag === "true" || flag === "1" || flag === "on") return true;

  return !process.env.NEXT_PUBLIC_BACKEND_URL?.trim();
}

function getBackendUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.trim();
  return (configuredUrl || DEFAULT_BACKEND_URL).replace(/\/+$/, "");
}

function buildQueryString(query: EventQuery, tag?: string) {
  const params = new URLSearchParams();

  if (query.q) params.set("q", query.q);
  if (query.isFree !== undefined) params.set("is_free", String(query.isFree));
  if (tag) params.set("tag", tag);
  if (query.dateFrom) params.set("date_from", query.dateFrom);
  if (query.dateTo) params.set("date_to", query.dateTo);

  return params.toString();
}

async function fetchEventsForTag(
  query: EventQuery,
  tag: string | undefined,
  signal?: AbortSignal,
) {
  const queryString = buildQueryString(query, tag);
  const url = `${getBackendUrl()}/events${queryString ? `?${queryString}` : ""}`;
  const data = await fetchJson<{ events?: BackendEvent[] }>(url, {
    cache: "no-store",
    signal,
    headers: { Accept: "application/json" },
  });

  if (!Array.isArray(data.events)) {
    throw new ApiError("The event service returned an unexpected response.");
  }

  return data.events;
}

function formatEventDate(value: string | null) {
  if (!value) {
    return { label: "Date TBA", timestamp: null };
  }

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

function mapBackendEvent(event: BackendEvent): EventItem | null {
  if (!event || typeof event.id !== "string" || !event.id) return null;
  if (typeof event.title !== "string" || !event.title.trim()) return null;

  const date = formatEventDate(event.date);
  const tags = Array.isArray(event.tags)
    ? event.tags.filter((tag): tag is string => typeof tag === "string")
    : [];
  const isFree = event.is_free === true;
  const registeredCount =
    typeof event.registered_count === "number" ? event.registered_count : null;

  return {
    id: event.id,
    title: event.title,
    date: date.label,
    dateValue: date.timestamp,
    price: isFree ? "Free" : "Paid",
    badge: tags[0]?.toUpperCase(),
    badgeClassName: "bg-white/10 text-[#e5e2e1]",
    location: event.location?.trim() || "Location TBA",
    description: event.description?.trim() || "Details coming soon.",
    registeredCount,
    actionLabel: isFree ? "Get Pass" : "View Event",
  };
}

function toText(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function toNumber(value: unknown) {
  const numeric =
    typeof value === "number"
      ? value
      : typeof value === "string" && value.trim()
        ? Number(value)
        : Number.NaN;

  return Number.isFinite(numeric) ? numeric : null;
}

function toCount(value: unknown) {
  const numeric = toNumber(value);
  return numeric !== null && numeric >= 0 ? Math.floor(numeric) : null;
}

function formatDetailPrice(event: BackendEventDetail) {
  const numericPrice = toNumber(event.price);
  const rawPrice = toText(event.price);
  const currency = toText(event.currency);
  const isFree = event.is_free === true || numericPrice === 0;

  if (isFree) {
    return { price: "Free", currency: null, badge: "Free Entry" };
  }

  if (numericPrice !== null && numericPrice > 0) {
    return {
      price: rawPrice ?? numericPrice.toLocaleString("en-US"),
      currency,
      badge: "Paid Event",
    };
  }

  return {
    price: rawPrice ?? (event.is_free === false ? "Paid" : "Price TBA"),
    currency,
    badge: event.is_free === false ? "Paid Event" : "Event Pass",
  };
}

function mapBackendEventDetail(event: BackendEventDetail): EventDetail | null {
  if (!event || typeof event.id !== "string" || !event.id) return null;
  if (typeof event.title !== "string" || !event.title.trim()) return null;

  const date = formatEventDate(event.date);
  const tags = Array.isArray(event.tags)
    ? event.tags.filter((tag): tag is string => typeof tag === "string" && tag.trim().length > 0)
    : [];
  const registeredCount =
    toCount(event.registered_count) ?? toCount(event.registered);
  const capacity = toCount(event.capacity);
  const price = formatDetailPrice(event);
  const filled =
    registeredCount !== null && capacity !== null && capacity > 0
      ? Math.min(100, Math.round((registeredCount / capacity) * 1000) / 10)
      : null;
  const seats =
    registeredCount === null
      ? null
      : capacity === null
        ? `${registeredCount.toLocaleString("en-US")} registered`
        : `${registeredCount.toLocaleString("en-US")} / ${capacity.toLocaleString("en-US")}`;

  return {
    id: event.id,
    title: event.title.trim(),
    subtitle:
      tags.length > 1
        ? tags.slice(1).join(" · ").toUpperCase()
        : "Event",
    coverImage: null,
    category: tags[0]?.toUpperCase() ?? "Event",
    date: date.label,
    schedule: null,
    location: event.location?.trim() || "Location TBA",
    format: null,
    price: price.price,
    currency: price.currency,
    badge: price.badge,
    seats,
    filled,
    description: event.description?.trim() || "Details coming soon.",
    secondaryDescription: null,
    speakers: [],
    agenda: [],
    galleryCount: 0,
    galleryPreview: [],
    tags,
  };
}

function parseEventDetailResponse(data: unknown): BackendEventDetail | null {
  if (!data || typeof data !== "object") return null;

  const record = data as Record<string, unknown>;
  const candidate =
    record.event ??
    record.data ??
    (Array.isArray(record.events) ? record.events[0] : record);

  if (!candidate || typeof candidate !== "object") return null;

  const event = candidate as BackendEventDetail;
  return typeof event.id === "string" && event.id ? event : null;
}

async function fetchEventFromList(id: string, signal?: AbortSignal) {
  const events = await fetchEventsForTag({}, undefined, signal);
  return events.find((event) => event.id === id) ?? null;
}

export async function fetchEventById(id: string, signal?: AbortSignal) {
  if (!id.trim()) return null;

  if (isDemoMode()) {
    return getDemoEventById(id);
  }

  const url = `${getBackendUrl()}/events/${encodeURIComponent(id)}`;

  try {
    const data = await fetchJson<unknown>(url, {
      cache: "no-store",
      signal,
      headers: { Accept: "application/json" },
    });
    const event = parseEventDetailResponse(data);
    const mapped = event && event.id === id ? mapBackendEventDetail(event) : null;

    if (mapped) return mapped;

    const fallbackEvent = await fetchEventFromList(id, signal);
    return fallbackEvent ? mapBackendEventDetail(fallbackEvent) : null;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      const fallbackEvent = await fetchEventFromList(id, signal);
      return fallbackEvent ? mapBackendEventDetail(fallbackEvent) : null;
    }

    throw error;
  }
}

export async function fetchEvents(query: EventQuery, signal?: AbortSignal) {
  if (isDemoMode()) {
    return getDemoEvents(query);
  }

  const tags = query.tags?.filter(Boolean) ?? [];
  const requests =
    tags.length > 1
      ? tags.map((tag) => fetchEventsForTag(query, tag, signal))
      : [fetchEventsForTag(query, tags[0], signal)];
  const responses = await Promise.all(requests);
  const eventsById = new Map<string, BackendEvent>();

  responses.forEach((events) => {
    events.forEach((event) => {
      if (event?.id) eventsById.set(event.id, event);
    });
  });

  return Array.from(eventsById.values())
    .map(mapBackendEvent)
    .filter((event): event is EventItem => event !== null)
    .sort((left, right) => {
      if (left.dateValue === null && right.dateValue === null) {
        return left.title.localeCompare(right.title);
      }
      if (left.dateValue === null) return 1;
      if (right.dateValue === null) return -1;
      return left.dateValue - right.dateValue;
    });
}
