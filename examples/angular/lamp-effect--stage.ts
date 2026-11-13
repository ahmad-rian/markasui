import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { LampEffect } from "../../components/lamp-effect/lamp-effect.component";

@Component({
  selector: "markas-example",
  imports: [Button, LampEffect],
  template: `
    <div
      markas-lamp-effect
      variant="stage"
      color="warning"
      class="dark rounded-xl bg-canvas px-6 pt-24 pb-12 text-ink"
    >
      <div class="grid justify-items-center gap-3 text-center">
        <p class="text-sm font-medium text-warning">Live keynote</p>
        <h3 class="text-3xl font-semibold tracking-tight text-ink">
          Launch Week 2026
        </h3>
        <p class="max-w-72 text-sm text-muted">
          Five days, five releases. Join us on stage every morning at 10:00.
        </p>
        <button markas-button>Save my seat</button>
      </div>
    </div>
  `,
})
export default class LampEffectStageExample {}
