import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { ShootingStars } from "../../components/shooting-stars/shooting-stars.component";

@Component({
  selector: "markas-example",
  imports: [Button, ShootingStars],
  template: `
    <div
      markas-shooting-stars
      variant="dawn"
      stars="50"
      seed="4"
      class="rounded-xl border border-line bg-surface px-6 pt-10 pb-14"
    >
      <div class="grid justify-items-center gap-4 text-center">
        <h3 class="text-xl font-semibold text-balance text-ink">
          Early access opens at sunrise
        </h3>
        <p class="max-w-72 text-sm text-muted">
          We invite a new group every morning. Leave your email and we will save
          you a seat.
        </p>
        <button markas-button>Notify me</button>
      </div>
    </div>
  `,
})
export default class ShootingStarsDawnExample {}
