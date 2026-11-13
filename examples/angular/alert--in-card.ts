import { Component } from "@angular/core";
import { Alert } from "../../components/alert/alert.component";
import { Button } from "../../components/button/button.component";

@Component({
  selector: "markas-example",
  imports: [Alert, Button],
  template: `
    <div class="grid gap-4 rounded-lg border border-line bg-surface p-5">
      <div class="grid gap-1">
        <h3 class="text-base font-semibold text-ink">Delete workspace</h3>
        <p class="text-sm text-muted">
          All projects, files, and members will be removed.
        </p>
      </div>
      <markas-alert variant="danger" title="This cannot be undone">
        Export your data first if you want to keep a copy.
      </markas-alert>
      <div class="flex justify-end gap-2">
        <button markas-button variant="secondary">Cancel</button>
        <button markas-button variant="danger">Delete workspace</button>
      </div>
    </div>
  `,
})
export default class AlertInCardExample {}
