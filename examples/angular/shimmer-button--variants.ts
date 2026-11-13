import { Component } from "@angular/core";
import { ShimmerButton } from "../../components/shimmer-button/shimmer-button.component";

@Component({
  selector: "markas-example",
  imports: [ShimmerButton],
  template: `
    <div class="flex flex-wrap items-center justify-center gap-3">
      <button markas-shimmer-button>Upgrade</button>
      <button markas-shimmer-button variant="secondary">Book a demo</button>
      <button markas-shimmer-button variant="ghost">What is new</button>
      <button markas-shimmer-button variant="danger">Go live</button>
    </div>
  `,
})
export default class ShimmerButtonVariantsExample {}
