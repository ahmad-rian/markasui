import { Component } from "@angular/core";
import { BackgroundBoxes } from "../../components/background-boxes/background-boxes.component";
import { Button } from "../../components/button/button.component";

@Component({
  selector: "markas-example",
  imports: [BackgroundBoxes, Button],
  template: `
    <div
      markas-background-boxes
      class="rounded-xl border border-line bg-surface px-6 py-16"
    >
      <div class="grid justify-items-center gap-4 text-center">
        <h2 class="text-4xl font-bold tracking-tight text-ink">
          Design in blocks
        </h2>
        <p class="max-w-72 rounded-md bg-surface/80 text-sm text-muted">
          Move your cursor across the grid and watch each tile light up.
        </p>
        <button markas-button>Explore blocks</button>
      </div>
    </div>
  `,
})
export default class BackgroundBoxesFixture {}
