import { Button } from "../../components/button/Button";
import { StackingCards } from "../../components/stacking-cards/StackingCards";

const scroller =
  "h-96 overflow-y-auto rounded-xl border border-line bg-canvas px-4 pb-48 focus-visible:outline-2 focus-visible:outline-primary";
const intro = "py-6";
const title = "text-lg font-semibold text-ink";
const hint = "mt-1 text-sm text-muted";
const stack = "gap-4";
const card =
  "grid h-52 grid-cols-[1fr_auto] content-between gap-4 rounded-xl border border-line bg-surface p-5";
const featured =
  "grid h-52 grid-cols-[1fr_auto] content-between gap-4 rounded-xl border border-primary bg-surface p-5";
const name = "text-base font-semibold text-ink";
const note = "mt-1 text-sm text-muted";
const price = "text-right text-xl font-semibold text-ink tabular-nums";
const period = "block text-xs font-normal text-muted";
const footer = "col-span-2 flex items-center justify-between gap-3";
const perks = "text-sm text-muted";
const plans = [
  {
    name: "Starter",
    note: "For solo makers",
    price: "Rp 0",
    perks: "1 project, community help",
    featured: false,
  },
  {
    name: "Team",
    note: "For small studios",
    price: "Rp 149.000",
    perks: "10 projects, chat support",
    featured: true,
  },
  {
    name: "Business",
    note: "For growing companies",
    price: "Rp 499.000",
    perks: "Unlimited, priority support",
    featured: false,
  },
];

export default function StackingCardsPricingExample() {
  return (
    <section tabIndex={0} aria-label="Pricing plans" className={scroller}>
      <div className={intro}>
        <h3 className={title}>Simple pricing in Rupiah</h3>
        <p className={hint}>Prices per month, tax included</p>
      </div>
      <StackingCards variant="blur" offset={20} className={stack}>
        {plans.map((plan) => (
          <article key={plan.name} className={plan.featured ? featured : card}>
            <div>
              <h4 className={name}>{plan.name}</h4>
              <p className={note}>{plan.note}</p>
            </div>
            <p className={price}>
              {plan.price}
              <span className={period}>per month</span>
            </p>
            <div className={footer}>
              <p className={perks}>{plan.perks}</p>
              <Button variant={plan.featured ? "primary" : "secondary"}>
                Choose {plan.name}
              </Button>
            </div>
          </article>
        ))}
      </StackingCards>
    </section>
  );
}
