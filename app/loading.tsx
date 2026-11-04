import { EventCardSkeleton, PageHeaderSkeleton, Skeleton } from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#131313]" aria-busy="true" aria-label="Loading events">
      <PageHeaderSkeleton />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 lg:px-8">
        <div className="mb-5 flex gap-2 overflow-hidden">
          {["w-16", "w-20", "w-28", "w-24"].map((width) => (
            <Skeleton key={width} className={`h-8 shrink-0 rounded-full ${width}`} />
          ))}
        </div>
        <Skeleton className="mb-2 h-7 w-52" />
        <Skeleton className="mb-6 h-3 w-72 max-w-full" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <EventCardSkeleton />
          <EventCardSkeleton />
          <EventCardSkeleton />
        </div>
      </main>
    </div>
  );
}
