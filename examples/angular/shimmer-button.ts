import { Component } from "@angular/core";
import { ShimmerButton } from "../../components/shimmer-button/shimmer-button.component";

@Component({
  selector: "markas-example",
  imports: [ShimmerButton],
  template: `
    <div class="flex justify-center">
      <button markas-shimmer-button size="lg">Get started for free</button>
    </div>
  `,
})
export default class ShimmerButtonExample {}
