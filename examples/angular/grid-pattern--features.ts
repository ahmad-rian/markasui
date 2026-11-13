import { Component } from "@angular/core";
import { GridPattern } from "../../components/grid-pattern/grid-pattern.component";

@Component({
  selector: "markas-example",
  imports: [GridPattern],
  template: `
    <div
      markas-grid-pattern
      [cellSize]="40"
      mask="radial"
      class="rounded-xl border border-line bg-canvas p-6"
    >
      <div class="grid gap-5">
        <h3 class="text-lg font-semibold text-ink">
          Everything your team needs
        </h3>
        <ul class="grid grid-cols-2 gap-3">
          <li class="grid gap-1 rounded-lg border border-line bg-surface p-4">
            <span class="text-sm font-medium text-ink">Roadmaps</span>
            <span class="text-sm text-muted"> Plan quarters at a glance. </span>
          </li>
          <li class="grid gap-1 rounded-lg border border-line bg-surface p-4">
            <span class="text-sm font-medium text-ink">Issues</span>
            <span class="text-sm text-muted">Triage bugs in seconds.</span>
          </li>
          <li class="grid gap-1 rounded-lg border border-line bg-surface p-4">
            <span class="text-sm font-medium text-ink">Releases</span>
            <span class="text-sm text-muted">
              Ship with notes that write themselves.
            </span>
          </li>
          <li class="grid gap-1 rounded-lg border border-line bg-surface p-4">
            <span class="text-sm font-medium text-ink">Insights</span>
            <span class="text-sm text-muted">
              See where time really goes.
            </span>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export default class GridPatternFeaturesExample {}
