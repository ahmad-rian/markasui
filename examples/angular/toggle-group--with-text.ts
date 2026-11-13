import { Component } from "@angular/core";
import {
  ToggleGroup,
  ToggleGroupItemTemplate,
} from "../../components/toggle-group/toggle-group.component";

@Component({
  selector: "markas-example",
  imports: [ToggleGroup, ToggleGroupItemTemplate],
  template: `
    <div class="flex justify-center">
      <markas-toggle-group label="Layout" value="list" [items]="items">
        <ng-template markasToggleGroupItem="list">
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
            <path d="M9 6h11M9 12h11M9 18h11M4 6h1M4 12h1M4 18h1" />
          </svg>
          List
        </ng-template>
        <ng-template markasToggleGroupItem="grid">
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
            <path d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z" />
          </svg>
          Grid
        </ng-template>
      </markas-toggle-group>
    </div>
  `,
})
export default class ToggleGroupWithTextExample {
  protected readonly items = [
    { value: "list", label: "List" },
    { value: "grid", label: "Grid" },
  ];
}
