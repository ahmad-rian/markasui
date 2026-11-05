import { GridPattern } from "../../components/grid-pattern/GridPattern";

export default function GridPatternFeaturesExample() {
  return (
    <GridPattern
      cellSize={40}
      mask="radial"
      className="rounded-xl border border-line bg-canvas p-6"
    >
      <div className="grid gap-5">
        <h3 className="text-lg font-semibold text-ink">
          Everything your team needs
        </h3>
        <ul className="grid grid-cols-2 gap-3">
          <li className="grid gap-1 rounded-lg border border-line bg-surface p-4">
            <span className="text-sm font-medium text-ink">Roadmaps</span>
            <span className="text-sm text-muted">
              Plan quarters at a glance.
            </span>
          </li>
          <li className="grid gap-1 rounded-lg border border-line bg-surface p-4">
            <span className="text-sm font-medium text-ink">Issues</span>
            <span className="text-sm text-muted">Triage bugs in seconds.</span>
          </li>
          <li className="grid gap-1 rounded-lg border border-line bg-surface p-4">
            <span className="text-sm font-medium text-ink">Releases</span>
            <span className="text-sm text-muted">
              Ship with notes that write themselves.
            </span>
          </li>
          <li className="grid gap-1 rounded-lg border border-line bg-surface p-4">
            <span className="text-sm font-medium text-ink">Insights</span>
            <span className="text-sm text-muted">
              See where time really goes.
            </span>
          </li>
        </ul>
      </div>
    </GridPattern>
  );
}
