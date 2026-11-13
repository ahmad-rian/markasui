<script lang="ts" module>
  export type DynamicIslandState = "idle" | "compact" | "expanded";
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  /** The island re-scopes the theme with the dark class, so it reads as a black pill in both modes. */
  const root =
    "dark relative mx-auto overflow-hidden bg-canvas text-ink ring-1 ring-line transition-[width,height,border-radius] duration-500 ease-[cubic-bezier(0.32,1.2,0.5,1)] motion-reduce:transition-none data-[state=compact]:h-9 data-[state=compact]:w-[var(--island-compact-width,15rem)] data-[state=compact]:rounded-[18px] data-[state=expanded]:h-[var(--island-expanded-height,9.5rem)] data-[state=expanded]:w-[var(--island-expanded-width,22rem)] data-[state=expanded]:rounded-[32px] data-[state=idle]:h-9 data-[state=idle]:w-[var(--island-idle-width,7.5rem)] data-[state=idle]:rounded-[18px]";
  const panel =
    "absolute top-0 left-1/2 origin-top -translate-x-1/2 transition-[opacity,scale,filter] duration-300 ease-out motion-reduce:transition-none data-[state=active]:delay-150 data-[state=inactive]:pointer-events-none data-[state=inactive]:scale-90 data-[state=inactive]:opacity-0 data-[state=inactive]:blur-sm";
  const panels = {
    idle: "grid h-9 w-[var(--island-idle-width,7.5rem)] place-items-center",
    compact:
      "flex h-9 w-[var(--island-compact-width,15rem)] items-center justify-between gap-3 px-3 text-xs font-medium",
    expanded:
      "h-[var(--island-expanded-height,9.5rem)] w-[var(--island-expanded-width,22rem)] p-4",
  };
  const side = "flex min-w-0 items-center gap-2";
  const srOnly = "sr-only";

  type Props = HTMLAttributes<HTMLDivElement> & {
    state?: DynamicIslandState;
    /** Content of the small idle pill, usually empty. */
    idle?: Snippet;
    /** Left side of the compact pill, such as an icon. */
    leading?: Snippet;
    /** Right side of the compact pill, such as a time or level. */
    trailing?: Snippet;
    /** Content of the large card. */
    expanded?: Snippet;
    /** Text read by screen readers when the island moves to a state. */
    announcements?: Partial<Record<DynamicIslandState, string>>;
    islandLabel?: string;
  };

  let {
    state = "idle",
    idle,
    leading,
    trailing,
    expanded,
    announcements = {},
    islandLabel = "Live activity",
    class: className,
    ...rest
  }: Props = $props();

  const stateOf = (name: DynamicIslandState) =>
    state === name ? "active" : "inactive";
</script>

<div
  role="region"
  aria-label={islandLabel}
  data-state={state}
  class={[root, className]}
  {...rest}
>
  <div
    data-state={stateOf("idle")}
    inert={state !== "idle"}
    class={[panel, panels.idle]}
  >
    {@render idle?.()}
  </div>
  <div
    data-state={stateOf("compact")}
    inert={state !== "compact"}
    class={[panel, panels.compact]}
  >
    <div class={side}>{@render leading?.()}</div>
    <div class={side}>{@render trailing?.()}</div>
  </div>
  <div
    data-state={stateOf("expanded")}
    inert={state !== "expanded"}
    class={[panel, panels.expanded]}
  >
    {@render expanded?.()}
  </div>
  <p aria-live="polite" class={srOnly}>{announcements[state] ?? ""}</p>
</div>
