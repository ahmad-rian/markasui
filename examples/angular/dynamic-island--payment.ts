import { Component, signal } from "@angular/core";
import {
  DynamicIsland,
  type DynamicIslandState,
} from "../../components/dynamic-island/dynamic-island.component";

@Component({
  selector: "markas-example",
  imports: [DynamicIsland],
  template: `
    <div [class]="panel">
      <div [class]="stage">
        <markas-dynamic-island
          [state]="state()"
          [announcements]="announcements"
        >
          <ng-container leading>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              [class]="check"
            >
              <path [attr.d]="CHECK" />
            </svg>
          </ng-container>
          <span trailing [class]="amount">+Rp2,5jt</span>
          <div expanded [class]="card">
            <div>
              <p [class]="label">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  [class]="check"
                >
                  <path [attr.d]="CHECK" />
                </svg>
                Payment received
              </p>
              <p [class]="big">Rp 2.500.000</p>
              <p [class]="from">PT Sinar Jaya, invoice INV-2041</p>
            </div>
            <button type="button" [class]="view">View invoice</button>
          </div>
        </markas-dynamic-island>
      </div>
      <div role="group" aria-label="Island state" [class]="controls">
        @for (item of states; track item.value) {
          <button
            type="button"
            [attr.aria-pressed]="state() === item.value"
            [class]="demoButton"
            (click)="state.set(item.value)"
          >
            {{ item.label }}
          </button>
        }
      </div>
    </div>
  `,
})
export default class DynamicIslandPaymentExample {
  protected readonly panel = "grid gap-4";
  protected readonly stage =
    "h-[190px] rounded-[2rem] border border-line bg-surface pt-3";
  protected readonly controls = "flex justify-center gap-1.5";
  protected readonly demoButton =
    "h-8 rounded-full border border-line bg-surface px-3 text-sm font-medium text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary motion-reduce:transition-none";
  protected readonly check = "size-4 text-success";
  protected readonly amount = "text-success tabular-nums";
  protected readonly card = "grid h-full content-between";
  protected readonly label = "flex items-center gap-1.5 text-xs text-success";
  protected readonly big =
    "pt-1 text-2xl leading-tight font-semibold tabular-nums";
  protected readonly from = "text-xs text-muted";
  protected readonly view =
    "h-9 w-full rounded-full bg-subtle text-sm font-medium text-ink transition-colors duration-150 ease-out hover:bg-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
  protected readonly CHECK =
    "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8 12l3 3 5-6";
  protected readonly states: { value: DynamicIslandState; label: string }[] = [
    { value: "idle", label: "Idle" },
    { value: "compact", label: "Compact" },
    { value: "expanded", label: "Expanded" },
  ];
  protected readonly announcements = {
    compact: "Payment received, Rp 2.500.000",
    expanded:
      "Payment received, Rp 2.500.000 from PT Sinar Jaya for invoice INV-2041",
  };
  protected readonly state = signal<DynamicIslandState>("compact");
}
