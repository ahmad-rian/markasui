import { UnderlineLink } from "../../components/underline-link/UnderlineLink";

export default function UnderlineLinkNavbarExample() {
  return (
    <header className="flex items-center justify-between rounded-xl border border-line bg-surface px-5 py-3">
      <span className="text-sm font-semibold text-ink">Kopi Kita</span>
      <nav
        aria-label="Main"
        className="flex items-center gap-5 text-sm font-medium text-muted"
      >
        <UnderlineLink
          href="#"
          variant="comes-in-goes-out"
          active
          className="text-ink"
        >
          Menu
        </UnderlineLink>
        <UnderlineLink
          href="#"
          variant="comes-in-goes-out"
          className="hover:text-ink"
        >
          Outlets
        </UnderlineLink>
        <UnderlineLink
          href="#"
          variant="comes-in-goes-out"
          className="hover:text-ink"
        >
          Rewards
        </UnderlineLink>
        <UnderlineLink
          href="#"
          variant="comes-in-goes-out"
          className="hover:text-ink"
        >
          About
        </UnderlineLink>
      </nav>
    </header>
  );
}
