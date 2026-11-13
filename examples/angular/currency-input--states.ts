import { Component } from "@angular/core";
import { CurrencyInput } from "../../components/currency-input/currency-input.component";

@Component({
  selector: "markas-example",
  imports: [CurrencyInput],
  template: `
    <div [class]="stack">
      <markas-currency-input
        label="Transfer amount"
        error="Amount exceeds your daily limit of Rp5.000.000"
        [defaultValue]="7500000"
      />
      <markas-currency-input label="Admin fee" [defaultValue]="2500" disabled />
      <markas-currency-input label="Opening balance" placeholder="0" />
    </div>
  `,
})
export default class CurrencyInputStatesExample {
  protected readonly stack = "grid gap-5";
}
