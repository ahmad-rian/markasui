import { Label } from "../../components/label/Label";

const row = "flex items-center gap-2";
const box = "size-4 accent-primary";

export default function LabelCheckboxExample() {
  return (
    <div className="grid gap-3">
      <Label required className={row}>
        <input type="checkbox" name="terms" required className={box} />I accept
        the terms of service
      </Label>
      <Label optional className={row}>
        <input type="checkbox" name="newsletter" className={box} />
        Send me the monthly newsletter
      </Label>
    </div>
  );
}
