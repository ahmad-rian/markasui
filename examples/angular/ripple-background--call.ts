import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { RippleBackground } from "../../components/ripple-background/ripple-background.component";

@Component({
  selector: "markas-example",
  imports: [Button, RippleBackground],
  template: `
    <div class="overflow-hidden rounded-xl border border-line bg-canvas">
      <div
        markas-ripple-background
        color="primary"
        rings="5"
        size="104"
        gap="56"
        class="grid h-56 place-items-center"
      >
        <span
          class="grid size-20 place-items-center rounded-full border border-line bg-surface text-xl font-semibold text-ink"
        >
          MC
        </span>
      </div>
      <div class="grid justify-items-center gap-4 px-6 pb-8 text-center">
        <div class="grid gap-1">
          <h3 class="text-base font-semibold text-ink">Calling Maya Chen</h3>
          <p class="text-sm text-muted">Ringing on desktop and mobile</p>
        </div>
        <button markas-button variant="danger">End call</button>
      </div>
    </div>
  `,
})
export default class RippleBackgroundCallExample {}
