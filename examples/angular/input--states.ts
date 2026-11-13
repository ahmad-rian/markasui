import { Component } from "@angular/core";
import { Input } from "../../components/input/input.component";

@Component({
  selector: "markas-example",
  imports: [Input],
  template: `
    <div class="grid gap-4">
      <markas-input
        name="username"
        label="Username"
        value="budi.santoso"
        hint="Letters, numbers, and dots only."
      />
      <markas-input
        name="email"
        type="email"
        label="Email"
        value="budi&#64;markas"
        error="Enter a valid email address."
      />
      <markas-input
        name="api_key"
        label="API key"
        value="mk_live_4f8a2c91"
        readonly
      />
      <markas-input
        name="workspace"
        label="Workspace"
        value="MarkasUI"
        disabled
      />
    </div>
  `,
})
export default class InputStatesExample {}
