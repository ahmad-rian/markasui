import { Component } from "@angular/core";
import { SpotlightCard } from "../../components/spotlight-card/spotlight-card.component";

@Component({
  selector: "markas-example",
  imports: [SpotlightCard],
  template: `
    <div class="grid grid-cols-2 gap-3">
      <div markas-spotlight-card color="success">
        <div class="p-4">
          <p class="flex items-center gap-2 text-sm font-semibold text-ink">
            <span class="size-2 rounded-full bg-success"></span>
            API
          </p>
          <p class="mt-1 text-xs text-muted">Operational, 99.98% uptime</p>
        </div>
      </div>
      <div markas-spotlight-card color="danger">
        <div class="p-4">
          <p class="flex items-center gap-2 text-sm font-semibold text-ink">
            <span class="size-2 rounded-full bg-danger"></span>
            Webhooks
          </p>
          <p class="mt-1 text-xs text-muted">Delayed, fix in progress</p>
        </div>
      </div>
    </div>
  `,
})
export default class SpotlightCardColorsExample {}
