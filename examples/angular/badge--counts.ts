import { Component } from "@angular/core";
import { Badge } from "../../components/badge/badge.component";

@Component({
  selector: "markas-example",
  imports: [Badge],
  template: `
    <ul
      class="grid gap-1 rounded-lg border border-line bg-surface p-2 text-sm text-ink"
    >
      <li class="flex items-center justify-between rounded-md px-3 py-2">
        <span>Inbox</span>
        <span markas-badge variant="primary" [dot]="false" class="tabular-nums"
          >12</span
        >
      </li>
      <li class="flex items-center justify-between rounded-md px-3 py-2">
        <span>Mentions</span>
        <span markas-badge [dot]="false" class="tabular-nums">3</span>
      </li>
      <li class="flex items-center justify-between rounded-md px-3 py-2">
        <span>Failed jobs</span>
        <span markas-badge variant="danger" [dot]="false" class="tabular-nums"
          >99+</span
        >
      </li>
    </ul>
  `,
})
export default class BadgeCountsExample {}
