import { DropdownMenu } from "../../components/dropdown-menu/DropdownMenu";

const sortItems = [
  { label: "Newest first", value: "newest" },
  { label: "Oldest first", value: "oldest" },
  { label: "Name A to Z", value: "name" },
];

const exportItems = [
  { label: "CSV", value: "csv" },
  { label: "PDF", value: "pdf" },
  { label: "Excel", value: "xlsx", disabled: true },
];

export default function DropdownMenuToolbarExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <DropdownMenu label="Sort" items={sortItems} />
      <DropdownMenu label="Export" items={exportItems} />
    </div>
  );
}
