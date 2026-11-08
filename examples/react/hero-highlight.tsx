import { Button } from "../../components/button/Button";
import { HeroHighlight } from "../../components/hero-highlight/HeroHighlight";

export default function HeroHighlightFixture() {
  return (
    <HeroHighlight className="rounded-xl border border-line bg-surface px-6 py-14">
      <div className="grid justify-items-center gap-4 text-center">
        <h2 className="max-w-96 text-3xl leading-snug font-semibold tracking-tight text-balance text-ink">
          Stop guessing. <mark>Start measuring</mark> what users love.
        </h2>
        <p className="max-w-80 text-sm text-muted">
          Product analytics that answer real questions in seconds, not sprints.
        </p>
        <div className="flex gap-2">
          <Button>Start free trial</Button>
          <Button variant="ghost">Watch demo</Button>
        </div>
      </div>
    </HeroHighlight>
  );
}
