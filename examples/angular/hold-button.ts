import { Component } from "@angular/core";
import { HoldButton } from "../../components/hold-button/hold-button.component";

@Component({
  selector: "markas-example",
  imports: [HoldButton],
  template: `
    <div class="flex justify-center">
      <markas-hold-button variant="danger">Hold to delete</markas-hold-button>
    </div>
  `,
})
export default class HoldButtonExample {}
