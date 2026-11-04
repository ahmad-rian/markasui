import { Skeleton } from "../../components/skeleton/Skeleton";

export default function SkeletonFixture() {
  return (
    <div
      className="flex items-center gap-4 rounded-lg border border-line bg-surface p-4"
      role="status"
    >
      <span className="sr-only">Loading profile</span>
      <Skeleton shape="circle" className="size-12 shrink-0" />
      <div className="grid flex-1 gap-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
