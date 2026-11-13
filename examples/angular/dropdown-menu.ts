import { Component } from "@angular/core";
import { DropdownMenu } from "../../components/dropdown-menu/dropdown-menu.component";

@Component({
  selector: "markas-example",
  imports: [DropdownMenu],
  template: ` <markas-dropdown-menu label="Actions" [items]="items" /> `,
})
export default class DropdownMenuExample {
  protected readonly items = [
    { label: "Edit", value: "edit" },
    { label: "Duplicate", value: "duplicate" },
    { label: "Archive", value: "archive", disabled: true },
    { separator: true as const },
    { label: "Delete", value: "delete", danger: true },
  ];
}
