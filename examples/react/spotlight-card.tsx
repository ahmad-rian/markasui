import { SpotlightCard } from "../../components/spotlight-card/SpotlightCard";

export default function SpotlightCardExample() {
  return (
    <SpotlightCard>
      <div className="p-6">
        <span className="flex size-10 items-center justify-center rounded-lg bg-subtle text-ink">
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M13 3 4 14h7l-1 7 9-11h-7l1-7Z" />
          </svg>
        </span>
        <h3 className="mt-4 text-base font-semibold text-ink">
          Instant previews
        </h3>
        <p className="mt-1 text-sm text-muted">
          Every pull request gets its own preview link, ready before the review
          starts.
        </p>
      </div>
    </SpotlightCard>
  );
}
