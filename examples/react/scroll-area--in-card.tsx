import { ScrollArea } from "../../components/scroll-area/ScrollArea";

const notifications = [
  { who: "Dewi Lestari", what: "commented on Q3 roadmap", when: "2m ago" },
  {
    who: "Budi Santoso",
    what: "assigned you to Invoice export",
    when: "15m ago",
  },
  { who: "Siti Aminah", what: "shared Brand guidelines", when: "1h ago" },
  { who: "Rizky Pratama", what: "closed Login timeout bug", when: "3h ago" },
  {
    who: "Ayu Wulandari",
    what: "mentioned you in Weekly sync",
    when: "Yesterday",
  },
  { who: "Fajar Nugroho", what: "uploaded Pricing v2.pdf", when: "2 days ago" },
];

export default function ScrollAreaInCardExample() {
  return (
    <div className="rounded-xl border border-line bg-surface">
      <p className="border-b border-line px-4 py-3 text-sm font-medium text-ink">
        Notifications
      </p>
      <ScrollArea label="Notifications" className="max-h-52 rounded-t-none">
        <ul>
          {notifications.map((item) => (
            <li
              key={item.who}
              className="border-b border-line px-4 py-3 text-sm last:border-b-0"
            >
              <p className="text-ink">
                <span className="font-medium">{item.who}</span> {item.what}
              </p>
              <p className="text-muted">{item.when}</p>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
