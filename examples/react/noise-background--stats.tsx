import { NoiseBackground } from "../../components/noise-background/NoiseBackground";

const stats = [
  ["12k", "Teams"],
  ["99.98%", "Uptime"],
  ["4.9", "Rating"],
];

export default function NoiseBackgroundStatsExample() {
  return (
    <NoiseBackground
      color="success"
      intensity="low"
      size="fine"
      className="rounded-xl border border-line bg-surface p-6"
    >
      <dl className="grid grid-cols-3 gap-4 text-center">
        {stats.map(([value, label]) => (
          <div key={label} className="grid gap-1">
            <dt className="text-sm text-muted">{label}</dt>
            <dd className="text-2xl font-semibold tracking-tight text-ink">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </NoiseBackground>
  );
}
