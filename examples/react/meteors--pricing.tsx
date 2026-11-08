import { Button } from "../../components/button/Button";
import { Meteors } from "../../components/meteors/Meteors";

export default function MeteorsPricingExample() {
  return (
    <Meteors
      variant="comet"
      color="warning"
      speed="slow"
      seed={12}
      className="mx-auto max-w-80 rounded-xl border border-line bg-surface p-6"
    >
      <div className="grid gap-4">
        <div className="grid gap-1">
          <h3 className="text-base font-semibold text-ink">Pro</h3>
          <p className="text-sm text-muted">For teams shipping every day.</p>
        </div>
        <p className="text-ink">
          <span className="text-4xl font-semibold tracking-tight">$24</span>
          <span className="text-sm text-muted"> per seat, monthly</span>
        </p>
        <ul className="grid gap-2 text-sm text-ink">
          <li>Unlimited projects</li>
          <li>Preview deploys for every branch</li>
          <li>Priority support</li>
        </ul>
        <Button>Upgrade to Pro</Button>
      </div>
    </Meteors>
  );
}
