import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { TabPanel, Tabs } from "../../components/tabs/tabs.component";

@Component({
  selector: "markas-example",
  imports: [Button, Tabs, TabPanel],
  template: `
    <markas-tabs [items]="items" defaultValue="open">
      <ng-template markasTabPanel="open">
        <div [class]="empty">
          <svg
            class="size-6 text-muted"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M22 12h-6l-2 3h-4l-2-3H2" />
            <path
              d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
            />
          </svg>
          <span class="text-sm font-medium text-ink">No open issues</span>
          <span class="text-sm text-muted"
            >New issues from your team will show up here.</span
          >
          <button markas-button size="sm" class="mt-2">New issue</button>
        </div>
      </ng-template>
      <ng-template markasTabPanel="closed"
        >You closed 24 issues this month.</ng-template
      >
    </markas-tabs>
  `,
})
export default class TabsEmptyStateExample {
  protected readonly empty =
    "grid justify-items-center gap-2 rounded-lg border border-dashed border-line px-6 py-8 text-center";
  protected readonly items = [
    { value: "open", label: "Open" },
    { value: "closed", label: "Closed" },
  ];
}
