import { BottomNavigation } from "../../components/bottom-navigation/BottomNavigation";

const items = [
  {
    value: "home",
    label: "Home",
    icon: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  },
  {
    value: "search",
    label: "Search",
    icon: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-4.3-4.3",
  },
  {
    value: "inbox",
    label: "Inbox",
    icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  },
];

const plus = (
  <svg
    className="size-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export default function BottomNavigationActionExample() {
  return (
    <div className="relative mx-auto h-[420px] w-[360px] overflow-hidden rounded-[2.5rem] border border-line bg-surface">
      <div className="grid gap-3 p-5">
        <p className="text-lg font-semibold text-ink">Moments</p>
        <div className="h-40 rounded-2xl bg-subtle" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-28 rounded-2xl bg-subtle" />
          <div className="h-28 rounded-2xl bg-primary-soft" />
        </div>
      </div>
      <BottomNavigation
        items={items}
        action={plus}
        actionLabel="New post"
        className="absolute inset-x-4 bottom-4"
      />
    </div>
  );
}
