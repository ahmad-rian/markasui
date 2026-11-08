import { BackgroundLines } from "../../components/background-lines/BackgroundLines";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";

export default function BackgroundLinesSignInExample() {
  return (
    <BackgroundLines
      variant="lattice"
      color="muted"
      count={16}
      speed="slow"
      className="rounded-xl border border-line bg-canvas px-6 py-10"
    >
      <form className="mx-auto grid max-w-80 gap-4 rounded-xl border border-line bg-surface p-6">
        <div className="grid gap-1">
          <h3 className="text-lg font-semibold text-ink">Sign in</h3>
          <p className="text-sm text-muted">Use your work email to continue.</p>
        </div>
        <Input label="Email" type="email" placeholder="you@company.com" />
        <Button type="submit">Send magic link</Button>
      </form>
    </BackgroundLines>
  );
}
