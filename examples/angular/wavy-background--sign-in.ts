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
      variant="layered"
      color="success"
      waves="3"
      class="rounded-xl border border-line bg-canvas px-6 pt-8 pb-16"
    >
      <form
        class="mx-auto grid max-w-80 gap-4 rounded-xl border border-line bg-surface p-6"
      >
        <div class="grid gap-1">
          <h3 class="text-lg font-semibold text-ink">Welcome back</h3>
          <p class="text-sm text-muted">
            Sign in to continue to your workspace.
          </p>
        </div>
        <markas-input
          label="Email"
          type="email"
          placeholder="you@company.com"
        />
        <markas-input label="Password" type="password" />
        <button markas-button type="submit">Sign in</button>
      </form>
    </div>
  `,
})
export default class WavyBackgroundSignInExample {}
