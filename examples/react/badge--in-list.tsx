import { Badge } from "../../components/badge/Badge";

export default function BadgeInListExample() {
  return (
    <ul className="divide-y divide-line rounded-lg border border-line bg-surface text-sm">
      <li className="flex items-center justify-between gap-4 px-4 py-3">
        <div className="grid gap-0.5">
          <span className="font-medium text-ink">Invoice #1024</span>
          <span className="text-muted">Due Mar 12</span>
        </div>
        <Badge variant="success">Paid</Badge>
      </li>
      <li className="flex items-center justify-between gap-4 px-4 py-3">
        <div className="grid gap-0.5">
          <span className="font-medium text-ink">Invoice #1025</span>
          <span className="text-muted">Due Mar 28</span>
        </div>
        <Badge variant="warning">Pending</Badge>
      </li>
      <li className="flex items-center justify-between gap-4 px-4 py-3">
        <div className="grid gap-0.5">
          <span className="font-medium text-ink">Invoice #1026</span>
          <span className="text-muted">Due Feb 20</span>
        </div>
        <Badge variant="danger">Overdue</Badge>
      </li>
      <li className="flex items-center justify-between gap-4 px-4 py-3">
        <div className="grid gap-0.5">
          <span className="font-medium text-ink">Invoice #1027</span>
          <span className="text-muted">Not sent yet</span>
        </div>
        <Badge>Draft</Badge>
      </li>
    </ul>
  );
}
