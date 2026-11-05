import { RadioGroup } from "../../components/radio-group/RadioGroup";

const themes = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];
const sizes = [
  { value: "s", label: "Small" },
  { value: "m", label: "Medium" },
  { value: "l", label: "Large" },
  { value: "xl", label: "Extra large" },
];

export default function RadioGroupHorizontalExample() {
  return (
    <div className="grid gap-6">
      <RadioGroup
        name="theme"
        label="Theme"
        defaultValue="system"
        orientation="horizontal"
        options={themes}
      />
      <RadioGroup
        name="size"
        label="Size"
        defaultValue="m"
        orientation="horizontal"
        options={sizes}
      />
    </div>
  );
}
