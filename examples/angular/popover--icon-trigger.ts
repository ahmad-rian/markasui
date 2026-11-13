import { Component } from "@angular/core";
import { Checkbox } from "../../components/checkbox/checkbox.component";
import { Popover } from "../../components/popover/popover.component";

@Component({
  selector: "markas-example",
  imports: [Checkbox, Popover],
  template: `
    <div [class]="row">
      <p class="text-sm font-medium text-ink">Inbox</p>
      <markas-popover align="end">
        <ng-container trigger>
          <span class="sr-only">Notification settings</span>
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
              d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"
            />
          </svg>
        </ng-container>
        <div class="grid gap-3">
          <p class="font-medium text-ink">Notify me about</p>
          <markas-checkbox name="mentions" label="Mentions" checked />
          <markas-checkbox name="replies" label="Replies to my comments" />
        </div>
      </markas-popover>
    </div>
  `,
})
export default class PopoverIconTriggerExample {
  protected readonly row =
    "flex items-center justify-between rounded-lg border border-line bg-surface p-3";
}
