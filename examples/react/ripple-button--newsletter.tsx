import { RippleButton } from "../../components/ripple-button/RippleButton";

export default function RippleButtonNewsletterExample() {
  return (
    <form className="grid gap-3 rounded-xl border border-line bg-surface p-6">
      <div className="grid gap-1">
        <p className="text-base font-semibold text-ink">Get the changelog</p>
        <p className="text-sm text-muted">
          One email a month with new components. No spam.
        </p>
      </div>
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          aria-label="Email address"
          placeholder="you@company.com"
          className="h-10 min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 text-sm text-ink placeholder:text-faint"
        />
        <RippleButton type="submit">Subscribe</RippleButton>
      </div>
    </form>
  );
}
