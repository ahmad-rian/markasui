import { Component } from "@angular/core";
import { Breadcrumb } from "../../components/breadcrumb/breadcrumb.component";

@Component({
  selector: "markas-example",
  imports: [Breadcrumb],
  template: `
    <div class="rounded-lg border border-line bg-subtle px-3 py-2">
      <nav markas-breadcrumb navLabel="File path" [items]="items"></nav>
    </div>
  `,
})
export default class BreadcrumbFilePathExample {
  protected readonly items = [
    { label: "markasui", href: "/" },
    { label: "components", href: "/components" },
    { label: "tabs", href: "/components/tabs" },
    { label: "Tabs.tsx" },
  ];
}
