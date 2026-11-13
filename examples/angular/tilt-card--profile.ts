import { Component } from "@angular/core";
import { TiltCard } from "../../components/tilt-card/tilt-card.component";

@Component({
  selector: "markas-example",
  imports: [TiltCard],
  template: `
    <div [class]="stage">
      <markas-tilt-card [maxAngle]="8" [class]="card">
        <div data-depth="20" aria-hidden="true" [class]="avatar">AS</div>
        <p [class]="name">Adi Santoso</p>
        <p [class]="role">Product designer, Bandung</p>
        <div [class]="stats">
          @for (stat of numbers; track stat.label) {
            <p>
              <span [class]="value">{{ stat.value }}</span
              ><span [class]="label">{{ stat.label }}</span>
            </p>
          }
        </div>
        <button type="button" [class]="button">Follow</button>
      </markas-tilt-card>
    </div>
  `,
})
export default class TiltCardProfileExample {
  protected readonly stage = "grid place-items-center py-6";
  protected readonly card =
    "w-72 border border-line bg-surface p-6 text-center";
  protected readonly avatar =
    "mx-auto grid size-20 place-items-center rounded-full bg-linear-to-br from-success/50 to-primary-soft text-xl font-semibold text-ink";
  protected readonly name = "mt-4 text-base font-semibold text-ink";
  protected readonly role = "text-sm text-muted";
  protected readonly stats =
    "mt-5 grid grid-cols-3 gap-2 border-y border-line py-3";
  protected readonly value =
    "block text-base font-semibold text-ink tabular-nums";
  protected readonly label = "text-xs text-muted";
  protected readonly button =
    "mt-5 inline-flex h-9 w-full items-center justify-center rounded-lg border border-line bg-surface text-sm font-medium text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
  protected readonly numbers = [
    { value: "48", label: "Projects" },
    { value: "1.2k", label: "Followers" },
    { value: "312", label: "Following" },
  ];
}
