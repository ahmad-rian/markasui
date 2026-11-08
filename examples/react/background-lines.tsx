import { BackgroundLines } from "../../components/background-lines/BackgroundLines";
import { Button } from "../../components/button/Button";

export default function BackgroundLinesFixture() {
  return (
    <BackgroundLines className="rounded-xl border border-line bg-surface px-6 py-16">
      <div className="grid justify-items-center gap-4 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-ink">
          Ideas in motion
        </h2>
        <p className="max-w-72 text-sm text-muted">
          Sketch, review, and ship product updates in one calm workspace.
        </p>
        <Button>Start sketching</Button>
      </div>
    </BackgroundLines>
  );
}
