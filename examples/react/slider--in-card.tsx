import { Slider } from "../../components/slider/Slider";

export default function SliderInCardExample() {
  return (
    <div className="grid gap-5 rounded-xl border border-line bg-surface p-5">
      <div className="grid gap-1">
        <h3 className="text-base font-medium text-ink">Sound</h3>
        <p className="text-sm text-muted">
          Changes apply to every device on this account.
        </p>
      </div>
      <Slider name="master" label="Master volume" defaultValue={75} />
      <Slider name="music" label="Music" defaultValue={50} />
      <Slider name="effects" label="Effects" defaultValue={20} />
    </div>
  );
}
