import { Component } from "@angular/core";
import { BackgroundBeams } from "../../components/background-beams/background-beams.component";
import { Button } from "../../components/button/button.component";

@Component({
  selector: "markas-example",
  imports: [BackgroundBeams, Button],
  template: `
    <div
      markas-background-beams
      color="success"
      [count]="12"
      speed="slow"
      class="dark rounded-xl bg-canvas px-6 py-14 text-ink"
    >
      <div class="grid justify-items-center gap-4 text-center">
        <h3 class="text-3xl font-bold tracking-tight text-ink">
          Every signal, one view
        </h3>
        <p class="max-w-72 text-sm text-muted">
          Logs, traces, and alerts flow into a single timeline your team can
          trust.
        </p>
        <div class="flex gap-2">
          <button markas-button>Start monitoring</button>
          <button markas-button variant="secondary">View demo</button>
        </div>
      </div>
    </div>
  `,
})
export default class BackgroundBeamsDarkHeroExample {}
