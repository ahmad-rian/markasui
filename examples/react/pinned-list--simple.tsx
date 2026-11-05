import { PinnedList } from "../../components/pinned-list/PinnedList";

const items = [
  { value: "jakarta", label: "Jakarta", meta: "31°C" },
  { value: "bandung", label: "Bandung", meta: "24°C" },
  { value: "surabaya", label: "Surabaya", meta: "33°C" },
  { value: "denpasar", label: "Denpasar", meta: "29°C" },
];

export default function PinnedListSimpleExample() {
  return <PinnedList items={items} />;
}
