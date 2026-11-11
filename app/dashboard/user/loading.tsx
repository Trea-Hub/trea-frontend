import { AppShell } from "@/components/AppShell";
import { DashboardSkeleton, Skeleton } from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <AppShell active="tickets" title="My Tickets" maxWidth="6xl">
      <div aria-busy="true" aria-label="Loading user dashboard">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="mt-3 h-8 w-52" />
        <div className="mt-6"><DashboardSkeleton /></div>
        <div className="mt-6 flex gap-2">
          {[0, 1, 2].map((item) => (
            <Skeleton key={item} className="h-8 w-24 rounded-full" />
          ))}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="rounded-lg border border-white/10 bg-[#1b1b1b] p-4">
              <div className="flex gap-4">
                <Skeleton className="h-24 w-24 shrink-0 rounded-md" />
                <div className="min-w-0 flex-1 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
