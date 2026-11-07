import { DragElements } from "../../components/drag-elements/DragElements";

const board = "h-72 rounded-xl border border-line bg-subtle";
const card = "w-36 rounded-xl border border-line bg-surface p-4";
const featured = "w-36 rounded-xl bg-primary p-4 text-on-primary";
const plan = "text-sm font-medium";
const price = "mt-2 text-lg font-semibold tabular-nums";
const period = "text-xs opacity-80";

export default function DragElementsPricingExample() {
  return (
    <DragElements
      rotate={5}
      seed={3}
      className={board}
      role="group"
      aria-label="Plans to compare"
    >
      <div data-x="6" data-y="12" className={card}>
        <p className={plan}>Basic</p>
        <p className={price}>Rp 49.000</p>
        <p className={period}>per month</p>
      </div>
      <div data-x="50" data-y="92" className={featured}>
        <p className={plan}>Pro</p>
        <p className={price}>Rp 99.000</p>
        <p className={period}>per month</p>
      </div>
      <div data-x="94" data-y="18" className={card}>
        <p className={plan}>Team</p>
        <p className={price}>Rp 199.000</p>
        <p className={period}>per month</p>
      </div>
    </DragElements>
  );
}
