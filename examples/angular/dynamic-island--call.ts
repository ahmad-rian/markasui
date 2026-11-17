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
          [class]="island"
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
              [class]="callIcon"
            >
              <path [attr.d]="PHONE" />
            </svg>
            <span [class]="caller">Rina</span>
          </ng-container>
          <span trailing [class]="timer">0:42</span>
          <div expanded [class]="row">
            <span aria-hidden="true" [class]="avatar">RS</span>
            <div [class]="who">
              <p [class]="label">Mobile</p>
              <p [class]="name">Rina Santoso</p>
            </div>
            <button
              type="button"
              aria-label="Decline"
              [class]="decline"
              (click)="state.set('idle')"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                [class]="icon"
              >
                <path [attr.d]="HANG_UP" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Accept"
              [class]="accept"
              (click)="state.set('compact')"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                [class]="icon"
              >
                <path [attr.d]="PHONE" />
              </svg>
            </button>
          </div>
        </markas-dynamic-island>
      </div>
      <div role="group" aria-label="Call state" [class]="controls">
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
export default class DynamicIslandCallExample {
  protected readonly panel = "grid gap-4";
  protected readonly stage =
    "@container h-[150px] rounded-[2rem] border border-line bg-surface px-3 pt-3";
  protected readonly island = "[--island-expanded-height:4.75rem]";
  protected readonly controls = "flex justify-center gap-1.5";
  protected readonly demoButton =
    "h-8 rounded-full border border-line bg-surface px-3 text-sm font-medium text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary motion-reduce:transition-none";
  protected readonly caller = "text-success";
  protected readonly callIcon = "size-4 text-success";
  protected readonly timer = "text-success tabular-nums";
  protected readonly row = "flex h-full items-center gap-3";
  protected readonly avatar =
    "grid size-11 shrink-0 place-items-center rounded-full bg-subtle text-sm font-semibold";
  protected readonly who = "min-w-0 flex-1";
  protected readonly label = "text-xs text-muted";
  protected readonly name = "truncate text-base font-semibold";
  private readonly round =
    "grid size-11 shrink-0 place-items-center rounded-full text-canvas transition-[scale] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-90 motion-reduce:transition-none";
  protected readonly decline = `${this.round} bg-danger`;
  protected readonly accept = `${this.round} bg-success`;
  protected readonly icon = "size-5";
  protected readonly PHONE =
    "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2";
  protected readonly HANG_UP =
    "M3 15.5c5-4.5 13-4.5 18 0l-1.5 2.5-4-1v-2.5a10 10 0 0 0-7 0V17l-4 1z";
  protected readonly states: { value: DynamicIslandState; label: string }[] = [
    { value: "idle", label: "Idle" },
    { value: "compact", label: "On call" },
    { value: "expanded", label: "Ringing" },
  ];
  protected readonly announcements = {
    expanded: "Incoming call from Rina Santoso",
    compact: "Call connected",
  };
  protected readonly state = signal<DynamicIslandState>("expanded");
}
