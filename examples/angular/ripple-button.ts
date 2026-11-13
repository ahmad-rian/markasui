import { Component } from "@angular/core";
import { RippleButton } from "../../components/ripple-button/ripple-button.component";

@Component({
  selector: "markas-example",
  imports: [RippleButton],
  template: `
    <div class="flex flex-wrap items-center justify-center gap-3">
      <button markas-ripple-button>Add to cart</button>
      <button markas-ripple-button variant="secondary">Save for later</button>
    </div>
  `,
})
export default class RippleButtonExample {}
