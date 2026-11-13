import { Component } from "@angular/core";
import { ContextMenu } from "../../components/context-menu/context-menu.component";

@Component({
  selector: "markas-example",
  imports: [ContextMenu],
  template: `
    <markas-context-menu aria-label="Quarterly report.pdf" [items]="items">
      <div [class]="card">
        <svg
          class="size-6 shrink-0 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path
            d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"
          />
          <path d="M14 3v5h5" />
        </svg>
        <div class="grid gap-0.5">
          <p class="text-sm font-medium text-ink">Quarterly report.pdf</p>
          <p class="text-xs text-muted">2.4 MB, edited yesterday</p>
        </div>
      </div>
    </markas-context-menu>
  `,
})
export default class ContextMenuFileExample {
  protected readonly items = [
    { label: "Open", value: "open" },
    { label: "Download", href: "#download" },
    { label: "Rename", value: "rename" },
    { separator: true as const },
    { label: "Move to trash", value: "trash", danger: true },
  ];
  protected readonly card =
    "flex items-center gap-3 rounded-lg border border-line bg-surface p-4";
}
