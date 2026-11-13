import { Component } from "@angular/core";
import { VerticalCutReveal } from "../../components/vertical-cut-reveal/vertical-cut-reveal.component";

@Component({
  selector: "markas-example",
  imports: [VerticalCutReveal],
  template: `
    <div class="rounded-xl border border-line bg-surface p-6">
      <h3 class="text-xl font-semibold text-ink">
        <span markas-vertical-cut-reveal text="Team plan"></span>
      </h3>
      <p class="mt-2 text-4xl font-semibold tracking-tight text-ink">
        <span
          markas-vertical-cut-reveal
          text="Rp 149.000"
          split="chars"
          from="random"
          stagger="30"
          delay="200"
        ></span>
      </p>
      <p class="mt-1 text-sm text-muted">
        <span
          markas-vertical-cut-reveal
          text="per member each month, billed yearly"
          stagger="30"
          delay="500"
        ></span>
      </p>
    </div>
  `,
})
export default class VerticalCutRevealCardExample {}
