import { Screensaver } from "../../components/screensaver/Screensaver";

const card =
  "flex items-center gap-5 rounded-xl border border-dashed border-line bg-surface p-5";
const area = "h-32 w-36 shrink-0 rounded-lg bg-subtle";
const box =
  "grid size-12 place-items-center rounded-xl bg-surface text-ink shadow-overlay";
const icon = "size-6";
const title = "text-base font-semibold text-ink";
const text = "mt-1 text-sm text-muted";

export default function ScreensaverEmptyExample() {
  return (
    <div className={card}>
      <Screensaver
        effect="squash"
        speed={50}
        seed={2}
        className={area}
        aria-hidden="true"
      >
        <span className={box}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={icon}
          >
            <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"></path>
            <path d="m4 7.5 8 4.5 8-4.5"></path>
            <path d="M12 12v9"></path>
          </svg>
        </span>
      </Screensaver>
      <div>
        <p className={title}>No orders yet</p>
        <p className={text}>
          When customers check out, their orders show up here.
        </p>
      </div>
    </div>
  );
}
