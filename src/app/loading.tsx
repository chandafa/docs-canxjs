import { SkeletonHero, SkeletonGrid } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="relative bg-background min-h-screen">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero Skeleton */}
        <SkeletonHero />

        {/* Grid Skeleton */}
        <div className="py-16">
          <SkeletonGrid count={6} />
        </div>
      </div>
    </div>
  );
}
