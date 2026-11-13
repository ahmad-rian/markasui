import { Component } from "@angular/core";
import { TabPanel, Tabs } from "../../components/tabs/tabs.component";

@Component({
  selector: "markas-example",
  imports: [Tabs, TabPanel],
  template: `
    <markas-tabs
      [items]="items"
      defaultValue="monthly"
      class="[&_[role=tab]]:flex-1 [&_[role=tablist]]:flex"
    >
      <ng-template markasTabPanel="monthly">
        <div class="grid gap-1">
          <span [class]="price">$12 per month</span>
          <span class="text-sm text-muted"
            >Billed monthly. Cancel anytime.</span
          >
        </div>
      </ng-template>
      <ng-template markasTabPanel="yearly">
        <div class="grid gap-1">
          <span [class]="price">$120 per year</span>
          <span class="text-sm text-muted"
            >Two months free compared to monthly billing.</span
          >
        </div>
      </ng-template>
    </markas-tabs>
  `,
})
export default class TabsFullWidthExample {
  protected readonly price = "text-2xl font-semibold text-ink";
  protected readonly items = [
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ];
}
