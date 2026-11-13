import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { WavyBackground } from "../../components/wavy-background/wavy-background.component";

@Component({
  selector: "markas-example",
  imports: [Button, WavyBackground],
  template: `
    <div
      markas-wavy-background
      color="muted"
      waves="5"
      speed="slow"
      class="rounded-xl border border-line bg-surface px-6 pt-10 pb-28"
    >
      <div class="grid justify-items-center gap-3 text-center">
        <p class="text-6xl font-bold tracking-tight text-ink">404</p>
        <h3 class="text-lg font-semibold text-ink">
          This page washed out to sea
        </h3>
        <p class="max-w-72 text-sm text-muted">
          The link may be broken, or the page was moved.
        </p>
        <button markas-button variant="secondary">Back to home</button>
      </div>
    </div>
  `,
})
export default class WavyBackgroundNotFoundExample {}
