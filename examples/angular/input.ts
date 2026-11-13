import { Component } from "@angular/core";
import { Input } from "../../components/input/input.component";

@Component({
  selector: "markas-example",
  imports: [Input],
  template: `
    <div class="grid gap-4">
      <markas-input
        name="name"
        label="Full name"
        placeholder="Budi Santoso"
        hint="As shown on your ID"
      />
      <markas-input
        name="email"
        type="email"
        label="Email"
        value="budi&#64;"
        error="Enter a valid email address"
      />
      <markas-input
        name="code"
        label="Invite code"
        value="MARKAS-2026"
        disabled
      />
    </div>
  `,
})
export default class InputExample {}
