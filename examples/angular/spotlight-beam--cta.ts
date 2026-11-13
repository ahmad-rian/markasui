import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { SpotlightBeam } from "../../components/spotlight-beam/spotlight-beam.component";

@Component({
  selector: "markas-example",
  imports: [Button, SpotlightBeam],
  template: `
    <div
      markas-spotlight-beam
      follow
      color="warning"
      intensity="strong"
      speed="slow"
      class="dark rounded-xl bg-surface px-6 py-10 text-ink"
    >
      <div class="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <div class="grid gap-2">
          <h3 class="text-xl font-semibold text-ink">
            Ready to go live tonight?
          </h3>
          <p class="text-sm text-muted">
            Deploy in one click. Roll back just as fast.
          </p>
        </div>
        <button markas-button>Deploy now</button>
      </div>
    </div>
  `,
})
export default class SpotlightBeamCtaExample {}
