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
          islandLabel="Now playing"
        >
          <span leading aria-hidden="true" [class]="art"></span>
          <span trailing aria-hidden="true" [class]="bars">
            @for (c of bar; track c) {
              <span [class]="c"></span>
            }
          </span>
          <div expanded [class]="card">
            <div [class]="head">
              <span aria-hidden="true" [class]="bigArt"></span>
              <div [class]="song">
                <p [class]="title">Hujan di Kota</p>
                <p [class]="artist">Nadia Sukma</p>
              </div>
            </div>
            <div>
              <div [class]="track">
                <div [class]="fill"></div>
              </div>
              <p [class]="times">
                <span>1:24</span>
                <span>3:34</span>
              </p>
            </div>
            <div [class]="buttons">
              @for (item of media; track item.label) {
                <button
                  type="button"
                  [attr.aria-label]="item.label"
                  [class]="iconButton"
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
                    <path [attr.d]="item.d" />
                  </svg>
                </button>
              }
            </div>
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
export default class DynamicIslandMusicExample {
  protected readonly panel = "grid gap-4";
  protected readonly stage =
    "@container h-[220px] rounded-[2rem] border border-line bg-surface px-3 pt-3";
  protected readonly island = "[--island-expanded-height:11rem]";
  protected readonly controls = "flex justify-center gap-1.5";
  protected readonly demoButton =
    "h-8 rounded-full border border-line bg-surface px-3 text-sm font-medium text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary motion-reduce:transition-none";
  protected readonly art =
    "size-6 rounded-md bg-linear-to-br from-success to-warning";
  protected readonly bigArt =
    "size-12 shrink-0 rounded-lg bg-linear-to-br from-success to-warning";
  protected readonly bars = "flex h-4 items-end gap-0.5";
  protected readonly bar = [
    "h-2 w-0.5 animate-pulse rounded-full bg-success motion-reduce:animate-none",
    "h-4 w-0.5 animate-pulse rounded-full bg-success [animation-delay:200ms] motion-reduce:animate-none",
    "h-3 w-0.5 animate-pulse rounded-full bg-success [animation-delay:400ms] motion-reduce:animate-none",
    "h-2.5 w-0.5 animate-pulse rounded-full bg-success [animation-delay:600ms] motion-reduce:animate-none",
  ];
  protected readonly card = "grid h-full content-between";
  protected readonly head = "flex items-center gap-3";
  protected readonly song = "min-w-0 flex-1";
  protected readonly title = "truncate text-sm font-semibold";
  protected readonly artist = "truncate text-xs text-muted";
  protected readonly track = "h-1 overflow-hidden rounded-full bg-line";
  protected readonly fill = "h-full w-2/5 rounded-full bg-ink";
  protected readonly times =
    "flex justify-between pt-1 text-[11px] text-muted tabular-nums";
  protected readonly buttons = "flex items-center justify-center gap-6";
  protected readonly iconButton =
    "grid size-9 place-items-center rounded-full transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
  protected readonly icon = "size-5";
  protected readonly media = [
    { label: "Previous", d: "M18 6v12l-9-6zM6 6v12" },
    { label: "Pause", d: "M8 5v14M16 5v14" },
    { label: "Next", d: "M6 6v12l9-6zM18 6v12" },
  ];
  protected readonly states: { value: DynamicIslandState; label: string }[] = [
    { value: "idle", label: "Idle" },
    { value: "compact", label: "Compact" },
    { value: "expanded", label: "Expanded" },
  ];

  protected readonly state = signal<DynamicIslandState>("expanded");
}
