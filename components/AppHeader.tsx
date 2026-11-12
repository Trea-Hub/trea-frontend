import Image from "next/image";
import Link from "next/link";

export type AppNavKey =
  | "discover"
  | "tickets"
  | "create"
  | "manage"
  | "gallery"
  | "wallet";

const TREA_LOGO = "/trea-logo.svg";

const PROFILE_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAFuXodJxvy-va-78PTdiU8ZhKQdHyJwQNqNFdepsOWnUrq659A3aTmf7VBKewRz1Tv6NauE_5vI8gnVfo7SP3O_hkMHlTTrXnfSBuJcS6CoLuhoLo3043VL5ngYQ92abrNW0b_0lKFuIRAJmI3WdBX3fm3vNsEpfMcQmm0A8-1iaJZ9MG-_siQsr6lnhHu3QoLo8urCkVnNInmNoEj4cEtpxrHwmgrhw4RZrejct814COaDYLwlHix";

const navItems: { key: AppNavKey; label: string; href: string }[] = [
  { key: "discover", label: "Discover", href: "/" },
  { key: "tickets", label: "Tickets", href: "/dashboard/user" },
  { key: "manage", label: "Manage", href: "/dashboard/organiser" },
  { key: "gallery", label: "Gallery", href: "/events/meridian-2025/gallery" },
  { key: "wallet", label: "Wallet", href: "/wallet/connect" },
];

type AppHeaderProps = {
  active?: AppNavKey;
  title?: string;
  backHref?: string;
  backLabel?: string;
};

export function AppHeader({
  active,
  title,
  backHref,
  backLabel = "Go back",
}: AppHeaderProps) {
  return (
    <header className="pt-safe fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#131313]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 shrink-0 items-center gap-2">
          {backHref ? (
            <Link
              href={backHref}
              aria-label={backLabel}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#e5e2e1] transition hover:bg-white/5"
            >
              <span className="material-symbols-outlined text-[22px]">
                arrow_back
              </span>
            </Link>
          ) : null}

          <Link
            href="/"
            aria-label="Trea home"
            className="flex shrink-0 items-center gap-2"
          >
            <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-md bg-[#1f1f1f] ring-1 ring-white/10">
              <Image
                src={TREA_LOGO}
                alt="Trea logo"
                fill
                sizes="32px"
                unoptimized
                className="object-cover"
              />
            </span>
            <span className="hidden text-xl font-semibold tracking-tight text-[#e5e2e1] sm:inline">
              Trea
            </span>
          </Link>
        </div>

        {title ? (
          <h1 className="min-w-0 flex-1 truncate text-center text-base font-semibold tracking-tight text-[#f3f0ee] lg:hidden">
            {title}
          </h1>
        ) : (
          <div className="flex-1" />
        )}

        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center justify-center gap-1 lg:flex"
        >
          {navItems.map((item) => {
            const isActive = item.key === active;

            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "rounded-full px-3 py-2 text-[11px] font-medium uppercase tracking-[0.12em] transition",
                  isActive
                    ? "bg-[#ff5451]/15 text-[#ffb3ad]"
                    : "text-[#a7a0a0] hover:bg-white/5 hover:text-[#f3f0ee]",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-[#2a2a2a] px-3 py-1.5 shadow-[0_0_18px_rgba(255,84,81,0.15)] md:flex">
            <span className="h-2 w-2 rounded-full bg-[#ffb3ad] shadow-[0_0_10px_rgba(255,179,173,0.8)]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#d7d2cf]">
              Stellar Mainnet
            </span>
          </div>

          <Link
            href="/wallet/connect"
            aria-label="Connect Stellar wallet"
            aria-current={active === "wallet" ? "page" : undefined}
            className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full ring-1 ring-white/10 transition hover:ring-[#ffb3ad]/50"
          >
            <Image
              src={PROFILE_IMAGE}
              alt="Profile"
              fill
              sizes="36px"
              className="object-cover"
            />
            <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#131313] bg-[#ff5451]" />
          </Link>
        </div>
      </div>
    </header>
  );
}
