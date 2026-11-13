import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Input } from "../../components/input/input.component";
import { SpotlightBeam } from "../../components/spotlight-beam/spotlight-beam.component";

@Component({
  selector: "markas-example",
  imports: [Button, Input, SpotlightBeam],
  template: `
    <div
      markas-spotlight-beam
      variant="top-right"
      intensity="soft"
      class="rounded-xl border border-line bg-canvas px-6 py-10"
    >
      <form
        class="mx-auto grid max-w-80 gap-4 rounded-xl border border-line bg-surface p-6"
      >
        <div class="grid gap-1">
          <h3 class="text-lg font-semibold text-ink">Welcome back</h3>
          <p class="text-sm text-muted">Sign in to your team workspace.</p>
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
export default class SpotlightBeamSignInExample {}
