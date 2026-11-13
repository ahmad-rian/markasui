import { Component } from "@angular/core";
import { StackingCards } from "../../components/stacking-cards/stacking-cards.component";

@Component({
  selector: "markas-example",
  imports: [StackingCards],
  template: `
    <section tabindex="0" aria-label="Getting started" [class]="scroller">
      <div [class]="intro">
        <h3 [class]="title">Get started in four steps</h3>
        <p [class]="hint">About ten minutes in total</p>
      </div>
      <markas-stacking-cards
        role="list"
        variant="fan"
        [top]="24"
        [offset]="10"
        [class]="stack"
      >
        @for (item of steps; track item.title; let index = $index) {
          <li [class]="card">
            <span [class]="step">Step {{ index + 1 }} of 4</span>
            <h4 [class]="cardTitle">{{ item.title }}</h4>
            <p [class]="cardText">{{ item.text }}</p>
          </li>
        }
      </markas-stacking-cards>
    </section>
  `,
})
export default class StackingCardsOnboardingExample {
  protected readonly scroller =
    "h-96 overflow-y-auto rounded-xl bg-primary-soft px-6 pb-48 focus-visible:outline-2 focus-visible:outline-primary";
  protected readonly intro = "py-6 text-center";
  protected readonly title = "text-lg font-semibold text-ink";
  protected readonly hint = "mt-1 text-sm text-muted";
  protected readonly stack = "gap-6";
  protected readonly card =
    "grid h-44 content-center justify-items-center gap-2 rounded-xl border border-primary-line bg-surface p-5 text-center";
  protected readonly step = "text-sm font-medium text-primary";
  protected readonly cardTitle = "text-lg font-semibold text-ink";
  protected readonly cardText = "max-w-64 text-sm text-muted";
  protected readonly steps = [
    {
      title: "Create your workspace",
      text: "Pick a name and a currency. Rupiah is ready from the start.",
    },
    {
      title: "Invite your team",
      text: "Add Rania from finance and Dimas from sales in one go.",
    },
    {
      title: "Connect your bank",
      text: "Link a business account to match payments automatically.",
    },
    {
      title: "Send your first invoice",
      text: "Customers pay by transfer or QRIS and you get notified.",
    },
  ];
}
