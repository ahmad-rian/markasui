import { Component } from "@angular/core";
import { DropdownMenu } from "../../components/dropdown-menu/dropdown-menu.component";

@Component({
  selector: "markas-example",
  imports: [DropdownMenu],
  template: `
    <div class="flex justify-center">
      <markas-dropdown-menu label="Project" [items]="items" />
    </div>
  `,
})
export default class DropdownMenuDangerExample {
  protected readonly items = [
    { label: "Rename", value: "rename" },
    { label: "Transfer ownership", value: "transfer" },
    { separator: true as const },
    { label: "Archive project", value: "archive", danger: true },
    { label: "Delete project", value: "delete", danger: true },
  ];
}
