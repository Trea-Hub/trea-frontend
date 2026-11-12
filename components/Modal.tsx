"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className = "",
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={[
          "w-full max-w-xl rounded-t-2xl border border-white/10 bg-[#1b1b1b] p-5 shadow-[0_25px_60px_rgba(0,0,0,0.65)] sm:rounded-2xl",
          className,
        ].join(" ")}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#ffb3ad]">
              <span className="inline-block h-2 w-2 rounded-full bg-[#ff5451]" />
              Stellar Protocol Access
            </div>
            <h2
              id="modal-title"
              className="text-2xl font-semibold tracking-tight text-[#f3f0ee]"
            >
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-[#e5e2e1] transition hover:bg-white/10"
          >
            ×
          </button>
        </div>

        {description ? (
          <div className="mb-4 text-sm leading-6 text-[#d7d2cf]">
            {description}
          </div>
        ) : null}

        {children}
      </div>
    </div>
  );
}
