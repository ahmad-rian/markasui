import { Skeleton } from "../../components/skeleton/Skeleton";

export default function SkeletonListExample() {
  return (
    <div
      className="divide-y divide-line rounded-lg border border-line bg-surface"
      role="status"
    >
      <span className="sr-only">Loading messages</span>
      <div className="flex items-center gap-3 p-4">
        <Skeleton shape="circle" className="size-10 shrink-0" />
        <div className="grid flex-1 gap-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>
      <div className="flex items-center gap-3 p-4">
        <Skeleton shape="circle" className="size-10 shrink-0" />
        <div className="grid flex-1 gap-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </div>
      <div className="flex items-center gap-3 p-4">
        <Skeleton shape="circle" className="size-10 shrink-0" />
        <div className="grid flex-1 gap-2">
          <Skeleton className="h-4 w-2/5" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  );
}
