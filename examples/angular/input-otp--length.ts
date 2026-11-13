import { Component, signal } from "@angular/core";
import { InputOTP } from "../../components/input-otp/input-otp.component";

@Component({
  selector: "markas-example",
  imports: [InputOTP],
  template: `
    <markas-input-otp [(value)]="pin" name="pin" label="Card PIN" length="4" />
  `,
})
export default class InputOTPLengthExample {
  readonly pin = signal("");
}
