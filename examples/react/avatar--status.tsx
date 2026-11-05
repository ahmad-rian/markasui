import { Avatar } from "../../components/avatar/Avatar";

export default function AvatarStatusExample() {
  return (
    <div className="flex items-center gap-6">
      <span className="relative inline-flex">
        <Avatar name="Budi Santoso" size="lg" />
        <span className="absolute right-0 bottom-0 size-3 rounded-full bg-success ring-2 ring-canvas">
          <span className="sr-only">Online</span>
        </span>
      </span>
      <span className="relative inline-flex">
        <Avatar name="Siti Aminah" size="lg" />
        <span className="absolute right-0 bottom-0 size-3 rounded-full bg-warning ring-2 ring-canvas">
          <span className="sr-only">Away</span>
        </span>
      </span>
      <span className="relative inline-flex">
        <Avatar name="John Carter" size="lg" />
        <span className="absolute right-0 bottom-0 size-3 rounded-full bg-faint ring-2 ring-canvas">
          <span className="sr-only">Offline</span>
        </span>
      </span>
    </div>
  );
}
