import { BackgroundLines } from "../../components/background-lines/BackgroundLines";
import { Button } from "../../components/button/Button";

export default function BackgroundLinesCtaExample() {
  return (
    <BackgroundLines
      color="success"
      count={8}
      speed="fast"
      className="rounded-xl border border-line bg-surface p-6"
    >
      <div className="grid gap-3">
        <h3 className="text-2xl font-semibold text-ink">
          Your first month is on us
        </h3>
        <p className="text-sm text-muted">
          Invite the whole team and keep every project in sync from day one.
        </p>
        <div className="flex gap-2">
          <Button>Start free trial</Button>
          <Button variant="ghost">Talk to sales</Button>
        </div>
      </div>
    </BackgroundLines>
  );
}
