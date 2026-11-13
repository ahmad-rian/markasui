import { Component } from "@angular/core";
import { Meteors } from "../../components/meteors/meteors.component";

@Component({
  selector: "markas-example",
  imports: [Meteors],
  template: `
    <div
      markas-meteors
      count="24"
      speed="fast"
      color="success"
      seed="20"
      class="rounded-xl border border-line bg-surface px-6 py-8"
    >
      <div class="grid gap-5">
        <h3 class="text-base font-semibold text-ink">Last 24 hours</h3>
        <dl class="grid grid-cols-3 gap-3">
          @for (stat of stats; track stat[0]) {
            <div
              class="grid gap-1 rounded-lg border border-line bg-surface p-3"
            >
              <dt class="row-start-2 text-xs text-muted">{{ stat[0] }}</dt>
              <dd class="text-2xl font-semibold text-ink tabular-nums">
                {{ stat[1] }}
              </dd>
            </div>
          }
        </dl>
      </div>
    </div>
  `,
})
export default class MeteorsStatsExample {
  protected readonly stats = [
    ["Deploys", "1,284"],
    ["Uptime", "99.99%"],
    ["p95 latency", "84ms"],
  ];
}
