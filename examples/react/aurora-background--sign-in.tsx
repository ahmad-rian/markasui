import { AuroraBackground } from "../../components/aurora-background/AuroraBackground";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";

export default function AuroraBackgroundSignInExample() {
  return (
    <AuroraBackground className="rounded-xl border border-line bg-canvas px-6 py-10">
      <form className="mx-auto grid max-w-80 gap-4 rounded-xl border border-line bg-surface p-6">
        <div className="grid gap-1">
          <h3 className="text-lg font-semibold text-ink">Welcome back</h3>
          <p className="text-sm text-muted">
            Sign in to continue to your workspace.
          </p>
        </div>
        <Input label="Email" type="email" placeholder="you@company.com" />
        <Input label="Password" type="password" />
        <Button type="submit">Sign in</Button>
      </form>
    </AuroraBackground>
  );
}
