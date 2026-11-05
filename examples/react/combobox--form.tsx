import { Button } from "../../components/button/Button";
import { Combobox } from "../../components/combobox/Combobox";
import { Input } from "../../components/input/Input";

const cities = [
  { value: "bandung", label: "Bandung" },
  { value: "jakarta", label: "Jakarta" },
  { value: "kuala-lumpur", label: "Kuala Lumpur" },
  { value: "singapore", label: "Singapore" },
  { value: "surabaya", label: "Surabaya" },
];

export default function ComboboxFormExample() {
  return (
    <form className="grid gap-4 rounded-lg border border-line bg-surface p-6">
      <div className="grid gap-1">
        <p className="text-base font-semibold text-ink">Shipping address</p>
        <p className="text-sm text-muted">
          We deliver to most cities in Southeast Asia.
        </p>
      </div>
      <Input
        name="street"
        label="Street address"
        autoComplete="street-address"
      />
      <div className="grid grid-cols-2 gap-4">
        <Combobox
          name="city"
          label="City"
          placeholder="Search cities"
          options={cities}
        />
        <Input
          name="postal_code"
          label="Postal code"
          autoComplete="postal-code"
        />
      </div>
      <Button type="submit" className="w-full">
        Save address
      </Button>
    </form>
  );
}
