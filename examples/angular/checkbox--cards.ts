import { Component } from "@angular/core";
import { Checkbox } from "../../components/checkbox/checkbox.component";

@Component({
  selector: "markas-example",
  imports: [Checkbox],
  template: `
    <fieldset class="min-w-0">
      <legend class="mb-3 text-sm font-medium text-ink">Add-ons</legend>
      <div class="grid gap-3">
        <div [class]="card">
          <markas-checkbox
            name="backups"
            label="Daily backups"
            description="Keep 30 days of snapshots. $5 per month."
            checked
          />
        </div>
        <div [class]="card">
          <markas-checkbox
            name="support"
            label="Priority support"
            description="Replies within 4 hours on business days. $20 per month."
          />
        </div>
        <div [class]="card">
          <markas-checkbox
            name="domain"
            label="Custom domain"
            description="Serve your site from your own domain. Free."
            checked
          />
        </div>
      </div>
    </fieldset>
  `,
})
export default class CheckboxCardsExample {
  protected readonly card =
    "rounded-lg border border-line bg-surface p-4 transition-colors duration-150 ease-out has-checked:border-primary has-checked:bg-primary-soft motion-reduce:transition-none";
}
