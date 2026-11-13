import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { RetroGrid } from "../../components/retro-grid/retro-grid.component";

@Component({
  selector: "markas-example",
  imports: [Button, RetroGrid],
  template: `
    <div
      markas-retro-grid
      color="warning"
      class="dark rounded-xl bg-canvas px-6 pt-10 pb-28 text-ink"
    >
      <div class="grid justify-items-center gap-4 text-center">
        <h3 class="text-3xl font-bold tracking-tight text-ink">Arcade mode</h3>
        <p class="max-w-72 text-sm text-muted">
          Turn your sprint into a game with streaks, points, and a weekly
          leaderboard.
        </p>
        <button markas-button>Press start</button>
      </div>
    </div>
  `,
})
export default class RetroGridArcadeExample {}
