import { Component } from "@angular/core";
import { Switch } from "../../components/switch/switch.component";

@Component({
  selector: "markas-example",
  imports: [Switch],
  template: `
    <div class="grid gap-4">
      <markas-switch name="notifications" label="Email notifications" checked />
      <markas-switch name="saver" label="Data saver mode" />
      <markas-switch name="beta" label="Beta features" disabled />
    </div>
  `,
})
export default class SwitchExample {}
