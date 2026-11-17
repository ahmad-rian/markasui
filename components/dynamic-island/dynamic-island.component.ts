import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";

export type DynamicIslandState = "idle" | "compact" | "expanded";

/** The island re-scopes the theme with the dark class, so it reads as a black pill in both modes. */
const root =
  "dark relative mx-auto max-w-full overflow-hidden bg-canvas text-ink ring-1 ring-line transition-[width,height,border-radius] duration-500 ease-[cubic-bezier(0.32,1.2,0.5,1)] motion-reduce:transition-none data-[state=compact]:h-9 data-[state=compact]:w-[var(--island-compact-width,15rem)] data-[state=compact]:rounded-[18px] data-[state=expanded]:h-[var(--island-expanded-height,9.5rem)] data-[state=expanded]:w-[var(--island-expanded-width,22rem)] data-[state=expanded]:rounded-[32px] data-[state=idle]:h-9 data-[state=idle]:w-[var(--island-idle-width,7.5rem)] data-[state=idle]:rounded-[18px]";
const panel =
  "absolute top-0 left-1/2 max-w-[100cqw] origin-top -translate-x-1/2 transition-[opacity,scale,filter] duration-300 ease-out motion-reduce:transition-none data-[state=active]:delay-150 data-[state=inactive]:pointer-events-none data-[state=inactive]:scale-90 data-[state=inactive]:opacity-0 data-[state=inactive]:blur-sm";
const panels = {
  idle: "grid h-9 w-[var(--island-idle-width,7.5rem)] place-items-center",
  compact:
    "flex h-9 w-[var(--island-compact-width,15rem)] items-center justify-between gap-3 px-3 text-xs font-medium",
  expanded:
    "h-[var(--island-expanded-height,9.5rem)] w-[var(--island-expanded-width,22rem)] p-4",
};
const side = "flex min-w-0 items-center gap-2";
const srOnly = "sr-only";

/**
 * Slots: elements with the `idle`, `leading`, `trailing`, or `expanded` attribute (an
 * ng-container works). Host stays out of layout; class moves to the region.
 */
@Component({
  selector: "markas-dynamic-island",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  template: `
    <div
      role="region"
      [attr.aria-label]="islandLabel()"
      [attr.data-state]="state()"
      [class]="rootClasses()"
    >
      <div
        [attr.data-state]="stateOf('idle')"
        [attr.inert]="state() !== 'idle' ? '' : null"
        [class]="panelIdle"
      >
        <ng-content select="[idle]" />
      </div>
      <div
        [attr.data-state]="stateOf('compact')"
        [attr.inert]="state() !== 'compact' ? '' : null"
        [class]="panelCompact"
      >
        <div [class]="side"><ng-content select="[leading]" /></div>
        <div [class]="side"><ng-content select="[trailing]" /></div>
      </div>
      <div
        [attr.data-state]="stateOf('expanded')"
        [attr.inert]="state() !== 'expanded' ? '' : null"
        [class]="panelExpanded"
      >
        <ng-content select="[expanded]" />
      </div>
      <p aria-live="polite" [class]="srOnly">{{ announcement() }}</p>
    </div>
  `,
})
export class DynamicIsland {
  readonly state = input<DynamicIslandState>("idle");
  /** Text read by screen readers when the island moves to a state. */
  readonly announcements = input<Partial<Record<DynamicIslandState, string>>>(
    {},
  );
  readonly islandLabel = input("Live activity");
  readonly userClass = input("", { alias: "class" });

  protected readonly panelIdle = `${panel} ${panels.idle}`;
  protected readonly panelCompact = `${panel} ${panels.compact}`;
  protected readonly panelExpanded = `${panel} ${panels.expanded}`;
  protected readonly side = side;
  protected readonly srOnly = srOnly;
  protected readonly rootClasses = computed(() =>
    [root, this.userClass()].filter(Boolean).join(" "),
  );
  protected readonly announcement = computed(
    () => this.announcements()[this.state()] ?? "",
  );

  protected stateOf(name: DynamicIslandState) {
    return this.state() === name ? "active" : "inactive";
  }
}
