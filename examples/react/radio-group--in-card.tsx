import { Button } from "../../components/button/Button";
import { RadioGroup } from "../../components/radio-group/RadioGroup";

const frequencies = [
  { value: "daily", label: "Daily", description: "Every morning at 08:00." },
  { value: "weekly", label: "Weekly", description: "Every Monday morning." },
  {
    value: "never",
    label: "Never",
    description: "Only important account notices.",
  },
];

export default function RadioGroupInCardExample() {
  return (
    <form className="grid gap-6 rounded-lg border border-line bg-surface p-6">
      <div className="grid gap-1">
        <p className="text-base font-semibold text-ink">Digest emails</p>
        <p className="text-sm text-muted">
          A summary of activity in projects you follow.
        </p>
      </div>
      <RadioGroup
        name="digest"
        label="Frequency"
        defaultValue="weekly"
        options={frequencies}
      />
      <div className="flex justify-end gap-2">
        <Button variant="secondary">Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
