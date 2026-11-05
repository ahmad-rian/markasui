import { Switch } from "../../components/switch/Switch";

export default function SwitchStatesExample() {
  return (
    <div className="grid gap-4">
      <Switch name="wifi" label="Wi-Fi" defaultChecked />
      <Switch name="bluetooth" label="Bluetooth" />
      <Switch name="location" label="Location services" disabled />
      <Switch
        name="find_device"
        label="Find my device"
        defaultChecked
        disabled
      />
    </div>
  );
}
