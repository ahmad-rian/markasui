import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { StarsBackground } from "../../components/stars-background/stars-background.component";

@Component({
  selector: "markas-example",
  imports: [Button, StarsBackground],
  template: `
    <div
      markas-stars-background
      count="120"
      class="rounded-xl border border-line bg-surface px-6 py-14"
    >
      <div class="grid justify-items-center gap-4 text-center">
        <p class="text-sm font-medium text-muted">Launch week, day 3</p>
        <h2 class="text-2xl font-semibold text-balance text-ink">
          Deploys that ship while you sleep
        </h2>
        <p class="max-w-80 text-sm text-muted">
          Schedule releases for any time zone and wake up to a green dashboard.
        </p>
        <button markas-button>Read the announcement</button>
      </div>
    </div>
  `,
})
export default class StarsBackgroundExample {}
