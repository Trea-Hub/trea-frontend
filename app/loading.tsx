import { AppShell } from "@/components/AppShell";
import { EventCardSkeleton, Skeleton } from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <AppShell active="discover" showFooter>
      <div className="flex w-full flex-1 flex-col pt-4" aria-busy="true" aria-label="Loading events">
        <div className="mb-5 flex gap-2 overflow-hidden">
          {["w-16", "w-20", "w-28", "w-24"].map((width) => (
            <Skeleton key={width} className={`h-8 shrink-0 rounded-full ${width}`} />
          ))}
        </div>
        <Skeleton className="mb-2 h-7 w-52" />
        <Skeleton className="mb-6 h-3 w-72 max-w-full" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <EventCardSkeleton />
          <EventCardSkeleton />
          <EventCardSkeleton />
        </div>
      </div>
    </AppShell>
  );
}
