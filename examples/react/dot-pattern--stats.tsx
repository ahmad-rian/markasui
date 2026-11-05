import { DotPattern } from "../../components/dot-pattern/DotPattern";

export default function DotPatternStatsExample() {
  return (
    <DotPattern
      color="success"
      spacing={24}
      dotSize={1.5}
      mask="radial"
      className="rounded-xl border border-line bg-surface px-6 py-8"
    >
      <div className="grid gap-6">
        <h3 className="text-center text-base font-semibold text-ink">
          Trusted by teams in 40 countries
        </h3>
        <dl className="grid grid-cols-3 gap-4 text-center">
          <div className="grid gap-1">
            <dt className="text-xs text-muted">Uptime</dt>
            <dd className="text-2xl font-semibold text-ink">99.99%</dd>
          </div>
          <div className="grid gap-1">
            <dt className="text-xs text-muted">Median latency</dt>
            <dd className="text-2xl font-semibold text-ink">38 ms</dd>
          </div>
          <div className="grid gap-1">
            <dt className="text-xs text-muted">Regions</dt>
            <dd className="text-2xl font-semibold text-ink">24</dd>
          </div>
        </dl>
      </div>
    </DotPattern>
  );
}
