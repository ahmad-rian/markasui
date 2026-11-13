import { Component } from "@angular/core";
import { VariableWeightText } from "../../components/variable-weight-text/variable-weight-text.component";

@Component({
  selector: "markas-example",
  imports: [VariableWeightText],
  template: `
    <div class="py-4">
      <h2 class="text-5xl tracking-tight text-ink">
        Type that
        <span
          markas-variable-weight-text
          text="reacts"
          radius="80"
          min="300"
          max="900"
        ></span>
      </h2>
      <p class="mt-4 max-w-sm text-sm text-muted">
        Letters near the cursor get bolder. Works with any variable font that
        has a weight axis.
      </p>
    </div>
  `,
})
export default class VariableWeightTextHeroExample {}
