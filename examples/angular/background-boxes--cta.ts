import { Component } from "@angular/core";
import { BackgroundBoxes } from "../../components/background-boxes/background-boxes.component";
import { Button } from "../../components/button/button.component";

@Component({
  selector: "markas-example",
  imports: [BackgroundBoxes, Button],
  template: `
    <div
      markas-background-boxes
      color="danger"
      [rows]="10"
      [cols]="16"
      [size]="28"
      speed="fast"
      class="rounded-xl border border-line bg-surface p-6"
    >
      <div class="flex items-center justify-between gap-4">
        <div class="grid gap-1">
          <h3 class="text-lg font-semibold text-ink">Black Friday deal</h3>
          <p class="text-sm text-muted">Half off every annual plan.</p>
        </div>
        <button markas-button>Claim offer</button>
      </div>
    </div>
  `,
})
export default class BackgroundBoxesCtaExample {}
