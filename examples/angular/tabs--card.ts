import { Component } from "@angular/core";
import { TabPanel, Tabs } from "../../components/tabs/tabs.component";

@Component({
  selector: "markas-example",
  imports: [Tabs, TabPanel],
  template: `
    <div class="rounded-xl border border-line bg-surface p-4">
      <markas-tabs [items]="items" defaultValue="overview">
        <ng-template markasTabPanel="overview">
          <div class="grid grid-cols-3 gap-3">
            <div [class]="stat">
              <span class="text-xs text-muted">Visitors</span>
              <span [class]="value">12,480</span>
            </div>
            <div [class]="stat">
              <span class="text-xs text-muted">Sign-ups</span>
              <span [class]="value">342</span>
            </div>
            <div [class]="stat">
              <span class="text-xs text-muted">Conversion</span>
              <span [class]="value">2.7%</span>
            </div>
          </div>
        </ng-template>
        <ng-template markasTabPanel="traffic"
          >Most visitors arrive from search and newsletters.</ng-template
        >
        <ng-template markasTabPanel="reports"
          >Monthly reports are sent on the first day of each month.</ng-template
        >
      </markas-tabs>
    </div>
  `,
})
export default class TabsCardExample {
  protected readonly stat = "grid gap-1 rounded-lg bg-subtle p-3";
  protected readonly value = "text-lg font-semibold text-ink";
  protected readonly items = [
    { value: "overview", label: "Overview" },
    { value: "traffic", label: "Traffic" },
    { value: "reports", label: "Reports" },
  ];
}
