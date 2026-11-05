import { ContextMenu } from "../../components/context-menu/ContextMenu";

const items = [
  { label: "Undo", value: "undo" },
  { label: "Redo", value: "redo", disabled: true },
  { separator: true as const },
  { label: "Cut", value: "cut" },
  { label: "Copy", value: "copy" },
  { label: "Paste", value: "paste", disabled: true },
];

export default function ContextMenuEditorExample() {
  return (
    <ContextMenu items={items}>
      <div className="grid gap-2 rounded-lg border border-line bg-surface p-4 text-sm text-ink">
        <p className="font-medium">Meeting notes</p>
        <p className="text-muted">
          Launch moves to Monday. Design review on Thursday, bring the updated
          mockups.
        </p>
      </div>
    </ContextMenu>
  );
}
