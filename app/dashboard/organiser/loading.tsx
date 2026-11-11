import { AppShell } from "@/components/AppShell";
import { DashboardSkeleton, Skeleton } from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <AppShell active="manage" title="Organizer Studio" maxWidth="6xl">
      <div aria-busy="true" aria-label="Loading organizer dashboard">
        <Skeleton className="h-3 w-36" />
        <Skeleton className="mt-3 h-8 w-56" />
        <div className="mt-6"><DashboardSkeleton /></div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {[0, 1].map((item) => (
            <div key={item} className="rounded-lg border border-white/10 bg-[#1b1b1b] p-4">
              <Skeleton className="h-32 w-full rounded-md" />
              <Skeleton className="mt-4 h-5 w-2/3" />
              <Skeleton className="mt-3 h-3 w-full" />
              <Skeleton className="mt-2 h-3 w-4/5" />
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
