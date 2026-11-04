import { Select } from "../../components/select/Select";

export default function SelectFixture() {
  return (
    <div className="grid gap-4">
      <Select
        name="city"
        label="City"
        hint="Choose your city."
        defaultValue="bandung"
      >
        <option value="jakarta">Jakarta</option>
        <option value="bandung">Bandung</option>
        <option value="surabaya">Surabaya</option>
      </Select>
      <Select name="role" label="Role" error="Role is required.">
        <option value="">Choose a role</option>
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
      </Select>
      <Select name="plan" label="Plan" disabled>
        <option value="free">Free</option>
      </Select>
    </div>
  );
}
