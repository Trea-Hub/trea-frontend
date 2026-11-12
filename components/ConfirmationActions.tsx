"use client";

import { useNotifications } from "./Notifications";

type ConfirmationActionsProps = {
  title: string;
  date: string;
  location: string;
};

function resolveStartDate(label: string) {
  const parsed = new Date(label);
  if (!Number.isNaN(parsed.getTime())) return parsed;

  const match = label.match(/([A-Z][a-z]{2})\s+(\d{1,2})(?:-\d{1,2})?,?\s*(\d{4})?/);
  if (match) {
    const year = match[3] ? Number(match[3]) : new Date().getFullYear();
    const candidate = new Date(`${match[1]} ${match[2]}, ${year}`);
    if (!Number.isNaN(candidate.getTime())) return candidate;
  }

  const fallback = new Date();
  fallback.setDate(fallback.getDate() + 7);
  return fallback;
}

function formatIcsDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function escapeIcsText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export function ConfirmationActions({
  title,
  date,
  location,
}: ConfirmationActionsProps) {
  const { notify } = useNotifications();

  function addToCalendar() {
    const start = resolveStartDate(date);
    start.setHours(18, 0, 0, 0);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    const filename =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 48) || "trea-event";

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Trea//Event Registration//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@trea.events`,
      `DTSTAMP:${formatIcsDate(new Date())}`,
      `DTSTART:${formatIcsDate(start)}`,
      `DTEND:${formatIcsDate(end)}`,
      `SUMMARY:${escapeIcsText(title)}`,
      `LOCATION:${escapeIcsText(location)}`,
      "DESCRIPTION:Registration confirmed via Trea.",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.ics`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);

    notify({
      tone: "success",
      title: "Calendar invite downloaded",
      message: `${title} is ready to add to your calendar.`,
    });
  }

  async function shareTicket() {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Trea ticket: ${title}`,
          text: `I'm going to ${title}!`,
          url,
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      notify({
        tone: "success",
        title: "Ticket link copied",
        message: "Your ticket link is ready to share.",
      });
    } catch {
      notify({
        tone: "error",
        title: "Could not share ticket",
        message: "Copy the URL from your browser instead.",
      });
    }
  }

  return (
    <div className="grid grid-cols-2 gap-2.5">
      <button
        type="button"
        onClick={addToCalendar}
        className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1f1f1f] text-sm font-medium text-[#f3f0ee] shadow-sm transition hover:bg-[#2a2a2a]"
      >
        <span className="material-symbols-outlined text-[18px] text-[#ffb3ad]">
          event
        </span>
        <span>Add to Calendar</span>
      </button>

      <button
        type="button"
        onClick={shareTicket}
        className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1f1f1f] text-sm font-medium text-[#f3f0ee] shadow-sm transition hover:bg-[#2a2a2a]"
      >
        <span className="material-symbols-outlined text-[18px] text-[#ffb3ad]">
          share
        </span>
        <span>Share Ticket</span>
      </button>
    </div>
  );
}
