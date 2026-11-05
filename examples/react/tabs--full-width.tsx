import { Tabs } from "../../components/tabs/Tabs";

const items = [
  {
    value: "monthly",
    label: "Monthly",
    content: (
      <div className="grid gap-1">
        <span className="text-2xl font-semibold text-ink">$12 per month</span>
        <span className="text-sm text-muted">
          Billed monthly. Cancel anytime.
        </span>
      </div>
    ),
  },
  {
    value: "yearly",
    label: "Yearly",
    content: (
      <div className="grid gap-1">
        <span className="text-2xl font-semibold text-ink">$120 per year</span>
        <span className="text-sm text-muted">
          Two months free compared to monthly billing.
        </span>
      </div>
    ),
  },
];

export default function TabsFullWidthExample() {
  return (
    <Tabs
      items={items}
      defaultValue="monthly"
      className="[&_[role=tab]]:flex-1 [&_[role=tablist]]:flex"
    />
  );
}
