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
        <div [class]="top">
          <markas-dynamic-island
            [state]="island()"
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
                [class]="timerIcon"
              >
                <path [attr.d]="TIMER" />
              </svg>
            </ng-container>
            <span trailing [class]="timerText">12:48</span>
            <div expanded [class]="card">
              <div [class]="cardHead">
                <span [class]="badge">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    [class]="badgeIcon"
                  >
                    <path [attr.d]="TIMER" />
                  </svg>
                </span>
                <div>
                  <p [class]="label">Focus timer</p>
                  <p [class]="big">12:48</p>
                </div>
              </div>
              <div [class]="actions">
                <button
                  type="button"
                  [class]="soft"
                  (click)="island.set('compact')"
                >
                  Minimize
                </button>
                <button
                  type="button"
                  [class]="stop"
                  (click)="island.set('idle')"
                >
                  End
                </button>
              </div>
            </div>
          </markas-dynamic-island>
        </div>
        <p [class]="clock">9:41</p>
        <p [class]="date">Wednesday, 5 November</p>
      </div>
      <div role="group" aria-label="Island state" [class]="controls">
        @for (item of states; track item.value) {
          <button
            type="button"
            [attr.aria-pressed]="island() === item.value"
            [class]="demoButton"
            (click)="island.set(item.value)"
          >
            {{ item.label }}
          </button>
        }
      </div>
    </div>
  `,
})
export default class DynamicIslandExample {
  protected readonly panel = "grid gap-4";
  protected readonly stage =
    "relative h-[220px] overflow-hidden rounded-[2rem] border border-line bg-surface";
  protected readonly top = "@container absolute inset-x-0 top-3 px-3";
  protected readonly clock =
    "pt-24 text-center text-5xl font-semibold text-ink tabular-nums";
  protected readonly date = "pt-1 text-center text-sm text-muted";
  protected readonly controls = "flex justify-center gap-1.5";
  protected readonly demoButton =
    "h-8 rounded-full border border-line bg-surface px-3 text-sm font-medium text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary motion-reduce:transition-none";
  protected readonly timerIcon = "size-4 text-warning";
  protected readonly timerText = "text-warning tabular-nums";
  protected readonly card = "flex h-full flex-col justify-between";
  protected readonly cardHead = "flex items-center gap-3";
  protected readonly badge =
    "grid size-11 place-items-center rounded-full bg-warning/15 text-warning";
  protected readonly badgeIcon = "size-5";
  protected readonly label = "text-xs text-muted";
  protected readonly big = "text-2xl leading-tight font-semibold tabular-nums";
  protected readonly actions = "grid grid-cols-2 gap-2";
  protected readonly soft =
    "h-9 rounded-full bg-subtle text-sm font-medium text-ink transition-colors duration-150 ease-out hover:bg-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
  protected readonly stop =
    "h-9 rounded-full bg-danger/15 text-sm font-medium text-danger transition-colors duration-150 ease-out hover:bg-danger/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
  protected readonly TIMER =
    "M12 8v5l3 2M9 2h6M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16z";
  protected readonly states: { value: DynamicIslandState; label: string }[] = [
    { value: "idle", label: "Idle" },
    { value: "compact", label: "Compact" },
    { value: "expanded", label: "Expanded" },
  ];
  protected readonly announcements = {
    compact: "Focus timer running",
    expanded: "Focus timer, 12 minutes 48 seconds left",
  };
  protected readonly island = signal<DynamicIslandState>("compact");
}
