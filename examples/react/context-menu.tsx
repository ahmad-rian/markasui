import { ContextMenu } from "../../components/context-menu/ContextMenu";

const items = [
  { label: "Open", value: "open" },
  { label: "Rename", value: "rename" },
  { label: "Duplicate", value: "duplicate" },
  { label: "Archive", value: "archive", disabled: true },
  { separator: true as const },
  { label: "Delete", value: "delete", danger: true },
];

export default function ContextMenuFixture() {
  return (
    <ContextMenu items={items}>
      <div className="flex h-36 items-center justify-center rounded-lg border border-dashed border-line text-sm text-muted">
        Right-click here
      </div>
    </ContextMenu>
  );
}
