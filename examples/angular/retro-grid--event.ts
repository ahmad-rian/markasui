import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { RetroGrid } from "../../components/retro-grid/retro-grid.component";

@Component({
  selector: "markas-example",
  imports: [Button, RetroGrid],
  template: `
    <div
      markas-retro-grid
      color="success"
      cellSize="40"
      angle="72"
      class="rounded-xl border border-line bg-surface p-6 pb-20"
    >
      <div class="grid gap-3">
        <p class="text-sm font-medium text-muted">
          Online conference, December 4
        </p>
        <h3 class="text-2xl font-semibold text-ink">Build Day 2026</h3>
        <p class="text-sm text-muted">
          Twelve talks, two workshops, and a live launch at the end.
        </p>
        <div class="flex gap-2">
          <button markas-button>Save my seat</button>
          <button markas-button variant="ghost">See agenda</button>
        </div>
      </div>
    </div>
  `,
})
export default class RetroGridEventExample {}
