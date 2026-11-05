import { InputOTP } from "../../components/input-otp/InputOTP";

export default function InputOTPStatesExample() {
  return (
    <div className="grid gap-6">
      <InputOTP name="filled_code" label="Filled" defaultValue="482913" />
      <InputOTP
        name="locked_code"
        label="Disabled"
        defaultValue="12"
        disabled
      />
    </div>
  );
}
