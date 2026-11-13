<script lang="ts">
  import type { HTMLProgressAttributes } from "svelte/elements";

  const wrapper = "grid gap-1.5";
  const header = "flex items-center justify-between gap-4 text-sm";
  const labelClass = "font-medium text-ink";
  const valueClass = "text-muted tabular-nums";
  const bar =
    "block h-2 w-full appearance-none overflow-hidden rounded-full border-0 bg-subtle [&::-webkit-progress-bar]:bg-subtle [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-primary [&::-webkit-progress-value]:transition-[width] [&::-webkit-progress-value]:duration-200 [&::-webkit-progress-value]:ease-out [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-primary indeterminate:animate-pulse indeterminate:bg-primary/30 indeterminate:[&::-webkit-progress-bar]:bg-primary/30 motion-reduce:animate-none motion-reduce:[&::-webkit-progress-value]:transition-none";

  const percentOf = (value: number, max: number): number =>
    Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  type Props = Omit<HTMLProgressAttributes, "value" | "max"> & {
    /** Empty (null) shows an indeterminate bar. */
    value?: number | null;
    max?: number;
    label?: string;
  };

  let {
    value = null,
    max = 100,
    label,
    id,
    class: className,
    ...rest
  }: Props = $props();

  const generatedId = $props.id();
  const progressId = $derived(id ?? generatedId);
</script>

<div class={wrapper}>
  {#if label}
    <div class={header}>
      <label for={progressId} class={labelClass}>{label}</label>
      {#if value !== null}
        <span class={valueClass}>{percentOf(value, max)}%</span>
      {/if}
    </div>
  {/if}
  <progress
    id={progressId}
    value={value ?? undefined}
    {max}
    class={[bar, className]}
    {...rest}
  ></progress>
</div>
