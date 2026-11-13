import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  signal,
} from "@angular/core";

const base =
  "group inline-flex shrink-0 items-center justify-center gap-2 font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50";
const variants = {
  ghost: "text-ink hover:bg-subtle",
  outline: "border border-line bg-surface text-ink hover:bg-subtle",
  solid: "bg-primary text-on-primary hover:bg-primary-strong",
};
/** Per size: icon-only button, button with text, icon. */
const sizes = {
  sm: ["size-8 rounded-md", "h-8 rounded-md px-3 text-sm", "size-4"],
  md: ["size-10 rounded-lg", "h-10 rounded-lg px-4 text-sm", "size-5"],
  lg: ["size-12 rounded-lg", "h-12 rounded-lg px-6 text-base", "size-6"],
};
/** Parts scale and rotate around the icon center. */
const icon = "**:origin-[12px_12px]";
/** Moon and stars start hidden (the light look); the keyframes show them. */
const hidden = "opacity-0";
const rays = [0, 45, 90, 135, 180, 225, 270, 315];
const moonPath = "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z";
const starPaths = ["M18 2v4m-2-2h4", "M21.5 9h0", "M14.5 1.5h0"];
const srOnly = "sr-only";

/**
 * Keyframes from light to dark; dark to light plays them in reverse. Every part that
 * differs between the themes is animated, and the last frame stays (fill both).
 * Each entry: "selector inside the button|property:value,value;property:...|stagger ms".
 */
const turn = "perspective(60px) rotateY(";
const moves = {
  rotate: [
    "g|rotate:0deg,1turn;scale:1,1.15,0;opacity:1,1,0",
    "g>path|scale:1,1.6,1.6,0",
    "svg>:nth-child(3)|rotate:-1turn,-1turn,0deg;scale:0,0,1;opacity:0,0,1",
  ],
  morph: [
    "g>circle|scale:1,1.6",
    "mask>circle|translate:24px -12px,15.5px -3.5px",
    "g>path|scale:1,0;opacity:1,0|50",
  ],
  flip: [
    `svg|transform:${turn}0),${turn}90deg),${turn}-90deg),${turn}0);translate:0,0 -6px,0 -6px,0;offset:0,.5,.5,1`,
    "g|opacity:1,1,0,0;offset:0,.5,.5,1",
    "svg>:nth-child(3)|opacity:0,0,1,1;offset:0,.5,.5,1",
  ],
  slide: [
    "g|translate:0,0 24px",
    "svg>:nth-child(3)|translate:0 -24px,0 -24px,0,0 4px,0;opacity:1,1",
  ],
  eclipse: [
    "mask>circle|translate:-6px 0,13.5px -1.5px",
    "g>path|scale:1,1.7,.75;opacity:1,.3,.4",
  ],
  spring: [
    "svg|scale:1,.6,1.15,.95,1",
    "g|opacity:1,1,0,0",
    "svg>:nth-child(3)|opacity:0,0,1,1",
    "svg>path~path|scale:0,1.5,.7,1;opacity:0,1,.3,1|120",
  ],
};
const DURATION = 650;
/** Indexed by toDark + 2 for a demo, which plays there and back. */
const directions = [
  "reverse",
  "normal",
  "alternate-reverse",
  "alternate",
] as const;
const SET = 0;
const SWITCH = 1;
const DEMO = 2;

type Theme = "light" | "dark";
type Animation = keyof typeof moves;

const html = () => document.documentElement;
const pageTheme = (): Theme =>
  html().classList.contains("dark") ? "dark" : "light";
const setDark = (theme: Theme) =>
  html().classList.toggle("dark", theme === "dark");

/** SET jumps to the theme's look, SWITCH animates to it, DEMO plays there and back. */
function play(
  button: HTMLElement,
  animation: Animation,
  toDark: boolean,
  mode: number,
) {
  const still =
    mode === SET ||
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  for (const move of moves[animation]) {
    const [selector = "", frames = "", stagger = 0] = move.split("|");
    const keyframes = Object.fromEntries(
      frames.split(";").map((frame) => {
        const [property, values = ""] = frame.split(":");
        return [property, values.split(",")];
      }),
    ) as Parameters<HTMLElement["animate"]>[0];
    button.querySelectorAll(selector).forEach((part, i) =>
      part.animate(keyframes, {
        duration: still ? 0 : +stagger ? DURATION / 2 : DURATION,
        delay: still ? 0 : i * +stagger,
        fill: "both",
        iterations: mode === DEMO ? 2 : 1,
        direction: directions[+toDark + (mode === DEMO ? 2 : 0)],
      }),
    );
  }
}

/** Saved choice first, then a dark class the page already set, then the system setting. */
function readTheme(storageKey: string): Theme {
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(storageKey);
  } catch {
    // Storage blocked: fall back to the page and the system setting.
  }
  if (saved === "light" || saved === "dark") return saved;
  return pageTheme() === "dark" ||
    window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export type ThemeToggleAnimation = Animation;
