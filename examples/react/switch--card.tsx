import { Switch } from "../../components/switch/Switch";

export default function SwitchCardExample() {
  return (
    <div className="flex items-start gap-4 rounded-lg border border-line bg-surface p-4 transition-colors duration-150 ease-out has-checked:border-primary motion-reduce:transition-none">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
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
          <path d="M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6l-7-3z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </span>
      <div className="grid flex-1 gap-0.5">
        <p className="text-sm font-medium text-ink">
          Two-factor authentication
        </p>
        <p className="text-sm text-muted">
          Ask for a code from your authenticator app each time you sign in.
        </p>
      </div>
      <Switch
        name="two_factor"
        aria-label="Two-factor authentication"
        defaultChecked
      />
    </div>
  );
}
