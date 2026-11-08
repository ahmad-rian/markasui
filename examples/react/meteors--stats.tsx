import { Meteors } from "../../components/meteors/Meteors";

export default function MeteorsStatsExample() {
  return (
    <Meteors
      count={24}
      speed="fast"
      color="success"
      seed={20}
      className="rounded-xl border border-line bg-surface px-6 py-8"
    >
      <div className="grid gap-5">
        <h3 className="text-base font-semibold text-ink">Last 24 hours</h3>
        <dl className="grid grid-cols-3 gap-3">
          <div className="grid gap-1 rounded-lg border border-line bg-surface p-3">
            <dt className="row-start-2 text-xs text-muted">Deploys</dt>
            <dd className="text-2xl font-semibold text-ink tabular-nums">
              1,284
            </dd>
          </div>
          <div className="grid gap-1 rounded-lg border border-line bg-surface p-3">
            <dt className="row-start-2 text-xs text-muted">Uptime</dt>
            <dd className="text-2xl font-semibold text-ink tabular-nums">
              99.99%
            </dd>
          </div>
          <div className="grid gap-1 rounded-lg border border-line bg-surface p-3">
            <dt className="row-start-2 text-xs text-muted">p95 latency</dt>
            <dd className="text-2xl font-semibold text-ink tabular-nums">
              84ms
            </dd>
          </div>
        </dl>
      </div>
    </Meteors>
  );
}
