import { AuroraBackground } from "../../components/aurora-background/AuroraBackground";
import { Button } from "../../components/button/Button";

export default function AuroraBackgroundPricingExample() {
  return (
    <AuroraBackground
      color="warning"
      speed="slow"
      className="rounded-xl border border-line bg-surface p-6"
    >
      <div className="grid gap-4">
        <div className="grid gap-1.5">
          <p className="text-sm font-medium text-muted">Pro plan</p>
          <p className="flex items-baseline gap-1">
            <span className="text-4xl font-semibold text-ink">$24</span>
            <span className="text-sm text-muted">per seat / month</span>
          </p>
          <p className="text-sm text-muted">
            Unlimited projects, priority support, and audit logs.
          </p>
        </div>
        <Button className="w-full">Upgrade to Pro</Button>
      </div>
    </AuroraBackground>
  );
}
