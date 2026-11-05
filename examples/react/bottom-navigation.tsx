import { BottomNavigation } from "../../components/bottom-navigation/BottomNavigation";

const items = [
  {
    value: "home",
    label: "Home",
    icon: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  },
  { value: "activity", label: "Activity", icon: "M3 3v18h18M7 15l4-4 3 3 5-6" },
  {
    value: "cards",
    label: "Cards",
    icon: "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 10h18M7 15h3",
  },
  {
    value: "profile",
    label: "Profile",
    icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  },
];

const transactions = [
  ["Kopi Kenangan", "Today, 08:12", "-Rp 32.000"],
  ["Salary", "Today, 07:00", "+Rp 9.500.000"],
  ["GoRide", "Yesterday, 18:40", "-Rp 18.500"],
  ["Tokopedia", "Yesterday, 13:05", "-Rp 245.000"],
  ["Electricity token", "3 Nov, 20:15", "-Rp 200.000"],
  ["Transfer from Rina", "3 Nov, 09:30", "+Rp 150.000"],
  ["Indomaret", "2 Nov, 19:02", "-Rp 67.800"],
  ["Netflix", "1 Nov, 00:01", "-Rp 54.000"],
  ["Freelance invoice", "31 Oct, 16:45", "+Rp 2.750.000"],
  ["Sate Khas Senayan", "30 Oct, 20:10", "-Rp 128.000"],
];

export default function BottomNavigationExample() {
  return (
    <div className="relative mx-auto h-[560px] w-[360px] overflow-hidden rounded-[2.5rem] border border-line bg-surface">
      <div
        role="region"
        aria-label="Transactions"
        tabIndex={0}
        className="h-full overflow-y-auto px-5 pt-8 pb-28 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
      >
        <p className="text-sm text-muted">Total balance</p>
        <p className="mt-1 text-3xl font-semibold text-ink tabular-nums">
          Rp 12.480.000
        </p>
        <p className="mt-8 mb-1 text-sm font-medium text-ink">
          Recent transactions
        </p>
        <ul className="divide-y divide-line">
          {transactions.map(([name, time, amount]) => (
            <li key={name} className="flex items-center justify-between py-3">
              <span className="grid">
                <span className="text-sm font-medium text-ink">{name}</span>
                <span className="text-xs text-muted">{time}</span>
              </span>
              <span className="text-sm font-medium text-ink tabular-nums">
                {amount}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <BottomNavigation
        items={items}
        shrinkOnScroll
        className="absolute inset-x-4 bottom-4"
      />
    </div>
  );
}
