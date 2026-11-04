"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type NotificationTone = "error" | "success" | "info";

type Notification = {
  id: number;
  tone: NotificationTone;
  title: string;
  message?: string;
};

type NotificationsContextValue = {
  notify: (notification: Omit<Notification, "id">) => void;
  dismiss: (id: number) => void;
};

const NotificationsContext = createContext<NotificationsContextValue | null>(null);

const MAX_NOTIFICATIONS = 3;
const AUTO_DISMISS_MS = 6000;

const toneStyles: Record<
  NotificationTone,
  { container: string; title: string; message: string }
> = {
  error: {
    container: "border-[#93000a] bg-[#231314] text-[#ffdad6]",
    title: "text-[#ffb4ab]",
    message: "text-[#ffdad6]",
  },
  success: {
    container: "border-[#2f6f4f] bg-[#18231d] text-[#d7e8df]",
    title: "text-[#b9d2c7]",
    message: "text-[#d7e8df]",
  },
  info: {
    container: "border-white/10 bg-[#1b1b1b] text-[#f3f0ee]",
    title: "text-[#f3f0ee]",
    message: "text-[#d7d2cf]",
  },
};

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const nextIdRef = useRef(0);
  const timersRef = useRef(new Map<number, number>());

  const dismiss = useCallback((id: number) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      window.clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id),
    );
  }, []);

  const notify = useCallback((notification: Omit<Notification, "id">) => {
    const id = nextIdRef.current++;
    setNotifications((current) =>
      [...current, { ...notification, id }].slice(-MAX_NOTIFICATIONS),
    );
  }, []);

  useEffect(() => {
    const activeIds = new Set(notifications.map((notification) => notification.id));

    timersRef.current.forEach((timer, id) => {
      if (!activeIds.has(id)) {
        window.clearTimeout(timer);
        timersRef.current.delete(id);
      }
    });

    notifications.forEach((notification) => {
      if (timersRef.current.has(notification.id)) return;
      timersRef.current.set(
        notification.id,
        window.setTimeout(() => dismiss(notification.id), AUTO_DISMISS_MS),
      );
    });
  }, [dismiss, notifications]);

  useEffect(() => {
    const timers = timersRef.current;

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    };
  }, []);

  const value = useMemo(() => ({ notify, dismiss }), [dismiss, notify]);

  return (
    <NotificationsContext.Provider value={value}>
      {children}
      <div
        className="fixed right-4 top-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6"
        aria-live="polite"
      >
        {notifications.map((notification) => {
          const styles = toneStyles[notification.tone];

          return (
            <div
              key={notification.id}
              role={notification.tone === "error" ? "alert" : "status"}
              className={`relative rounded-lg border p-4 shadow-[0_20px_60px_rgba(0,0,0,0.55)] ${styles.container}`}
            >
              <button
                type="button"
                onClick={() => dismiss(notification.id)}
                aria-label="Dismiss notification"
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-[#d7d2cf] hover:bg-white/10"
              >
                ×
              </button>
              <p
                className={`pr-7 text-[11px] font-semibold uppercase tracking-[0.16em] ${styles.title}`}
              >
                {notification.title}
              </p>
              {notification.message ? (
                <p className={`mt-1.5 text-sm leading-5 ${styles.message}`}>
                  {notification.message}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications must be used within NotificationsProvider");
  }
  return context;
}
