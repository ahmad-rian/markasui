import { PinnedList } from "../../components/pinned-list/PinnedList";

const items = [
  {
    value: "roadmap",
    label: "Q4 roadmap",
    description: "Product, 14 pages",
    meta: "2h",
    icon: "M9 4 3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14",
  },
  {
    value: "invoices",
    label: "Client invoices",
    description: "Finance, 8 files",
    meta: "Yesterday",
    icon: "M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2zM9 8h6M9 12h6",
  },
  {
    value: "onboarding",
    label: "Onboarding checklist",
    description: "People, 23 items",
    meta: "Mon",
    icon: "M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2",
  },
  {
    value: "brand",
    label: "Brand guidelines",
    description: "Design, 31 pages",
    meta: "Oct 28",
    icon: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z",
  },
  {
    value: "standup",
    label: "Standup notes",
    description: "Engineering, daily",
    meta: "Oct 27",
    icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  },
];

export default function PinnedListExample() {
  return <PinnedList items={items} defaultPinned={["onboarding"]} />;
}
