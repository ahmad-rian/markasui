import { Button } from "../../components/button/Button";
import { NoiseBackground } from "../../components/noise-background/NoiseBackground";

export default function NoiseBackgroundFixture() {
  return (
    <NoiseBackground
      color="warning"
      className="rounded-xl border border-line bg-surface px-6 py-14"
    >
      <div className="grid gap-4">
        <h2 className="text-3xl font-semibold tracking-tight text-balance text-ink">
          Design tools with a little texture
        </h2>
        <p className="max-w-80 text-sm text-muted">
          Brushes, grain, and paper that make digital work feel made by hand.
        </p>
        <div className="flex gap-2">
          <Button>Download the kit</Button>
          <Button variant="ghost">Browse samples</Button>
        </div>
      </div>
    </NoiseBackground>
  );
}
