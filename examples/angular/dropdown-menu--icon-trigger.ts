import { Component } from "@angular/core";
import { DropdownMenu } from "../../components/dropdown-menu/dropdown-menu.component";

@Component({
  selector: "markas-example",
  imports: [DropdownMenu],
  template: `
    <div class="flex justify-center">
      <markas-dropdown-menu [items]="items">
        <ng-container trigger>
          <svg
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          New
        </ng-container>
      </markas-dropdown-menu>
    </div>
  `,
})
export default class DropdownMenuIconTriggerExample {
  protected readonly items = [
    { label: "Document", value: "document" },
    { label: "Spreadsheet", value: "spreadsheet" },
    { label: "Folder", value: "folder" },
  ];
}
