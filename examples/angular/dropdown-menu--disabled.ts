import { Component } from "@angular/core";
import { DropdownMenu } from "../../components/dropdown-menu/dropdown-menu.component";

@Component({
  selector: "markas-example",
  imports: [DropdownMenu],
  template: `
    <div class="flex justify-center">
      <markas-dropdown-menu label="Edit" [items]="items" />
    </div>
  `,
})
export default class DropdownMenuDisabledExample {
  protected readonly items = [
    { label: "Undo", value: "undo" },
    { label: "Redo", value: "redo", disabled: true },
    { separator: true as const },
    { label: "Cut", value: "cut" },
    { label: "Copy", value: "copy" },
    { label: "Paste", value: "paste", disabled: true },
  ];
}
