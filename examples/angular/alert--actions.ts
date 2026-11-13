import { Component } from "@angular/core";
import { Alert } from "../../components/alert/alert.component";
import { Button } from "../../components/button/button.component";

@Component({
  selector: "markas-example",
  imports: [Alert, Button],
  template: `
    <div class="grid gap-3">
      <markas-alert variant="warning" title="Your trial ends in 3 days">
        <p>Upgrade now to keep access to all of your projects.</p>
        <div class="mt-3 flex flex-wrap gap-2">
          <button markas-button size="sm">Upgrade plan</button>
          <button markas-button size="sm" variant="ghost">
            Remind me later
          </button>
        </div>
      </markas-alert>
      <markas-alert variant="danger" title="Sync failed">
        <p>We could not reach the server. Your last 2 edits are not saved.</p>
        <div class="mt-3 flex flex-wrap gap-2">
          <button markas-button size="sm" variant="secondary">Try again</button>
        </div>
      </markas-alert>
    </div>
  `,
})
export default class AlertActionsExample {}
