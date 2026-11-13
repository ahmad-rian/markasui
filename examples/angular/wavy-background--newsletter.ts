import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Input } from "../../components/input/input.component";
import { WavyBackground } from "../../components/wavy-background/wavy-background.component";

@Component({
  selector: "markas-example",
  imports: [Button, Input, WavyBackground],
  template: `
    <div
      markas-wavy-background
      variant="silk"
      waves="5"
      speed="slow"
      class="rounded-xl border border-line bg-surface px-6 py-10"
    >
      <form
        class="mx-auto grid max-w-80 gap-4 rounded-xl border border-line bg-surface p-6"
      >
        <div class="grid gap-1">
          <h3 class="text-lg font-semibold text-ink">
            Get the weekly changelog
          </h3>
          <p class="text-sm text-muted">
            One short email every Monday. Unsubscribe anytime.
          </p>
        </div>
        <markas-input
          label="Email"
          type="email"
          placeholder="you@company.com"
        />
        <button markas-button type="submit">Subscribe</button>
      </form>
    </div>
  `,
})
export default class WavyBackgroundNewsletterExample {}
