import Link from "next/link";
import type { AppNavKey } from "./AppHeader";

type BottomNavItem = {
  icon: string;
  label: string;
  href: string;
  key: AppNavKey;
  featured?: boolean;
};

const bottomNavItems: BottomNavItem[] = [
  { icon: "explore", label: "Discover", href: "/", key: "discover" },
  {
    icon: "confirmation_number",
    label: "Tickets",
    href: "/dashboard/user",
    key: "tickets",
  },
  {
    icon: "add",
    label: "Create",
    href: "/events/create",
    key: "create",
    featured: true,
  },
  {
    icon: "insights",
    label: "Manage",
    href: "/dashboard/organiser",
    key: "manage",
  },
  {
    icon: "photo_library",
    label: "Gallery",
    href: "/events/meridian-2025/gallery",
    key: "gallery",
  },
];

export function BottomNav({ active }: { active?: AppNavKey }) {
  return (
    <nav className="pb-safe fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#1a1a1a]/95 backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex w-full max-w-xl items-center justify-around px-3 py-2 sm:px-6">
        {bottomNavItems.map((item) => {
          const isActive = item.key === active;

          if (item.featured) {
            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className="-mt-5 flex shrink-0 flex-col items-center justify-center gap-1"
              >
                <span
                  className={[
                    "flex h-12 w-12 items-center justify-center rounded-full text-white shadow-[0_0_24px_-4px_rgba(239,68,68,0.35)] transition",
                    isActive ? "bg-[#ff6a64]" : "bg-[#ff5451] hover:bg-[#e64a47]",
                  ].join(" ")}
                >
                  <span className="material-symbols-outlined text-[26px]">
                    {item.icon}
                  </span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.08em] text-[#a7a0a0]">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.key}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={[
                "flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 py-1.5 text-[10px] uppercase tracking-[0.08em]",
                isActive
                  ? "text-[#ffb3ad]"
                  : "text-[#a7a0a0] hover:text-[#f3f0ee]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[22px]">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
