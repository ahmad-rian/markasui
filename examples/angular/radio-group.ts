import { Component } from "@angular/core";
import { RadioGroup } from "../../components/radio-group/radio-group.component";

@Component({
  selector: "markas-example",
  imports: [RadioGroup],
  template: `
    <div class="grid gap-6">
      <markas-radio-group
        name="plan"
        label="Subscription plan"
        value="pro"
        [options]="plan"
      />
      <markas-radio-group
        name="billing"
        label="Billing cycle"
        value="monthly"
        orientation="horizontal"
        [options]="billing"
      />
    </div>
  `,
})
export default class RadioGroupFixture {
  protected readonly plan = [
    {
      value: "free",
      label: "Free",
      description: "For personal projects.",
    },
    {
      value: "pro",
      label: "Pro",
      description: "For small teams of up to 10 people.",
    },
    {
      value: "business",
      label: "Business",
      description: "For organizations with custom needs.",
    },
  ];
  protected readonly billing = [
    {
      value: "monthly",
      label: "Monthly",
    },
    {
      value: "yearly",
      label: "Yearly",
    },
  ];
}
