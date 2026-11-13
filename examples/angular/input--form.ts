import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Input } from "../../components/input/input.component";

@Component({
  selector: "markas-example",
  imports: [Button, Input],
  template: `
    <form class="grid gap-4 rounded-lg border border-line bg-surface p-6">
      <div class="grid gap-1">
        <p class="text-base font-semibold text-ink">Create an account</p>
        <p class="text-sm text-muted">
          Start your free 14-day trial. No card required.
        </p>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <markas-input
          name="first_name"
          label="First name"
          autocomplete="given-name"
        />
        <markas-input
          name="last_name"
          label="Last name"
          autocomplete="family-name"
        />
      </div>
      <markas-input
        name="email"
        type="email"
        label="Work email"
        placeholder="you&#64;company.com"
        autocomplete="email"
      />
      <markas-input
        name="password"
        type="password"
        label="Password"
        hint="At least 8 characters."
        autocomplete="new-password"
      />
      <button markas-button type="submit" class="w-full">Create account</button>
    </form>
  `,
})
export default class InputFormExample {}
