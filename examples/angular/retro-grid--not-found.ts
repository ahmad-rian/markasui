import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { RetroGrid } from "../../components/retro-grid/retro-grid.component";

@Component({
  selector: "markas-example",
  imports: [Button, RetroGrid],
  template: `
    <div
      markas-retro-grid
      color="primary"
      cellSize="48"
      class="rounded-xl border border-line bg-surface px-6 pt-10 pb-24"
    >
      <div class="grid justify-items-center gap-3 text-center">
        <p class="text-6xl font-bold tracking-tight text-ink">404</p>
        <h3 class="text-lg font-semibold text-ink">
          This page drifted off the grid
        </h3>
        <p class="max-w-72 text-sm text-muted">
          The link may be broken, or the page was moved.
        </p>
        <button markas-button variant="secondary">Back to home</button>
      </div>
    </div>
  `,
})
export default class RetroGridNotFoundExample {}
