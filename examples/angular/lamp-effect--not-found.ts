import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { LampEffect } from "../../components/lamp-effect/lamp-effect.component";

@Component({
  selector: "markas-example",
  imports: [Button, LampEffect],
  template: `
    <div
      markas-lamp-effect
      variant="halo"
      size="sm"
      class="dark rounded-xl bg-canvas px-6 pt-28 pb-12 text-ink"
    >
      <div class="grid justify-items-center gap-3 text-center">
        <p class="text-6xl font-bold tracking-tight text-ink">404</p>
        <h3 class="text-lg font-semibold text-ink">This page wandered off</h3>
        <p class="max-w-72 text-sm text-muted">
          The link may be old, or the page has moved somewhere new.
        </p>
        <div class="flex gap-2">
          <button markas-button>Back to home</button>
          <button markas-button variant="ghost">Contact support</button>
        </div>
      </div>
    </div>
  `,
})
export default class LampEffectNotFoundExample {}
