import { LetterSwap } from "../../components/letter-swap/LetterSwap";

export default function LetterSwapExample() {
  return (
    <header className="flex items-center justify-between rounded-xl border border-line bg-surface px-5 py-3">
      <span className="text-sm font-semibold text-ink">Markas</span>
      <nav
        aria-label="Main"
        className="flex items-center gap-5 text-sm font-medium text-muted"
      >
        <a
          href="#"
          className="rounded-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <LetterSwap text="Products" />
        </a>
        <a
          href="#"
          className="rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <LetterSwap text="Pricing" />
        </a>
        <a
          href="#"
          className="rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <LetterSwap text="Docs" />
        </a>
        <a
          href="#"
          className="rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <LetterSwap text="Blog" />
        </a>
      </nav>
    </header>
  );
}
