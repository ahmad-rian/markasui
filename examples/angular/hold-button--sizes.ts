import { Component } from "@angular/core";
import { HoldButton } from "../../components/hold-button/hold-button.component";

@Component({
  selector: "markas-example",
  imports: [HoldButton],
  template: `
    <div class="flex flex-wrap items-center justify-center gap-3">
      <markas-hold-button size="sm" [duration]="1000">
        Hold 1s
      </markas-hold-button>
      <markas-hold-button>Hold 1.5s</markas-hold-button>
      <markas-hold-button size="lg" [duration]="3000">
        Hold 3s
      </markas-hold-button>
    </div>
  `,
})
export default class HoldButtonSizesExample {}
