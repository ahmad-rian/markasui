import { Component } from "@angular/core";
import { Marquee } from "../../components/marquee/marquee.component";

@Component({
  selector: "markas-example",
  imports: [Marquee],
  template: `
    <div markas-marquee>
      @for (name of stack; track name) {
        <span
          class="rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-medium whitespace-nowrap text-ink"
          >{{ name }}</span
        >
      }
    </div>
  `,
})
export default class MarqueeExample {
  protected readonly stack = [
    "Laravel",
    "React",
    "Vue",
    "Alpine.js",
    "Tailwind CSS",
    "Vite",
  ];
}
