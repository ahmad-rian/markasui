import { Component } from "@angular/core";
import { Slider } from "../../components/slider/slider.component";

@Component({
  selector: "markas-example",
  imports: [Slider],
  template: `
    <div class="grid gap-5 rounded-xl border border-line bg-surface p-5">
      <div class="grid gap-1">
        <h3 class="text-base font-medium text-ink">Sound</h3>
        <p class="text-sm text-muted">
          Changes apply to every device on this account.
        </p>
      </div>
      <markas-slider name="master" label="Master volume" value="75" />
      <markas-slider name="music" label="Music" value="50" />
      <markas-slider name="effects" label="Effects" value="20" />
    </div>
  `,
})
export default class SliderInCardExample {}
