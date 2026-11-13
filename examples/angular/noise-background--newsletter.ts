import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Input } from "../../components/input/input.component";
import { NoiseBackground } from "../../components/noise-background/noise-background.component";

@Component({
  selector: "markas-example",
  imports: [Button, Input, NoiseBackground],
  template: `
    <div
      markas-noise-background
      variant="paper"
      color="muted"
      size="coarse"
      speed="slow"
      class="rounded-xl border border-line bg-canvas px-6 py-10"
    >
      <form class="grid gap-4">
        <div class="grid gap-1">
          <h3 class="text-xl font-semibold text-ink">The Sunday Letter</h3>
          <p class="text-sm text-muted">
            One long read, three links, and no noise. Every Sunday morning.
          </p>
        </div>
        <markas-input
          label="Email"
          type="email"
          placeholder="you@example.com"
        />
        <button markas-button type="submit">Subscribe</button>
      </form>
    </div>
  `,
})
export default class NoiseBackgroundNewsletterExample {}
