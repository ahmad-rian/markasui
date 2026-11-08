import { Button } from "../../components/button/Button";
import { WavyBackground } from "../../components/wavy-background/WavyBackground";

export default function WavyBackgroundFixture() {
  return (
    <WavyBackground className="rounded-xl border border-line bg-surface px-6 pt-12 pb-32">
      <div className="grid justify-items-center gap-4 text-center">
        <p className="text-sm font-medium text-muted">Release notes, weekly</p>
        <h2 className="text-2xl font-semibold text-balance text-ink">
          Calm releases, every Friday
        </h2>
        <p className="max-w-80 text-sm text-muted">
          Batch your changes, preview them together, and ship without the late
          night pager.
        </p>
        <Button>Start free trial</Button>
      </div>
    </WavyBackground>
  );
}
