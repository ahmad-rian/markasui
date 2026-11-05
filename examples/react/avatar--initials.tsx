import { Avatar } from "../../components/avatar/Avatar";

export default function AvatarInitialsExample() {
  return (
    <ul className="flex flex-wrap items-start justify-center gap-6">
      <li className="grid justify-items-center gap-2">
        <Avatar name="Budi Santoso" size="lg" alt="" />
        <span className="text-xs text-muted">Budi Santoso</span>
      </li>
      <li className="grid justify-items-center gap-2">
        <Avatar name="Ahmad Rian Putra" size="lg" alt="" />
        <span className="text-xs text-muted">Ahmad Rian Putra</span>
      </li>
      <li className="grid justify-items-center gap-2">
        <Avatar name="rina" size="lg" alt="" />
        <span className="text-xs text-muted">rina</span>
      </li>
      <li className="grid justify-items-center gap-2">
        <Avatar name="Maria José García" size="lg" alt="" />
        <span className="text-xs text-muted">Maria José García</span>
      </li>
    </ul>
  );
}
