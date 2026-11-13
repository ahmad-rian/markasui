<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  const root = "group grid gap-3 has-disabled:cursor-not-allowed";
  const header = "flex items-center justify-between gap-4 text-sm";
  const labelClass = "font-medium text-ink group-has-disabled:opacity-50";
  const valueClass =
    "ml-auto text-muted tabular-nums group-has-disabled:text-faint";
  const range =
    "h-4 w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-surface [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[linear-gradient(to_right,var(--color-primary)_var(--value),var(--color-line)_var(--value))] [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,var(--color-primary)_var(--value),var(--color-line)_var(--value))] [&::-webkit-slider-thumb]:-mt-[5px] [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-surface";

  const toPercent = (value: number, min: number, max: number) =>
    max > min ? ((value - min) / (max - min)) * 100 : 0;

  type Props = Omit<
    HTMLInputAttributes,
    "type" | "value" | "min" | "max" | "step"
  > & {
    label?: string;
    min?: number;
    max?: number;
    step?: number;
    /** Current value, bindable with bind:value. */
    value?: number;
    showValue?: boolean;
  };

  let {
    label,
    min = 0,
    max = 100,
    step = 1,
    value = $bindable(),
    showValue = true,
    id,
    class: className,
    oninput,
    ...rest
  }: Props = $props();

  const generatedId = $props.id();
  const sliderId = $derived(id ?? generatedId);
  const current = $derived(value ?? min);

  function handleInput(
    event: Event & { currentTarget: EventTarget & HTMLInputElement },
  ) {
    value = event.currentTarget.valueAsNumber;
    oninput?.(event);
  }
</script>

<div class={root}>
  {#if label || showValue}
    <div class={header}>
      {#if label}
        <label for={sliderId} class={labelClass}>{label}</label>
      {/if}
      {#if showValue}
        <span class={valueClass} aria-hidden="true">{current}</span>
      {/if}
    </div>
  {/if}
  <input
    id={sliderId}
    {min}
    {max}
    {step}
    value={current}
    style:--value={`${toPercent(current, min, max)}%`}
    oninput={handleInput}
    class={[range, className]}
    {...rest}
    type="range"
  />
</div>
