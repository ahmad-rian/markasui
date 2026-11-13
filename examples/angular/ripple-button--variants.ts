import { Component } from "@angular/core";
import { RippleButton } from "../../components/ripple-button/ripple-button.component";

@Component({
  selector: "markas-example",
  imports: [RippleButton],
  template: `
    <div class="flex flex-wrap items-center justify-center gap-3">
      <button markas-ripple-button>Primary</button>
      <button markas-ripple-button variant="secondary">Secondary</button>
      <button markas-ripple-button variant="ghost">Ghost</button>
      <button markas-ripple-button variant="danger">Danger</button>
    </div>
  `,
})
export default class RippleButtonVariantsExample {}
