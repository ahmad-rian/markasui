import { Component } from "@angular/core";
import { Label } from "../../components/label/label.component";

@Component({
  selector: "markas-example",
  imports: [Label],
  template: `
    <div class="grid gap-3">
      <label markas-label required>Full name</label>
      <label markas-label optional>Company</label>
      <label markas-label>Email</label>
    </div>
  `,
})
export default class LabelExample {}
