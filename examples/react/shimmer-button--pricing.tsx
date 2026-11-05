import { ShimmerButton } from "../../components/shimmer-button/ShimmerButton";

export default function ShimmerButtonPricingExample() {
  return (
    <div className="mx-auto grid w-full max-w-xs gap-5 rounded-xl border border-line bg-surface p-6">
      <div className="grid gap-1">
        <p className="text-sm font-medium text-muted">Pro</p>
        <p className="text-3xl font-semibold text-ink">
          $24<span className="text-sm font-normal text-muted"> / month</span>
        </p>
      </div>
      <ul className="grid gap-2 text-sm text-ink">
        <li>Unlimited projects</li>
        <li>Priority support</li>
        <li>Team roles and audit log</li>
      </ul>
      <ShimmerButton className="w-full">Upgrade to Pro</ShimmerButton>
    </div>
  );
}
