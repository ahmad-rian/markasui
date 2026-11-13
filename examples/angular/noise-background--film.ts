import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { NoiseBackground } from "../../components/noise-background/noise-background.component";

@Component({
  selector: "markas-example",
  imports: [Button, NoiseBackground],
  template: `
    <div
      markas-noise-background
      variant="film"
      color="danger"
      intensity="high"
      class="dark rounded-xl bg-canvas px-6 py-14 text-ink"
    >
      <div class="grid justify-items-center gap-3 text-center">
        <p class="text-sm font-medium text-danger">Premieres Friday</p>
        <h3 class="text-3xl font-semibold tracking-tight text-ink">
          The Last Release
        </h3>
        <p class="max-w-72 text-sm text-muted">
          A documentary about the team that shipped on time, every time.
        </p>
        <button markas-button>Watch the trailer</button>
      </div>
    </div>
  `,
})
export default class NoiseBackgroundFilmExample {}
