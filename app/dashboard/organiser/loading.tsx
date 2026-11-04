import { DashboardSkeleton, PageHeaderSkeleton, Skeleton } from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#131313]" aria-busy="true" aria-label="Loading organizer dashboard">
      <PageHeaderSkeleton />
      <main className="mx-auto max-w-[480px] px-4 pb-28 pt-20 sm:px-6">
        <Skeleton className="h-3 w-36" />
        <Skeleton className="mt-3 h-8 w-56" />
        <div className="mt-6"><DashboardSkeleton /></div>
        {[0, 1].map((item) => (
          <div key={item} className="mt-4 rounded-lg border border-white/10 bg-[#1b1b1b] p-4">
            <Skeleton className="h-32 w-full rounded-md" />
            <Skeleton className="mt-4 h-5 w-2/3" />
            <Skeleton className="mt-3 h-3 w-full" />
            <Skeleton className="mt-2 h-3 w-4/5" />
          </div>
        ))}
      </main>
    </div>
  );
}
