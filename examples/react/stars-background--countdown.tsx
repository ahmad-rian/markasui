import { StarsBackground } from "../../components/stars-background/StarsBackground";

export default function StarsBackgroundCountdownExample() {
  return (
    <StarsBackground
      count={60}
      seed={21}
      className="rounded-xl border border-line bg-surface px-6 py-8"
    >
      <div className="grid justify-items-center gap-4 text-center">
        <h3 className="text-base font-semibold text-ink">
          Product launch goes live in
        </h3>
        <dl className="grid grid-cols-3 gap-3">
          <div className="grid min-w-20 gap-1 rounded-lg border border-line bg-surface px-3 py-2">
            <dt className="row-start-2 text-xs text-muted">Days</dt>
            <dd className="text-2xl font-semibold text-ink tabular-nums">02</dd>
          </div>
          <div className="grid min-w-20 gap-1 rounded-lg border border-line bg-surface px-3 py-2">
            <dt className="row-start-2 text-xs text-muted">Hours</dt>
            <dd className="text-2xl font-semibold text-ink tabular-nums">14</dd>
          </div>
          <div className="grid min-w-20 gap-1 rounded-lg border border-line bg-surface px-3 py-2">
            <dt className="row-start-2 text-xs text-muted">Minutes</dt>
            <dd className="text-2xl font-semibold text-ink tabular-nums">36</dd>
          </div>
        </dl>
      </div>
    </StarsBackground>
  );
}
