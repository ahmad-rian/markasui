import { Checkbox } from "../../components/checkbox/Checkbox";

export default function CheckboxHorizontalExample() {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 text-sm font-medium text-ink">
        Notify me by
      </legend>
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        <Checkbox
          name="channels[]"
          value="email"
          label="Email"
          defaultChecked
        />
        <Checkbox name="channels[]" value="sms" label="SMS" />
        <Checkbox name="channels[]" value="push" label="Push" defaultChecked />
        <Checkbox name="channels[]" value="slack" label="Slack" />
      </div>
    </fieldset>
  );
}
