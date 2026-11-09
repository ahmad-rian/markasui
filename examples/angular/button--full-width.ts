import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";

@Component({
  selector: "markas-example",
  imports: [Button],
  template: `
    <div class="mx-auto grid w-full max-w-xs gap-3">
      <button markas-button class="w-full">Create account</button>
      <button markas-button variant="secondary" class="w-full">
        Continue with email
      </button>
    </div>
  `,
})
export default class ButtonFullWidthExample {}
