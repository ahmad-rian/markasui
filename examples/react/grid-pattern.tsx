import { Button } from "../../components/button/Button";
import { GridPattern } from "../../components/grid-pattern/GridPattern";

export default function GridPatternFixture() {
  return (
    <GridPattern
      mask="radial"
      cells={[
        [2, 1],
        [10, 2],
        [3, 6],
        [11, 7],
      ]}
      className="rounded-xl border border-line bg-surface px-6 py-12"
    >
      <div className="grid justify-items-center gap-4 text-center">
        <h2 className="text-2xl font-semibold text-balance text-ink">
          Plan, build, and ship in one place
        </h2>
        <p className="max-w-80 text-sm text-muted">
          Roadmaps, issues, and releases that stay in sync with your code.
        </p>
        <div className="flex gap-2">
          <Button>Start free</Button>
          <Button variant="secondary">Book a demo</Button>
        </div>
      </div>
    </GridPattern>
  );
}
