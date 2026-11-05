import { NumberTicker } from "../../components/number-ticker/NumberTicker";

export default function NumberTickerDashboardExample() {
  return (
    <div className="rounded-xl border border-line bg-surface p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted">Monthly revenue</p>
        <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-ink">
          +12.5%
        </span>
      </div>
      <p className="mt-3 text-4xl font-semibold tracking-tight text-ink">
        <NumberTicker value={48920.5} decimals={2} prefix="$" />
      </p>
      <p className="mt-2 text-sm text-muted">
        Compared to $43,480.00 last month
      </p>
    </div>
  );
}
