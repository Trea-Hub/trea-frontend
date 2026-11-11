import { AppShell } from "@/components/AppShell";
import { Skeleton } from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <AppShell active="gallery" maxWidth="6xl">
      <div aria-busy="true" aria-label="Loading gallery">
        <Skeleton className="h-7 w-44" />
        <div className="mt-4 flex gap-2 overflow-hidden">
          {["w-16", "w-24", "w-28", "w-20"].map((width) => (
            <Skeleton key={width} className={`h-9 shrink-0 rounded-full ${width}`} />
          ))}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 8 }, (_, index) => (
            <Skeleton key={index} className="aspect-square rounded-lg" />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
