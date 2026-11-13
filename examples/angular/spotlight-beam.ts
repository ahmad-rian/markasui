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
      class="dark rounded-xl bg-canvas px-6 py-16 text-ink"
    >
      <div class="grid gap-4">
        <h2 class="text-3xl font-semibold tracking-tight text-balance text-ink">
          Your roadmap, in the spotlight
        </h2>
        <p class="max-w-80 text-sm text-muted">
          Share what is shipping next with a public roadmap your customers can
          vote on.
        </p>
        <div class="flex gap-2">
          <button markas-button>Create a roadmap</button>
          <button markas-button variant="ghost">View example</button>
        </div>
      </div>
    </div>
  `,
})
export default class SpotlightBeamExample {}
