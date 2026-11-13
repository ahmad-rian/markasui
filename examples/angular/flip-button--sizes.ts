import { Component } from "@angular/core";
import { FlipButton } from "../../components/flip-button/flip-button.component";

@Component({
  selector: "markas-example",
  imports: [FlipButton],
  template: `
    <div class="flex flex-wrap items-center justify-center gap-3">
      <button markas-flip-button size="sm" backLabel="Free">Small</button>
      <button markas-flip-button backLabel="Free">Medium</button>
      <button markas-flip-button size="lg" backLabel="Free">Large</button>
    </div>
  `,
})
export default class FlipButtonSizesExample {}
