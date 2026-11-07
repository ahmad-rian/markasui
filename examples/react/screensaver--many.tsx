import { Screensaver } from "../../components/screensaver/Screensaver";

const card = "rounded-xl border border-line bg-surface p-4";
const head = "flex items-center justify-between text-sm";
const title = "font-semibold text-ink";
const count = "text-muted tabular-nums";
const area = "mt-3 h-52 rounded-lg bg-canvas";
const chip =
  "flex items-center gap-2 rounded-full border border-line bg-surface py-1 pr-3 pl-1.5 text-sm font-medium";
const dot = "size-2.5 rounded-full bg-current";
const name = "text-ink";

export default function ScreensaverManyExample() {
  return (
    <div className={card}>
      <div className={head}>
        <p className={title}>Online now</p>
        <p className={count}>4 people</p>
      </div>
      <Screensaver speed={60} seed={3} className={area}>
        <span className={chip}>
          <span className={dot}></span>
          <span className={name}>Rania Putri</span>
        </span>
        <span className={chip}>
          <span className={dot}></span>
          <span className={name}>Bima Saputra</span>
        </span>
        <span className={chip}>
          <span className={dot}></span>
          <span className={name}>Sekar Ayu</span>
        </span>
        <span className={chip}>
          <span className={dot}></span>
          <span className={name}>Dimas Pratama</span>
        </span>
      </Screensaver>
    </div>
  );
}
