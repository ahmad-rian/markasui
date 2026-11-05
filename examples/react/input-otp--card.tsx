import { Button } from "../../components/button/Button";
import { InputOTP } from "../../components/input-otp/InputOTP";

export default function InputOTPCardExample() {
  return (
    <form className="grid gap-5 rounded-lg border border-line bg-surface p-6">
      <div className="grid gap-1">
        <p className="text-base font-semibold text-ink">Check your email</p>
        <p className="text-sm text-muted">
          We sent a 6-digit code to ana@example.com. It expires in 10 minutes.
        </p>
      </div>
      <InputOTP name="code" label="Verification code" />
      <Button type="submit" className="w-full">
        Verify email
      </Button>
      <p className="text-sm text-muted">
        Did not get a code?{" "}
        <a
          href="#"
          className="font-medium text-primary underline underline-offset-2"
        >
          Send again
        </a>
      </p>
    </form>
  );
}
