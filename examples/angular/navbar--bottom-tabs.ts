import { Component } from "@angular/core";
import { Avatar } from "../../components/avatar/avatar.component";
import { Badge } from "../../components/badge/badge.component";
import { BottomNavigation } from "../../components/bottom-navigation/bottom-navigation.component";
import { Navbar } from "../../components/navbar/navbar.component";

@Component({
  selector: "markas-example",
  imports: [Avatar, Badge, BottomNavigation, Navbar],
  template: `
    <div [class]="phone">
      <header markas-navbar variant="blur" [class]="top">
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
          <markas-avatar name="Ahmad Rian" size="sm" />
        </ng-container>
      </header>
      <div role="region" aria-label="Updates" tabindex="0" [class]="feed">
        <p [class]="greeting">Good morning, Rian</p>
        <h2 [class]="heading">What shipped this week</h2>
        <ul [class]="list">
          @for (update of updates; track update.name) {
            <li [class]="row">
              <span [class]="rowBody">
                <span [class]="rowTitle">{{ update.name }}</span>
                <span [class]="rowNote">{{ update.note }}</span>
              </span>
              <span
                markas-badge
                [variant]="update.tag === 'New' ? 'success' : 'neutral'"
              >
                {{ update.tag }}
              </span>
            </li>
          }
        </ul>
      </div>
      <markas-bottom-navigation [items]="tabs" [class]="tabBar" />
    </div>
  `,
})
export default class NavbarBottomTabsExample {
  protected readonly logo = [
    { fill: "fill-ink/15", points: "354,578 1256,138 1171,430 268,868" },
    { fill: "fill-ink/55", points: "553,443 1455,3 1370,295 467,733" },
    { fill: "fill-success/35", points: "421,762 1325,318 1240,611 336,1050" },
    { fill: "fill-ink/30", points: "265,1073 1169,629 1084,922 180,1362" },
    { fill: "fill-ink/80", points: "93,965 997,521 912,814 8,1253" },
    { fill: "fill-success", points: "347,1135 1251,691 1166,984 262,1424" },
  ];
  protected readonly tabs = [
    {
      value: "home",
      label: "Home",
      icon: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
    },
    {
      value: "components",
      label: "Components",
      icon: "M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 3.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0z",
    },
    {
      value: "saved",
      label: "Saved",
      icon: "M6 3h12v18l-6-4-6 4z",
      badge: 2,
    },
    {
      value: "profile",
      label: "Profile",
      icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
    },
  ];
  protected readonly updates = [
    { name: "Navbar", note: "Eight new layouts", tag: "New" },
    { name: "Command", note: "Grouped results and hotkey", tag: "Updated" },
    { name: "Sidebar", note: "Collapsible icon rail", tag: "Updated" },
    { name: "Footer", note: "Newsletter and sitemap", tag: "New" },
    { name: "Theme toggle", note: "Six transition styles", tag: "Updated" },
  ];
  protected readonly phone =
    "relative mx-auto flex h-[560px] w-[360px] flex-col overflow-hidden rounded-[2.5rem] border border-line bg-canvas";
  /** Bottom tabs replace the menu button on small screens. */
  protected readonly top = "shrink-0 pt-3 [&_[aria-controls$=-menu]]:hidden";
  protected readonly brand = "flex items-center gap-2 rounded-md";
  protected readonly logoClass = "size-6";
  protected readonly feed =
    "flex-1 overflow-y-auto px-4 pt-5 pb-28 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary";
  protected readonly greeting = "text-sm text-muted";
  protected readonly heading =
    "mt-1 text-2xl font-semibold tracking-tight text-ink";
  protected readonly list =
    "mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface";
  protected readonly row = "flex items-center gap-3 px-4 py-3";
  protected readonly rowBody = "grid min-w-0 flex-1";
  protected readonly rowTitle = "text-sm font-medium text-ink";
  protected readonly rowNote = "truncate text-xs text-muted";
  protected readonly tabBar = "absolute inset-x-4 bottom-4";
}
