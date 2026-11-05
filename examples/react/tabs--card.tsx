import { Tabs } from "../../components/tabs/Tabs";

const items = [
  {
    value: "overview",
    label: "Overview",
    content: (
      <div className="grid grid-cols-3 gap-3">
        <div className="grid gap-1 rounded-lg bg-subtle p-3">
          <span className="text-xs text-muted">Visitors</span>
          <span className="text-lg font-semibold text-ink">12,480</span>
        </div>
        <div className="grid gap-1 rounded-lg bg-subtle p-3">
          <span className="text-xs text-muted">Sign-ups</span>
          <span className="text-lg font-semibold text-ink">342</span>
        </div>
        <div className="grid gap-1 rounded-lg bg-subtle p-3">
          <span className="text-xs text-muted">Conversion</span>
          <span className="text-lg font-semibold text-ink">2.7%</span>
        </div>
      </div>
    ),
  },
  {
    value: "traffic",
    label: "Traffic",
    content: "Most visitors arrive from search and newsletters.",
  },
  {
    value: "reports",
    label: "Reports",
    content: "Monthly reports are sent on the first day of each month.",
  },
];

export default function TabsCardExample() {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <Tabs items={items} defaultValue="overview" />
    </div>
  );
}
