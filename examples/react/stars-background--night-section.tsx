import { Button } from "../../components/button/Button";
import { StarsBackground } from "../../components/stars-background/StarsBackground";

export default function StarsBackgroundNightSectionExample() {
  return (
    <StarsBackground
      count={140}
      seed={42}
      className="dark rounded-xl bg-canvas px-6 py-10 text-ink"
    >
      <div className="grid gap-4">
        <h3 className="text-xl font-semibold text-ink">Built for night owls</h3>
        <p className="text-sm text-muted">
          This section stays dark in every theme. Add the dark class to the
          component to keep it that way.
        </p>
        <div className="flex gap-2">
          <Button>Start building</Button>
          <Button variant="ghost">Read the guide</Button>
        </div>
      </div>
    </StarsBackground>
  );
}
