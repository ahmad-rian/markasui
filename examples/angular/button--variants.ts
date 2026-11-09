import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";

@Component({
  selector: "markas-example",
  imports: [Button],
  template: `
    <div class="flex flex-wrap items-center justify-center gap-3">
      <button markas-button>Primary</button>
      <button markas-button variant="secondary">Secondary</button>
      <button markas-button variant="ghost">Ghost</button>
      <button markas-button variant="danger">Danger</button>
    </div>
  `,
})
export default class ButtonVariantsExample {}
