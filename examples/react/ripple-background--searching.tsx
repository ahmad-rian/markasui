import { Button } from "../../components/button/Button";
import { RippleBackground } from "../../components/ripple-background/RippleBackground";

export default function RippleBackgroundSearchingExample() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <RippleBackground
        color="success"
        size={72}
        gap={48}
        className="grid h-44 place-items-center bg-surface"
      >
        <span className="grid size-14 place-items-center rounded-full bg-success/10 text-success">
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
            <path d="M5 12.5a10 10 0 0 1 14 0M8 15.5a6 6 0 0 1 8 0" />
            <path d="M12 19h.01" />
          </svg>
        </span>
      </RippleBackground>
      <div className="grid justify-items-center gap-3 px-6 pb-6 text-center">
        <div className="grid gap-1" role="status">
          <h3 className="text-base font-semibold text-ink">
            Looking for nearby devices
          </h3>
          <p className="text-sm text-muted">
            Keep your phone unlocked and close to this screen.
          </p>
        </div>
        <Button variant="secondary" size="sm">
          Cancel
        </Button>
      </div>
    </div>
  );
}
