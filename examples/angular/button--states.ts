import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";

@Component({
  selector: "markas-example",
  imports: [Button],
  template: `
    <div class="flex flex-wrap items-center justify-center gap-3">
      <button markas-button>Default</button>
      <button markas-button disabled>Disabled</button>
      <button markas-button disabled aria-busy="true">
        <svg
          class="size-4 animate-spin motion-reduce:animate-none"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <path d="M21 12a9 9 0 1 1-6.2-8.56" />
        </svg>
        Saving
      </button>
    </div>
  `,
})
export default class ButtonStatesExample {}
