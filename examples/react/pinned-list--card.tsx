import { PinnedList } from "../../components/pinned-list/PinnedList";

const items = [
  {
    value: "unpaid",
    label: "Unpaid over Rp 5.000.000",
    description: "Invoices, 6 results",
  },
  {
    value: "churn",
    label: "Churned this month",
    description: "Customers, 18 results",
  },
  {
    value: "trial",
    label: "Trials ending this week",
    description: "Customers, 42 results",
  },
];

export default function PinnedListCardExample() {
  return (
    <div className="grid gap-4 rounded-xl border border-line bg-surface p-4">
      <p className="px-1 text-base font-semibold text-ink">Quick filters</p>
      <PinnedList
        items={items}
        defaultPinned={["trial"]}
        pinnedLabel="Favorites"
        allLabel="Saved searches"
      />
    </div>
  );
}
