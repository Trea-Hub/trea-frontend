import type { ReactNode } from "react";
import { AppHeader, type AppNavKey } from "./AppHeader";
import { BottomNav } from "./BottomNav";
import { Footer } from "./Footer";

type MaxWidth = "4xl" | "5xl" | "6xl" | "7xl";

const maxWidthClasses: Record<MaxWidth, string> = {
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
};

type AppShellProps = {
  children: ReactNode;
  active?: AppNavKey;
  title?: string;
  backHref?: string;
  backLabel?: string;
  maxWidth?: MaxWidth;
  showBottomNav?: boolean;
  showFooter?: boolean;
  contentClassName?: string;
};

export function AppShell({
  children,
  active,
  title,
  backHref,
  backLabel,
  maxWidth = "7xl",
  showBottomNav = true,
  showFooter = false,
  contentClassName,
}: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#131313] text-[#e5e2e1]">
      <AppHeader
        active={active}
        title={title}
        backHref={backHref}
        backLabel={backLabel}
      />

      <main
        className={[
          "mx-auto flex w-full flex-1 flex-col px-4 pt-20 sm:px-6 lg:px-8",
          showBottomNav ? "pb-28 lg:pb-16" : "pb-16",
          maxWidthClasses[maxWidth],
          contentClassName ?? "",
        ].join(" ")}
      >
        {children}
      </main>

      {showFooter ? <Footer /> : null}
      {showBottomNav ? <BottomNav active={active} /> : null}
    </div>
  );
}
