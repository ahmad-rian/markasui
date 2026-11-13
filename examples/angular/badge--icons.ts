import { Component } from "@angular/core";
import { Badge } from "../../components/badge/badge.component";

@Component({
  selector: "markas-example",
  imports: [Badge],
  template: `
    <div class="flex flex-wrap items-center gap-2">
      <span markas-badge variant="success" [dot]="false">
        <svg
          class="size-3 text-success"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m5 12 5 5L20 7" />
        </svg>
        Verified
      </span>
      <span markas-badge variant="warning" [dot]="false">
        <svg
          class="size-3 text-warning"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 7v5l3 2" />
        </svg>
        In review
      </span>
      <span markas-badge variant="danger" [dot]="false">
        <svg
          class="size-3 text-danger"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
        Rejected
      </span>
      <span markas-badge variant="primary" [dot]="false">
        <svg
          class="size-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path
            d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5l-5.4 3 1.2-6-4.5-4.2 6.1-.7L12 3Z"
          />
        </svg>
        Featured
      </span>
    </div>
  `,
})
export default class BadgeIconsExample {}
