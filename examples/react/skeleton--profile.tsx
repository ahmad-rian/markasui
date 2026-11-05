import { Skeleton } from "../../components/skeleton/Skeleton";

export default function SkeletonProfileExample() {
  return (
    <div
      className="grid justify-items-center gap-4 rounded-lg border border-line bg-surface p-6"
      role="status"
    >
      <span className="sr-only">Loading profile</span>
      <Skeleton shape="circle" className="size-20" />
      <div className="grid w-full justify-items-center gap-2">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-56" />
      </div>
      <div className="grid w-full grid-cols-3 gap-3">
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
      </div>
    </div>
  );
}
