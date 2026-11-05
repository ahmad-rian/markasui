import { RippleBackground } from "../../components/ripple-background/RippleBackground";

export default function RippleBackgroundInboxExample() {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-line bg-surface p-4">
      <RippleBackground
        rings={3}
        size={40}
        gap={24}
        className="grid size-24 shrink-0 place-items-center rounded-lg bg-canvas"
      >
        <span className="grid size-10 place-items-center rounded-full border border-line bg-surface text-muted">
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
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
        </span>
      </RippleBackground>
      <div className="grid gap-1">
        <h3 className="text-base font-semibold text-ink">Inbox zero</h3>
        <p className="text-sm text-muted">
          New replies will show up here as soon as they arrive.
        </p>
      </div>
    </div>
  );
}
