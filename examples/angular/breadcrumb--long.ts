import { Component } from "@angular/core";
import { Breadcrumb } from "../../components/breadcrumb/breadcrumb.component";

@Component({
  selector: "markas-example",
  imports: [Breadcrumb],
  template: `<nav markas-breadcrumb [items]="items"></nav>`,
})
export default class BreadcrumbLongExample {
  protected readonly items = [
    { label: "Home", href: "/" },
    { label: "Store", href: "/store" },
    { label: "Electronics", href: "/store/electronics" },
    { label: "Audio", href: "/store/electronics/audio" },
    { label: "Headphones", href: "/store/electronics/audio/headphones" },
    { label: "Wireless", href: "/store/electronics/audio/headphones/wireless" },
    { label: "Studio Pro X" },
  ];
}
