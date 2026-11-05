import { HoverCard } from "../../components/hover-card/HoverCard";

export default function HoverCardRepositoryExample() {
  return (
    <div className="grid gap-2 rounded-lg border border-line bg-surface p-4">
      <p className="text-sm text-muted">Built on top of</p>
      <div>
        <HoverCard
          content={
            <div className="grid gap-3">
              <div className="grid gap-1">
                <p className="font-medium text-ink">markasui/markasui</p>
                <p className="text-muted">
                  Copy and paste UI components with identical markup in three
                  frameworks.
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted">
                <span className="inline-flex items-center gap-1">
                  <svg
                    className="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z" />
                  </svg>
                  1.2k stars
                </span>
                <span>MIT license</span>
                <span>Updated today</span>
              </div>
            </div>
          }
        >
          <a
            href="https://github.com/markasui/markasui"
            className="rounded-sm text-sm font-medium text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            markasui/markasui
          </a>
        </HoverCard>
      </div>
    </div>
  );
}
