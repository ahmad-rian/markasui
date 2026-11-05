import { NumberTicker } from "../../components/number-ticker/NumberTicker";

export default function NumberTickerExample() {
  return (
    <dl className="grid grid-cols-3 gap-4">
      <div>
        <dt className="text-sm text-muted">Downloads</dt>
        <dd className="mt-1 text-2xl font-semibold text-ink">
          <NumberTicker value={12480} />
        </dd>
      </div>
      <div>
        <dt className="text-sm text-muted">Uptime</dt>
        <dd className="mt-1 text-2xl font-semibold text-ink">
          <NumberTicker value={99.9} decimals={1} suffix="%" />
        </dd>
      </div>
      <div>
        <dt className="text-sm text-muted">Revenue</dt>
        <dd className="mt-1 text-2xl font-semibold text-ink">
          <NumberTicker value={84200} prefix="$" />
        </dd>
      </div>
    </dl>
  );
}
