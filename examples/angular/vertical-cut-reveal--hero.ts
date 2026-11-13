import { Component } from "@angular/core";
import { VerticalCutReveal } from "../../components/vertical-cut-reveal/vertical-cut-reveal.component";

@Component({
  selector: "markas-example",
  imports: [VerticalCutReveal],
  template: `
    <div class="py-4 text-center">
      <h2 class="text-4xl leading-tight font-semibold tracking-tight text-ink">
        <span
          markas-vertical-cut-reveal
          [text]="text"
          split="lines"
          stagger="120"
        ></span>
      </h2>
      <a
        href="#"
        class="mt-6 inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Browse components
      </a>
    </div>
  `,
})
export default class VerticalCutRevealHeroExample {
  protected readonly text = "Design once.\nShip to Blade,\nReact, and Vue.";
}
