import { DropdownMenu } from "../../components/dropdown-menu/DropdownMenu";

const items = [
  { label: "Rename", value: "rename" },
  { label: "Transfer ownership", value: "transfer" },
  { separator: true as const },
  { label: "Archive project", value: "archive", danger: true },
  { label: "Delete project", value: "delete", danger: true },
];

export default function DropdownMenuDangerExample() {
  return (
    <div className="flex justify-center">
      <DropdownMenu label="Project" items={items} />
    </div>
  );
}
