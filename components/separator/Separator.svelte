<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  const roots = {
    horizontal: "h-px w-full shrink-0 bg-line",
    vertical: "w-px shrink-0 self-stretch bg-line",
  };
  const labeledRoots = {
    horizontal: "flex w-full items-center gap-3 text-xs text-muted",
    vertical:
      "flex shrink-0 flex-col items-center gap-2 self-stretch text-xs text-muted",
  };
  const lines = {
    horizontal: "h-px flex-1 bg-line",
    vertical: "w-px flex-1 bg-line",
  };

  type Orientation = keyof typeof roots;

  type Props = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
    orientation?: Orientation;
    /** Visual only (role="none"). Turn off when the line separates meaningful sections. */
    decorative?: boolean;
    /** Text in the middle of the line, for example "or". */
    label?: string;
  };

  let {
    orientation = "horizontal",
    decorative = true,
    label,
    class: className,
    ...rest
  }: Props = $props();

  const semantics = $derived(
    decorative
      ? { role: "none" as const }
      : {
          role: "separator" as const,
          "aria-orientation": orientation,
          "aria-label": label || undefined,
        },
  );
</script>

{#if label}
  <div {...semantics} class={[labeledRoots[orientation], className]} {...rest}>
    <span class={lines[orientation]}></span>
    <span>{label}</span>
    <span class={lines[orientation]}></span>
  </div>
{:else}
  <div {...semantics} class={[roots[orientation], className]} {...rest}></div>
{/if}
