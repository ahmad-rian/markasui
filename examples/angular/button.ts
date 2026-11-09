import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";

@Component({
  selector: "markas-example",
  imports: [Button],
  template: `
    <div class="grid gap-4">
      <div class="flex flex-wrap items-center gap-3">
        <button markas-button>Save</button>
        <button markas-button variant="secondary">Cancel</button>
        <button markas-button variant="ghost">More</button>
        <button markas-button variant="danger">Delete</button>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <button markas-button size="sm">Small</button>
        <button markas-button size="md">Medium</button>
        <button markas-button size="lg">Large</button>
        <button markas-button disabled>Disabled</button>
      </div>
    </div>
  `,
})
export default class ButtonExample {}
