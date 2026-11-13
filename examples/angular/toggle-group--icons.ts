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
      <markas-toggle-group label="Text alignment" value="left" [items]="items">
        <ng-template markasToggleGroupItem="left">
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
            <path d="M4 6h16M4 12h10M4 18h14" />
          </svg>
        </ng-template>
        <ng-template markasToggleGroupItem="center">
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
            <path d="M4 6h16M7 12h10M5 18h14" />
          </svg>
        </ng-template>
        <ng-template markasToggleGroupItem="right">
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
            <path d="M4 6h16M10 12h10M6 18h14" />
          </svg>
        </ng-template>
      </markas-toggle-group>
    </div>
  `,
})
export default class ToggleGroupIconsExample {
  protected readonly items = [
    { value: "left", label: "Align left", ariaLabel: "Align left" },
    { value: "center", label: "Align center", ariaLabel: "Align center" },
    { value: "right", label: "Align right", ariaLabel: "Align right" },
  ];
}
