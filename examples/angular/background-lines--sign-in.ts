import { Component } from "@angular/core";
import { BackgroundLines } from "../../components/background-lines/background-lines.component";
import { Button } from "../../components/button/button.component";
import { Input } from "../../components/input/input.component";

@Component({
  selector: "markas-example",
  imports: [BackgroundLines, Button, Input],
  template: `
    <div
      markas-background-lines
      variant="lattice"
      color="muted"
      [count]="16"
      speed="slow"
      class="rounded-xl border border-line bg-canvas px-6 py-10"
    >
      <form
        class="mx-auto grid max-w-80 gap-4 rounded-xl border border-line bg-surface p-6"
      >
        <div class="grid gap-1">
          <h3 class="text-lg font-semibold text-ink">Sign in</h3>
          <p class="text-sm text-muted">Use your work email to continue.</p>
        </div>
        <markas-input
          label="Email"
          type="email"
          placeholder="you&#64;company.com"
        />
        <button markas-button type="submit">Send magic link</button>
      </form>
    </div>
  `,
})
export default class BackgroundLinesSignInExample {}
