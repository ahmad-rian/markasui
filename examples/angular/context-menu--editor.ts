import { Component } from "@angular/core";
import { ContextMenu } from "../../components/context-menu/context-menu.component";

@Component({
  selector: "markas-example",
  imports: [ContextMenu],
  template: `
    <markas-context-menu [items]="items">
      <div [class]="card">
        <p class="font-medium">Meeting notes</p>
        <p class="text-muted">
          Launch moves to Monday. Design review on Thursday, bring the updated
          mockups.
        </p>
      </div>
    </markas-context-menu>
  `,
})
export default class ContextMenuEditorExample {
  protected readonly items = [
    { label: "Undo", value: "undo" },
    { label: "Redo", value: "redo", disabled: true },
    { separator: true as const },
    { label: "Cut", value: "cut" },
    { label: "Copy", value: "copy" },
    { label: "Paste", value: "paste", disabled: true },
  ];
  protected readonly card =
    "grid gap-2 rounded-lg border border-line bg-surface p-4 text-sm text-ink";
}
