import { Component } from "@angular/core";
import { Dock, type DockItem } from "../../components/dock/dock.component";

@Component({
  selector: "markas-example",
  imports: [Dock],
  template: `
    <div
      class="grid place-items-center rounded-xl border border-line bg-surface px-4 pt-14 pb-6"
    >
      <markas-dock [items]="items" dockLabel="Site" />
    </div>
  `,
})
export default class DockLinksExample {
  protected readonly items: DockItem[] = [
    {
      label: "Home",
      icon: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
      href: "#home",
      active: true,
    },
    {
      label: "Projects",
      icon: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
      href: "#projects",
    },
    {
      label: "Writing",
      icon: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z",
      href: "#writing",
    },
    { separator: true },
    {
      label: "Feed",
      icon: "M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16M5 20h.01",
      href: "#rss",
    },
    {
      label: "Email me",
      icon: "M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-3.5 7.1",
      href: "mailto:hello@example.com",
    },
  ];
}
