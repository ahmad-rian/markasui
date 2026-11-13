import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { RetroGrid } from "../../components/retro-grid/retro-grid.component";

@Component({
  selector: "markas-example",
  imports: [Button, RetroGrid],
  template: `
    <div
      markas-retro-grid
      class="rounded-xl border border-line bg-surface px-6 py-16"
    >
      <div class="grid justify-items-center gap-4 text-center">
        <h2 class="text-4xl font-bold tracking-tight text-ink">
          Ship the future
        </h2>
        <p class="max-w-72 text-sm text-muted">
          A launch platform for teams who move fast and like it that way.
        </p>
        <button markas-button>Join the beta</button>
      </div>
    </div>
  `,
})
export default class RetroGridExample {}
