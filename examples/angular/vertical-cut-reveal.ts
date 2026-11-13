import { Component } from "@angular/core";
import { VerticalCutReveal } from "../../components/vertical-cut-reveal/vertical-cut-reveal.component";

@Component({
  selector: "markas-example",
  imports: [VerticalCutReveal],
  template: `
    <h2 class="text-4xl leading-tight font-semibold tracking-tight text-ink">
      <span
        markas-vertical-cut-reveal
        text="Components that feel at home in every stack"
      ></span>
    </h2>
  `,
})
export default class VerticalCutRevealExample {}
