import { Component } from "@angular/core";
import { Magnet } from "../../components/magnet/magnet.component";
import { Button } from "../../components/button/button.component";

@Component({
  selector: "markas-example",
  imports: [Magnet, Button],
  template: `
    <nav aria-label="Main" [class]="nav">
      <a href="#" [class]="brand">Warung</a>
      <div [class]="links">
        <markas-magnet [strength]="0.25" [radius]="20"
          ><a href="#" [class]="link">Menu</a></markas-magnet
        >
        <markas-magnet [strength]="0.25" [radius]="20"
          ><a href="#" [class]="link">Outlets</a></markas-magnet
        >
        <markas-magnet [strength]="0.25" [radius]="20"
          ><a href="#" [class]="link">About</a></markas-magnet
        >
        <markas-magnet [strength]="0.4" [radius]="40"
          ><button markas-button size="sm">Order</button></markas-magnet
        >
      </div>
    </nav>
  `,
})
export default class MagnetNavbarExample {
  protected readonly nav =
    "flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3";
  protected readonly brand = "text-base font-semibold text-ink";
  protected readonly links = "flex items-center gap-1";
  protected readonly link =
    "block rounded-md px-3 py-1.5 text-sm font-medium text-muted transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
}
