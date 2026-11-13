import { Component, signal } from "@angular/core";
import { InputOTP } from "../../components/input-otp/input-otp.component";

@Component({
  selector: "markas-example",
  imports: [InputOTP],
  template: `
    <markas-input-otp [(value)]="code" name="code" label="Verification code" />
  `,
})
export default class InputOTPExample {
  readonly code = signal("");
}
