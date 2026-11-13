import { Component } from "@angular/core";
import { Progress } from "../../components/progress/progress.component";
import { Button } from "../../components/button/button.component";

@Component({
  selector: "markas-example",
  imports: [Progress, Button],
  template: `
    <div class="grid gap-3">
      <div class="grid gap-3 rounded-lg border border-line bg-surface p-4">
        <div class="flex items-start justify-between gap-4">
          <div class="grid gap-0.5 text-sm">
            <span class="font-medium text-ink">quarterly-report.pdf</span>
            <span class="text-muted">2.4 MB of 4 MB</span>
          </div>
          <button markas-button size="sm" variant="ghost">Cancel</button>
        </div>
        <markas-progress
          [value]="60"
          aria-label="Uploading quarterly-report.pdf"
        ></markas-progress>
      </div>
      <div class="grid gap-3 rounded-lg border border-line bg-surface p-4">
        <div class="grid gap-0.5 text-sm">
          <span class="font-medium text-ink">Preparing export</span>
          <span class="text-muted">This can take a few minutes.</span>
        </div>
        <markas-progress aria-label="Preparing export"></markas-progress>
      </div>
    </div>
  `,
})
export default class ProgressInCardExample {}
