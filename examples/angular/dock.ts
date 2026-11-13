import { Component } from "@angular/core";
import { Dock, type DockItem } from "../../components/dock/dock.component";

@Component({
  selector: "markas-example",
  imports: [Dock],
  template: `
    <div
      class="relative grid h-[280px] place-items-end justify-center overflow-hidden rounded-xl border border-line bg-subtle px-4 pb-4"
    >
      <div
        class="absolute inset-x-10 top-8 h-36 rounded-lg border border-line bg-surface shadow-overlay"
      >
        <div class="flex gap-1.5 border-b border-line px-3 py-2.5">
          <span class="size-2.5 rounded-full bg-line"></span>
          <span class="size-2.5 rounded-full bg-line"></span>
          <span class="size-2.5 rounded-full bg-line"></span>
        </div>
        <p class="px-4 pt-4 text-sm font-medium text-ink">Inbox</p>
        <p class="px-4 pt-1 text-sm text-muted">
          3 new messages from the design team
        </p>
      </div>
      <markas-dock [items]="items" />
    </div>
  `,
})
export default class DockExample {
  protected readonly items: DockItem[] = [
    {
      label: "Files",
      icon: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      active: true,
    },
    {
      label: "Mail",
      icon: "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 7l9 6 9-6",
      active: true,
    },
    {
      label: "Calendar",
      icon: "M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM3 10h18M8 3v4M16 3v4",
    },
    {
      label: "Music",
      icon: "M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z",
      active: true,
    },
    {
      label: "Photos",
      icon: "M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM4 16l5-5 4 4 3-3 4 4M15 8h.01",
    },
    {
      label: "Settings",
      icon: "M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1M15 4v4M9 10v4M17 16v4",
    },
    { separator: true },
    {
      label: "Trash",
      icon: "M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4h6v3",
    },
  ];
}
