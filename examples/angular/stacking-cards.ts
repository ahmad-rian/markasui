import { Component } from "@angular/core";
import { StackingCards } from "../../components/stacking-cards/stacking-cards.component";

@Component({
  selector: "markas-example",
  imports: [StackingCards],
  template: `
    <section tabindex="0" aria-label="Product features" [class]="scroller">
      <div [class]="intro">
        <h3 [class]="title">Why teams pick Markas</h3>
        <p [class]="hint">Scroll to stack the cards</p>
      </div>
      <markas-stacking-cards [class]="stack">
        @for (feature of features; track feature.title; let index = $index) {
          <article [class]="card">
            <span [class]="badge">{{ index + 1 }}</span>
            <h4 [class]="cardTitle">{{ feature.title }}</h4>
            <p [class]="cardText">{{ feature.text }}</p>
          </article>
        }
      </markas-stacking-cards>
    </section>
  `,
})
export default class StackingCardsExample {
  protected readonly scroller =
    "h-96 overflow-y-auto rounded-xl border border-line bg-subtle px-4 pb-48 focus-visible:outline-2 focus-visible:outline-primary";
  protected readonly intro = "py-6";
  protected readonly title = "text-lg font-semibold text-ink";
  protected readonly hint = "mt-1 text-sm text-muted";
  protected readonly stack = "gap-4";
  protected readonly card =
    "grid h-48 content-start gap-3 rounded-xl border border-line bg-surface p-5";
  protected readonly badge =
    "grid size-9 place-items-center rounded-lg bg-primary-soft text-sm font-semibold text-primary";
  protected readonly cardTitle = "text-base font-semibold text-ink";
  protected readonly cardText = "text-sm text-muted";
  protected readonly features = [
    {
      title: "Copy, paste, own it",
      text: "Every component lands in your codebase as plain files you can read and change.",
    },
    {
      title: "Blade, React, and Vue",
      text: "The same classes and props in all three, so teams can share one design.",
    },
    {
      title: "Tokens only",
      text: "Colors come from one theme file, so dark mode and rebrands take minutes.",
    },
    {
      title: "Accessible by default",
      text: "Native elements, keyboard support, and reduced motion are built in.",
    },
  ];
}
