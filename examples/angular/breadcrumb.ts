import { Component } from "@angular/core";
import { Breadcrumb } from "../../components/breadcrumb/breadcrumb.component";

@Component({
  selector: "markas-example",
  imports: [Breadcrumb],
  template: `<nav markas-breadcrumb [items]="items"></nav>`,
})
export default class BreadcrumbExample {
  protected readonly items = [
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Breadcrumb" },
  ];
}
