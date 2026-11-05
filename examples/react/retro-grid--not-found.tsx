import { Button } from "../../components/button/Button";
import { RetroGrid } from "../../components/retro-grid/RetroGrid";

export default function RetroGridNotFoundExample() {
  return (
    <RetroGrid
      color="primary"
      cellSize={48}
      className="rounded-xl border border-line bg-surface px-6 pt-10 pb-24"
    >
      <div className="grid justify-items-center gap-3 text-center">
        <p className="text-6xl font-bold tracking-tight text-ink">404</p>
        <h3 className="text-lg font-semibold text-ink">
          This page drifted off the grid
        </h3>
        <p className="max-w-72 text-sm text-muted">
          The link may be broken, or the page was moved.
        </p>
        <Button variant="secondary">Back to home</Button>
      </div>
    </RetroGrid>
  );
}
