import { Component } from "@angular/core";
import { RadioGroup } from "../../components/radio-group/radio-group.component";

@Component({
  selector: "markas-example",
  imports: [RadioGroup],
  template: `
    <div class="grid gap-3">
      <markas-radio-group
        name="payout"
        label="Payout schedule"
        value="weekly"
        disabled
        [options]="schedules"
      />
      <p class="text-sm text-muted">
        Verify your bank account to change the payout schedule.
      </p>
    </div>
  `,
})
export default class RadioGroupDisabledExample {
  protected readonly schedules = [
    {
      value: "daily",
      label: "Daily",
    },
    {
      value: "weekly",
      label: "Weekly",
    },
    {
      value: "monthly",
      label: "Monthly",
    },
  ];
}
