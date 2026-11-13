import { Component } from "@angular/core";
import { NumberTicker } from "../../components/number-ticker/number-ticker.component";

@Component({
  selector: "markas-example",
  imports: [NumberTicker],
  template: `
    <div class="rounded-xl border border-line bg-surface p-5">
      <div class="flex items-center justify-between">
        <p class="text-sm font-medium text-muted">Monthly revenue</p>
        <span
          class="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-ink"
          >+12.5%</span
        >
      </div>
      <p class="mt-3 text-4xl font-semibold tracking-tight text-ink">
        <span
          markas-number-ticker
          value="48920.5"
          decimals="2"
          prefix="$"
        ></span>
      </p>
      <p class="mt-2 text-sm text-muted">Compared to $43,480.00 last month</p>
    </div>
  `,
})
export default class NumberTickerDashboardExample {}
