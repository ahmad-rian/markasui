import { Component } from "@angular/core";
import { Switch } from "../../components/switch/switch.component";

@Component({
  selector: "markas-example",
  imports: [Switch],
  template: `
    <div class="grid gap-4">
      <markas-switch name="wifi" label="Wi-Fi" checked />
      <markas-switch name="bluetooth" label="Bluetooth" />
      <markas-switch name="location" label="Location services" disabled />
      <markas-switch
        name="find_device"
        label="Find my device"
        checked
        disabled
      />
    </div>
  `,
})
export default class SwitchStatesExample {}
