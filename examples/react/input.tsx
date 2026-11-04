import { Input } from "../../components/input/Input";

export default function InputFixture() {
  return (
    <div className="grid gap-4">
      <Input
        name="name"
        label="Full name"
        placeholder="Budi Santoso"
        hint="As shown on your ID"
      />
      <Input
        name="email"
        type="email"
        label="Email"
        defaultValue="budi@"
        error="Enter a valid email address"
      />
      <Input
        name="code"
        label="Invite code"
        defaultValue="MARKAS-2026"
        disabled
      />
    </div>
  );
}
