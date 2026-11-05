import { Checkbox } from "../../components/checkbox/Checkbox";

export default function CheckboxStatesExample() {
  return (
    <div className="grid gap-4">
      <Checkbox name="line_numbers" label="Show line numbers" />
      <Checkbox name="wrap" label="Wrap long lines" defaultChecked />
      <Checkbox name="format" label="Format on save" disabled />
      <Checkbox name="autosave" label="Auto save" defaultChecked disabled />
      <p className="text-sm text-muted">
        Editor defaults are managed by your organization.
      </p>
    </div>
  );
}
