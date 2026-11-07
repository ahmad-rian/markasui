import { Float } from "../../components/float/Float";

const stage = "grid place-items-center py-6";
const card = "relative w-72 rounded-xl border border-line bg-surface p-6";
const badgeWrap = "absolute -top-3 right-5";
const badge =
  "inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-on-primary";
const plan = "text-sm font-medium text-muted";
const price = "mt-2 text-3xl font-semibold text-ink tabular-nums";
const period = "text-sm font-normal text-muted";
const list = "mt-4 space-y-2 text-sm text-ink";

export default function FloatPricingExample() {
  return (
    <div className={stage}>
      <div className={card}>
        <Float motion="bob" amplitude={6} duration={3} className={badgeWrap}>
          <span className={badge}>Save 20%</span>
        </Float>
        <p className={plan}>Pro yearly</p>
        <p className={price}>
          Rp 79.000 <span className={period}>/ month</span>
        </p>
        <ul className={list}>
          <li>Unlimited projects</li>
          <li>Priority support in Bahasa Indonesia</li>
          <li>Billed Rp 948.000 a year</li>
        </ul>
      </div>
    </div>
  );
}
