import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { StarsBackground } from "../../components/stars-background/StarsBackground";

export default function StarsBackgroundWaitlistExample() {
  return (
    <StarsBackground
      count={150}
      seed={3}
      color="muted"
      className="rounded-xl border border-line bg-canvas p-6"
    >
      <form className="grid gap-4">
        <div className="grid gap-1.5">
          <h3 className="text-lg font-semibold text-ink">Join the waitlist</h3>
          <p className="text-sm text-muted">
            Be first to try Orbit when invites open this spring.
          </p>
        </div>
        <div className="flex items-end gap-2">
          <Input
            label="Email"
            type="email"
            placeholder="you@company.com"
            className="flex-1"
          />
          <Button type="submit">Request invite</Button>
        </div>
      </form>
    </StarsBackground>
  );
}
