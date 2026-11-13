import { Component } from "@angular/core";
import { Alert } from "../../components/alert/alert.component";

@Component({
  selector: "markas-example",
  imports: [Alert],
  template: `
    <div class="grid gap-3">
      <markas-alert role="status">
        Your changes are saved as a draft until you publish.
      </markas-alert>
      <markas-alert variant="success"
        >Your password has been changed.</markas-alert
      >
      <markas-alert variant="warning"
        >This link expires in 24 hours.</markas-alert
      >
      <markas-alert variant="danger">
        You do not have permission to edit this page.
      </markas-alert>
    </div>
  `,
})
export default class AlertWithoutTitleExample {}
