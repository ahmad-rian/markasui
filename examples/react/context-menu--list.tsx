import { ContextMenu } from "../../components/context-menu/ContextMenu";

const rows = [
  { name: "Website redesign", status: "In progress" },
  { name: "Mobile app", status: "Planned" },
];

const items = [
  { label: "Open project", value: "open" },
  { label: "Copy link", value: "copy-link" },
  { separator: true as const },
  { label: "Archive", value: "archive", danger: true },
];

export default function ContextMenuListExample() {
  return (
    <ul className="grid gap-2">
      {rows.map((row) => (
        <li key={row.name}>
          <ContextMenu aria-label={row.name} items={items}>
            <div className="flex items-center justify-between rounded-lg border border-line bg-surface px-4 py-3 text-sm">
              <span className="font-medium text-ink">{row.name}</span>
              <span className="text-muted">{row.status}</span>
            </div>
          </ContextMenu>
        </li>
      ))}
    </ul>
  );
}
