import { Component } from "@angular/core";
import { DropdownMenu } from "../../components/dropdown-menu/dropdown-menu.component";

@Component({
  selector: "markas-example",
  imports: [DropdownMenu],
  template: `
    <div class="flex flex-wrap items-center justify-center gap-2">
      <markas-dropdown-menu label="Sort" [items]="sortItems" />
      <markas-dropdown-menu label="Export" [items]="exportItems" />
    </div>
  `,
})
export default class DropdownMenuToolbarExample {
  protected readonly sortItems = [
    { label: "Newest first", value: "newest" },
    { label: "Oldest first", value: "oldest" },
    { label: "Name A to Z", value: "name" },
  ];
  protected readonly exportItems = [
    { label: "CSV", value: "csv" },
    { label: "PDF", value: "pdf" },
    { label: "Excel", value: "xlsx", disabled: true },
  ];
}
