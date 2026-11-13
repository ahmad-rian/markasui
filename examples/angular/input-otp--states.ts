import { Component, signal } from "@angular/core";
import { InputOTP } from "../../components/input-otp/input-otp.component";

@Component({
  selector: "markas-example",
  imports: [InputOTP],
  template: `
    <div class="grid gap-6">
      <markas-input-otp [(value)]="filled" name="filled_code" label="Filled" />
      <markas-input-otp
        [(value)]="locked"
        name="locked_code"
        label="Disabled"
        disabled
      />
    </div>
  `,
})
export default class InputOTPStatesExample {
  readonly filled = signal("482913");
  readonly locked = signal("12");
}
