import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { NoiseBackground } from "../../components/noise-background/noise-background.component";

@Component({
  selector: "markas-example",
  imports: [Button, NoiseBackground],
  template: `
    <div
      markas-noise-background
      color="warning"
      class="rounded-xl border border-line bg-surface px-6 py-14"
    >
      <div class="grid gap-4">
        <h2 class="text-3xl font-semibold tracking-tight text-balance text-ink">
          Design tools with a little texture
        </h2>
        <p class="max-w-80 text-sm text-muted">
          Brushes, grain, and paper that make digital work feel made by hand.
        </p>
        <div class="flex gap-2">
          <button markas-button>Download the kit</button>
          <button markas-button variant="ghost">Browse samples</button>
        </div>
      </div>
    </div>
  `,
})
export default class NoiseBackgroundExample {}
