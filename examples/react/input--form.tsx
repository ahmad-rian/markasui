import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";

export default function InputFormExample() {
  return (
    <form className="grid gap-4 rounded-lg border border-line bg-surface p-6">
      <div className="grid gap-1">
        <p className="text-base font-semibold text-ink">Create an account</p>
        <p className="text-sm text-muted">
          Start your free 14-day trial. No card required.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input name="first_name" label="First name" autoComplete="given-name" />
        <Input name="last_name" label="Last name" autoComplete="family-name" />
      </div>
      <Input
        name="email"
        type="email"
        label="Work email"
        placeholder="you@company.com"
        autoComplete="email"
      />
      <Input
        name="password"
        type="password"
        label="Password"
        hint="At least 8 characters."
        autoComplete="new-password"
      />
      <Button type="submit" className="w-full">
        Create account
      </Button>
    </form>
  );
}
