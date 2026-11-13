import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { RadioGroup } from "../../components/radio-group/radio-group.component";

@Component({
  selector: "markas-example",
  imports: [Button, RadioGroup],
  template: `
    <form class="grid gap-6 rounded-lg border border-line bg-surface p-6">
      <div class="grid gap-1">
        <p class="text-base font-semibold text-ink">Digest emails</p>
        <p class="text-sm text-muted">
          A summary of activity in projects you follow.
        </p>
      </div>
      <markas-radio-group
        name="digest"
        label="Frequency"
        value="weekly"
        [options]="frequencies"
      />
      <div class="flex justify-end gap-2">
        <button markas-button variant="secondary">Cancel</button>
        <button markas-button type="submit">Save</button>
      </div>
    </form>
  `,
})
export default class RadioGroupInCardExample {
  protected readonly frequencies = [
    {
      value: "daily",
      label: "Daily",
      description: "Every morning at 08:00.",
    },
    {
      value: "weekly",
      label: "Weekly",
      description: "Every Monday morning.",
    },
    {
      value: "never",
      label: "Never",
      description: "Only important account notices.",
    },
  ];
}
