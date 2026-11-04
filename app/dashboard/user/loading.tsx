import { DashboardSkeleton, PageHeaderSkeleton, Skeleton } from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#131313]" aria-busy="true" aria-label="Loading user dashboard">
      <PageHeaderSkeleton />
      <main className="mx-auto max-w-[480px] px-4 pb-28 pt-20 sm:px-6">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="mt-3 h-8 w-52" />
        <div className="mt-6"><DashboardSkeleton /></div>
        <div className="mt-6 flex gap-2">
          {[0, 1, 2].map((item) => (
            <Skeleton key={item} className="h-8 w-24 rounded-full" />
          ))}
        </div>
        {[0, 1].map((item) => (
          <div key={item} className="mt-4 rounded-lg border border-white/10 bg-[#1b1b1b] p-4">
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
      </main>
    </div>
  );
}
