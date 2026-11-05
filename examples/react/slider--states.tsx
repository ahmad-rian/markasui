import { Slider } from "../../components/slider/Slider";

export default function SliderStatesExample() {
  return (
    <div className="grid gap-6">
      <Slider name="contrast" label="Contrast" defaultValue={40} />
      <Slider
        name="opacity"
        label="Opacity"
        defaultValue={80}
        showValue={false}
      />
      <Slider
        name="quality"
        label="Export quality"
        defaultValue={70}
        disabled
      />
    </div>
  );
}
