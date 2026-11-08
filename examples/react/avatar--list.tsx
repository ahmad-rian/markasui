import { Avatar } from "../../components/avatar/Avatar";

export default function AvatarListExample() {
  return (
    <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
      <li className="flex items-center gap-3 px-4 py-3">
        <Avatar name="Sarah Miller" size="sm" alt="" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-ink">Sarah Miller</p>
          <p className="text-xs text-muted">sarah@markasui.com</p>
        </div>
        <span className="text-xs text-muted">Owner</span>
      </li>
      <li className="flex items-center gap-3 px-4 py-3">
        <Avatar name="Budi Santoso" size="sm" alt="" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-ink">Budi Santoso</p>
          <p className="text-xs text-muted">budi@markasui.com</p>
        </div>
        <span className="text-xs text-muted">Editor</span>
      </li>
      <li className="flex items-center gap-3 px-4 py-3">
        <Avatar name="Siti Aminah" size="sm" alt="" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-ink">Siti Aminah</p>
          <p className="text-xs text-muted">siti@markasui.com</p>
        </div>
        <span className="text-xs text-muted">Viewer</span>
      </li>
    </ul>
  );
}
