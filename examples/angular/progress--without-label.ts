import { Component } from "@angular/core";
import { Progress } from "../../components/progress/progress.component";

@Component({
  selector: "markas-example",
  imports: [Progress],
  template: `
    <div class="grid gap-4">
      <div class="grid gap-2">
        <markas-progress
          [value]="40"
          aria-label="Checkout progress"
        ></markas-progress>
        <p class="text-sm text-muted">Step 2 of 5: Shipping address</p>
      </div>
      <div class="grid gap-2">
        <markas-progress
          [value]="90"
          aria-label="Storage used"
        ></markas-progress>
        <p class="text-sm text-muted">9 GB of 10 GB used</p>
      </div>
    </div>
  `,
})
export default class ProgressWithoutLabelExample {}
