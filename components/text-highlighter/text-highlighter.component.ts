import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  linkedSignal,
  numberAttribute,
  signal,
} from "@angular/core";

const base =
  "bg-transparent text-ink bg-no-repeat box-decoration-clone [--markas-th-fill:color-mix(in_oklab,var(--markas-th-c)_var(--markas-th-a,28%),transparent)] -mx-[0.12em] px-[0.12em] bg-left [background-size:var(--markas-th-size,0%_100%)] data-[direction=rtl]:bg-right data-[direction=ttb]:bg-top data-[direction=btt]:bg-bottom data-[direction$=b]:[--markas-th-size:100%_0%] data-[state=active]:[background-size:100%_100%] transition-[background-size] ease-out motion-reduce:transition-none motion-reduce:data-[trigger=view]:[background-size:100%_100%] motion-reduce:data-[trigger=auto]:[background-size:100%_100%]";
const variants = {
  solid:
    "rounded-[0.2em] [background-image:linear-gradient(var(--markas-th-fill)_0_0)]",
  marker:
    "rounded-[0.1em_0.5em_0.2em_0.6em] [background-image:linear-gradient(transparent_40%,var(--markas-th-fill)_40%_94%,transparent_94%)]",
  underline:
    "[background-image:linear-gradient(transparent_84%,var(--markas-th-c)_84%)]",
  gradient:
    "rounded-[0.2em] [background-image:linear-gradient(100deg,var(--markas-th-fill),color-mix(in_oklab,var(--markas-th-c2,var(--color-warning))_var(--markas-th-a,28%),transparent))]",
};
const colors = {
  warning:
    "[--markas-th-c:var(--color-warning)] [--markas-th-c2:var(--color-danger)]",
  primary: "[--markas-th-a:16%] [--markas-th-c:var(--color-primary)]",
  "primary-soft":
    "[--markas-th-a:100%] [--markas-th-c:var(--color-primary-soft)]",
  success: "[--markas-th-c:var(--color-success)]",
  danger: "[--markas-th-c:var(--color-danger)]",
};

/** Hover and focus are heard on the closest interactive element (link, button), or on the text itself. */
const TRIGGER = "a, button, label, [tabindex]";
/** The first two events draw the highlight, the last two clear it. */
const EVENTS = ["pointerenter", "focusin", "pointerleave", "focusout"];

export type TextHighlighterTrigger = "view" | "hover" | "auto" | "manual";
export type TextHighlighterDirection = "ltr" | "rtl" | "ttb" | "btt";
export type TextHighlighterVariant = keyof typeof variants;
export type TextHighlighterColor = keyof typeof colors;

/**
 * Attribute selector, so the element you put it on is the highlight (span, strong, mark). That
 * replaces the as prop. For trigger manual, bind active or call animate() and reset() through a
 * template reference: #mark="markasTextHighlighter".
 */
@Component({
  selector: "[markas-text-highlighter]",
  exportAs: "markasTextHighlighter",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[attr.data-state]": "on() ? 'active' : 'inactive'",
    "[attr.data-direction]": "override() ?? direction()",
    "[attr.data-trigger]": "trigger()",
    "[class]": "classes()",
    "[style.transition-duration.ms]": "duration()",
    "[style.transition-delay.ms]": "delay()",
  },
  template: `<ng-content />`,
})
export class TextHighlighter {
  readonly trigger = input<TextHighlighterTrigger>("view");
  readonly direction = input<TextHighlighterDirection>("ltr");
  readonly variant = input<TextHighlighterVariant>("solid");
  readonly color = input<TextHighlighterColor>("warning");
  /** Highlight state for trigger manual. */
  readonly active = input(false, { transform: booleanAttribute });
  /** Trigger view: draw once, or clear again when the text leaves the viewport. */
  readonly once = input(true, { transform: booleanAttribute });
  /** Trigger view: how much of the text must be visible (0 to 1). */
  readonly threshold = input(0.5, { transform: numberAttribute });
  readonly duration = input(700, { transform: numberAttribute });
  readonly delay = input(0, { transform: numberAttribute });

  /** Follows active every time it changes; triggers and animate() set it in between. */
  protected readonly on = linkedSignal(() => this.active());
  /** A direction from animate(direction) wins over the direction input. */
  protected readonly override = signal<TextHighlighterDirection | undefined>(
    undefined,
  );
  protected readonly classes = computed(
    () => `${base} ${variants[this.variant()]} ${colors[this.color()]}`,
  );
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    afterRenderEffect((onCleanup) => {
      const trigger = this.trigger();
      const once = this.once();
      const threshold = this.threshold();
      if (trigger === "manual") return;
      onCleanup(this.listen(trigger, once, threshold));
    });
  }

  /** Draws the highlight, optionally from another direction. */
  animate(direction?: TextHighlighterDirection) {
    if (direction) this.override.set(direction);
    this.on.set(true);
  }

  /** Clears the highlight. */
  reset() {
    this.on.set(false);
  }

  private listen(
    trigger: Exclude<TextHighlighterTrigger, "manual">,
    once: boolean,
    threshold: number,
  ) {
    const element = this.host.nativeElement;
    if (trigger === "hover") {
      const target = element.closest<HTMLElement>(TRIGGER) ?? element;
      const toggle = (event: Event) =>
        this.on.set(EVENTS.indexOf(event.type) < 2);
      EVENTS.forEach((name) => target.addEventListener(name, toggle));
      return () =>
        EVENTS.forEach((name) => target.removeEventListener(name, toggle));
    }
    // Auto draws right away. offsetWidth applies the empty start first, so the transition runs.
    if (trigger === "auto") {
      void element.offsetWidth;
      this.on.set(true);
      return () => {};
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        if (visible && once) observer.disconnect();
        if (visible || !once) this.on.set(visible);
      },
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }
}
