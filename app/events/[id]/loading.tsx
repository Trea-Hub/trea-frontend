import { AppShell } from "@/components/AppShell";
import { Skeleton } from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <AppShell
      active="discover"
      title="Event Detail"
      backHref="/"
      maxWidth="6xl"
    >
      <div className="w-full" aria-busy="true" aria-label="Loading event">
        <Skeleton className="h-[280px] w-full rounded-lg sm:h-[350px] md:h-[420px]" />
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-4 rounded-lg border border-white/10 bg-[#1b1b1b] p-5">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="mt-6 h-11 w-full rounded-md" />
          </div>
          <div className="rounded-lg border border-white/10 bg-[#1b1b1b] p-5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-5 h-3 w-full" />
            <Skeleton className="mt-3 h-3 w-full" />
            <Skeleton className="mt-3 h-3 w-3/4" />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
