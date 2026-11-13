import { Component } from "@angular/core";
import { Magnet } from "../../components/magnet/magnet.component";

@Component({
  selector: "markas-example",
  imports: [Magnet],
  template: `
    <div [class]="card">
      <div>
        <p [class]="hint">Catch the voucher if you can</p>
        <markas-magnet
          mode="repel"
          [strength]="0.6"
          [radius]="70"
          [class]="voucher"
          >Rp 50.000 off</markas-magnet
        >
      </div>
    </div>
  `,
})
export default class MagnetRepelExample {
  protected readonly card =
    "grid h-56 place-items-center rounded-xl border border-dashed border-line bg-subtle text-center";
  protected readonly hint = "text-sm text-muted";
  protected readonly voucher =
    "mx-auto mt-3 rounded-lg border-2 border-dashed border-success bg-surface px-4 py-2 text-lg font-semibold text-ink tabular-nums";
}
