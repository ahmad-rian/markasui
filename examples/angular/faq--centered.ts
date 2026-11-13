import { Component } from "@angular/core";
import { Faq } from "../../components/faq/faq.component";

@Component({
  selector: "markas-example",
  imports: [Faq],
  template: `
    <markas-faq
      variant="centered"
      title="Still curious?"
      description="Short answers to the questions we hear most."
      [items]="items"
    >
      <ng-container contact
        >Still have questions? <a href="#">Contact support</a></ng-container
      >
    </markas-faq>
  `,
})
export default class FaqCenteredExample {
  protected readonly items = [
    {
      question: "Is there a free trial?",
      answer: "Yes. Every plan starts with a 14 day trial, no card required.",
    },
    {
      question: "Can I cancel at any time?",
      answer:
        "Yes. Your plan stays active until the end of the billing period.",
    },
    {
      question: "Can I invite my team?",
      answer:
        "Invite as many members as your plan allows from the team settings.",
    },
    {
      question: "Where is my data stored?",
      answer: "Data is stored in Jakarta and backed up every day.",
    },
  ];
}
