import { BackgroundBeams } from "../../components/background-beams/BackgroundBeams";

export default function BackgroundBeamsFeaturesExample() {
  return (
    <BackgroundBeams
      variant="collide"
      count={10}
      className="rounded-xl border border-line bg-surface px-6 pt-8 pb-16"
    >
      <div className="grid gap-6">
        <div className="grid gap-1 text-center">
          <h3 className="text-2xl font-semibold text-ink">Built for impact</h3>
          <p className="text-sm text-muted">
            Every deploy lands safely, no matter how fast you ship.
          </p>
        </div>
        <ul className="grid grid-cols-3 gap-3 text-center">
          <li className="rounded-lg border border-line bg-surface p-3">
            <p className="text-lg font-semibold text-ink">99.99%</p>
            <p className="text-xs text-muted">Uptime</p>
          </li>
          <li className="rounded-lg border border-line bg-surface p-3">
            <p className="text-lg font-semibold text-ink">40 ms</p>
            <p className="text-xs text-muted">Edge latency</p>
          </li>
          <li className="rounded-lg border border-line bg-surface p-3">
            <p className="text-lg font-semibold text-ink">1 click</p>
            <p className="text-xs text-muted">Rollback</p>
          </li>
        </ul>
      </div>
    </BackgroundBeams>
  );
}
