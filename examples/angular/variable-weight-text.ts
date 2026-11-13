import { Component } from "@angular/core";
import { VariableWeightText } from "../../components/variable-weight-text/variable-weight-text.component";

@Component({
  selector: "markas-example",
  imports: [VariableWeightText],
  template: `
    <div class="text-center">
      <p class="text-6xl tracking-tight text-ink">
        <span markas-variable-weight-text text="Proximity"></span>
      </p>
      <p class="mt-3 text-sm text-muted">Move your cursor across the letters</p>
    </div>
  `,
})
export default class VariableWeightTextExample {}
