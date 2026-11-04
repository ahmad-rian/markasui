import { Checkbox } from "../../components/checkbox/Checkbox";

export default function CheckboxFixture() {
  return (
    <div className="grid gap-4">
      <Checkbox
        name="terms"
        label="I agree to the terms of service"
        defaultChecked
      />
      <Checkbox
        name="updates"
        label="Send me product updates"
        description="At most one email per month."
      />
      <Checkbox name="archive" label="Archive automatically" disabled />
    </div>
  );
}
