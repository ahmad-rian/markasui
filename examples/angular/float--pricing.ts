import { Component } from "@angular/core";
import { Float } from "../../components/float/float.component";

@Component({
  selector: "markas-example",
  imports: [Float],
  template: `
    <div [class]="stage">
      <div [class]="card">
        <markas-float
          motion="bob"
          [amplitude]="6"
          [duration]="3"
          [class]="badgeWrap"
        >
          <span [class]="badge">Save 20%</span>
        </markas-float>
        <p [class]="plan">Pro yearly</p>
        <p [class]="price">Rp 79.000 <span [class]="period">/ month</span></p>
        <ul [class]="list">
          <li>Unlimited projects</li>
          <li>Priority support in Bahasa Indonesia</li>
          <li>Billed Rp 948.000 a year</li>
        </ul>
      </div>
    </div>
  `,
})
export default class FloatPricingExample {
  protected readonly stage = "grid place-items-center py-6";
  protected readonly card =
    "relative w-72 rounded-xl border border-line bg-surface p-6";
  protected readonly badgeWrap = "absolute -top-3 right-5";
  protected readonly badge =
    "inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-on-primary";
  protected readonly plan = "text-sm font-medium text-muted";
  protected readonly price =
    "mt-2 text-3xl font-semibold text-ink tabular-nums";
  protected readonly period = "text-sm font-normal text-muted";
  protected readonly list = "mt-4 space-y-2 text-sm text-ink";
}
