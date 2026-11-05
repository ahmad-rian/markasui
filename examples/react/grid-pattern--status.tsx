import { Badge } from "../../components/badge/Badge";
import { GridPattern } from "../../components/grid-pattern/GridPattern";

export default function GridPatternStatusExample() {
  return (
    <GridPattern
      color="success"
      cellSize={20}
      cells={[
        [10, 0],
        [14, 1],
        [17, 0],
        [20, 1],
        [22, 0],
      ]}
      className="rounded-xl border border-line bg-surface p-6"
    >
      <div className="grid gap-3">
        <Badge variant="success" className="justify-self-start">
          Operational
        </Badge>
        <div className="grid gap-1">
          <h3 className="text-lg font-semibold text-ink">
            All systems running
          </h3>
          <p className="text-sm text-muted">
            API, dashboard, and webhooks are healthy. Last checked 1 minute ago.
          </p>
        </div>
      </div>
    </GridPattern>
  );
}
