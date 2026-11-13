import { Component } from "@angular/core";
import { Progress } from "../../components/progress/progress.component";

@Component({
  selector: "markas-example",
  imports: [Progress],
  template: `
    <div class="grid gap-5">
      <markas-progress label="Uploading file" [value]="60"></markas-progress>
      <markas-progress
        label="Storage used"
        [value]="3"
        [max]="4"
      ></markas-progress>
      <markas-progress label="Preparing report"></markas-progress>
    </div>
  `,
})
export default class ProgressExample {}
