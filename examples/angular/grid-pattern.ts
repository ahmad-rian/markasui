import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { GridPattern } from "../../components/grid-pattern/grid-pattern.component";

@Component({
  selector: "markas-example",
  imports: [Button, GridPattern],
  template: `
    <div
      markas-grid-pattern
      mask="radial"
      [cells]="cells"
      class="rounded-xl border border-line bg-surface px-6 py-12"
    >
      <div class="grid justify-items-center gap-4 text-center">
        <h2 class="text-2xl font-semibold text-balance text-ink">
          Plan, build, and ship in one place
        </h2>
        <p class="max-w-80 text-sm text-muted">
          Roadmaps, issues, and releases that stay in sync with your code.
        </p>
        <div class="flex gap-2">
          <button markas-button>Start free</button>
          <button markas-button variant="secondary">Book a demo</button>
        </div>
      </div>
    </div>
  `,
})
export default class GridPatternFixture {
  protected readonly cells: [number, number][] = [
    [2, 1],
    [10, 2],
    [3, 6],
    [11, 7],
  ];
}
