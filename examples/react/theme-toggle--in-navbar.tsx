import { ThemeToggle } from "../../components/theme-toggle/ThemeToggle";

export default function ThemeToggleInNavbarExample() {
  return (
    <header className="flex items-center justify-between gap-4 rounded-xl border border-line bg-surface py-2 pr-2 pl-4">
      <span className="text-sm font-semibold text-ink">Acme</span>
      <nav
        aria-label="Main"
        className="flex items-center gap-4 text-sm text-muted"
      >
        <a href="#docs" className="hover:text-ink">
          Docs
        </a>
        <a href="#pricing" className="hover:text-ink">
          Pricing
        </a>
        <a href="#blog" className="hover:text-ink">
          Blog
        </a>
      </nav>
      <ThemeToggle size="sm" animation="eclipse" />
    </header>
  );
}
