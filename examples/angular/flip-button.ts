import { Component } from "@angular/core";
import { FlipButton } from "../../components/flip-button/flip-button.component";

@Component({
  selector: "markas-example",
  imports: [FlipButton],
  template: `
    <div class="flex flex-wrap items-center justify-center gap-3">
      <button markas-flip-button backLabel="It takes 2 minutes">
        Create account
      </button>
      <button markas-flip-button variant="secondary" backLabel="No card needed">
        Start free trial
      </button>
    </div>
  `,
})
export default class FlipButtonExample {}
