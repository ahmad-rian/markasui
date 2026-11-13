import { Component } from "@angular/core";
import { Slider } from "../../components/slider/slider.component";

@Component({
  selector: "markas-example",
  imports: [Slider],
  template: `
    <div class="grid gap-2">
      <markas-slider
        name="budget"
        label="Budget"
        max="500"
        step="25"
        value="250"
      />
      <div class="flex justify-between text-xs text-muted">
        <span>0</span>
        <span>500</span>
      </div>
    </div>
  `,
})
export default class SliderRangeExample {}
