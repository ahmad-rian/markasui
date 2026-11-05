import { Select } from "../../components/select/Select";

export default function SelectPlaceholderExample() {
  return (
    <div className="grid gap-4">
      <Select
        name="country"
        label="Country"
        hint="Used to calculate tax on your invoices."
        defaultValue=""
      >
        <option value="" disabled>
          Select a country
        </option>
        <option value="id">Indonesia</option>
        <option value="my">Malaysia</option>
        <option value="sg">Singapore</option>
      </Select>
      <Select
        name="industry"
        label="Industry"
        error="Choose the industry that fits best."
        defaultValue=""
      >
        <option value="" disabled>
          Select an industry
        </option>
        <option value="education">Education</option>
        <option value="finance">Finance</option>
        <option value="retail">Retail</option>
      </Select>
    </div>
  );
}
