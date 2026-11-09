import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";

@Component({
  selector: "markas-example",
  imports: [Button],
  template: `
    <div class="flex flex-wrap items-center justify-center gap-3">
      <button markas-button size="sm">Small</button>
      <button markas-button size="md">Medium</button>
      <button markas-button size="lg">Large</button>
    </div>
  `,
})
export default class ButtonSizesExample {}
