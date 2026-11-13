import { Component } from "@angular/core";
import { Checkbox } from "../../components/checkbox/checkbox.component";

@Component({
  selector: "markas-example",
  imports: [Checkbox],
  template: `
    <div class="grid gap-4">
      <markas-checkbox
        name="terms"
        label="I agree to the terms of service"
        checked
      />
      <markas-checkbox
        name="updates"
        label="Send me product updates"
        description="At most one email per month."
      />
      <markas-checkbox name="archive" label="Archive automatically" disabled />
    </div>
  `,
})
export default class CheckboxExample {}
