import { GithubStarsButton } from "../../components/github-stars-button/GithubStarsButton";

export default function GithubStarsButtonNavbarExample() {
  return (
    <header className="flex items-center justify-between gap-4 rounded-xl border border-line bg-surface px-4 py-3">
      <span className="text-base font-semibold text-ink">Markas</span>
      <nav aria-label="Main" className="flex items-center gap-4 text-sm">
        <a href="#docs" className="text-muted hover:text-ink">
          Docs
        </a>
        <a href="#blocks" className="text-muted hover:text-ink">
          Blocks
        </a>
        <GithubStarsButton
          href="https://github.com/markasui/markasui"
          stars={1240000}
          size="sm"
        >
          Star
        </GithubStarsButton>
      </nav>
    </header>
  );
}
