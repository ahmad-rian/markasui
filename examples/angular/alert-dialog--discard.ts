import { Component } from "@angular/core";
import { AlertDialog } from "../../components/alert-dialog/alert-dialog.component";
import { Button } from "../../components/button/button.component";

@Component({
  selector: "markas-example",
  imports: [AlertDialog, Button],
  template: `
    <div [class]="card">
      <div class="grid gap-1">
        <p class="text-sm font-medium text-ink">Draft: Q3 product update</p>
        <p class="text-sm text-muted">3 unsaved changes</p>
      </div>
      <markas-alert-dialog
        title="Discard unsaved changes?"
        variant="danger"
        cancelLabel="Keep editing"
        actionLabel="Discard"
      >
        <button markas-button trigger variant="secondary">Close editor</button>
        Your edits since the last save will be lost.
      </markas-alert-dialog>
    </div>
  `,
})
export default class AlertDialogDiscardExample {
  protected readonly card =
    "flex items-center justify-between gap-4 rounded-lg border border-line bg-surface p-4";
}
