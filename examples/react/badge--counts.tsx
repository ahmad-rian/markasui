import { Badge } from "../../components/badge/Badge";

export default function BadgeCountsExample() {
  return (
    <ul className="grid gap-1 rounded-lg border border-line bg-surface p-2 text-sm text-ink">
      <li className="flex items-center justify-between rounded-md px-3 py-2">
        <span>Inbox</span>
        <Badge variant="primary" dot={false} className="tabular-nums">
          12
        </Badge>
      </li>
      <li className="flex items-center justify-between rounded-md px-3 py-2">
        <span>Mentions</span>
        <Badge dot={false} className="tabular-nums">
          3
        </Badge>
      </li>
      <li className="flex items-center justify-between rounded-md px-3 py-2">
        <span>Failed jobs</span>
        <Badge variant="danger" dot={false} className="tabular-nums">
          99+
        </Badge>
      </li>
    </ul>
  );
}
