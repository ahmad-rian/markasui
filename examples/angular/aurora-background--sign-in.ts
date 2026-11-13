import { Component } from "@angular/core";
import { AuroraBackground } from "../../components/aurora-background/aurora-background.component";
import { Button } from "../../components/button/button.component";
import { Input } from "../../components/input/input.component";

@Component({
  selector: "markas-example",
  imports: [AuroraBackground, Button, Input],
  template: `
    <div
      markas-aurora-background
      class="rounded-xl border border-line bg-canvas px-6 py-10"
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
          placeholder="you&#64;company.com"
        />
        <markas-input label="Password" type="password" />
        <button markas-button type="submit">Sign in</button>
      </form>
    </div>
  `,
})
export default class AuroraBackgroundSignInExample {}
