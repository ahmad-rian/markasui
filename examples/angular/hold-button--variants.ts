import { Component } from "@angular/core";
import { HoldButton } from "../../components/hold-button/hold-button.component";

@Component({
  selector: "markas-example",
  imports: [HoldButton],
  template: `
    <div class="flex flex-wrap items-center justify-center gap-3">
      <markas-hold-button>Hold to publish</markas-hold-button>
      <markas-hold-button variant="secondary">
        Hold to archive
      </markas-hold-button>
      <markas-hold-button variant="ghost">Hold to reset</markas-hold-button>
      <markas-hold-button variant="danger">Hold to delete</markas-hold-button>
    </div>
  `,
})
export default class HoldButtonVariantsExample {}
