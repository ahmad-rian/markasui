import { Component } from "@angular/core";
import { Progress } from "../../components/progress/progress.component";

@Component({
  selector: "markas-example",
  imports: [Progress],
  template: `
    <div class="grid gap-5">
      <markas-progress
        label="Onboarding tasks"
        [value]="3"
        [max]="5"
      ></markas-progress>
      <markas-progress
        label="Lessons watched"
        [value]="7"
        [max]="12"
      ></markas-progress>
    </div>
  `,
})
export default class ProgressStepsExample {}
