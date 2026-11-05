import { NumberTicker } from "../../components/number-ticker/NumberTicker";

export default function NumberTickerCountdownExample() {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-line bg-surface p-4">
      <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-danger/10 text-xl font-semibold text-danger">
        <NumberTicker value={12} from={100} duration={2500} />
      </div>
      <div>
        <p className="text-sm font-medium text-ink">
          Seats left for the workshop
        </p>
        <p className="mt-0.5 text-sm text-muted">
          Registration closes on 20 November
        </p>
      </div>
    </div>
  );
}
