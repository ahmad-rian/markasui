import { Component } from "@angular/core";
import { Switch } from "../../components/switch/switch.component";

@Component({
  selector: "markas-example",
  imports: [Switch],
  template: `
    <div class="flex flex-wrap gap-x-6 gap-y-3">
      <markas-switch name="autoplay" label="Autoplay" checked />
      <markas-switch name="captions" label="Captions" />
      <markas-switch name="loop" label="Loop" />
    </div>
  `,
})
export default class SwitchHorizontalExample {}
