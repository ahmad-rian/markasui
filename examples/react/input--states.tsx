import { Input } from "../../components/input/Input";

export default function InputStatesExample() {
  return (
    <div className="grid gap-4">
      <Input
        name="username"
        label="Username"
        defaultValue="budi.santoso"
        hint="Letters, numbers, and dots only."
      />
      <Input
        name="email"
        type="email"
        label="Email"
        defaultValue="budi@markas"
        error="Enter a valid email address."
      />
      <Input
        name="api_key"
        label="API key"
        defaultValue="mk_live_4f8a2c91"
        readOnly
      />
      <Input
        name="workspace"
        label="Workspace"
        defaultValue="MarkasUI"
        disabled
      />
    </div>
  );
}
