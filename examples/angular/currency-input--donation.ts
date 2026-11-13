import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { CurrencyInput } from "../../components/currency-input/currency-input.component";

@Component({
  selector: "markas-example",
  imports: [Button, CurrencyInput],
  template: `
    <div [class]="panel">
      <div [class]="heading">
        <p [class]="title">Support the village library</p>
        <p [class]="text">Every rupiah goes to new books for 300 students.</p>
      </div>
      <markas-currency-input
        label="Donation amount"
        name="donation"
        placeholder="0"
        [min]="5000"
        hint="Minimum Rp5.000"
        [presets]="presets"
        presetsLabel="Suggested donations"
      />
      <button markas-button variant="secondary">Continue to payment</button>
    </div>
  `,
})
export default class CurrencyInputDonationExample {
  protected readonly panel = "grid gap-4";
  protected readonly heading = "grid gap-1";
  protected readonly title = "text-base font-semibold text-ink";
  protected readonly text = "text-sm text-muted";
  protected readonly presets = [25000, 50000, 100000, 1500000];
}
