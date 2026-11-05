import { DropdownMenu } from "../../components/dropdown-menu/DropdownMenu";

const items = [
  { label: "Undo", value: "undo" },
  { label: "Redo", value: "redo", disabled: true },
  { separator: true as const },
  { label: "Cut", value: "cut" },
  { label: "Copy", value: "copy" },
  { label: "Paste", value: "paste", disabled: true },
];

export default function DropdownMenuDisabledExample() {
  return (
    <div className="flex justify-center">
      <DropdownMenu label="Edit" items={items} />
    </div>
  );
}
