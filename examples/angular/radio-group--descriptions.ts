import { Component } from "@angular/core";
import { RadioGroup } from "../../components/radio-group/radio-group.component";

@Component({
  selector: "markas-example",
  imports: [RadioGroup],
  template: `
    <markas-radio-group
      name="shipping"
      label="Shipping method"
      value="express"
      [options]="shipping"
    />
  `,
})
export default class RadioGroupDescriptionsExample {
  protected readonly shipping = [
    {
      value: "standard",
      label: "Standard",
      description: "Arrives in 4 to 6 business days. Free.",
    },
    {
      value: "express",
      label: "Express",
      description: "Arrives in 1 to 2 business days. $12.",
    },
    {
      value: "pickup",
      label: "Store pickup",
      description: "Ready for pickup tomorrow at 10:00.",
    },
  ];
}
