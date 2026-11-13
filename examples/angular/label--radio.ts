import { Component } from "@angular/core";
import { Label } from "../../components/label/label.component";

@Component({
  selector: "markas-example",
  imports: [Label],
  template: `
    <fieldset class="min-w-0">
      <legend class="mb-3 text-sm font-medium text-ink">Delivery speed</legend>
      <div class="grid gap-3">
        <label markas-label [class]="row">
          <input
            type="radio"
            name="speed"
            value="standard"
            checked
            [class]="radio"
          />
          Standard, 3 to 5 days
        </label>
        <label markas-label [class]="row">
          <input type="radio" name="speed" value="express" [class]="radio" />
          Express, next business day
        </label>
        <label markas-label [class]="row">
          <input type="radio" name="speed" value="pickup" [class]="radio" />
          Pick up in store
        </label>
      </div>
    </fieldset>
  `,
})
export default class LabelRadioExample {
  protected readonly row = "flex items-center gap-2 font-normal";
  protected readonly radio = "size-4 accent-primary";
}
