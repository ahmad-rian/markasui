import { Component } from "@angular/core";
import { NavigationMenu } from "../../components/navigation-menu/navigation-menu.component";

const products = [
  {
    label: "Components",
    href: "/components",
    description: "61 accessible building blocks",
  },
  {
    label: "Templates",
    href: "/templates",
    description: "Full pages you can ship today",
  },
  {
    label: "CLI",
    href: "/docs/cli",
    description: "Add components with one command",
  },
  {
    label: "MCP server",
    href: "/docs/mcp",
    description: "Let your editor agent install them",
  },
];

const developers = [
  {
    label: "Documentation",
    href: "/docs",
    description: "Guides and API reference",
  },
  {
    label: "Registry",
    href: "/docs/registry",
    description: "JSON for every component",
  },
  {
    label: "Changelog",
    href: "/changelog",
    description: "What shipped this week",
  },
  {
    label: "Status",
    href: "/status",
    description: "Registry and docs uptime",
  },
];

const items = [
  { label: "Products", links: products },
  { label: "Developers", links: developers },
  { label: "Pricing", href: "/pricing", active: true },
  { label: "Blog", href: "/blog" },
];

@Component({
  selector: "markas-example",
  imports: [NavigationMenu],
  template: ` <markas-navigation-menu [items]="items" /> `,
})
export default class NavigationMenuFixture {
  protected readonly items = items;
}
