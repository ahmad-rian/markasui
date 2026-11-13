import { Component } from "@angular/core";
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

const sections = [
  {
    items: [
      {
        label: "Home",
        href: "/",
        icon: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z",
      },
      {
        label: "Inbox",
        href: "/inbox",
        icon: "M3 13h5l1.5 3h5l1.5-3h5M5 5h14l2 8v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6z",
        badge: 12,
      },
    ],
  },
  {
    title: "Workspace",
    items: [
      {
        label: "Projects",
        icon: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
        children: [
          {
            label: "Website redesign",
            href: "/projects/website",
            active: true,
          },
          {
            label: "Mobile app",
            href: "/projects/mobile",
          },
          {
            label: "Design system",
            href: "/projects/design-system",
          },
        ],
      },
      {
        label: "Analytics",
        href: "/analytics",
        icon: "M3 3v18h18M7 15l4-4 3 3 5-6",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        label: "Settings",
        href: "/settings",
        icon: "M4 6h9m4 0h3M4 12h3m4 0h9M4 18h11m4 0h1M15 4v4M9 10v4M17 16v4",
      },
    ],
  },
];

const tasks = [
  { label: "Hero copy review", tone: "bg-success" },
  { label: "Pricing page QA", tone: "bg-warning" },
  { label: "Footer links audit", tone: "bg-faint" },
];

@Component({
  selector: "markas-example",
  imports: [Sidebar],
  template: `
    <markas-sidebar
      [sections]="sections"
      breakpoint="sm"
      class="h-[540px] rounded-xl border border-line"
      ><ng-template #header>
        <svg class="size-7 shrink-0" viewBox="0 0 1464 1430" aria-hidden="true">
          @for (shape of mark; track shape.points) {
            <polygon
              [attr.points]="shape.points"
              [class]="shape.className"
            ></polygon>
          }
        </svg>
        <div class="grid min-w-0 leading-tight">
          <span class="font-semibold text-ink">MarkasUI</span>
          <span class="text-xs text-muted">Pro workspace</span>
        </div>
      </ng-template>
      <ng-template #footer>
        <span
          class="relative grid size-8 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-semibold text-ink"
        >
          RS
          <span
            aria-hidden="true"
            class="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-surface bg-success"
          ></span
        ></span>
        <span class="grid min-w-0 flex-1 leading-tight"
          ><span class="truncate font-medium text-ink">Rina Saputra</span>
          <span class="truncate text-xs text-muted"
            >rina&#64;markasui.com</span
          ></span
        >
        <svg
          class="size-4 shrink-0 text-faint"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m8 9 4-4 4 4m0 6-4 4-4-4"></path>
        </svg>
      </ng-template>
      <div class="flex min-w-0 flex-1 flex-col gap-4 p-5">
        <div class="grid gap-1">
          <p class="text-xs text-muted">Projects / Website redesign</p>
          <p class="text-lg font-semibold tracking-tight text-ink">Sprint 14</p>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-xl border border-line bg-surface p-3">
            <p class="text-xs text-muted">Open</p>
            <p class="mt-1 text-xl font-semibold text-ink">24</p>
          </div>
          <div class="rounded-xl border border-line bg-surface p-3">
            <p class="text-xs text-muted">Shipped</p>
            <p class="mt-1 text-xl font-semibold text-ink">18</p>
          </div>
        </div>
        <div
          class="grid content-start gap-3 rounded-xl border border-line bg-surface p-4"
        >
          <p class="text-xs font-medium text-faint">Up next</p>
          @for (task of tasks; track task.label) {
            <div class="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                [class]="\`size-2 shrink-0 rounded-full \${task.tone}\`"
              ></span>
              <span class="truncate text-sm text-ink">{{ task.label }}</span>
            </div>
          }
        </div>
      </div></markas-sidebar
    >
  `,
})
export default class SidebarExample {
  protected readonly mark = mark;
  protected readonly sections = sections;
  protected readonly tasks = tasks;
}
