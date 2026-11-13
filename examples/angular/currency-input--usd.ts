import { Component } from "@angular/core";
import { CurrencyInput } from "../../components/currency-input/currency-input.component";

@Component({
  selector: "markas-example",
  imports: [CurrencyInput],
  template: `
    <markas-currency-input
      label="Monthly budget"
      name="budget"
      currency="USD"
      hint="Billed in US dollars at the end of each month"
      [defaultValue]="1250.5"
      [presets]="presets"
      presetsLabel="Suggested budgets"
    />
  `,
})
export default class CurrencyInputUsdExample {
  protected readonly presets = [100, 500, 1000, 5000];
}
