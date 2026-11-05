import { Button } from "../../components/button/Button";
import { RippleBackground } from "../../components/ripple-background/RippleBackground";

export default function RippleBackgroundExample() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <RippleBackground
        size={88}
        gap={56}
        className="grid h-48 place-items-center border-b border-line bg-canvas"
      >
        <span className="grid size-14 place-items-center rounded-full border border-line bg-surface text-ink">
          <svg
            className="size-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M10 14a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1 1" />
            <path d="M14 10a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l1-1" />
          </svg>
        </span>
      </RippleBackground>
      <div className="grid justify-items-center gap-3 p-6 text-center">
        <h2 className="text-xl font-semibold text-ink">
          Connect your favorite tools
        </h2>
        <p className="max-w-72 text-sm text-muted">
          Bring in GitHub, Slack, and Figma. Updates flow both ways.
        </p>
        <Button>Browse integrations</Button>
      </div>
    </div>
  );
}
