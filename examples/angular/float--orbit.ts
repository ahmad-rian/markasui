import { Component } from "@angular/core";
import { Float } from "../../components/float/float.component";

@Component({
  selector: "markas-example",
  imports: [Float],
  template: `
    <div [class]="stage">
      <markas-float
        motion="orbit"
        [amplitude]="8"
        [duration]="9"
        [seed]="2"
        entrance
        aria-hidden="true"
        [class]="layer"
      >
        <span [class]="avatarA">RP</span>
        <span [class]="avatarB">BS</span>
        <span [class]="avatarC">SA</span>
        <span [class]="avatarD">DP</span>
        <span [class]="avatarE">NW</span>
      </markas-float>
      <div [class]="copy">
        <p [class]="count">2,400</p>
        <p [class]="label">makers across Indonesia</p>
      </div>
    </div>
  `,
})
export default class FloatOrbitExample {
  protected readonly stage =
    "relative grid h-72 place-items-center overflow-hidden rounded-xl border border-line bg-surface";
  protected readonly layer = "absolute inset-0";
  protected readonly avatarA =
    "absolute top-[14%] left-[18%] grid size-12 place-items-center rounded-full bg-primary-soft text-sm font-semibold text-ink";
  protected readonly avatarB =
    "absolute top-[10%] right-[20%] grid size-10 place-items-center rounded-full bg-success/15 text-sm font-semibold text-ink";
  protected readonly avatarC =
    "absolute bottom-[16%] left-[12%] grid size-10 place-items-center rounded-full bg-warning/15 text-sm font-semibold text-ink";
  protected readonly avatarD =
    "absolute right-[14%] bottom-[18%] grid size-14 place-items-center rounded-full bg-primary text-sm font-semibold text-on-primary";
  protected readonly avatarE =
    "absolute top-[44%] right-[6%] grid size-9 place-items-center rounded-full bg-danger/10 text-xs font-semibold text-ink";
  protected readonly copy = "relative text-center";
  protected readonly count = "text-3xl font-semibold text-ink tabular-nums";
  protected readonly label = "text-sm text-muted";
}
