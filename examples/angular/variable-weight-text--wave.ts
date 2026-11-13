import { Component } from "@angular/core";
import { VariableWeightText } from "../../components/variable-weight-text/variable-weight-text.component";

@Component({
  selector: "markas-example",
  imports: [VariableWeightText],
  template: `
    <div class="text-center">
      <p class="text-5xl tracking-tight text-ink">
        <span
          markas-variable-weight-text
          text="Breathe in, breathe out"
          wave
          min="200"
          max="700"
        ></span>
      </p>
    </div>
  `,
})
export default class VariableWeightTextWaveExample {}
