import { Component } from "@angular/core";
import { Slider } from "../../components/slider/slider.component";

@Component({
  selector: "markas-example",
  imports: [Slider],
  template: `
    <div class="grid gap-6">
      <markas-slider name="volume" label="Volume" value="60" />
      <markas-slider
        name="brightness"
        label="Brightness"
        step="10"
        value="30"
      />
    </div>
  `,
})
export default class SliderFixture {}
