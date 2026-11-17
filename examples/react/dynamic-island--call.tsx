import { useState } from "react";
import {
  DynamicIsland,
  type DynamicIslandState,
} from "../../components/dynamic-island/DynamicIsland";

const panel = "grid gap-4";
const stage =
  "@container h-[150px] rounded-[2rem] border border-line bg-surface px-3 pt-3";
const island = "[--island-expanded-height:4.75rem]";
const controls = "flex justify-center gap-1.5";
const demoButton =
  "h-8 rounded-full border border-line bg-surface px-3 text-sm font-medium text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary motion-reduce:transition-none";
const caller = "text-success";
const callIcon = "size-4 text-success";
const timer = "text-success tabular-nums";
const row = "flex h-full items-center gap-3";
const avatar =
  "grid size-11 shrink-0 place-items-center rounded-full bg-subtle text-sm font-semibold";
const who = "min-w-0 flex-1";
const label = "text-xs text-muted";
const name = "truncate text-base font-semibold";
const round =
  "grid size-11 shrink-0 place-items-center rounded-full text-canvas transition-[scale] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-90 motion-reduce:transition-none";
const decline = `${round} bg-danger`;
const accept = `${round} bg-success`;
const icon = "size-5";

const PHONE =
  "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2";
const HANG_UP =
  "M3 15.5c5-4.5 13-4.5 18 0l-1.5 2.5-4-1v-2.5a10 10 0 0 0-7 0V17l-4 1z";
const states: { value: DynamicIslandState; label: string }[] = [
  { value: "idle", label: "Idle" },
  { value: "compact", label: "On call" },
  { value: "expanded", label: "Ringing" },
];

const Icon = ({ d, className }: { d: string; className: string }) => (
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
    <path d={d} />
  </svg>
);

export default function DynamicIslandCallExample() {
  const [state, setState] = useState<DynamicIslandState>("expanded");
  return (
    <div className={panel}>
      <div className={stage}>
        <DynamicIsland
          state={state}
          className={island}
          announcements={{
            expanded: "Incoming call from Rina Santoso",
            compact: "Call connected",
          }}
          leading={
            <>
              <Icon d={PHONE} className={callIcon} />
              <span className={caller}>Rina</span>
            </>
          }
          trailing={<span className={timer}>0:42</span>}
          expanded={
            <div className={row}>
              <span aria-hidden="true" className={avatar}>
                RS
              </span>
              <div className={who}>
                <p className={label}>Mobile</p>
                <p className={name}>Rina Santoso</p>
              </div>
              <button
                type="button"
                aria-label="Decline"
                className={decline}
                onClick={() => setState("idle")}
              >
                <Icon d={HANG_UP} className={icon} />
              </button>
              <button
                type="button"
                aria-label="Accept"
                className={accept}
                onClick={() => setState("compact")}
              >
                <Icon d={PHONE} className={icon} />
              </button>
            </div>
          }
        />
      </div>
      <div role="group" aria-label="Call state" className={controls}>
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
