"use client";

import { useState } from "react";
import { useNotifications } from "./Notifications";

type EventActionsProps = {
  title: string;
};

export function EventActions({ title }: EventActionsProps) {
  const { notify } = useNotifications();
  const [saved, setSaved] = useState(false);

  async function shareEvent() {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      notify({
        tone: "success",
        title: "Link copied",
        message: "The event link is ready to share.",
      });
    } catch {
      notify({
        tone: "error",
        title: "Could not copy link",
        message: "Copy the URL from your browser instead.",
      });
    }
  }

  function toggleSaved() {
    const nextSaved = !saved;
    setSaved(nextSaved);

    notify({
      tone: nextSaved ? "success" : "info",
      title: nextSaved ? "Event saved" : "Event removed",
      message: nextSaved
        ? `${title} was added to your saved events.`
        : `${title} was removed from your saved events.`,
    });
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Share event"
        onClick={shareEvent}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2a2a2a]/80 text-[#e5e2e1] backdrop-blur-md transition hover:bg-[#343434]"
      >
        <span className="material-symbols-outlined text-[20px]">share</span>
      </button>
      <button
        type="button"
        aria-label={saved ? "Remove saved event" : "Save event"}
        aria-pressed={saved}
        onClick={toggleSaved}
        className={[
          "flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition",
          saved
            ? "bg-[#ff5451]/20 text-[#ffb3ad] hover:bg-[#ff5451]/30"
            : "bg-[#2a2a2a]/80 text-[#e5e2e1] hover:bg-[#343434]",
        ].join(" ")}
      >
        <span
          className={[
            "material-symbols-outlined text-[20px]",
            saved ? "material-symbols-filled" : "",
          ].join(" ")}
        >
          bookmark
        </span>
      </button>
    </div>
  );
}
