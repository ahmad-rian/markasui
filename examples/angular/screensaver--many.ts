import { Component } from "@angular/core";
import { Screensaver } from "../../components/screensaver/screensaver.component";

@Component({
  selector: "markas-example",
  imports: [Screensaver],
  template: `
    <div [class]="card">
      <div [class]="head">
        <p [class]="title">Online now</p>
        <p [class]="count">4 people</p>
      </div>
      <markas-screensaver [speed]="60" [seed]="3" [class]="area">
        <span [class]="chip"
          ><span [class]="dot"></span
          ><span [class]="name">Rania Putri</span></span
        >
        <span [class]="chip"
          ><span [class]="dot"></span
          ><span [class]="name">Bima Saputra</span></span
        >
        <span [class]="chip"
          ><span [class]="dot"></span
          ><span [class]="name">Sekar Ayu</span></span
        >
        <span [class]="chip"
          ><span [class]="dot"></span
          ><span [class]="name">Dimas Pratama</span></span
        >
      </markas-screensaver>
    </div>
  `,
})
export default class ScreensaverManyExample {
  protected readonly card = "rounded-xl border border-line bg-surface p-4";
  protected readonly head = "flex items-center justify-between text-sm";
  protected readonly title = "font-semibold text-ink";
  protected readonly count = "text-muted tabular-nums";
  protected readonly area = "mt-3 h-52 rounded-lg bg-canvas";
  protected readonly chip =
    "flex items-center gap-2 rounded-full border border-line bg-surface py-1 pr-3 pl-1.5 text-sm font-medium";
  protected readonly dot = "size-2.5 rounded-full bg-current";
  protected readonly name = "text-ink";
}
