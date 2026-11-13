import { Component } from "@angular/core";
import { ContextMenu } from "../../components/context-menu/context-menu.component";

@Component({
  selector: "markas-example",
  imports: [ContextMenu],
  template: `
    <markas-context-menu [items]="items">
      <div [class]="area">Right-click here</div>
    </markas-context-menu>
  `,
})
export default class ContextMenuExample {
  protected readonly items = [
    { label: "Open", value: "open" },
    { label: "Rename", value: "rename" },
    { label: "Duplicate", value: "duplicate" },
    { label: "Archive", value: "archive", disabled: true },
    { separator: true as const },
    { label: "Delete", value: "delete", danger: true },
  ];
  protected readonly area =
    "flex h-36 items-center justify-center rounded-lg border border-dashed border-line text-sm text-muted";
}
