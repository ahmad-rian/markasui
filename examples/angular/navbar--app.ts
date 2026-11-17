import { Component } from "@angular/core";
import { Avatar } from "../../components/avatar/avatar.component";
import { Breadcrumb } from "../../components/breadcrumb/breadcrumb.component";
import { Button } from "../../components/button/button.component";
import { DropdownMenu } from "../../components/dropdown-menu/dropdown-menu.component";
import {
  Navbar,
  type NavbarLink,
} from "../../components/navbar/navbar.component";

const logo = [
  { fill: "fill-ink/15", points: "354,578 1256,138 1171,430 268,868" },
  { fill: "fill-ink/55", points: "553,443 1455,3 1370,295 467,733" },
  { fill: "fill-success/35", points: "421,762 1325,318 1240,611 336,1050" },
  { fill: "fill-ink/30", points: "265,1073 1169,629 1084,922 180,1362" },
  { fill: "fill-ink/80", points: "93,965 997,521 912,814 8,1253" },
  { fill: "fill-success", points: "347,1135 1251,691 1166,984 262,1424" },
];

const links: NavbarLink[] = [
  { label: "Overview", href: "/overview", active: true },
  { label: "Deployments", href: "/deployments" },
  { label: "Analytics", href: "/analytics" },
  { label: "Settings", href: "/settings" },
];

const path = [{ label: "Markas", href: "/team" }, { label: "docs" }];

const account = [
  { label: "Profile", href: "/profile" },
  { label: "Settings", href: "/settings" },
  { label: "Billing", href: "/billing" },
  { separator: true as const },
  { label: "Sign out", value: "sign-out", danger: true },
];

const home = "rounded-md";
const logoClass = "size-6";
const slash = "hidden size-5 text-line @md:block";
const crumbs = "font-normal @max-xs:hidden";
const bell = "relative size-9 px-0!";
const icon = "size-5";
const count =
  "absolute top-1 right-1 grid h-4 min-w-4 place-items-center rounded-full bg-danger px-1 text-[10px] font-semibold text-on-primary ring-2 ring-surface";
const profile =
  "[&>button]:h-9 [&>button]:gap-1 [&>button]:border-0 [&>button]:px-1";

@Component({
  selector: "markas-example",
  imports: [Avatar, Breadcrumb, Button, DropdownMenu, Navbar],
  template: `
    <header markas-navbar [links]="links">
      <ng-container brand>
        <a href="/" aria-label="MarkasUI home" [class]="home">
          <svg
            [attr.class]="logoClass"
            viewBox="0 0 1464 1430"
            aria-hidden="true"
          >
            @for (shape of logo; track shape.points) {
              <polygon [attr.class]="shape.fill" [attr.points]="shape.points" />
            }
          </svg>
        </a>
        <svg
          [attr.class]="slash"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <path d="M16 3 8 21" />
        </svg>
        <nav markas-breadcrumb [items]="path" [class]="crumbs"></nav>
      </ng-container>
      <ng-container actions>
        <button
          markas-button
          variant="ghost"
          aria-label="Notifications, 3 unread"
          [class]="bell"
        >
          <svg
            [attr.class]="icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
          <span aria-hidden="true" [class]="count">3</span>
        </button>
        <markas-dropdown-menu
          label="Account"
          [items]="account"
          [class]="profile"
        >
          <markas-avatar trigger name="Siti Aminah" size="sm" />
        </markas-dropdown-menu>
      </ng-container>
    </header>
  `,
})
export default class NavbarAppExample {
  protected readonly logo = logo;
  protected readonly links = links;
  protected readonly path = path;
  protected readonly account = account;
  protected readonly home = home;
  protected readonly logoClass = logoClass;
  protected readonly slash = slash;
  protected readonly crumbs = crumbs;
  protected readonly bell = bell;
  protected readonly icon = icon;
  protected readonly count = count;
  protected readonly profile = profile;
}
