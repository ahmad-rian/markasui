import { Component } from "@angular/core";
import { ContextMenu } from "../../components/context-menu/context-menu.component";

@Component({
  selector: "markas-example",
  imports: [ContextMenu],
  template: `
    <ul class="grid gap-2">
      @for (row of rows; track row.name) {
        <li>
          <markas-context-menu [aria-label]="row.name" [items]="items">
            <div [class]="rowClass">
              <span class="font-medium text-ink">{{ row.name }}</span>
              <span class="text-muted">{{ row.status }}</span>
            </div>
          </markas-context-menu>
        </li>
      }
    </ul>
  `,
})
export default class ContextMenuListExample {
  protected readonly rows = [
    { name: "Website redesign", status: "In progress" },
    { name: "Mobile app", status: "Planned" },
  ];
  protected readonly items = [
    { label: "Open project", value: "open" },
    { label: "Copy link", value: "copy-link" },
    { separator: true as const },
    { label: "Archive", value: "archive", danger: true },
  ];
  protected readonly rowClass =
    "flex items-center justify-between rounded-lg border border-line bg-surface px-4 py-3 text-sm";
}
