import { Component } from "@angular/core";
import { Progress } from "../../components/progress/progress.component";

@Component({
  selector: "markas-example",
  imports: [Progress],
  template: `
    <div class="grid gap-5">
      <markas-progress label="Not started" [value]="0"></markas-progress>
      <markas-progress label="Profile setup" [value]="25"></markas-progress>
      <markas-progress label="Course progress" [value]="75"></markas-progress>
      <markas-progress label="Backup complete" [value]="100"></markas-progress>
    </div>
  `,
})
export default class ProgressValuesExample {}
