import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { CurrencyInput } from "../../components/currency-input/currency-input.component";

@Component({
  selector: "markas-example",
  imports: [Button, CurrencyInput],
  template: `
    <div [class]="panel">
      <div [class]="balance">
        <span [class]="balanceLabel">Current balance</span>
        <span [class]="balanceValue">Rp 245.000</span>
      </div>
      <markas-currency-input
        label="Top-up amount"
        name="amount"
        hint="Minimum Rp10.000, maximum Rp10.000.000"
        [min]="10000"
        [max]="10000000"
        [defaultValue]="100000"
        [presets]="presets"
      />
      <button markas-button>Top up balance</button>
    </div>
  `,
})
export default class CurrencyInputExample {
  protected readonly panel =
    "grid gap-4 rounded-xl border border-line bg-surface p-5";
  protected readonly balance = "flex items-baseline justify-between";
  protected readonly balanceLabel = "text-sm text-muted";
  protected readonly balanceValue =
    "text-lg font-semibold text-ink tabular-nums";
  protected readonly presets = [50000, 100000, 250000, 500000, 1000000];
}
