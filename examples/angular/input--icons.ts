import { Component } from "@angular/core";
import { Input } from "../../components/input/input.component";

@Component({
  selector: "markas-example",
  imports: [Input],
  template: `
    <div class="grid gap-4">
      <div class="relative">
        <markas-input
          type="search"
          name="q"
          aria-label="Search projects"
          placeholder="Search projects"
          class="pl-9!"
        />
        <svg
          [class]="icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </div>
      <div class="relative">
        <markas-input
          type="email"
          name="email"
          label="Email"
          placeholder="you&#64;example.com"
          class="pl-9!"
        />
        <svg
          [class]="icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      </div>
      <div class="relative">
        <markas-input
          type="password"
          name="password"
          label="Password"
          value="correct-horse"
          class="pl-9!"
        />
        <svg
          [class]="icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      </div>
    </div>
  `,
})
export default class InputIconsExample {
  protected readonly icon =
    "pointer-events-none absolute bottom-3 left-3 size-4 text-muted";
}
