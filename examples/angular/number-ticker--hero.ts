import { Component } from "@angular/core";
import { NumberTicker } from "../../components/number-ticker/number-ticker.component";

@Component({
  selector: "markas-example",
  imports: [NumberTicker],
  template: `
    <div class="py-4 text-center">
      <p class="text-5xl font-semibold tracking-tight text-ink">
        <span markas-number-ticker value="25000" suffix="+"></span>
      </p>
      <p class="mt-2 text-sm text-muted">
        teams ship their interfaces with MarkasUI
      </p>
    </div>
  `,
})
export default class NumberTickerHeroExample {}
