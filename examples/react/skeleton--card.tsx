import { Skeleton } from "../../components/skeleton/Skeleton";

export default function SkeletonCardExample() {
  return (
    <div
      className="grid gap-4 rounded-lg border border-line bg-surface p-4"
      role="status"
    >
      <span className="sr-only">Loading article</span>
      <Skeleton className="h-36 w-full" />
      <div className="grid gap-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <Skeleton className="h-10 w-28" />
    </div>
  );
}
