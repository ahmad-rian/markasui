import { Component } from "@angular/core";
import { Alert } from "../../components/alert/alert.component";

@Component({
  selector: "markas-example",
  imports: [Alert],
  template: `
    <div class="grid gap-3">
      <markas-alert title="Update available" role="status">
        Version 2.1 can be installed at any time.
      </markas-alert>
      <markas-alert variant="success" title="Payment received">
        The invoice has been sent to your email.
      </markas-alert>
      <markas-alert variant="warning" title="Quota almost full">
        Only 10% of your storage is left.
      </markas-alert>
      <markas-alert variant="danger" title="Could not save">
        Check your internet connection and try again.
      </markas-alert>
    </div>
  `,
})
export default class AlertExample {}
