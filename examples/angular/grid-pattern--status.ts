import { Component } from "@angular/core";
import { Badge } from "../../components/badge/badge.component";
import { GridPattern } from "../../components/grid-pattern/grid-pattern.component";

@Component({
  selector: "markas-example",
  imports: [Badge, GridPattern],
  template: `
    <div
      markas-grid-pattern
      color="success"
      [cellSize]="20"
      [cells]="cells"
      class="rounded-xl border border-line bg-surface p-6"
    >
      <div class="grid gap-3">
        <span markas-badge variant="success" class="justify-self-start">
          Operational
        </span>
        <div class="grid gap-1">
          <h3 class="text-lg font-semibold text-ink">All systems running</h3>
          <p class="text-sm text-muted">
            API, dashboard, and webhooks are healthy. Last checked 1 minute ago.
          </p>
        </div>
      </div>
    </div>
  `,
})
export default class GridPatternStatusExample {
  protected readonly cells: [number, number][] = [
    [10, 0],
    [14, 1],
    [17, 0],
    [20, 1],
    [22, 0],
  ];
}
