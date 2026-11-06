import { useState } from "react";
import {
  DynamicIsland,
  type DynamicIslandState,
} from "../../components/dynamic-island/DynamicIsland";

const panel = "grid gap-4";
const stage =
  "relative h-[220px] overflow-hidden rounded-[2rem] border border-line bg-surface";
const top = "absolute inset-x-0 top-3";
const clock = "pt-24 text-center text-5xl font-semibold text-ink tabular-nums";
const date = "pt-1 text-center text-sm text-muted";
const controls = "flex justify-center gap-1.5";
const demoButton =
  "h-8 rounded-full border border-line bg-surface px-3 text-sm font-medium text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary motion-reduce:transition-none";
const timerIcon = "size-4 text-warning";
const timerText = "text-warning tabular-nums";
const card = "flex h-full flex-col justify-between";
const cardHead = "flex items-center gap-3";
const badge =
  "grid size-11 place-items-center rounded-full bg-warning/15 text-warning";
const badgeIcon = "size-5";
const label = "text-xs text-muted";
const big = "text-2xl leading-tight font-semibold tabular-nums";
const actions = "grid grid-cols-2 gap-2";
const soft =
  "h-9 rounded-full bg-subtle text-sm font-medium text-ink transition-colors duration-150 ease-out hover:bg-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const stop =
  "h-9 rounded-full bg-danger/15 text-sm font-medium text-danger transition-colors duration-150 ease-out hover:bg-danger/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";

const TIMER = "M12 8v5l3 2M9 2h6M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16z";
const states: { value: DynamicIslandState; label: string }[] = [
  { value: "idle", label: "Idle" },
  { value: "compact", label: "Compact" },
  { value: "expanded", label: "Expanded" },
];

const Icon = ({ className }: { className: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d={TIMER} />
  </svg>
);

export default function DynamicIslandExample() {
  const [island, setIsland] = useState<DynamicIslandState>("compact");
  return (
    <div className={panel}>
      <div className={stage}>
        <div className={top}>
          <DynamicIsland
            state={island}
            announcements={{
              compact: "Focus timer running",
              expanded: "Focus timer, 12 minutes 48 seconds left",
            }}
            leading={<Icon className={timerIcon} />}
            trailing={<span className={timerText}>12:48</span>}
            expanded={
              <div className={card}>
                <div className={cardHead}>
                  <span className={badge}>
                    <Icon className={badgeIcon} />
                  </span>
                  <div>
                    <p className={label}>Focus timer</p>
                    <p className={big}>12:48</p>
                  </div>
                </div>
                <div className={actions}>
                  <button
                    type="button"
                    className={soft}
                    onClick={() => setIsland("compact")}
                  >
                    Minimize
                  </button>
                  <button
                    type="button"
                    className={stop}
                    onClick={() => setIsland("idle")}
                  >
                    End
                  </button>
                </div>
              </div>
            }
          />
        </div>
        <p className={clock}>9:41</p>
        <p className={date}>Wednesday, 5 November</p>
      </div>
      <div role="group" aria-label="Island state" className={controls}>
        {states.map((item) => (
          <button
            key={item.value}
            type="button"
            aria-pressed={island === item.value}
            className={demoButton}
            onClick={() => setIsland(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
