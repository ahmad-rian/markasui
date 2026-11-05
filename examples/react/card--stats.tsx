import { Badge } from "../../components/badge/Badge";
import { Card } from "../../components/card/Card";

export default function CardStatsExample() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <p className="text-muted">Total revenue</p>
        <p className="mt-1 text-2xl font-semibold text-ink">$48,250</p>
        <div className="mt-3 flex items-center gap-2">
          <Badge variant="success">+12.5%</Badge>
          <span className="text-xs text-muted">vs last month</span>
        </div>
      </Card>
      <Card>
        <p className="text-muted">Active users</p>
        <p className="mt-1 text-2xl font-semibold text-ink">1,284</p>
        <div className="mt-3 flex items-center gap-2">
          <Badge variant="danger">-3.2%</Badge>
          <span className="text-xs text-muted">vs last month</span>
        </div>
      </Card>
    </div>
  );
}
