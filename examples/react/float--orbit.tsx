import { Float } from "../../components/float/Float";

const stage =
  "relative grid h-72 place-items-center overflow-hidden rounded-xl border border-line bg-surface";
const layer = "absolute inset-0";
const avatarA =
  "absolute top-[14%] left-[18%] grid size-12 place-items-center rounded-full bg-primary-soft text-sm font-semibold text-ink";
const avatarB =
  "absolute top-[10%] right-[20%] grid size-10 place-items-center rounded-full bg-success/15 text-sm font-semibold text-ink";
const avatarC =
  "absolute bottom-[16%] left-[12%] grid size-10 place-items-center rounded-full bg-warning/15 text-sm font-semibold text-ink";
const avatarD =
  "absolute right-[14%] bottom-[18%] grid size-14 place-items-center rounded-full bg-primary text-sm font-semibold text-on-primary";
const avatarE =
  "absolute top-[44%] right-[6%] grid size-9 place-items-center rounded-full bg-danger/10 text-xs font-semibold text-ink";
const copy = "relative text-center";
const count = "text-3xl font-semibold text-ink tabular-nums";
const label = "text-sm text-muted";

export default function FloatOrbitExample() {
  return (
    <div className={stage}>
      <Float
        motion="orbit"
        amplitude={8}
        duration={9}
        seed={2}
        entrance={true}
        aria-hidden="true"
        className={layer}
      >
        <span className={avatarA}>RP</span>
        <span className={avatarB}>BS</span>
        <span className={avatarC}>SA</span>
        <span className={avatarD}>DP</span>
        <span className={avatarE}>NW</span>
      </Float>
      <div className={copy}>
        <p className={count}>2,400</p>
        <p className={label}>makers across Indonesia</p>
      </div>
    </div>
  );
}
