import { Component } from "@angular/core";
import { VerticalCutReveal } from "../../components/vertical-cut-reveal/vertical-cut-reveal.component";

@Component({
  selector: "markas-example",
  imports: [VerticalCutReveal],
  template: `
    <div class="text-center">
      <p class="text-5xl font-bold tracking-tight text-ink">
        <span
          markas-vertical-cut-reveal
          text="Jakarta Design Week"
          split="chars"
          direction="down"
          from="center"
          stagger="25"
        ></span>
      </p>
      <p class="mt-3 text-sm text-muted">
        12 to 14 March 2027, Taman Ismail Marzuki
      </p>
    </div>
  `,
})
export default class VerticalCutRevealCharsExample {}
