import { Input } from "../../components/input/Input";

export default function InputSizesExample() {
  return (
    <div className="grid gap-4">
      <Input
        name="small"
        label="Small"
        placeholder="Search docs"
        className="h-8! text-xs!"
      />
      <Input name="medium" label="Medium" placeholder="Search docs" />
      <Input
        name="large"
        label="Large"
        placeholder="Search docs"
        className="h-12! px-4! text-base!"
      />
    </div>
  );
}
