import { Component } from "@angular/core";
import { FlipButton } from "../../components/flip-button/flip-button.component";

@Component({
  selector: "markas-example",
  imports: [FlipButton],
  template: `
    <div class="flex flex-wrap items-center justify-center gap-3">
      <button markas-flip-button backLabel="Let's go">Primary</button>
      <button markas-flip-button variant="secondary" backLabel="Let's go">
        Secondary
      </button>
      <button markas-flip-button variant="ghost" backLabel="Let's go">
        Ghost
      </button>
      <button markas-flip-button variant="danger" backLabel="Are you sure">
        Danger
      </button>
    </div>
  `,
})
export default class FlipButtonVariantsExample {}
