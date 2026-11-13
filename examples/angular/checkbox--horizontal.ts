import { Component } from "@angular/core";
import { Checkbox } from "../../components/checkbox/checkbox.component";

@Component({
  selector: "markas-example",
  imports: [Checkbox],
  template: `
    <fieldset class="min-w-0">
      <legend class="mb-3 text-sm font-medium text-ink">Notify me by</legend>
      <div class="flex flex-wrap gap-x-6 gap-y-3">
        <markas-checkbox
          name="channels[]"
          value="email"
          label="Email"
          checked
        />
        <markas-checkbox name="channels[]" value="sms" label="SMS" />
        <markas-checkbox name="channels[]" value="push" label="Push" checked />
        <markas-checkbox name="channels[]" value="slack" label="Slack" />
      </div>
    </fieldset>
  `,
})
export default class CheckboxHorizontalExample {}
