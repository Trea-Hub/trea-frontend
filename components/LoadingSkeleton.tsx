type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded bg-[#2a2a2a] ring-1 ring-white/[0.03] ${className}`}
    />
  );
}

export function PageHeaderSkeleton() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16 border-b border-white/10 bg-[#131313]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-7 w-28 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </header>
  );
}

export function EventCardSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-[#1b1b1b]">
      <Skeleton className={compact ? "h-36 w-full rounded-none" : "h-48 w-full rounded-none"} />
      <div className="space-y-3 p-4">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-8 w-full rounded-md" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {[0, 1, 2].map((item) => (
        <div key={item} className="rounded-lg border border-white/10 bg-[#1b1b1b] p-4">
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="mt-4 h-7 w-2/3" />
          <Skeleton className="mt-3 h-2 w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}
