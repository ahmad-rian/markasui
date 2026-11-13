import { Component } from "@angular/core";
import { Toggle } from "../../components/toggle/toggle.component";

@Component({
  selector: "markas-example",
  imports: [Toggle],
  template: `
    <div class="flex items-center justify-center gap-2">
      <button markas-toggle variant="outline" size="sm">
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
          <path
            d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.6l6.2-.9z"
          />
        </svg>
        Small
      </button>
      <button markas-toggle variant="outline" size="md" pressed>
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
          <path
            d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.6l6.2-.9z"
          />
        </svg>
        Medium
      </button>
      <button markas-toggle variant="outline" size="lg">
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
          <path
            d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.6l6.2-.9z"
          />
        </svg>
        Large
      </button>
    </div>
  `,
})
export default class ToggleSizesExample {}
