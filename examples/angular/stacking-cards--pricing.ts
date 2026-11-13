import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { StackingCards } from "../../components/stacking-cards/stacking-cards.component";

@Component({
  selector: "markas-example",
  imports: [Button, StackingCards],
  template: `
    <section tabindex="0" aria-label="Pricing plans" [class]="scroller">
      <div [class]="intro">
        <h3 [class]="title">Simple pricing in Rupiah</h3>
        <p [class]="hint">Prices per month, tax included</p>
      </div>
      <markas-stacking-cards variant="blur" [offset]="20" [class]="stack">
        @for (plan of plans; track plan.name) {
          <article [class]="plan.featured ? featured : card">
            <div>
              <h4 [class]="name">{{ plan.name }}</h4>
              <p [class]="note">{{ plan.note }}</p>
            </div>
            <p [class]="price">
              {{ plan.price }}<span [class]="period">per month</span>
            </p>
            <div [class]="footer">
              <p [class]="perks">{{ plan.perks }}</p>
              <button
                markas-button
                [variant]="plan.featured ? 'primary' : 'secondary'"
              >
                Choose {{ plan.name }}
              </button>
            </div>
          </article>
        }
      </markas-stacking-cards>
    </section>
  `,
})
export default class StackingCardsPricingExample {
  protected readonly scroller =
    "h-96 overflow-y-auto rounded-xl border border-line bg-canvas px-4 pb-48 focus-visible:outline-2 focus-visible:outline-primary";
  protected readonly intro = "py-6";
  protected readonly title = "text-lg font-semibold text-ink";
  protected readonly hint = "mt-1 text-sm text-muted";
  protected readonly stack = "gap-4";
  protected readonly card =
    "grid h-52 grid-cols-[1fr_auto] content-between gap-4 rounded-xl border border-line bg-surface p-5";
  protected readonly featured =
    "grid h-52 grid-cols-[1fr_auto] content-between gap-4 rounded-xl border border-primary bg-surface p-5";
  protected readonly name = "text-base font-semibold text-ink";
  protected readonly note = "mt-1 text-sm text-muted";
  protected readonly price =
    "text-right text-xl font-semibold text-ink tabular-nums";
  protected readonly period = "block text-xs font-normal text-muted";
  protected readonly footer =
    "col-span-2 flex items-center justify-between gap-3";
  protected readonly perks = "text-sm text-muted";
  protected readonly plans = [
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
}
