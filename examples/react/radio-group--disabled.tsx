import { RadioGroup } from "../../components/radio-group/RadioGroup";

const schedules = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

export default function RadioGroupDisabledExample() {
  return (
    <div className="grid gap-3">
      <RadioGroup
        name="payout"
        label="Payout schedule"
        defaultValue="weekly"
        disabled
        options={schedules}
      />
      <p className="text-sm text-muted">
        Verify your bank account to change the payout schedule.
      </p>
    </div>
  );
}
