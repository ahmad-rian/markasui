import { DropdownMenu } from "../../components/dropdown-menu/DropdownMenu";

const items = [
  { label: "Edit", value: "edit" },
  { label: "Duplicate", value: "duplicate" },
  { label: "Archive", value: "archive", disabled: true },
  { separator: true as const },
  { label: "Delete", value: "delete", danger: true },
];

export default function DropdownMenuFixture() {
  return <DropdownMenu label="Actions" items={items} />;
}
