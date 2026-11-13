import { Component } from "@angular/core";
import { DropdownMenu } from "../../components/dropdown-menu/dropdown-menu.component";
import { Sidebar } from "../../components/sidebar/sidebar.component";

const mark = [
  { points: "354,578 1256,138 1171,430 268,868", className: "fill-ink/15" },
  { points: "553,443 1455,3 1370,295 467,733", className: "fill-ink/55" },
  {
    points: "421,762 1325,318 1240,611 336,1050",
    className: "fill-success/35",
  },
  { points: "265,1073 1169,629 1084,922 180,1362", className: "fill-ink/25" },
  { points: "93,965 997,521 912,814 8,1253", className: "fill-ink/75" },
  {
    points: "347,1135 1251,691 1166,984 262,1424",
    className: "fill-success",
  },
];

const workspaces = [
  { label: "MarkasUI", value: "markasui" },
  { label: "MarkasUI Docs", value: "markasui-docs" },
  { separator: true as const },
  { label: "Create workspace", value: "create" },
];

const switcher =
  "w-full [&>button]:h-10 [&>button]:w-full [&>button]:justify-start [&>button]:gap-2.5 [&>button]:border-transparent [&>button]:bg-transparent [&>button]:px-1.5 [&>button>svg:last-child]:ms-auto";

const sections = [
  {
    items: [
      {
        label: "Home",
        href: "/",
        icon: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z",
        active: true,
      },
      {
        label: "Inbox",
        href: "/inbox",
        icon: "M3 13h5l1.5 3h5l1.5-3h5M5 5h14l2 8v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6z",
        badge: 3,
      },
      {
        label: "My tasks",
        href: "/tasks",
        icon: "m9 11 3 3 8-8M20 12v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h11",
      },
    ],
  },
  {
    title: "Projects",
    items: [
      {
        label: "Website relaunch",
        href: "/projects/website",
        icon: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      },
      {
        label: "Design system",
        href: "/projects/design-system",
        icon: "M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z",
      },
      {
        label: "Mobile app",
        href: "/projects/mobile",
        icon: "M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1m3 15h2",
      },
    ],
  },
];

@Component({
  selector: "markas-example",
  imports: [DropdownMenu, Sidebar],
  template: `
    <markas-sidebar
      [sections]="sections"
      breakpoint="sm"
      class="h-[600px] rounded-xl border border-line"
      ><ng-template #header>
        <markas-dropdown-menu
          [items]="workspaces"
          class="w-full [&>button]:h-10 [&>button]:w-full [&>button]:justify-start [&>button]:gap-2.5 [&>button]:border-transparent [&>button]:bg-transparent [&>button]:px-1.5 [&>button>svg:last-child]:ms-auto"
          ><ng-container trigger>
            <svg
              class="size-6 shrink-0"
              viewBox="0 0 1464 1430"
              aria-hidden="true"
            >
              @for (shape of mark; track shape.points) {
                <polygon
                  [attr.points]="shape.points"
                  [class]="shape.className"
                ></polygon>
              }
            </svg>
            <span class="grid text-left leading-tight"
              ><span class="font-semibold">MarkasUI</span>
              <span class="text-xs font-normal text-muted"
                >Pro workspace</span
              ></span
            >
          </ng-container></markas-dropdown-menu
        >
      </ng-template>
      <ng-template #footer>
        <div class="grid w-full gap-3 whitespace-normal">
          <div
            class="grid gap-2.5 rounded-xl border border-line bg-canvas p-3 in-data-[state=collapsed]:hidden"
          >
            <div class="flex items-center justify-between">
              <span class="font-medium text-ink">Free plan</span>
              <span class="text-xs text-muted">3 of 5 projects</span>
            </div>
            <div class="h-1.5 overflow-hidden rounded-full bg-subtle">
              <div class="h-full w-3/5 rounded-full bg-success"></div>
            </div>
            <p class="text-xs leading-relaxed text-muted">
              Unlock every template and the Figma kit.
            </p>
            <a
              href="/pricing"
              class="inline-flex h-8 items-center justify-center rounded-lg bg-primary text-xs font-medium text-on-primary transition-colors duration-150 ease-out hover:bg-primary-strong"
            >
              Upgrade to Pro
            </a>
          </div>
          <div class="flex items-center gap-3">
            <span
              class="grid size-8 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-semibold text-ink"
            >
              DA
            </span>
            <span class="grid min-w-0 leading-tight"
              ><span class="truncate font-medium text-ink">Dimas Arya</span>
              <span class="truncate text-xs text-muted"
                >dimas&#64;markasui.com</span
              ></span
            >
          </div>
        </div>
      </ng-template>
      <div class="flex min-w-0 flex-1 flex-col gap-4 p-5">
        <div class="grid gap-1">
          <p class="text-xs text-muted">Monday, 9 November</p>
          <p class="text-lg font-semibold tracking-tight text-ink">Hi, Dimas</p>
        </div>
        <div class="grid gap-2 rounded-xl border border-line bg-surface p-4">
          <p class="text-xs font-medium text-faint">Today</p>
          <p class="text-sm text-ink">Review pricing PR</p>
          <p class="text-sm text-ink">Ship Combobox docs</p>
          <p class="text-sm text-muted line-through">Fix Modal focus</p>
        </div>
      </div></markas-sidebar
    >
  `,
})
export default class SidebarWorkspaceExample {
  protected readonly mark = mark;
  protected readonly workspaces = workspaces;
  protected readonly switcher = switcher;
  protected readonly sections = sections;
}
