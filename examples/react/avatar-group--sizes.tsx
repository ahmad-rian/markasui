import { AvatarGroup } from "../../components/avatar-group/AvatarGroup";

const team = [
  { name: "Dewi Lestari" },
  { name: "Budi Santoso" },
  { name: "Siti Aminah" },
  { name: "John Carter" },
  { name: "Maya Putri" },
];

export default function AvatarGroupSizesExample() {
  return (
    <div className="flex flex-col gap-5 pt-8">
      <AvatarGroup items={team} size="sm" max={3} groupLabel="Small" />
      <AvatarGroup items={team} max={3} groupLabel="Medium" />
      <AvatarGroup items={team} size="lg" max={3} groupLabel="Large" />
    </div>
  );
}
