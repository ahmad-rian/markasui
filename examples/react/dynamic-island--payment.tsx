import { useState } from "react";
import {
  DynamicIsland,
  type DynamicIslandState,
} from "../../components/dynamic-island/DynamicIsland";

const panel = "grid gap-4";
const stage = "h-[190px] rounded-[2rem] border border-line bg-surface pt-3";
const controls = "flex justify-center gap-1.5";
const demoButton =
  "h-8 rounded-full border border-line bg-surface px-3 text-sm font-medium text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary motion-reduce:transition-none";
const check = "size-4 text-success";
const amount = "text-success tabular-nums";
const card = "grid h-full content-between";
const label = "flex items-center gap-1.5 text-xs text-success";
const big = "pt-1 text-2xl leading-tight font-semibold tabular-nums";
const from = "text-xs text-muted";
const view =
  "h-9 w-full rounded-full bg-subtle text-sm font-medium text-ink transition-colors duration-150 ease-out hover:bg-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";

const CHECK = "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8 12l3 3 5-6";
const states: { value: DynamicIslandState; label: string }[] = [
  { value: "idle", label: "Idle" },
  { value: "compact", label: "Compact" },
  { value: "expanded", label: "Expanded" },
];

const Check = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={check}
  >
    <path d={CHECK} />
  </svg>
);

export default function DynamicIslandPaymentExample() {
  const [state, setState] = useState<DynamicIslandState>("compact");
  return (
    <div className={panel}>
      <div className={stage}>
        <DynamicIsland
          state={state}
          announcements={{
            compact: "Payment received, Rp 2.500.000",
            expanded:
              "Payment received, Rp 2.500.000 from PT Sinar Jaya for invoice INV-2041",
          }}
          leading={<Check />}
          trailing={<span className={amount}>+Rp2,5jt</span>}
          expanded={
            <div className={card}>
              <div>
                <p className={label}>
                  <Check />
                  Payment received
                </p>
                <p className={big}>Rp 2.500.000</p>
                <p className={from}>PT Sinar Jaya, invoice INV-2041</p>
              </div>
              <button type="button" className={view}>
                View invoice
              </button>
            </div>
          }
        />
      </div>
      <div role="group" aria-label="Island state" className={controls}>
        {states.map((item) => (
          <button
            key={item.value}
            type="button"
            aria-pressed={state === item.value}
            className={demoButton}
            onClick={() => setState(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
