import { Float } from "../../components/float/Float";

const hero =
  "relative grid h-80 place-items-center overflow-hidden rounded-xl border border-line bg-canvas px-6 text-center";
const layer = "absolute inset-0";
const tileA =
  "absolute top-[12%] left-[10%] grid size-12 place-items-center rounded-xl border border-line bg-surface text-ink shadow-overlay";
const tileB =
  "absolute top-[16%] right-[12%] grid size-12 place-items-center rounded-xl border border-line bg-surface text-ink shadow-overlay";
const tileC =
  "absolute bottom-[14%] left-[16%] grid size-12 place-items-center rounded-xl border border-line bg-surface text-ink shadow-overlay";
const tileD =
  "absolute right-[18%] bottom-[12%] grid size-12 place-items-center rounded-xl border border-line bg-surface text-ink shadow-overlay";
const tileE =
  "absolute top-[46%] left-[4%] grid size-12 place-items-center rounded-xl border border-line bg-surface text-ink shadow-overlay";
const icon = "size-6";
const copy = "relative max-w-64";
const title = "text-2xl font-semibold text-ink";
const text = "mt-2 text-sm text-muted";

export default function FloatExample() {
  return (
    <div className={hero}>
      <Float parallax={14} aria-hidden="true" className={layer}>
        <span className={tileA}>
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
            <path d="m8 8-4 4 4 4"></path>
            <path d="m16 8 4 4-4 4"></path>
          </svg>
        </span>
        <span className={tileB}>
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
            <path d="M12 3 13.9 8.1 19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z"></path>
          </svg>
        </span>
        <span className={tileC}>
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
            <path d="m12 4 8 4-8 4-8-4 8-4Z"></path>
            <path d="m4 12 8 4 8-4"></path>
            <path d="m4 16 8 4 8-4"></path>
          </svg>
        </span>
        <span className={tileD}>
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
            <path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z"></path>
          </svg>
        </span>
        <span className={tileE}>
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
            <path d="m5 3 14 7-6 2-2 6-6-15Z"></path>
          </svg>
        </span>
      </Float>
      <div className={copy}>
        <p className={title}>Ship the idea this week</p>
        <p className={text}>
          Copy a component into Blade, React, or Vue and keep going.
        </p>
      </div>
    </div>
  );
}
