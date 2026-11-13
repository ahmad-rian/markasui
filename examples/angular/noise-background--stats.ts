import { Component } from "@angular/core";
import { NoiseBackground } from "../../components/noise-background/noise-background.component";

@Component({
  selector: "markas-example",
  imports: [NoiseBackground],
  template: `
    <div
      markas-noise-background
      color="success"
      intensity="low"
      size="fine"
      class="rounded-xl border border-line bg-surface p-6"
    >
      <dl class="grid grid-cols-3 gap-4 text-center">
        @for (stat of stats; track stat[1]) {
          <div class="grid gap-1">
            <dt class="text-sm text-muted">{{ stat[1] }}</dt>
            <dd class="text-2xl font-semibold tracking-tight text-ink">
              {{ stat[0] }}
            </dd>
          </div>
        }
      </dl>
    </div>
  `,
})
export default class NoiseBackgroundStatsExample {
  protected readonly stats = [
    ["12k", "Teams"],
    ["99.98%", "Uptime"],
    ["4.9", "Rating"],
  ];
}
