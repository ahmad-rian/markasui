import { Component } from "@angular/core";
import { FlipButton } from "../../components/flip-button/flip-button.component";

@Component({
  selector: "markas-example",
  imports: [FlipButton],
  template: `
    <div class="flex justify-center">
      <button markas-flip-button size="lg">
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
            d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
          />
        </svg>
        Download report
        <ng-container back>
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
              d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Zm0 0v5h5"
            />
          </svg>
          PDF, 2.4 MB
        </ng-container>
      </button>
    </div>
  `,
})
export default class FlipButtonIconsExample {}
