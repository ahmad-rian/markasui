import { Slider } from "../../components/slider/Slider";

export default function SliderFixture() {
  return (
    <div className="grid gap-6">
      <Slider name="volume" label="Volume" defaultValue={60} />
      <Slider
        name="brightness"
        label="Brightness"
        step={10}
        defaultValue={30}
      />
    </div>
  );
}
