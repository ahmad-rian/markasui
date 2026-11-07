import { Screensaver } from "../../components/screensaver/Screensaver";
import { Button } from "../../components/button/Button";

const card = "rounded-xl border border-line bg-surface p-5 text-center";
const area = "h-44 rounded-lg bg-subtle";
const logo = "flex items-center gap-2 text-3xl font-bold tabular-nums";
const icon = "size-8";
const title = "mt-5 text-base font-semibold text-ink";
const text = "mt-1 text-sm text-muted";
const action = "mt-4";

export default function ScreensaverExample() {
  return (
    <div className={card}>
      <Screensaver className={area} aria-hidden="true">
        <span className={logo}>
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
            <path d="M4 6h16v12H4z"></path>
            <path d="m4 6 8 6 8-6"></path>
          </svg>
          404
        </span>
      </Screensaver>
      <p className={title}>Page not found</p>
      <p className={text}>
        The link may be old, or the page moved somewhere else.
      </p>
      <Button className={action}>Back to home</Button>
    </div>
  );
}
