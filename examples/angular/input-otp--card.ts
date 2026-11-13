import { Component, signal } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { InputOTP } from "../../components/input-otp/input-otp.component";

@Component({
  selector: "markas-example",
  imports: [Button, InputOTP],
  template: `
    <form class="grid gap-5 rounded-lg border border-line bg-surface p-6">
      <div class="grid gap-1">
        <p class="text-base font-semibold text-ink">Check your email</p>
        <p class="text-sm text-muted">
          We sent a 6-digit code to ana&#64;example.com. It expires in 10
          minutes.
        </p>
      </div>
      <markas-input-otp
        [(value)]="code"
        name="code"
        label="Verification code"
      />
      <button markas-button type="submit" class="w-full">Verify email</button>
      <p class="text-sm text-muted">
        Did not get a code?
        <a
          href="#"
          class="font-medium text-primary underline underline-offset-2"
          >Send again</a
        >
      </p>
    </form>
  `,
})
export default class InputOTPCardExample {
  readonly code = signal("");
}
