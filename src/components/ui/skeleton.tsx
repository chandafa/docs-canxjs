import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-white/[0.05]",
        className
      )}
      {...props}
    />
  );
}

export function SkeletonText({ className, ...props }: SkeletonProps) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-3/5" />
    </div>
  );
}

export function SkeletonCard({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 space-y-4",
        className
      )}
      {...props}
    >
      <Skeleton className="h-12 w-12 rounded-xl" />
      <Skeleton className="h-5 w-32" />
      <SkeletonText />
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="text-center space-y-8 py-20">
      <Skeleton className="h-10 w-40 mx-auto rounded-full" />
      <div className="space-y-4">
        <Skeleton className="h-12 w-80 mx-auto" />
        <Skeleton className="h-12 w-64 mx-auto" />
      </div>
      <Skeleton className="h-6 w-96 mx-auto" />
      <div className="flex justify-center gap-4">
        <Skeleton className="h-12 w-36 rounded-full" />
        <Skeleton className="h-12 w-36 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6, className, ...props }: SkeletonProps & { count?: number }) {
  return (
    <div className={cn("grid sm:grid-cols-2 lg:grid-cols-3 gap-4", className)} {...props}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
