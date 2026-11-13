import { Component } from "@angular/core";
import { Breadcrumb } from "../../components/breadcrumb/breadcrumb.component";
import { Button } from "../../components/button/button.component";

@Component({
  selector: "markas-example",
  imports: [Breadcrumb, Button],
  template: `
    <div class="grid gap-3">
      <nav markas-breadcrumb [items]="items"></nav>
      <div class="flex items-start justify-between gap-4">
        <div class="grid gap-1">
          <h1 class="text-xl font-semibold text-ink">Settings</h1>
          <p class="text-sm text-muted">
            Manage access and notifications for this project.
          </p>
        </div>
        <button markas-button size="sm">Save</button>
      </div>
    </div>
  `,
})
export default class BreadcrumbPageHeaderExample {
  protected readonly items = [
    { label: "Projects", href: "/projects" },
    { label: "Website redesign", href: "/projects/website" },
    { label: "Settings" },
  ];
}
