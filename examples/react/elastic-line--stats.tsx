import { ElasticLine } from "../../components/elastic-line/ElasticLine";

const row = "flex rounded-xl border border-line bg-surface py-5";
const stat = "flex-1 text-center";
const value = "text-2xl font-semibold text-ink tabular-nums";
const label = "mt-1 text-sm text-muted";

export default function ElasticLineStatsExample() {
  return (
    <div className={row}>
      <div className={stat}>
        <p className={value}>61</p>
        <p className={label}>Components</p>
      </div>
      <ElasticLine variant="push" orientation="vertical" reach={12} />
      <div className={stat}>
        <p className={value}>3</p>
        <p className={label}>Frameworks</p>
      </div>
      <ElasticLine variant="push" orientation="vertical" reach={12} />
      <div className={stat}>
        <p className={value}>12k</p>
        <p className={label}>Weekly installs</p>
      </div>
    </div>
  );
}
