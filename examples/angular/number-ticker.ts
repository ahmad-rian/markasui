import { Component } from "@angular/core";
import { NumberTicker } from "../../components/number-ticker/number-ticker.component";

@Component({
  selector: "markas-example",
  imports: [NumberTicker],
  template: `
    <dl class="grid grid-cols-3 gap-4">
      <div>
        <dt class="text-sm text-muted">Downloads</dt>
        <dd class="mt-1 text-2xl font-semibold text-ink">
          <span markas-number-ticker value="12480"></span>
        </dd>
      </div>
      <div>
        <dt class="text-sm text-muted">Uptime</dt>
        <dd class="mt-1 text-2xl font-semibold text-ink">
          <span
            markas-number-ticker
            value="99.9"
            decimals="1"
            suffix="%"
          ></span>
        </dd>
      </div>
      <div>
        <dt class="text-sm text-muted">Revenue</dt>
        <dd class="mt-1 text-2xl font-semibold text-ink">
          <span markas-number-ticker value="84200" prefix="$"></span>
        </dd>
      </div>
    </dl>
  `,
})
export default class NumberTickerExample {}
