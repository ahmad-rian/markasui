import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
  ViewEncapsulation,
} from "@angular/core";

const base = "relative isolate overflow-hidden";
const layer =
  "pointer-events-none absolute inset-0 size-full [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]";
const track = "opacity-15";
const beams = {
  flow: "animate-[markas-beams-flow_var(--markas-beams-duration)_linear_infinite] motion-reduce:animate-none",
  pulse:
    "animate-[markas-beams-pulse_var(--markas-beams-duration)_ease-in-out_infinite] motion-reduce:animate-none",
};
const rainLayer = "pointer-events-none absolute inset-0";
const floor = "absolute inset-x-0 bottom-0 h-px bg-current opacity-30";
const drop =
  "absolute top-0 h-full w-px animate-[markas-beams-fall_var(--markas-beams-duration)_linear_infinite] bg-[linear-gradient(to_bottom,transparent_75%,currentColor)] motion-reduce:animate-none";
const splash =
  "absolute bottom-0 size-10 -translate-x-1/2 translate-y-1/2 animate-[markas-beams-splash_var(--markas-beams-duration)_linear_infinite] rounded-full bg-[radial-gradient(circle,currentColor,transparent_65%)] opacity-0 motion-reduce:animate-none";
const content = "relative";
const colors = {
  muted: "text-muted",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};
const speeds = { slow: "12s", normal: "7s", fast: "4s" };
const keyframes =
  "@keyframes markas-beams-flow{from{stroke-dashoffset:14}to{stroke-dashoffset:-100}}@keyframes markas-beams-pulse{0%,100%{opacity:.1}50%{opacity:.9}}@keyframes markas-beams-fall{0%{translate:0 -100%;opacity:1}70%{translate:0 0;opacity:1}71%,100%{translate:0 0;opacity:0}}@keyframes markas-beams-splash{0%,69%{opacity:0;scale:.3}72%{opacity:1}100%{opacity:0;scale:1.6}}";
const MAX_BEAMS = 16;
const BEAM_DELAY_MS = 900;
const RATES = ["1", "1.3", "0.8", "1.15", "0.9"];

export type BackgroundBeamsVariant = "flow" | "pulse" | "collide";
export type BackgroundBeamsSpeed = keyof typeof speeds;
export type BackgroundBeamsColor = keyof typeof colors;

const clamp = (count: number) =>
  Math.max(0, Math.min(Math.trunc(count), MAX_BEAMS));

/** Kurva ke-i di kanvas 800x400, menyapu dari kiri atas ke kanan bawah. Bilangan bulat saja. */
function makeCurves(variant: BackgroundBeamsVariant, count: number) {
  const total = clamp(count);
  return Array.from({ length: total }, (_, index) => {
    const shift = Math.floor((index * 640) / Math.max(1, total));
    const bend = (index % 3) * 30;
    const delay = `animation-delay:${index * -BEAM_DELAY_MS}ms`;
    return {
      d: `M ${shift - 200} -20 C ${shift} ${120 + bend}, ${shift + 160} ${260 - bend}, ${shift + 620} 420`,
      style:
        variant === "pulse"
          ? `opacity:${((index % 4) + 3) / 10};${delay}`
          : `stroke-dashoffset:${-((index * 37) % 90)};${delay}`,
    };
  });
}

/** Berkas vertikal ke-i: posisi, tinggi awal, laju, dan jeda dari rumus supaya semua framework sama. */
function makeDrops(count: number) {
  const total = clamp(count);
  return Array.from({ length: total }, (_, index) => {
    const left = `left:${(Math.floor(((2 * index + 1) * 500) / Math.max(1, total)) + ((index * 37) % 11) - 5) / 10}%`;
    const timing = `animation-duration:calc(var(--markas-beams-duration) * ${RATES[index % RATES.length]});animation-delay:${index * -BEAM_DELAY_MS}ms`;
    return {
      drop: `${timing};${left};translate:0 -${(index * 23) % 80}%`,
      splash: `${timing};${left}`,
    };
  });
}

/**
 * Attribute selector on a native div: the user's class, style, and attributes stay on the
 * root. The keyframes are a global style, so encapsulation is off.
 */
@Component({
  selector: "div[markas-background-beams]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [keyframes],
  host: {
    "[class]": "base",
    "[style.--markas-beams-duration]": "duration()",
  },
  template: `
    @if (variant() === "collide") {
      <div aria-hidden="true" [class]="layerClasses(rainLayer)">
        <span [class]="floor"></span>
        @for (item of drops(); track $index) {
          <span>
            <span [class]="drop" [style]="item.drop"></span>
            <span [class]="splash" [style]="item.splash"></span>
          </span>
        }
      </div>
    } @else {
      <svg
        aria-hidden="true"
        [class]="layerClasses(layer)"
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
      >
        @for (item of curves(); track $index) {
          <g>
            <path [class]="track" [attr.d]="item.d" stroke-width="1" />
            <path
              [class]="beamClasses()"
              [attr.d]="item.d"
              stroke-width="2"
              pathLength="100"
              [attr.stroke-dasharray]="variant() === 'flow' ? '14 186' : null"
              [style]="item.style"
            />
          </g>
        }
      </svg>
    }
    <div [class]="content"><ng-content /></div>
  `,
})
export class BackgroundBeams {
  readonly variant = input<BackgroundBeamsVariant>("flow");
  readonly count = input(8, { transform: numberAttribute });
  readonly speed = input<BackgroundBeamsSpeed>("normal");
  readonly color = input<BackgroundBeamsColor>("primary");

  protected readonly base = base;
  protected readonly layer = layer;
  protected readonly rainLayer = rainLayer;
  protected readonly track = track;
  protected readonly floor = floor;
  protected readonly drop = drop;
  protected readonly splash = splash;
  protected readonly content = content;
  protected readonly duration = computed(() => speeds[this.speed()]);
  protected readonly beamClasses = computed(() =>
    this.variant() === "pulse" ? beams.pulse : beams.flow,
  );
  protected readonly curves = computed(() => {
    const variant = this.variant();
    return variant === "collide" ? [] : makeCurves(variant, this.count());
  });
  protected readonly drops = computed(() =>
    this.variant() === "collide" ? makeDrops(this.count()) : [],
  );

  protected layerClasses(layerClass: string) {
    return `${layerClass} ${colors[this.color()]}`;
  }
}
