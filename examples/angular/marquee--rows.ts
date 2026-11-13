import { Component } from "@angular/core";
import { Marquee } from "../../components/marquee/marquee.component";

@Component({
  selector: "markas-example",
  imports: [Marquee],
  template: `
    <div class="flex flex-col gap-3">
      <div markas-marquee duration="25">
        @for (name of first; track name) {
          <span [class]="chip">{{ name }}</span>
        }
      </div>
      <div markas-marquee duration="25" reverse>
        @for (name of second; track name) {
          <span [class]="chip">{{ name }}</span>
        }
      </div>
    </div>
  `,
})
export default class MarqueeRowsExample {
  protected readonly first = [
    "Accordion",
    "Avatar",
    "Badge",
    "Button",
    "Card",
    "Carousel",
  ];
  protected readonly second = [
    "Modal",
    "Popover",
    "Select",
    "Slider",
    "Tabs",
    "Tooltip",
  ];
  protected readonly chip =
    "rounded-lg bg-subtle px-3 py-1.5 text-sm whitespace-nowrap text-ink";
}
