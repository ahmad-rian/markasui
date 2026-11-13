import { Component } from "@angular/core";
import { Screensaver } from "../../components/screensaver/screensaver.component";

@Component({
  selector: "markas-example",
  imports: [Screensaver],
  template: `
    <div [class]="card">
      <markas-screensaver
        effect="squash"
        [speed]="50"
        [seed]="2"
        [class]="area"
        aria-hidden="true"
      >
        <span [class]="box"
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
            <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"></path>
            <path d="m4 7.5 8 4.5 8-4.5"></path>
            <path d="M12 12v9"></path></svg
        ></span>
      </markas-screensaver>
      <div>
        <p [class]="title">No orders yet</p>
        <p [class]="text">
          When customers check out, their orders show up here.
        </p>
      </div>
    </div>
  `,
})
export default class ScreensaverEmptyExample {
  protected readonly card =
    "flex items-center gap-5 rounded-xl border border-dashed border-line bg-surface p-5";
  protected readonly area = "h-32 w-36 shrink-0 rounded-lg bg-subtle";
  protected readonly box =
    "grid size-12 place-items-center rounded-xl bg-surface text-ink shadow-overlay";
  protected readonly icon = "size-6";
  protected readonly title = "text-base font-semibold text-ink";
  protected readonly text = "mt-1 text-sm text-muted";
}
