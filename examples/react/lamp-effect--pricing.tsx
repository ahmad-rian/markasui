import { Button } from "../../components/button/Button";
import { LampEffect } from "../../components/lamp-effect/LampEffect";

export default function LampEffectPricingExample() {
  return (
    <LampEffect
      color="success"
      size="sm"
      speed="slow"
      className="dark mx-auto max-w-80 rounded-xl border border-line bg-surface px-6 pt-24 pb-8 text-ink"
    >
      <div className="grid gap-4">
        <div className="grid gap-1 text-center">
          <h3 className="text-sm font-medium text-success">Pro</h3>
          <p className="text-4xl font-semibold tracking-tight text-ink">
            $24
            <span className="text-sm font-normal text-muted"> / month</span>
          </p>
        </div>
        <ul className="grid gap-2 text-sm text-muted">
          <li>Unlimited projects</li>
          <li>Priority support</li>
          <li>Advanced analytics</li>
        </ul>
        <Button>Upgrade to Pro</Button>
      </div>
    </LampEffect>
  );
}
