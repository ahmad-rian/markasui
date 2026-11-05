import { ScrollProgress } from "../../components/scroll-progress/ScrollProgress";

const panels = [
  { color: "primary", title: "Draft" },
  { color: "warning", title: "In review" },
  { color: "danger", title: "Blocked" },
] as const;

export default function ScrollProgressColorsExample() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {panels.map((panel) => (
        <div
          key={panel.color}
          role="region"
          aria-label={panel.title}
          tabIndex={0}
          className="relative h-32 overflow-y-auto rounded-lg border border-line bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <ScrollProgress target="parent" color={panel.color} size="md" />
          <div className="p-3 text-xs text-muted">
            <p className="text-sm font-medium text-ink">{panel.title}</p>
            <p className="mt-2">Scroll this panel to fill the bar above it.</p>
            <p className="mt-2">
              The bar color follows the status of the list.
            </p>
            <p className="mt-2">Set size for a thicker bar.</p>
          </div>
        </div>
      ))}
    </div>
  );
}
