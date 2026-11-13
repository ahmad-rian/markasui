import { Component } from "@angular/core";
import { AlertDialog } from "../../components/alert-dialog/alert-dialog.component";
import { Button } from "../../components/button/button.component";

@Component({
  selector: "markas-example",
  imports: [AlertDialog, Button],
  template: `
    <div class="flex justify-center">
      <markas-alert-dialog
        title="Delete your account?"
        variant="danger"
        actionLabel="Delete account"
      >
        <button markas-button trigger variant="danger">Delete account</button>
        All of your projects, invoices, and team members will be removed. You
        cannot undo this action.
      </markas-alert-dialog>
    </div>
  `,
})
export default class AlertDialogDangerExample {}
