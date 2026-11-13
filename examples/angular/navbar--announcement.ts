import { Component, signal } from "@angular/core";
import { Badge } from "../../components/badge/badge.component";
import { Button } from "../../components/button/button.component";
import { Navbar } from "../../components/navbar/navbar.component";
import { ThemeToggle } from "../../components/theme-toggle/theme-toggle.component";

@Component({
  selector: "markas-example",
  imports: [Badge, Button, Navbar, ThemeToggle],
  template: `
    <div [class]="shell">
      @if (open()) {
        <div [class]="bar">
          <a href="/changelog" [class]="message">
            <span markas-badge variant="success" [class]="badge">New</span>
            <span [class]="headline">MarkasUI 1.0 is here</span>
            <span [class]="detail">Read the release notes</span>
            <svg
              [class]="arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </a>
          <button
            type="button"
            aria-label="Dismiss announcement"
            [class]="dismiss"
            (click)="open.set(false)"
          >
            <svg
              [class]="icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      }
      <header markas-navbar [links]="links">
        <ng-container brand>
          <a href="/" [class]="brand">
            <svg [class]="logoClass" viewBox="0 0 1464 1430" aria-hidden="true">
              @for (shape of logo; track shape.points) {
                <polygon [class]="shape.fill" [attr.points]="shape.points" />
              }
            </svg>
            <span>MarkasUI</span>
          </a>
        </ng-container>
        <ng-container actions>
          <button markas-theme-toggle size="sm" animation="eclipse"></button>
          <button markas-button size="sm">Get started</button>
        </ng-container>
      </header>
    </div>
  `,
})
export default class NavbarAnnouncementExample {
  protected readonly logo = [
    { fill: "fill-ink/15", points: "354,578 1256,138 1171,430 268,868" },
    { fill: "fill-ink/55", points: "553,443 1455,3 1370,295 467,733" },
    { fill: "fill-success/35", points: "421,762 1325,318 1240,611 336,1050" },
    { fill: "fill-ink/30", points: "265,1073 1169,629 1084,922 180,1362" },
    { fill: "fill-ink/80", points: "93,965 997,521 912,814 8,1253" },
    { fill: "fill-success", points: "347,1135 1251,691 1166,984 262,1424" },
  ];
  protected readonly links = [
    { label: "Docs", href: "/docs" },
    { label: "Components", href: "/components", active: true },
    { label: "Templates", href: "/templates" },
    { label: "Changelog", href: "/changelog" },
  ];
  protected readonly shell = "@container grid";
  protected readonly bar =
    "relative flex items-center justify-center bg-primary bg-[radial-gradient(45%_160%_at_50%_0%,color-mix(in_oklab,var(--color-success)_55%,transparent),transparent)] py-2 pr-11 pl-4 text-sm text-on-primary";
  protected readonly message =
    "group inline-flex min-w-0 items-center gap-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary";
  protected readonly badge = "bg-surface!";
  protected readonly headline = "truncate font-medium";
  protected readonly detail = "hidden text-on-primary/75 @lg:inline";
  protected readonly arrow =
    "size-4 shrink-0 transition-transform duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none";
  protected readonly dismiss =
    "absolute right-2 inline-flex size-7 items-center justify-center rounded-md transition-colors duration-150 ease-out hover:bg-on-primary/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary";
  protected readonly icon = "size-4";
  protected readonly open = signal(true);
  protected readonly brand = "flex items-center gap-2 rounded-md";
  protected readonly logoClass = "size-6";
}
