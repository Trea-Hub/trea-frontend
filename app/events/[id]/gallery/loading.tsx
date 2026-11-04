import { PageHeaderSkeleton, Skeleton } from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#131313]" aria-busy="true" aria-label="Loading gallery">
      <PageHeaderSkeleton />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 lg:px-8">
        <Skeleton className="h-7 w-44" />
        <div className="mt-4 flex gap-2 overflow-hidden">
          {["w-16", "w-24", "w-28", "w-20"].map((width) => (
            <Skeleton key={width} className={`h-9 shrink-0 rounded-full ${width}`} />
          ))}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <Skeleton key={index} className="aspect-square rounded-lg" />
          ))}
        </div>
      </main>
    </div>
  );
}
