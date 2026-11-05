import { Label } from "../../components/label/Label";

const row = "flex items-center gap-2 font-normal";
const radio = "size-4 accent-primary";

export default function LabelRadioExample() {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 text-sm font-medium text-ink">
        Delivery speed
      </legend>
      <div className="grid gap-3">
        <Label className={row}>
          <input
            type="radio"
            name="speed"
            value="standard"
            defaultChecked
            className={radio}
          />
          Standard, 3 to 5 days
        </Label>
        <Label className={row}>
          <input type="radio" name="speed" value="express" className={radio} />
          Express, next business day
        </Label>
        <Label className={row}>
          <input type="radio" name="speed" value="pickup" className={radio} />
          Pick up in store
        </Label>
      </div>
    </fieldset>
  );
}
