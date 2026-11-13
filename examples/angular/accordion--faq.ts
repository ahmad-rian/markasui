import { Component } from "@angular/core";
import { Accordion } from "../../components/accordion/accordion.component";

@Component({
  selector: "markas-example",
  imports: [Accordion],
  template: `
    <div class="grid gap-4">
      <div class="grid gap-1">
        <h2 class="text-base font-semibold text-ink">
          Frequently asked questions
        </h2>
        <p class="text-sm text-muted">
          Still have questions? Contact our support team.
        </p>
      </div>
      <markas-accordion [items]="items" />
    </div>
  `,
})
export default class AccordionFaqExample {
  protected readonly items = [
    {
      value: "trial",
      title: "Is there a free trial?",
      content: "Yes. Every plan starts with a 14 day trial, no card required.",
    },
    {
      value: "cancel",
      title: "Can I cancel at any time?",
      content:
        "Yes. Your plan stays active until the end of the billing period.",
    },
    {
      value: "team",
      title: "Can I invite my team?",
      content:
        "Invite as many members as your plan allows from the team settings.",
    },
    {
      value: "data",
      title: "Where is my data stored?",
      content: "Data is stored in Jakarta and backed up every day.",
    },
  ];
}
