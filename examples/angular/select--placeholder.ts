import { Component, signal } from "@angular/core";
import { Select } from "../../components/select/select.component";

@Component({
  selector: "markas-example",
  imports: [Select],
  template: `
    <div class="grid gap-4">
      <markas-select
        [(value)]="country"
        name="country"
        label="Country"
        hint="Used to calculate tax on your invoices."
      >
        <option value="" disabled>Select a country</option>
        <option value="id">Indonesia</option>
        <option value="my">Malaysia</option>
        <option value="sg">Singapore</option>
      </markas-select>
      <markas-select
        [(value)]="industry"
        name="industry"
        label="Industry"
        error="Choose the industry that fits best."
      >
        <option value="" disabled>Select an industry</option>
        <option value="education">Education</option>
        <option value="finance">Finance</option>
        <option value="retail">Retail</option>
      </markas-select>
    </div>
  `,
})
export default class SelectPlaceholderExample {
  readonly country = signal("");
  readonly industry = signal("");
}
