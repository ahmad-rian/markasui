import { Component } from "@angular/core";
import { Label } from "../../components/label/label.component";

@Component({
  selector: "markas-example",
  imports: [Label],
  template: `
    <div class="grid gap-3">
      <label markas-label required [class]="row">
        <input type="checkbox" name="terms" required [class]="box" />I accept
        the terms of service
      </label>
      <label markas-label optional [class]="row">
        <input type="checkbox" name="newsletter" [class]="box" />
        Send me the monthly newsletter
      </label>
    </div>
  `,
})
export default class LabelCheckboxExample {
  protected readonly row = "flex items-center gap-2";
  protected readonly box = "size-4 accent-primary";
}
