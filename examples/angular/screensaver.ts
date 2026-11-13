import { Component } from "@angular/core";
import { Screensaver } from "../../components/screensaver/screensaver.component";
import { Button } from "../../components/button/button.component";

@Component({
  selector: "markas-example",
  imports: [Screensaver, Button],
  template: `
    <div [class]="card">
      <markas-screensaver [class]="area" aria-hidden="true">
        <span [class]="logo"
          ><svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            [class]="icon"
          >
            <path d="M4 6h16v12H4z"></path>
            <path d="m4 6 8 6 8-6"></path></svg
          >404</span
        >
      </markas-screensaver>
      <p [class]="title">Page not found</p>
      <p [class]="text">
        The link may be old, or the page moved somewhere else.
      </p>
      <button markas-button [class]="action">Back to home</button>
    </div>
  `,
})
export default class ScreensaverExample {
  protected readonly card =
    "rounded-xl border border-line bg-surface p-5 text-center";
  protected readonly area = "h-44 rounded-lg bg-subtle";
  protected readonly logo =
    "flex items-center gap-2 text-3xl font-bold tabular-nums";
  protected readonly icon = "size-8";
  protected readonly title = "mt-5 text-base font-semibold text-ink";
  protected readonly text = "mt-1 text-sm text-muted";
  protected readonly action = "mt-4";
}
