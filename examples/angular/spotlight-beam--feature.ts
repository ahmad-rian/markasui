import { Component } from "@angular/core";
import { SpotlightBeam } from "../../components/spotlight-beam/spotlight-beam.component";

@Component({
  selector: "markas-example",
  imports: [SpotlightBeam],
  template: `
    <div
      markas-spotlight-beam
      variant="center"
      color="success"
      class="rounded-xl border border-line bg-surface px-6 pt-20 pb-10"
    >
      <div class="grid justify-items-center gap-3 text-center">
        <p class="text-sm font-medium text-ink">New in 4.2</p>
        <h3 class="text-2xl font-semibold tracking-tight text-ink">
          Offline mode that just works
        </h3>
        <p class="max-w-80 text-sm text-muted">
          Keep editing on a plane or a train. Changes sync the moment you are
          back online.
        </p>
      </div>
    </div>
  `,
})
export default class SpotlightBeamFeatureExample {}
