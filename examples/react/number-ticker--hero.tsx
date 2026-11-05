import { NumberTicker } from "../../components/number-ticker/NumberTicker";

export default function NumberTickerHeroExample() {
  return (
    <div className="py-4 text-center">
      <p className="text-5xl font-semibold tracking-tight text-ink">
        <NumberTicker value={25000} suffix="+" />
      </p>
      <p className="mt-2 text-sm text-muted">
        teams ship their interfaces with MarkasUI
      </p>
    </div>
  );
}
