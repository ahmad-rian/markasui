import { Button } from "../../components/button/Button";
import { GradientBorder } from "../../components/gradient-border/GradientBorder";

export default function GradientBorderFixture() {
  return (
    <GradientBorder className="mx-auto max-w-80">
      <div className="grid gap-3 p-6">
        <h3 className="text-lg font-semibold text-ink">Pro workspace</h3>
        <p className="text-sm text-muted">
          Unlimited projects, priority support, and advanced analytics.
        </p>
        <p className="text-3xl font-bold text-ink">
          $24<span className="text-sm font-normal text-muted"> / month</span>
        </p>
        <Button>Upgrade now</Button>
      </div>
    </GradientBorder>
  );
}
