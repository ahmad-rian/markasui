import { ScrollArea } from "../../components/scroll-area/ScrollArea";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from(
  { length: 10 },
  (_, i) => `${String(i + 8).padStart(2, "0")}:00`,
);

export default function ScrollAreaBothExample() {
  return (
    <ScrollArea
      label="Weekly schedule"
      orientation="both"
      className="max-h-60 border border-line bg-surface"
    >
      <div className="grid w-[640px] grid-cols-[4rem_repeat(7,1fr)] text-sm">
        <div className="border-b border-line p-2" />
        {days.map((day) => (
          <div
            key={day}
            className="border-b border-line p-2 font-medium text-ink"
          >
            {day}
          </div>
        ))}
        {hours.map((hour) => (
          <div key={hour} className="contents">
            <div className="p-2 text-muted">{hour}</div>
            {days.map((day) => (
              <div key={day} className="m-1 h-8 rounded-md bg-subtle" />
            ))}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
