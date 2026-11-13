import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { StarsBackground } from "../../components/stars-background/stars-background.component";

@Component({
  selector: "markas-example",
  imports: [Button, StarsBackground],
  template: `
    <div
      markas-stars-background
      count="140"
      seed="42"
      class="dark rounded-xl bg-canvas px-6 py-10 text-ink"
    >
      <div class="grid gap-4">
        <h3 class="text-xl font-semibold text-ink">Built for night owls</h3>
        <p class="text-sm text-muted">
          This section stays dark in every theme. Add the dark class to the
          component to keep it that way.
        </p>
        <div class="flex gap-2">
          <button markas-button>Start building</button>
          <button markas-button variant="ghost">Read the guide</button>
        </div>
      </div>
    </div>
  `,
})
export default class StarsBackgroundNightSectionExample {}
