import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Combobox } from "../../components/combobox/combobox.component";
import { Input } from "../../components/input/input.component";

@Component({
  selector: "markas-example",
  imports: [Button, Combobox, Input],
  template: `
    <form class="grid gap-4 rounded-lg border border-line bg-surface p-6">
      <div class="grid gap-1">
        <p class="text-base font-semibold text-ink">Shipping address</p>
        <p class="text-sm text-muted">
          We deliver to most cities in Southeast Asia.
        </p>
      </div>
      <markas-input
        name="street"
        label="Street address"
        autocomplete="street-address"
      />
      <div class="grid grid-cols-2 gap-4">
        <markas-combobox
          name="city"
          label="City"
          placeholder="Search cities"
          [options]="cities"
        />
        <markas-input
          name="postal_code"
          label="Postal code"
          autocomplete="postal-code"
        />
      </div>
      <button markas-button type="submit" class="w-full">Save address</button>
    </form>
  `,
})
export default class ComboboxFormExample {
  protected readonly cities = [
    { value: "bandung", label: "Bandung" },
    { value: "jakarta", label: "Jakarta" },
    { value: "kuala-lumpur", label: "Kuala Lumpur" },
    { value: "singapore", label: "Singapore" },
    { value: "surabaya", label: "Surabaya" },
  ];
}
