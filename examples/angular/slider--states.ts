import { Component } from "@angular/core";
import { Slider } from "../../components/slider/slider.component";

@Component({
  selector: "markas-example",
  imports: [Slider],
  template: `
    <div class="grid gap-6">
      <markas-slider name="contrast" label="Contrast" value="40" />
      <markas-slider
        name="opacity"
        label="Opacity"
        value="80"
        [showValue]="false"
      />
      <markas-slider
        name="quality"
        label="Export quality"
        value="70"
        disabled
      />
    </div>
  `,
})
export default class SliderStatesExample {}
