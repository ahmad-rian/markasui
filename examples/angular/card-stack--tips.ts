import { Component } from "@angular/core";
import { CardStack } from "../../components/card-stack/card-stack.component";

@Component({
  selector: "markas-example",
  imports: [CardStack],
  template: `
    <markas-card-stack
      label="Getting started tips"
      prevLabel="Previous tip"
      nextLabel="Next tip"
      [cardLabel]="cardLabel"
      [items]="tips"
    >
      <ng-template let-tip let-index="index">
        <div [class]="card">
          <div>
            <p [class]="step">Tip {{ index + 1 }}</p>
            <p [class]="title">{{ tip.title }}</p>
            <p [class]="text">{{ tip.text }}</p>
          </div>
          <a href="#shortcuts" [class]="link">See all shortcuts</a>
        </div>
      </ng-template>
    </markas-card-stack>
  `,
})
export default class CardStackTipsExample {
  protected readonly cardLabel = "Tip {index} of {total}";
  protected readonly card = "grid h-full content-between gap-4 p-5";
  protected readonly step = "text-xs font-medium text-muted";
  protected readonly title = "mt-1 text-base font-semibold text-ink";
  protected readonly text = "mt-1 text-sm text-muted";
  protected readonly link =
    "text-sm font-medium text-ink underline underline-offset-4 hover:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  protected readonly tips = [
    {
      title: "Press K to search",
      text: "Jump to any page, project, or teammate without touching the mouse.",
    },
    {
      title: "Drag to reorder",
      text: "Grab a task by its handle and drop it where it belongs.",
    },
    {
      title: "Mention with @",
      text: "Type @ and a name to notify a teammate right inside a comment.",
    },
    {
      title: "Star what matters",
      text: "Starred projects stay pinned at the top of your sidebar.",
    },
  ];
}
