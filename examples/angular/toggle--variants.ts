import { Component } from "@angular/core";
import { Toggle } from "../../components/toggle/toggle.component";

@Component({
  selector: "markas-example",
  imports: [Toggle],
  template: `
    <div class="grid gap-4">
      <div class="flex items-center justify-center gap-2">
        <button markas-toggle>Wrap lines</button>
        <button markas-toggle pressed>Show grid</button>
      </div>
      <div class="flex items-center justify-center gap-2">
        <button markas-toggle variant="outline">Subscribe</button>
        <button markas-toggle variant="outline" pressed>Following</button>
      </div>
    </div>
  `,
})
export default class ToggleVariantsExample {}
