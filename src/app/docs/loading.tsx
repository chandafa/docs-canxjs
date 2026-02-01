import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

export default function DocsLoading() {
  return (
    <div className="max-w-4xl animate-pulse">
      {/* Breadcrumb */}
      <Skeleton className="h-4 w-32 mb-8" />
      
      {/* Badge */}
      <Skeleton className="h-6 w-24 rounded-full mb-4" />
      
      {/* Title */}
      <Skeleton className="h-12 w-80 mb-4" />
      
      {/* Description */}
      <Skeleton className="h-6 w-full max-w-xl mb-12" />

      {/* Content sections */}
      <div className="space-y-8">
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6">
          <Skeleton className="h-6 w-48 mb-4" />
          <SkeletonText />
        </div>

        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6">
          <Skeleton className="h-6 w-40 mb-4" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-8 w-56" />
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-white/[0.08] p-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
