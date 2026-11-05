import { Slider } from "../../components/slider/Slider";

export default function SliderRangeExample() {
  return (
    <div className="grid gap-2">
      <Slider
        name="budget"
        label="Budget"
        max={500}
        step={25}
        defaultValue={250}
      />
      <div className="flex justify-between text-xs text-muted">
        <span>0</span>
        <span>500</span>
      </div>
    </div>
  );
}