export type ThemeToggleVariant = keyof typeof variants;
export type ThemeToggleSize = keyof typeof sizes;

let nextId = 0;

/**
 * Attribute selector on the native button: disabled, aria-*, and the user's class stay on the
 * button itself. Follows the html dark class, so every toggle on the page stays in sync.
 */
@Component({
  selector: "button[markas-theme-toggle]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[attr.type]": "type()",
    "[attr.data-state]": "current()",
    "[class]": "classes()",
    "(click)": "toggle($event)",
  },
  template: `
    <svg
      [class]="iconClasses()"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <mask [id]="maskId">
        <rect width="24" height="24" fill="white" />
        <circle cy="12" r="5" fill="black" />
      </mask>
      <g>
        <circle
          cx="12"
          cy="12"
          r="4.5"
          stroke="none"
          [attr.mask]="'url(#' + maskId + ')'"
        />
        @for (deg of rays; track deg) {
          <path [style.rotate]="deg + 'deg'" d="M12 2v2" />
        }
      </g>
      <path [class]="hidden" [attr.d]="moonPath" />
      @for (d of starPaths; track d) {
        <path [class]="hidden" [attr.d]="d" />
      }
    </svg>
    <span [class]="showText() ? '' : srOnly">{{
      current() === "dark" ? lightLabel() : darkLabel()
    }}</span>
  `,
})
export class ThemeToggle {
  readonly animation = input<ThemeToggleAnimation>("rotate");
  readonly variant = input<ThemeToggleVariant>("ghost");
  readonly size = input<ThemeToggleSize>("md");
  /** Controlled theme. Leave empty to read localStorage and the system setting. */
  readonly theme = input<Theme>();
  readonly storageKey = input("markas-theme");
  /** Show the label as visible text next to the icon. */
  readonly showText = input(false, { transform: booleanAttribute });
  readonly lightLabel = input("Switch to light theme");
  readonly darkLabel = input("Switch to dark theme");
  readonly type = input<"button" | "submit" | "reset">("button");
  /** Emits the theme a click asked for. */
  readonly themeChange = output<Theme>();

  protected readonly rays = rays;
  protected readonly hidden = hidden;
  protected readonly moonPath = moonPath;
  protected readonly starPaths = starPaths;
  protected readonly srOnly = srOnly;
  protected readonly maskId = `mask-markas-theme-toggle-${nextId++}`;
  protected readonly current = signal<Theme | undefined>(undefined);
  protected readonly classes = computed(
    () =>
      `${base} ${variants[this.variant()]} ${sizes[this.size()][+this.showText()]}`,
  );
  protected readonly iconClasses = computed(
    () => `${sizes[this.size()][2]} ${icon}`,
  );
  private readonly button = inject<ElementRef<HTMLButtonElement>>(ElementRef);
  /** The theme a click asked for: reaching it animates, any other change jumps. */
  private requested: Theme | undefined;

  constructor() {
    const destroyRef = inject(DestroyRef);
    // Follow the html class, so every toggle on the page and outside changes stay in sync.
    afterRenderEffect(() => {
      // Mount and controlled changes: put the page on the wanted theme. The parent saves a controlled theme.
      const target = this.theme() ?? readTheme(this.storageKey());
      if (target !== pageTheme()) setDark(target);
      this.current.set(pageTheme());
    });
    if (typeof MutationObserver === "function") {
      const observer = new MutationObserver(() =>
        this.current.set(pageTheme()),
      );
      observer.observe(html(), { attributeFilter: ["class"] });
      destroyRef.onDestroy(() => observer.disconnect());
    }
    // Show the theme on the icon: animated after a click, a jump on load or a change made elsewhere.
    afterRenderEffect(() => {
      const shown = this.current();
      const name = this.animation();
      if (!shown) return;
      const mode = shown === this.requested ? SWITCH : SET;
      this.requested = undefined;
      play(this.button.nativeElement, name, shown === "dark", mode);
    });
    // "Play all" demos: document.dispatchEvent(new Event("markas-theme-demo")).
    const demo = () =>
      play(
        this.button.nativeElement,
        this.animation(),
        pageTheme() !== "dark",
        DEMO,
      );
    document.addEventListener("markas-theme-demo", demo);
    destroyRef.onDestroy(() =>
      document.removeEventListener("markas-theme-demo", demo),
    );
  }

  protected toggle(event: MouseEvent) {
    if (event.defaultPrevented) return;
    const next = pageTheme() === "dark" ? "light" : "dark";
    this.requested = next;
    if (this.theme() === undefined) {
      setDark(next);
      try {
        localStorage.setItem(this.storageKey(), next);
      } catch {
        // Storage blocked: the theme still applies until the page closes.
      }
      document.dispatchEvent(
        new CustomEvent("markas-theme-change", { detail: next }),
      );
    }
    this.themeChange.emit(next);
  }
}
