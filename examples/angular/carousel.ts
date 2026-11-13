import { Component } from "@angular/core";
import { Carousel } from "../../components/carousel/carousel.component";

@Component({
  selector: "markas-example",
  imports: [Carousel],
  template: `
    <markas-carousel label="Product tour" showDots [items]="slides">
      <ng-template let-item>
        <div [class]="card">
          <p [class]="title">{{ item.title }}</p>
          <p [class]="text">{{ item.text }}</p>
        </div>
      </ng-template>
    </markas-carousel>
  `,
})
export default class CarouselExample {
  protected readonly card =
    "flex h-40 flex-col justify-end rounded-xl bg-subtle p-5";
  protected readonly title = "text-sm font-medium text-ink";
  protected readonly text = "mt-1 text-sm text-muted";
  protected readonly slides = [
    {
      title: "Plan your week",
      text: "Drag tasks onto the calendar to block focus time.",
    },
    {
      title: "Share with your team",
      text: "Invite teammates and assign tasks in one click.",
    },
    {
      title: "Track progress",
      text: "See what shipped this week on a single dashboard.",
    },
  ];
}
