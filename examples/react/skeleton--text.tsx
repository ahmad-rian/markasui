import { Skeleton } from "../../components/skeleton/Skeleton";

export default function SkeletonTextExample() {
  return (
    <div className="grid gap-3" role="status">
      <span className="sr-only">Loading content</span>
      <Skeleton className="h-6 w-1/2" />
      <div className="grid gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}
