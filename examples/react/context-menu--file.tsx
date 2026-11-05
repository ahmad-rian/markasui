import { ContextMenu } from "../../components/context-menu/ContextMenu";

const items = [
  { label: "Open", value: "open" },
  { label: "Download", href: "#download" },
  { label: "Rename", value: "rename" },
  { separator: true as const },
  { label: "Move to trash", value: "trash", danger: true },
];

export default function ContextMenuFileExample() {
  return (
    <ContextMenu aria-label="Quarterly report.pdf" items={items}>
      <div className="flex items-center gap-3 rounded-lg border border-line bg-surface p-4">
        <svg
          className="size-6 shrink-0 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5" />
        </svg>
        <div className="grid gap-0.5">
          <p className="text-sm font-medium text-ink">Quarterly report.pdf</p>
          <p className="text-xs text-muted">2.4 MB, edited yesterday</p>
        </div>
      </div>
    </ContextMenu>
  );
}
