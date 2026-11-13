import { Component } from "@angular/core";
import { Toggle } from "../../components/toggle/toggle.component";

@Component({
  selector: "markas-example",
  imports: [Toggle],
  template: `
    <div class="flex items-center justify-center gap-2">
      <button markas-toggle aria-label="Bold" pressed>
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
          <path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zm0 7h7a3.5 3.5 0 0 1 0 7H7z" />
        </svg>
      </button>
      <button markas-toggle aria-label="Italic">
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
          <path d="M10 4h9M5 20h9M15 4 9 20" />
        </svg>
      </button>
      <button markas-toggle variant="outline">
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
          <path d="M6 4h12v16l-6-4-6 4z" />
        </svg>
        Bookmark
      </button>
    </div>
  `,
})
export default class ToggleFixture {}
