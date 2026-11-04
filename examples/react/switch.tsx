import { Switch } from "../../components/switch/Switch";

export default function SwitchFixture() {
  return (
    <div className="grid gap-4">
      <Switch name="notifikasi" label="Notifikasi email" defaultChecked />
      <Switch name="hemat" label="Mode hemat data" />
      <Switch name="beta" label="Fitur beta" disabled />
    </div>
  );
}
