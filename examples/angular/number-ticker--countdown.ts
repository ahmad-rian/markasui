import { Component } from "@angular/core";
import { NumberTicker } from "../../components/number-ticker/number-ticker.component";

@Component({
  selector: "markas-example",
  imports: [NumberTicker],
  template: `
    <div
      class="flex items-center gap-4 rounded-xl border border-line bg-surface p-4"
    >
      <div
        class="flex size-14 shrink-0 items-center justify-center rounded-lg bg-danger/10 text-xl font-semibold text-danger"
      >
        <span markas-number-ticker value="12" from="100" duration="2500"></span>
      </div>
      <div>
        <p class="text-sm font-medium text-ink">Seats left for the workshop</p>
        <p class="mt-0.5 text-sm text-muted">
          Registration closes on 20 November
        </p>
      </div>
    </div>
  `,
})
export default class NumberTickerCountdownExample {}
