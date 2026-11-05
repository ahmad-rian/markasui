import { SpotlightCard } from "../../components/spotlight-card/SpotlightCard";

const features = ["Unlimited projects", "Preview links", "Priority support"];

export default function SpotlightCardPricingExample() {
  return (
    <SpotlightCard className="mx-auto max-w-xs">
      <div className="p-6">
        <p className="text-sm font-medium text-muted">Pro</p>
        <p className="mt-2 text-ink">
          <span className="text-4xl font-semibold tracking-tight">$24</span>
          <span className="text-sm text-muted"> per month</span>
        </p>
        <ul className="mt-5 space-y-2 text-sm text-ink">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <svg
                className="size-4 text-success"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m5 12 5 5L20 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="mt-6 h-10 w-full rounded-lg bg-primary text-sm font-medium text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Upgrade to Pro
        </button>
      </div>
    </SpotlightCard>
  );
}
