import { Component } from "@angular/core";
import { Menubar } from "../../components/menubar/menubar.component";

const menus = [
  {
    label: "Products",
    items: [
      {
        label: "Analytics",
        href: "/analytics",
      },
      {
        label: "Automation",
        href: "/automation",
      },
      {
        label: "Reports",
        href: "/reports",
      },
    ],
  },
  {
    label: "Resources",
    items: [
      {
        label: "Documentation",
        href: "/docs",
      },
      {
        label: "Blog",
        href: "/blog",
      },
      {
        label: "Changelog",
        href: "/changelog",
      },
    ],
  },
  {
    label: "Company",
    items: [
      {
        label: "About",
        href: "/about",
      },
      {
        label: "Careers",
        href: "/careers",
      },
      {
        label: "Contact",
        href: "mailto:hello@example.com",
      },
    ],
  },
];

@Component({
  selector: "markas-example",
  imports: [Menubar],
  template: ` <markas-menubar label="Site" [menus]="menus" /> `,
})
export default class MenubarLinksExample {
  protected readonly menus = menus;
}
