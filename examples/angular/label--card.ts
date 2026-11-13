import { Component } from "@angular/core";
import { Label } from "../../components/label/label.component";

@Component({
  selector: "markas-example",
  imports: [Label],
  template: `
    <div class="grid gap-3">
      <label markas-label [class]="card">
        <input type="checkbox" name="backups" checked [class]="box" />
        <span [class]="text">
          <span>Daily backups</span>
          <span [class]="description">
            Keep 30 days of snapshots for every project.
          </span>
        </span>
      </label>
      <label markas-label [class]="card">
        <input type="checkbox" name="audit_log" [class]="box" />
        <span [class]="text">
          <span>Audit log</span>
          <span [class]="description">
            Record every sign-in and permission change.
          </span>
        </span>
      </label>
    </div>
  `,
})
export default class LabelCardExample {
  protected readonly card =
    "flex items-start gap-3 rounded-lg border border-line bg-surface p-4 has-checked:border-primary has-checked:bg-primary-soft";
  protected readonly box = "mt-0.5 size-4 shrink-0 accent-primary";
  protected readonly text = "grid gap-0.5";
  protected readonly description = "font-normal text-muted";
}
