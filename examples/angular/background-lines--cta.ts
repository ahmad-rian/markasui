import { Component } from "@angular/core";
import { BackgroundLines } from "../../components/background-lines/background-lines.component";
import { Button } from "../../components/button/button.component";

@Component({
  selector: "markas-example",
  imports: [BackgroundLines, Button],
  template: `
    <div
      markas-background-lines
      color="success"
      [count]="8"
      speed="fast"
      class="rounded-xl border border-line bg-surface p-6"
    >
      <div class="grid gap-3">
        <h3 class="text-2xl font-semibold text-ink">
          Your first month is on us
        </h3>
        <p class="text-sm text-muted">
          Invite the whole team and keep every project in sync from day one.
        </p>
        <div class="flex gap-2">
          <button markas-button>Start free trial</button>
          <button markas-button variant="ghost">Talk to sales</button>
        </div>
      </div>
    </div>
  `,
})
export default class BackgroundLinesCtaExample {}
