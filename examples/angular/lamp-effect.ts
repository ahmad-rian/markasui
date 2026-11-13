import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { LampEffect } from "../../components/lamp-effect/lamp-effect.component";

@Component({
  selector: "markas-example",
  imports: [Button, LampEffect],
  template: `
    <div
      markas-lamp-effect
      class="dark rounded-xl bg-canvas px-6 pt-32 pb-14 text-ink"
    >
      <div class="grid justify-items-center gap-4 text-center">
        <h2 class="text-3xl font-semibold tracking-tight text-balance text-ink">
          Build in the light
        </h2>
        <p class="max-w-80 text-sm text-muted">
          Plan, ship, and review every release from one bright, focused
          workspace.
        </p>
        <div class="flex gap-2">
          <button markas-button>Start for free</button>
          <button markas-button variant="ghost">Book a demo</button>
        </div>
      </div>
    </div>
  `,
})
export default class LampEffectFixture {}
