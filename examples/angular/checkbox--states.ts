import { Component } from "@angular/core";
import { Checkbox } from "../../components/checkbox/checkbox.component";

@Component({
  selector: "markas-example",
  imports: [Checkbox],
  template: `
    <div class="grid gap-4">
      <markas-checkbox name="line_numbers" label="Show line numbers" />
      <markas-checkbox name="wrap" label="Wrap long lines" checked />
      <markas-checkbox name="format" label="Format on save" disabled />
      <markas-checkbox name="autosave" label="Auto save" checked disabled />
      <p class="text-sm text-muted">
        Editor defaults are managed by your organization.
      </p>
    </div>
  `,
})
export default class CheckboxStatesExample {}
