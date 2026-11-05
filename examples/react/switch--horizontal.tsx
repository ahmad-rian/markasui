import { Switch } from "../../components/switch/Switch";

export default function SwitchHorizontalExample() {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-3">
      <Switch name="autoplay" label="Autoplay" defaultChecked />
      <Switch name="captions" label="Captions" />
      <Switch name="loop" label="Loop" />
    </div>
  );
}
