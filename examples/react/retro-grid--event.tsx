import { Button } from "../../components/button/Button";
import { RetroGrid } from "../../components/retro-grid/RetroGrid";

export default function RetroGridEventExample() {
  return (
    <RetroGrid
      color="success"
      cellSize={40}
      angle={72}
      className="rounded-xl border border-line bg-surface p-6 pb-20"
    >
      <div className="grid gap-3">
        <p className="text-sm font-medium text-muted">
          Online conference, December 4
        </p>
        <h3 className="text-2xl font-semibold text-ink">Build Day 2026</h3>
        <p className="text-sm text-muted">
          Twelve talks, two workshops, and a live launch at the end.
        </p>
        <div className="flex gap-2">
          <Button>Save my seat</Button>
          <Button variant="ghost">See agenda</Button>
        </div>
      </div>
    </RetroGrid>
  );
}
