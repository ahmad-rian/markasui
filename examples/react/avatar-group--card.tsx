import { AvatarGroup } from "../../components/avatar-group/AvatarGroup";

const photo =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='rgb(46 107 58)'/%3E%3Ccircle cx='24' cy='19' r='8' fill='rgb(231 239 229)'/%3E%3Cpath d='M8 46c1-9 8-15 16-15s15 6 16 15z' fill='rgb(231 239 229)'/%3E%3C/svg%3E";

const team = [
  { name: "Dewi Lestari", src: photo },
  { name: "Budi Santoso" },
  { name: "Siti Aminah" },
  { name: "John Carter" },
  { name: "Maya Putri" },
];

export default function AvatarGroupCardExample() {
  return (
    <div className="rounded-xl border border-line bg-surface p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-ink">Website redesign</h3>
          <p className="mt-1 text-sm text-muted">
            Due Friday, 14 of 20 tasks done
          </p>
        </div>
        <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-ink">
          On track
        </span>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <AvatarGroup
          items={team}
          size="sm"
          max={3}
          groupLabel="Assignees"
          className="[--avatar-ring:var(--color-surface)]"
        />
        <span className="text-sm font-medium text-ink">70%</span>
      </div>
    </div>
  );
}
