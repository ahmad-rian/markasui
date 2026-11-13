import { Component } from "@angular/core";
import { Accordion } from "../../components/accordion/accordion.component";

@Component({
  selector: "markas-example",
  imports: [Accordion],
  template: `
    <markas-accordion
      [items]="items"
      type="multiple"
      [defaultValue]="['account', 'billing']"
    />
  `,
})
export default class AccordionMultipleExample {
  protected readonly items = [
    {
      value: "account",
      title: "Account",
      content: "Update your name, email, and profile photo.",
    },
    {
      value: "billing",
      title: "Billing",
      content: "Manage your plan, payment method, and invoices.",
    },
    {
      value: "security",
      title: "Security",
      content: "Turn on two-step verification and review active sessions.",
    },
  ];
}
