import { Switch } from "../../components/switch/Switch";

export default function SwitchFixture() {
  return (
    <div className="grid gap-4">
      <Switch name="notifications" label="Email notifications" defaultChecked />
      <Switch name="saver" label="Data saver mode" />
      <Switch name="beta" label="Beta features" disabled />
    </div>
  );
}
