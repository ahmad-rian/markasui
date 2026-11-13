import { Component } from "@angular/core";
import { RippleButton } from "../../components/ripple-button/ripple-button.component";

@Component({
  selector: "markas-example",
  imports: [RippleButton],
  template: `
    <div class="flex flex-wrap items-center justify-center gap-3">
      <button markas-ripple-button size="sm">Small</button>
      <button markas-ripple-button>Medium</button>
      <button markas-ripple-button size="lg">Large</button>
    </div>
  `,
})
export default class RippleButtonSizesExample {}
