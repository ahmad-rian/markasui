import {
  ChangeDetectionStrategy,
  Component,
  computed,
  type ElementRef,
  input,
  linkedSignal,
  numberAttribute,
  output,
  signal,
  viewChild,
} from "@angular/core";

const root =
  "group/compare relative isolate grid overflow-hidden rounded-xl select-none [&_img]:pointer-events-none";
const layer = "relative col-start-1 row-start-1 min-w-0 bg-surface";
const motion =
  "duration-200 ease-out group-data-dragging/compare:transition-none motion-reduce:transition-none";
const label =
  "pointer-events-none absolute rounded-full border border-line bg-surface/85 px-2.5 py-1 text-xs font-medium text-ink backdrop-blur-sm";
const divider = "pointer-events-none absolute z-10 bg-surface";
const handle =
  "pointer-events-auto absolute top-1/2 left-1/2 grid size-10 -translate-1/2 place-items-center rounded-full border border-line bg-surface text-ink shadow-overlay transition-[scale] duration-150 ease-out group-data-dragging/compare:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const iconClass = "size-5";
const orientations = {
  horizontal: {
    root: "cursor-ew-resize touch-pan-y",
    clip: "[clip-path:inset(0_calc(100%_-_var(--position))_0_0)] transition-[clip-path]",
    divider:
      "inset-y-0 left-(--position) w-0.5 -translate-x-1/2 transition-[left]",
    before: "top-3 left-3",
    after: "top-3 right-3",
    icon: "",
  },
  vertical: {
    root: "cursor-ns-resize touch-pan-x",
    clip: "[clip-path:inset(0_0_calc(100%_-_var(--position))_0)] transition-[clip-path]",
    divider:
      "inset-x-0 top-(--position) h-0.5 -translate-y-1/2 transition-[top]",
    before: "top-3 left-3",
    after: "bottom-3 left-3",
    icon: "rotate-90",
  },
};

const PAGE_STEP = 10;

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");
const clamp = (value: number) => Math.min(100, Math.max(0, value));

export type ImageCompareOrientation = keyof typeof orientations;

/**
 * Slots: an element with the `before` attribute fills the start side (left or top), one with
 * `after` the end side. Supports [(position)]. The host stays out of layout; the user's class
 * lands on the group.
 */
@Component({
  selector: "markas-image-compare",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents", "[attr.aria-label]": "null" },
  template: `
    <div
      role="group"
      [attr.aria-label]="ariaLabel()"
      [attr.data-orientation]="orientation()"
      [attr.data-dragging]="dragging() ? '' : null"
      [class]="classes()"
      [style.--position]="current() + '%'"
      (pointerdown)="onPointerDown($event)"
      (pointermove)="onPointerMove($event)"
      (pointerup)="release()"
      (pointercancel)="release()"
    >
      <div [class]="layer">
        <ng-content select="[after]" />
        <span [class]="afterClass()">{{ afterLabel() }}</span>
      </div>
      <div [class]="clipClass()">
        <ng-content select="[before]" />
        <span [class]="beforeClass()">{{ beforeLabel() }}</span>
      </div>
      <div [class]="dividerClass()">
        <div
          #handleEl
          role="slider"
          tabindex="0"
          [attr.aria-label]="sliderLabel()"
          [attr.aria-orientation]="orientation()"
          aria-valuemin="0"
          aria-valuemax="100"
          [attr.aria-valuenow]="rounded()"
          [attr.aria-valuetext]="rounded() + '%'"
          [class]="handle"
          (keydown)="onKeyDown($event)"
        >
          <svg
            [class]="iconClasses()"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </div>
      </div>
    </div>
  `,
})
export class ImageCompare {
  readonly orientation = input<ImageCompareOrientation>("horizontal");
  /** Divider position in percent, measured from the start (left or top). */
  readonly position = input(50, { transform: numberAttribute });
  /** Percent moved per arrow key press. */
  readonly step = input(5, { transform: numberAttribute });
  readonly beforeLabel = input("Before");
  readonly afterLabel = input("After");
  readonly sliderLabel = input("Comparison position");
  readonly ariaLabel = input<string>(undefined, { alias: "aria-label" });
  readonly userClass = input("", { alias: "class" });
  readonly positionChange = output<number>();

  protected readonly layer = layer;
  protected readonly handle = handle;
  protected readonly current = linkedSignal(() => clamp(this.position()));
  protected readonly rounded = computed(() => Math.round(this.current()));
  protected readonly dragging = signal(false);
  private readonly o = computed(() => orientations[this.orientation()]);
  protected readonly classes = computed(() =>
    cx(root, this.o().root, this.userClass()),
  );
  protected readonly afterClass = computed(() => cx(label, this.o().after));
  protected readonly beforeClass = computed(() => cx(label, this.o().before));
  protected readonly clipClass = computed(() =>
    cx(layer, this.o().clip, motion),
  );
  protected readonly dividerClass = computed(() =>
    cx(divider, this.o().divider, motion),
  );
  protected readonly iconClasses = computed(() => cx(iconClass, this.o().icon));
  private readonly handleEl =
    viewChild.required<ElementRef<HTMLDivElement>>("handleEl");
  private pressed = false;

  private move(next: number) {
    const value = clamp(next);
    this.current.set(value);
    this.positionChange.emit(value);
  }

  private fromPointer(event: PointerEvent) {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.move(
      this.orientation() === "vertical"
        ? ((event.clientY - rect.top) / rect.height) * 100
        : ((event.clientX - rect.left) / rect.width) * 100,
    );
  }

  protected onPointerDown(event: PointerEvent) {
    if (event.button !== 0) return;
    event.preventDefault();
    this.pressed = true;
    this.handleEl().nativeElement.focus({ preventScroll: true });
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
    this.fromPointer(event);
  }

  protected onPointerMove(event: PointerEvent) {
    if (!this.pressed) return;
    this.dragging.set(true);
    this.fromPointer(event);
  }

  protected release() {
    this.pressed = false;
    this.dragging.set(false);
  }

  protected onKeyDown(event: KeyboardEvent) {
    const flip = this.orientation() === "vertical" ? -1 : 1;
    const at = this.current();
    const step = this.step();
    const moves: Record<string, number> = {
      ArrowRight: at + step,
      ArrowLeft: at - step,
      ArrowUp: at + step * flip,
      ArrowDown: at - step * flip,
      PageUp: at + PAGE_STEP,
      PageDown: at - PAGE_STEP,
      Home: 0,
      End: 100,
    };
    const next = moves[event.key];
    if (next === undefined) return;
    event.preventDefault();
    this.move(next);
  }
}
